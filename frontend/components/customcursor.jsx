"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    const animate = () => {
      // Ring catches up fast — 0.28 = tight follow
      rx += (mx - rx) * 1;
      ry += (my - ry) * 1;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      requestAnimationFrame(animate);
    };

    // Set initial position so ring doesn't fly from corner
    dot.style.left  = mx + "px";
    dot.style.top   = my + "px";
    ring.style.left = mx + "px";
    ring.style.top  = my + "px";

    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div id="cur-dot"  ref={dotRef}  />
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}