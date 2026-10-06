"use client";

/**
 * Checks if the current browser environment supports WebGL
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2"))
    );
  } catch (e) {
    return false;
  }
}
