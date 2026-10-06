"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl-check";
import { WebGLFallback } from "./WebGLFallback";

export function VisionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

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
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0, 0);

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

    // 1. Digital Wireframe Horizon Plane / Grid
    const gridHelper = new THREE.GridHelper(24, 30, 0x0066ff, 0x002266);
    gridHelper.position.y = -1.6;
    group.add(gridHelper);

    // 2. Futuristic Digital Sphere / Energy Lattice
    const sphereGeo = new THREE.IcosahedronGeometry(2.0, isMobile ? 2 : 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 20, 20);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Floating Energy Tunnel Rings
    const ringCount = 7;
    const rings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(3.0, 0.015, 16, 64);
    for (let i = 0; i < ringCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0066ff : 0x00d2ff,
        transparent: true,
        opacity: 0.15 + (i / ringCount) * 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 1.8;
      const s = 1 + i * 0.18;
      ring.scale.set(s, s, 1);
      group.add(ring);
      rings.push(ring);
    }

    // 4. Particle Nebula
    const particleCount = isMobile ? 300 : 700;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 14;
      pos[i + 1] = Math.random() * 6 - 1;
      pos[i + 2] = (Math.random() - 0.5) * 12;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    group.add(particles);

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

      sphereMesh.rotation.y = elapsed * 0.12 * motion;
      sphereMesh.rotation.x = Math.sin(elapsed * 0.08) * 0.15 * motion;
      innerMesh.rotation.y = -elapsed * 0.2 * motion;

      // Animate tunnel rings
      rings.forEach((r, idx) => {
        r.rotation.z = (elapsed * 0.1 + idx * 0.2) * motion;
      });

      // Move grid forward for infinite digital horizon feel
      gridHelper.position.z = (elapsed * 1.2 * motion) % 0.8;

      particles.rotation.y = elapsed * 0.03 * motion;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback variant="tunnel" />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
