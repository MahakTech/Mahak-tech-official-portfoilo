"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl-check";
import { WebGLFallback } from "./WebGLFallback";

interface ServicesSceneProps {
  activeIndex: number;
}

export function ServicesScene({ activeIndex }: ServicesSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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
    scene.fog = new THREE.FogExp2(0x02040a, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 5.5);

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

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create 6 distinct geometric service representations inside sub-groups
    const serviceGroups: THREE.Group[] = [];

    // 0: Web Development - Cyber Matrix Box
    const g0 = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const boxMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true, transparent: true, opacity: 0.8 });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    const innerBoxGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const innerBoxMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true, transparent: true, opacity: 0.6 });
    const innerBox = new THREE.Mesh(innerBoxGeo, innerBoxMat);
    g0.add(boxMesh, innerBox);
    serviceGroups.push(g0);
    mainGroup.add(g0);

    // 1: UI/UX Design - Harmonic Curves / Torus Knot
    const g1 = new THREE.Group();
    const torusKnotGeo = new THREE.TorusKnotGeometry(0.8, 0.22, 64, 16);
    const torusKnotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.75 });
    const knotMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    g1.add(knotMesh);
    serviceGroups.push(g1);
    mainGroup.add(g1);

    // 2: Software Development - Solid Architecture / Octahedron System
    const g2 = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(1.3, 1);
    const octMat = new THREE.MeshBasicMaterial({ color: 0x0052cc, wireframe: true, transparent: true, opacity: 0.8 });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    g2.add(octMesh, ringMesh);
    serviceGroups.push(g2);
    mainGroup.add(g2);

    // 3: AI & Intelligent Systems - Neural Dodecahedron
    const g3 = new THREE.Group();
    const dodecGeo = new THREE.DodecahedronGeometry(1.2, 1);
    const dodecMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true, transparent: true, opacity: 0.8 });
    const dodecMesh = new THREE.Mesh(dodecGeo, dodecMat);
    const pulseGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.7 });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    g3.add(dodecMesh, pulseMesh);
    serviceGroups.push(g3);
    mainGroup.add(g3);

    // 4: 3D & Interactive - Concentric Gyroscopic Rings
    const g4 = new THREE.Group();
    const gyro1Geo = new THREE.TorusGeometry(1.2, 0.02, 16, 64);
    const gyro1Mat = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.8 });
    const m1 = new THREE.Mesh(gyro1Geo, gyro1Mat);
    const gyro2Geo = new THREE.TorusGeometry(0.85, 0.02, 16, 64);
    const gyro2Mat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.75 });
    const m2 = new THREE.Mesh(gyro2Geo, gyro2Mat);
    m2.rotation.x = Math.PI / 2;
    const icoGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.8 });
    const m3 = new THREE.Mesh(icoGeo, icoMat);
    g4.add(m1, m2, m3);
    serviceGroups.push(g4);
    mainGroup.add(g4);

    // 5: Digital Product Development - High-tech Diamond Matrix
    const g5 = new THREE.Group();
    const coneGeo = new THREE.ConeGeometry(1.1, 1.8, 6, 2, true);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true, transparent: true, opacity: 0.7 });
    const coneMesh1 = new THREE.Mesh(coneGeo, coneMat);
    const coneMesh2 = new THREE.Mesh(coneGeo, coneMat);
    coneMesh2.rotation.x = Math.PI;
    g5.add(coneMesh1, coneMesh2);
    serviceGroups.push(g5);
    mainGroup.add(g5);

    // Ambient particles around active object
    const particleCount = 180;
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 4;
      pPos[i + 1] = (Math.random() - 0.5) * 4;
      pPos[i + 2] = (Math.random() - 0.5) * 3;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const pMesh = new THREE.Points(pGeo, pMat);
    scene.add(pMesh);

    // Dynamic Point Light
    const pointLight = new THREE.PointLight(0x00d2ff, 3, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const motion = prefersReducedMotion ? 0.05 : 1;
      const currentActive = activeIndexRef.current;

      // Rotate active group
      serviceGroups.forEach((grp, idx) => {
        const isTarget = idx === currentActive;
        const targetScale = isTarget ? 1.0 : 0.001;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        grp.visible = grp.scale.x > 0.01;

        if (isTarget) {
          grp.rotation.y = elapsed * 0.4 * motion;
          grp.rotation.x = Math.sin(elapsed * 0.3) * 0.3 * motion;
        }
      });

      pMesh.rotation.y = -elapsed * 0.1 * motion;
      pMesh.rotation.z = elapsed * 0.05 * motion;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      boxGeo.dispose();
      boxMat.dispose();
      innerBoxGeo.dispose();
      innerBoxMat.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dodecGeo.dispose();
      dodecMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      gyro1Geo.dispose();
      gyro1Mat.dispose();
      gyro2Geo.dispose();
      gyro2Mat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      coneGeo.dispose();
      coneMat.dispose();
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
      className="w-full h-full min-h-[340px] pointer-events-none relative z-0"
      aria-hidden="true"
    />
  );
}
