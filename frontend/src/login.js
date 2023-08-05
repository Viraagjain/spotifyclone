// rfc is react functional components

import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import * as THREE from "three";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=0d4b48d7d0b248cda2b64973a6b5fd53&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, bars;

    const init = () => {
      // Create a scene
      scene = new THREE.Scene();

      // Create a camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Create a renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Create music bars
      const barCount = 20;
      const barWidth = 0.3;
      const barSpacing = 0.2;
      const barGeometry = new THREE.BoxGeometry(barWidth, 1, barWidth);
      const barMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      bars = [];

      for (let i = 0; i < barCount; i++) {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.x = (barWidth + barSpacing) * (i - barCount / 2);
        scene.add(bar);
        bars.push(bar);
      }

      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Update the music bars' scale based on audio data
      const time = Date.now() * 0.001;
      const scaleMultiplier = 0.5;
      const scaleOffset = 0.5;

      bars.forEach((bar, index) => {
        const scale = Math.sin(time + index * 0.5) * scaleMultiplier + scaleOffset;
        bar.scale.y = scale;
        bar.position.y = scale * 0.5 - 0.5;
      });

      renderer.render(scene, camera);
    };

    init();
  }, []);

  return (
    <Container fluid className="p-0 position-relative vh-100">
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 1 }}>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
      </div>
    </Container>
  );
}












