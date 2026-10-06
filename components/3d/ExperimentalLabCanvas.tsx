"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl-check";
import { WebGLFallback } from "./WebGLFallback";

interface ExperimentalLabCanvasProps {
  activeExperiment: number; // 0 to 6
  shockwaveCount?: number;
  isRevealed?: boolean;
}

export function ExperimentalLabCanvas({
  activeExperiment,
  shockwaveCount = 0,
  isRevealed = false,
}: ExperimentalLabCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const activeExpRef = useRef(activeExperiment);
  const shockwaveRef = useRef(shockwaveCount);
  const isRevealedRef = useRef(isRevealed);

  useEffect(() => {
    activeExpRef.current = activeExperiment;
  }, [activeExperiment]);

  useEffect(() => {
    shockwaveRef.current = shockwaveCount;
  }, [shockwaveCount]);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010206, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 0, 7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Common Geometries & Materials across the 7 experiments
    const experimentGroups: THREE.Group[] = [];

    // =========================================================================
    // 01: NEURAL SPACE (AI × INTERACTION)
    // =========================================================================
    const g0 = new THREE.Group();
    const neuralGeo = new THREE.IcosahedronGeometry(1.5, isMobile ? 2 : 3);
    const neuralMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const neuralMesh = new THREE.Mesh(neuralGeo, neuralMat);
    g0.add(neuralMesh);

    // Neural nodes
    const nodeCount = isMobile ? 40 : 80;
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff });
    const neuralNodes: { mesh: THREE.Mesh; origPos: THREE.Vector3 }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5;
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      neuralNodes.push({ mesh, origPos: mesh.position.clone() });
      g0.add(mesh);
    }

    // Synapse Lines
    const synapseGeo = new THREE.BufferGeometry();
    const synapsePositions = new Float32Array(nodeCount * 6);
    synapseGeo.setAttribute("position", new THREE.BufferAttribute(synapsePositions, 3));
    const synapseMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const synapseMesh = new THREE.LineSegments(synapseGeo, synapseMat);
    g0.add(synapseMesh);

    experimentGroups.push(g0);
    mainGroup.add(g0);

    // =========================================================================
    // 02: DIGITAL GRAVITY (3D × PHYSICS)
    // =========================================================================
    const g1 = new THREE.Group();
    const gravityCount = isMobile ? 80 : 160;
    const gravGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const gravMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const gravityParticles: {
      mesh: THREE.Mesh;
      vx: number;
      vy: number;
      vz: number;
      x: number;
      y: number;
      z: number;
    }[] = [];

    for (let i = 0; i < gravityCount; i++) {
      const mesh = new THREE.Mesh(gravGeo, gravMat);
      const x = (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 3;
      mesh.position.set(x, y, z);
      g1.add(mesh);
      gravityParticles.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        x,
        y,
        z,
      });
    }

    // Central Gravity Attractor Ring
    const gravAttractorGeo = new THREE.TorusGeometry(0.8, 0.015, 16, 64);
    const gravAttractorMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.4,
    });
    const gravAttractor = new THREE.Mesh(gravAttractorGeo, gravAttractorMat);
    g1.add(gravAttractor);

    experimentGroups.push(g1);
    mainGroup.add(g1);

    // =========================================================================
    // 03: LIVING INTERFACE (HUMAN × MACHINE)
    // =========================================================================
    const g2 = new THREE.Group();
    const livingGeo = new THREE.TorusKnotGeometry(1.0, 0.28, 96, 24, 2, 3);
    const livingMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const livingMesh = new THREE.Mesh(livingGeo, livingMat);
    g2.add(livingMesh);

    // Breathing internal bio-light
    const bioLightGeo = new THREE.IcosahedronGeometry(0.65, 2);
    const bioLightMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const bioLight = new THREE.Mesh(bioLightGeo, bioLightMat);
    g2.add(bioLight);

    experimentGroups.push(g2);
    mainGroup.add(g2);

    // =========================================================================
    // 04: ZERO GRAVITY DESKTOP (FUTURE COMPUTING)
    // =========================================================================
    const g3 = new THREE.Group();
    // 3 Floating Glass Spatial Windows
    const winGeo = new THREE.PlaneGeometry(1.6, 1.0);
    const winMat1 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const win1 = new THREE.Mesh(winGeo, winMat1);
    win1.position.set(-1.1, 0.4, 0.4);
    win1.rotation.y = 0.25;

    const winMat2 = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const win2 = new THREE.Mesh(winGeo, winMat2);
    win2.position.set(0.9, -0.2, 0.2);
    win2.rotation.y = -0.3;

    const winMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const win3 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.8), winMat3);
    win3.position.set(-0.2, -0.8, -0.5);
    win3.rotation.x = -0.2;

    g3.add(win1, win2, win3);

    // Orbiting Spatial Widget Rings
    const deskRingGeo = new THREE.TorusGeometry(1.8, 0.01, 16, 64);
    const deskRingMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.35,
    });
    const deskRing = new THREE.Mesh(deskRingGeo, deskRingMat);
    deskRing.rotation.x = Math.PI / 2.3;
    g3.add(deskRing);

    experimentGroups.push(g3);
    mainGroup.add(g3);

    // =========================================================================
    // 05: DIGITAL DNA (GENERATIVE TECHNOLOGY)
    // =========================================================================
    const g4 = new THREE.Group();
    const dnaNodesCount = 48;
    const strandGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const strandMat1 = new THREE.MeshBasicMaterial({ color: 0x0066ff });
    const strandMat2 = new THREE.MeshBasicMaterial({ color: 0x00d2ff });

    const dnaRungsCoords: number[] = [];
    for (let i = 0; i < dnaNodesCount; i++) {
      const t = (i / dnaNodesCount) * Math.PI * 4;
      const y = (i / dnaNodesCount) * 4 - 2;
      const x1 = Math.cos(t) * 1.1;
      const z1 = Math.sin(t) * 1.1;
      const x2 = Math.cos(t + Math.PI) * 1.1;
      const z2 = Math.sin(t + Math.PI) * 1.1;

      const m1 = new THREE.Mesh(strandGeo, strandMat1);
      m1.position.set(x1, y, z1);
      const m2 = new THREE.Mesh(strandGeo, strandMat2);
      m2.position.set(x2, y, z2);
      g4.add(m1, m2);

      // Connecting rungs every 2 steps
      if (i % 2 === 0) {
        dnaRungsCoords.push(x1, y, z1, x2, y, z2);
      }
    }

    const dnaLinesGeo = new THREE.BufferGeometry();
    dnaLinesGeo.setAttribute("position", new THREE.Float32BufferAttribute(dnaRungsCoords, 3));
    const dnaLinesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const dnaLinesMesh = new THREE.LineSegments(dnaLinesGeo, dnaLinesMat);
    g4.add(dnaLinesMesh);

    experimentGroups.push(g4);
    mainGroup.add(g4);

    // =========================================================================
    // 06: THE FUTURE ROOM (SPATIAL COMPUTING)
    // =========================================================================
    const g5 = new THREE.Group();
    // Perspective wireframe bounding room
    const roomGeo = new THREE.BoxGeometry(4.5, 3.5, 5);
    const roomMat = new THREE.MeshBasicMaterial({
      color: 0x0033aa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const roomMesh = new THREE.Mesh(roomGeo, roomMat);
    g5.add(roomMesh);

    // Holographic data pedestal in center
    const pedestalGeo = new THREE.CylinderGeometry(0.7, 0.9, 1.4, 16, 2, true);
    const pedestalMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    g5.add(pedestal);

    // Spatial screens hovering inside room
    const screenGeo = new THREE.PlaneGeometry(0.9, 0.6);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    for (let i = 0; i < 4; i++) {
      const scr = new THREE.Mesh(screenGeo, screenMat);
      const angle = (i / 4) * Math.PI * 2;
      scr.position.set(Math.cos(angle) * 1.5, 0.4, Math.sin(angle) * 1.5);
      scr.lookAt(0, 0.4, 0);
      g5.add(scr);
    }

    experimentGroups.push(g5);
    mainGroup.add(g5);

    // =========================================================================
    // 07: UNKNOWN (CLASSIFIED)
    // =========================================================================
    const g6 = new THREE.Group();
    // Massive mysterious containment core
    const classifiedGeo = new THREE.OctahedronGeometry(1.6, 2);
    const classifiedMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const classifiedMesh = new THREE.Mesh(classifiedGeo, classifiedMat);
    g6.add(classifiedMesh);

    // Inner radiant core
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.8, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    g6.add(innerCoreMesh);

    // Containment field rings
    const containRingGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 64);
    const containRingMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.7,
    });
    const containRing1 = new THREE.Mesh(containRingGeo, containRingMat);
    const containRing2 = new THREE.Mesh(containRingGeo, containRingMat);
    containRing2.rotation.x = Math.PI / 2;
    g6.add(containRing1, containRing2);

    experimentGroups.push(g6);
    mainGroup.add(g6);

    // Ambient floating dust particles
    const dustCount = isMobile ? 150 : 350;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 8;
      dustPos[i + 1] = (Math.random() - 0.5) * 6;
      dustPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    scene.add(dustMesh);

    // Pointer tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let lastShockwave = 0;
    let clock = new THREE.Clock();
    let animationId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const motion = prefersReducedMotion ? 0.05 : 1;
      const activeIdx = activeExpRef.current;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Smooth visibility transitions between the 7 experiment sub-groups
      experimentGroups.forEach((grp, idx) => {
        const isTarget = idx === activeIdx;
        const targetScale = isTarget ? 1.0 : 0.0001;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        grp.visible = grp.scale.x > 0.01;
      });

      // Ambient group subtle float
      mainGroup.rotation.y = mouse.x * 0.35 * motion;
      mainGroup.rotation.x = -mouse.y * 0.25 * motion;

      // -------------------------------------------------------------
      // Specific Animation logic per active experiment
      // -------------------------------------------------------------
      if (activeIdx === 0) {
        // 01 Neural Space
        neuralMesh.rotation.y = elapsed * 0.15 * motion;
        neuralMesh.rotation.x = Math.sin(elapsed * 0.1) * 0.1 * motion;

        // Animate neural nodes reacting to cursor
        const posAttr = synapseGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        let pIdx = 0;

        for (let i = 0; i < nodeCount; i++) {
          const item = neuralNodes[i];
          const distToCursor = item.mesh.position.distanceTo(
            new THREE.Vector3(mouse.x * 1.5, mouse.y * 1.5, 0)
          );
          const push = Math.max(0, 1 - distToCursor / 2);
          item.mesh.position.lerp(
            item.origPos.clone().multiplyScalar(1 + push * 0.3),
            0.1
          );

          // Build dynamic synapse lines
          if (i < nodeCount - 1 && pIdx < posArray.length - 6) {
            const nextItem = neuralNodes[i + 1];
            posArray[pIdx++] = item.mesh.position.x;
            posArray[pIdx++] = item.mesh.position.y;
            posArray[pIdx++] = item.mesh.position.z;
            posArray[pIdx++] = nextItem.mesh.position.x;
            posArray[pIdx++] = nextItem.mesh.position.y;
            posArray[pIdx++] = nextItem.mesh.position.z;
          }
        }
        posAttr.needsUpdate = true;
      } else if (activeIdx === 1) {
        // 02 Digital Gravity Physics
        const curShockwave = shockwaveRef.current;
        const triggerBlast = curShockwave !== lastShockwave;
        if (triggerBlast) lastShockwave = curShockwave;

        const targetAttractor = new THREE.Vector3(mouse.x * 2.2, mouse.y * 1.8, 0);
        gravAttractor.position.lerp(targetAttractor, 0.1);
        gravAttractor.rotation.z = elapsed * 0.8 * motion;

        gravityParticles.forEach((p) => {
          if (triggerBlast) {
            // Massive radial gravity explosion
            const dir = p.mesh.position.clone().sub(targetAttractor).normalize();
            p.vx = dir.x * 0.15 + (Math.random() - 0.5) * 0.05;
            p.vy = dir.y * 0.15 + (Math.random() - 0.5) * 0.05;
            p.vz = dir.z * 0.15 + (Math.random() - 0.5) * 0.05;
          } else {
            // Gravitational pull toward cursor
            const dx = targetAttractor.x - p.mesh.position.x;
            const dy = targetAttractor.y - p.mesh.position.y;
            const dz = targetAttractor.z - p.mesh.position.z;
            const distSq = dx * dx + dy * dy + dz * dz + 0.1;
            const force = 0.0018 / distSq;

            p.vx += dx * force;
            p.vy += dy * force;
            p.vz += dz * force;

            // Damping / friction
            p.vx *= 0.96;
            p.vy *= 0.96;
            p.vz *= 0.96;
          }

          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;

          p.mesh.rotation.x += 0.03 * motion;
          p.mesh.rotation.y += 0.04 * motion;
        });
      } else if (activeIdx === 2) {
        // 03 Living Interface
        const breath = 1 + Math.sin(elapsed * 2.2) * 0.18 * motion;
        livingMesh.scale.set(breath, breath, breath);
        livingMesh.rotation.y = elapsed * 0.3 * motion;
        livingMesh.rotation.x = Math.cos(elapsed * 0.25) * 0.2 * motion;

        const pulse = 1 + Math.sin(elapsed * 4.0) * 0.25 * motion;
        bioLight.scale.set(pulse, pulse, pulse);
        bioLight.rotation.z = -elapsed * 0.4 * motion;
      } else if (activeIdx === 3) {
        // 04 Zero Gravity Desktop
        win1.position.y = 0.4 + Math.sin(elapsed * 1.2) * 0.08 * motion;
        win2.position.y = -0.2 + Math.cos(elapsed * 1.0) * 0.08 * motion;
        win3.position.y = -0.8 + Math.sin(elapsed * 1.4) * 0.06 * motion;
        deskRing.rotation.z = elapsed * 0.15 * motion;
      } else if (activeIdx === 4) {
        // 05 Digital DNA
        g4.rotation.y = elapsed * 0.45 * motion;
        g4.position.y = Math.sin(elapsed * 0.8) * 0.15 * motion;
      } else if (activeIdx === 5) {
        // 06 The Future Room
        roomMesh.rotation.y = Math.sin(elapsed * 0.1) * 0.08 * motion;
        pedestal.rotation.y = elapsed * 0.3 * motion;
      } else if (activeIdx === 6) {
        // 07 Classified Unknown
        const isRev = isRevealedRef.current;
        if (isRev) {
          // Powerful blue containment activation
          classifiedMesh.rotation.y += 0.08 * motion;
          classifiedMesh.rotation.x += 0.05 * motion;
          const superScale = 1.35 + Math.sin(elapsed * 6) * 0.12;
          classifiedMesh.scale.set(superScale, superScale, superScale);
          innerCoreMesh.scale.set(1.5, 1.5, 1.5);
          containRing1.rotation.z += 0.08 * motion;
          containRing2.rotation.y += 0.08 * motion;
        } else {
          classifiedMesh.rotation.y = elapsed * 0.2 * motion;
          classifiedMesh.rotation.x = Math.sin(elapsed * 0.15) * 0.15 * motion;
          innerCoreMesh.rotation.y = -elapsed * 0.3 * motion;
          containRing1.rotation.z = elapsed * 0.1 * motion;
          containRing2.rotation.y = -elapsed * 0.12 * motion;
        }
      }

      dustMesh.rotation.y = elapsed * 0.04 * motion;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries and Materials
      neuralGeo.dispose();
      neuralMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      synapseGeo.dispose();
      synapseMat.dispose();
      gravGeo.dispose();
      gravMat.dispose();
      gravAttractorGeo.dispose();
      gravAttractorMat.dispose();
      livingGeo.dispose();
      livingMat.dispose();
      bioLightGeo.dispose();
      bioLightMat.dispose();
      winGeo.dispose();
      winMat1.dispose();
      winMat2.dispose();
      winMat3.dispose();
      deskRingGeo.dispose();
      deskRingMat.dispose();
      strandGeo.dispose();
      strandMat1.dispose();
      strandMat2.dispose();
      dnaLinesGeo.dispose();
      dnaLinesMat.dispose();
      roomGeo.dispose();
      roomMat.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      classifiedGeo.dispose();
      classifiedMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      containRingGeo.dispose();
      containRingMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback variant="network" />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
