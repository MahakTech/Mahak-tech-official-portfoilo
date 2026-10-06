"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl-check";
import { WebGLFallback } from "./WebGLFallback";
import { TECH_LIST, type TechNode } from "./tech-data";

interface TechnologyConstellationProps {
  activeNodeId: string | null;
  onSelectNode: (node: TechNode | null) => void;
}

export function TechnologyConstellation({ activeNodeId, onSelectNode }: TechnologyConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // Keep refs for values read inside the animation loop / listeners
  const activeNodeRef = useRef<string | null>(activeNodeId);
  const onSelectRef = useRef(onSelectNode);
  useEffect(() => {
    activeNodeRef.current = activeNodeId;
    onSelectRef.current = onSelectNode;
  }, [activeNodeId, onSelectNode]);

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
    scene.fog = new THREE.FogExp2(0x02040a, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

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
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Node meshes
    const nodeMeshes: { id: string; mesh: THREE.Mesh; halo: THREE.Mesh; basePos: THREE.Vector3 }[] = [];
    const sphereGeo = new THREE.IcosahedronGeometry(0.18, 2);
    const haloGeo = new THREE.SphereGeometry(0.28, 16, 16);

    TECH_LIST.forEach((node) => {
      const isSpecial = node.id === "threejs" || node.id === "ai";
      const baseMat = new THREE.MeshBasicMaterial({
        color: isSpecial ? 0x00d2ff : 0x0066ff,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(sphereGeo, baseMat);
      mesh.position.set(...node.pos);

      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      group.add(mesh);
      nodeMeshes.push({
        id: node.id,
        mesh,
        halo,
        basePos: new THREE.Vector3(...node.pos),
      });
    });

    // Connecting Constellation Lines
    const lineCoords: number[] = [];
    for (let i = 0; i < TECH_LIST.length; i++) {
      for (let j = i + 1; j < TECH_LIST.length; j++) {
        const p1 = new THREE.Vector3(...TECH_LIST[i].pos);
        const p2 = new THREE.Vector3(...TECH_LIST[j].pos);
        if (p1.distanceTo(p2) < 2.8) {
          lineCoords.push(p1.x, p1.y, p1.z);
          lineCoords.push(p2.x, p2.y, p2.z);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.35,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    group.add(linesMesh);

    // Orbiting subtle energy particles
    const particleCount = isMobile ? 250 : 600;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 8;
      pPositions[i + 1] = (Math.random() - 0.5) * 6;
      pPositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const pMesh = new THREE.Points(pGeo, pMat);
    group.add(pMesh);

    // Raycaster for 3D interaction (hover + tap)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const meshes = nodeMeshes.map((n) => n.mesh);

    const pick = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];
      if (!hit) return null;
      const found = nodeMeshes.find((n) => n.mesh === hit.object);
      return found ? TECH_LIST.find((t) => t.id === found.id) ?? null : null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const node = pick(e);
      container.style.cursor = node ? "pointer" : "default";
      if (node && node.id !== activeNodeRef.current) onSelectRef.current(node);
    };

    const onPointerDown = (e: PointerEvent) => {
      const node = pick(e);
      if (node) onSelectRef.current(node);
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animationId = 0;
    let running = true;
    const clock = new THREE.Clock();
    const targetScale = new THREE.Vector3();

    const animate = () => {
      if (!running) return;
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const motion = prefersReducedMotion ? 0.05 : 1;

      // Slow gentle constellation rotation
      group.rotation.y = elapsed * 0.08 * motion;
      group.rotation.x = Math.sin(elapsed * 0.05) * 0.1 * motion;

      const activeId = activeNodeRef.current;
      nodeMeshes.forEach((item) => {
        const isActive = item.id === activeId;
        const s = isActive ? 1.6 : 1.0;
        item.mesh.scale.lerp(targetScale.set(s, s, s), 0.12);

        item.mesh.rotation.x += 0.015 * motion;
        item.mesh.rotation.y += 0.02 * motion;

        const haloMat = item.halo.material as THREE.MeshBasicMaterial;
        haloMat.opacity = isActive ? 0.6 : 0.15;
      });

      // Connected lines glow when a node is selected
      linesMat.opacity += ((activeId ? 0.6 : 0.35) - linesMat.opacity) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      haloGeo.dispose();
      nodeMeshes.forEach((n) => {
        (n.mesh.material as THREE.Material).dispose();
        (n.halo.material as THREE.Material).dispose();
      });
      linesGeo.dispose();
      linesMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback variant="network" />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-pointer z-0"
      aria-label="Interactive 3D Technology Constellation"
    />
  );
}
