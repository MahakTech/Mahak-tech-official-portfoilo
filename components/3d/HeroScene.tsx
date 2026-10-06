"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl-check";
import { WebGLFallback } from "./WebGLFallback";

export function HeroScene() {
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

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Wireframe Orb
    const coreGeo = new THREE.IcosahedronGeometry(1.4, isMobile ? 2 : 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Futuristic Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    mainGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.1, 0.01, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 2.5;
    mainGroup.add(ring3);

    // 3. Orbiting Data Fragments (Geometric Floating Shards)
    const shardsGroup = new THREE.Group();
    const shardCount = isMobile ? 12 : 28;
    const shardGeo = new THREE.TetrahedronGeometry(0.08, 0);
    const shardMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const shards: { mesh: THREE.Mesh; speed: number; radius: number; angle: number; y: number }[] = [];

    for (let i = 0; i < shardCount; i++) {
      const mesh = new THREE.Mesh(shardGeo, shardMat);
      const radius = 2.0 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.5;
      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      shardsGroup.add(mesh);
      shards.push({
        mesh,
        speed: (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
        radius,
        angle,
        y,
      });
    }
    mainGroup.add(shardsGroup);

    // 4. Particle Field / Cosmic Dust
    const particleCount = isMobile ? 400 : 1100;
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x0066ff);
    const cyanColor = new THREE.Color(0x00d2ff);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.7;
      posArray[i + 2] = radius * Math.cos(phi);

      const mix = Math.random();
      const mixedColor = mix > 0.7 ? whiteColor : mix > 0.35 ? cyanColor : blueColor;
      colorsArray[i] = mixedColor.r;
      colorsArray[i + 1] = mixedColor.g;
      colorsArray[i + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: isMobile ? 0.025 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x020a20, 1.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0066ff, 3, 15);
    pointLight1.position.set(3, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00d2ff, 2.5, 15);
    pointLight2.position.set(-3, -2, 3);
    scene.add(pointLight2);

    // Interactive mouse / parallax handling
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.05 : 1.0;

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.12 * motionScale + currentX * 0.8;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.1 * motionScale - currentY * 0.8;

      coreMesh.rotation.y = -elapsedTime * 0.2 * motionScale;
      coreMesh.rotation.x = elapsedTime * 0.15 * motionScale;

      innerMesh.rotation.z = elapsedTime * 0.25 * motionScale;

      ring1.rotation.z = elapsedTime * 0.18 * motionScale;
      ring2.rotation.y = -elapsedTime * 0.22 * motionScale;
      ring3.rotation.x = elapsedTime * 0.15 * motionScale;

      particlesMesh.rotation.y = elapsedTime * 0.04 * motionScale;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05 * motionScale;

      // Update shards
      shards.forEach((s) => {
        s.angle += s.speed * 0.01 * motionScale;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.rotation.x += 0.02 * motionScale;
        s.mesh.rotation.y += 0.02 * motionScale;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback variant="hero" />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
