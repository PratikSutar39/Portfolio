import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Cinematic hero background: GPU shader that blends
 * RED Dragon Camera red, AI electric cyan, neon plasma, and
 * a morphing aperture iris. Pure full-screen fragment shader.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  // ----- Noise utilities (Simplex 2D, by Ashima) -----
  vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  // Domain-warped flow noise — gives the fluid, plasma feel
  float flow(vec2 p, float t) {
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0)),
                  fbm(p + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(p + 2.5 * q + vec2(1.7, 9.2) + 0.15 * t),
                  fbm(p + 2.5 * q + vec2(8.3, 2.8) + 0.126 * t));
    return fbm(p + 3.0 * r);
  }

  // Smooth pulse helper
  float pulse(float x, float c, float w) {
    return smoothstep(c - w, c, x) - smoothstep(c, c + w, x);
  }

  // 16-blade aperture iris (RED Dragon reference)
  // Returns: outerRing intensity, innerBladeMask
  vec2 aperture(vec2 p, float t) {
    float r = length(p);
    float a = atan(p.y, p.x);

    // Slow opening / breathing
    float open = 0.42 + 0.04 * sin(t * 0.35);

    // 16 blade ridges (subtle polygonal aperture edge)
    float blades = cos(a * 16.0 - t * 0.15) * 0.5 + 0.5;
    float bladeEdge = open + blades * 0.012;

    // Outer ring (the iris housing)
    float outer = smoothstep(0.58, 0.56, r) * smoothstep(0.54, 0.56, r);

    // Inner aperture glow
    float inner = smoothstep(bladeEdge + 0.02, bladeEdge, r);

    // Faint diagonal rotation strokes (motor / film transport)
    float ticks = smoothstep(0.97, 1.0,
      cos(a * 64.0 - t * 0.4) * smoothstep(0.555, 0.545, r) * smoothstep(0.535, 0.545, r));

    return vec2(outer + ticks * 0.8, inner);
  }

  // Anamorphic horizontal light streak (cinematic neon flare)
  float streak(vec2 p, float t, float speed, float yPos, float thickness) {
    float y = p.y - yPos;
    float travel = mod(t * speed, 4.0) - 2.0;
    float x = p.x - travel;
    float core = exp(-abs(y) / thickness) * exp(-abs(x) * 1.2);
    return core;
  }

  void main() {
    vec2 res = uResolution;
    vec2 uv = (vUv * res - 0.5 * res) / res.y;  // centered, aspect-correct
    vec2 uv01 = vUv;

    float t = uTime;

    // ===== 1. PLASMA FLOW (the deep background) =====
    float n = flow(uv * 1.4 + vec2(0.0, t * 0.04), t);
    float n2 = flow(uv * 2.6 - vec2(t * 0.03, 0.0), t * 1.3);

    // Color palette
    vec3 RED       = vec3(1.00, 0.10, 0.08);   // RED Dragon body
    vec3 EMBER     = vec3(1.00, 0.35, 0.10);   // tungsten warm
    vec3 CYAN      = vec3(0.10, 0.65, 1.00);   // AI signal
    vec3 ELECTRIC  = vec3(0.55, 0.20, 1.00);   // magenta-electric
    vec3 INK       = vec3(0.02, 0.01, 0.03);   // base black-violet

    // Build the moving plasma
    vec3 col = INK;
    col = mix(col, RED      * 0.55, smoothstep(-0.1, 0.6, n));
    col = mix(col, CYAN     * 0.45, smoothstep( 0.2, 0.9, n2));
    col = mix(col, ELECTRIC * 0.30, smoothstep( 0.5, 1.0, n * n2));
    col += EMBER * 0.05 * (n + 0.2);

    // ===== 2. NEURAL MESH (subtle grid of glowing nodes) =====
    vec2 grid = fract(uv * 6.0 + vec2(t * 0.02, -t * 0.015)) - 0.5;
    float node = exp(-dot(grid, grid) * 60.0);
    float nodeMask = smoothstep(0.2, 0.9, flow(uv * 3.0, t * 0.5));
    col += node * nodeMask * mix(CYAN, ELECTRIC, 0.5) * 0.6;

    // Connection lines between nodes (very faint)
    float lineX = pulse(fract(uv.x * 6.0 + t * 0.02), 0.5, 0.02);
    float lineY = pulse(fract(uv.y * 6.0 - t * 0.015), 0.5, 0.02);
    col += (lineX + lineY) * nodeMask * CYAN * 0.04;

    // ===== 3. CAMERA APERTURE (RED Dragon iris) =====
    // Slow rotation
    float rot = t * 0.08;
    vec2 pAp = vec2(cos(rot) * uv.x - sin(rot) * uv.y,
                    sin(rot) * uv.x + cos(rot) * uv.y);
    vec2 ap = aperture(pAp, t);

    // Outer iris ring — bright red rim
    col += ap.x * RED * 1.4;
    col += ap.x * EMBER * 0.5;

    // Inner aperture: dark with red glow leaking from edges
    float irisR = length(uv);
    float irisGlow = smoothstep(0.42, 0.52, irisR) * (1.0 - ap.y);
    col += irisGlow * RED * 0.6;
    col = mix(col, INK * 0.5, ap.y * 0.85); // darken inside iris

    // Lens hotspot center
    float hotspot = exp(-irisR * irisR * 14.0);
    col += hotspot * RED * 0.4;
    col += hotspot * EMBER * 0.25;

    // ===== 4. NEON HORIZONTAL STREAKS (anamorphic flares) =====
    col += streak(uv, t, 0.45,  0.20, 0.018) * CYAN     * 1.2;
    col += streak(uv, t, 0.32, -0.15, 0.022) * ELECTRIC * 1.0;
    col += streak(uv, t, 0.58,  0.35, 0.012) * RED      * 0.8;
    col += streak(uv, t, 0.27, -0.30, 0.020) * EMBER    * 0.7;

    // ===== 5. DATA SCAN LINE (AI signal) =====
    float scanY = mod(t * 0.18, 1.6) - 0.8;
    float scan = exp(-abs(uv.y - scanY) * 80.0);
    col += scan * CYAN * 0.5;

    // ===== 6. POST PROCESS =====
    // Vignette
    float vig = smoothstep(1.2, 0.3, length(uv));
    col *= vig;

    // Film grain
    float grain = (fract(sin(dot(uv01 * res, vec2(12.9898, 78.233)) + t) * 43758.5453) - 0.5) * 0.06;
    col += grain;

    // Subtle chromatic exposure curve
    col = col / (1.0 + col * 0.4);   // tonemap
    col = pow(col, vec3(0.92));      // gamma lift

    // Edge fade to pure black so it composes onto bg-black
    float edgeFade = smoothstep(0.0, 0.08, uv01.x) *
                     smoothstep(1.0, 0.92, uv01.x) *
                     smoothstep(0.0, 0.06, uv01.y) *
                     smoothstep(1.0, 0.94, uv01.y);
    col *= mix(0.65, 1.0, edgeFade);

    gl_FragColor = vec4(col, 1.0);
  }
`

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  )

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    matRef.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height,
    )
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
