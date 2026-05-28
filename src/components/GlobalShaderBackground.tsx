import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────
//  Full-page fixed cinematic shader background
//  Red Dragon · AI Electric · Neon Plasma
// ─────────────────────────────────────────────

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
  uniform float uScroll;   // 0 = top, 1 = bottom

  // ── Simplex 2D noise (Ashima) ─────────────────────────────
  vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
  vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.,i1.y,1.)) + i.x + vec3(0.,i1.x,1.));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x2 = 2.*fract(p*C.www) - 1.;
    vec3 h  = abs(x2) - 0.5;
    vec3 ox = floor(x2 + 0.5);
    vec3 a0 = x2 - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x *x0.x  + h.x *x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.*dot(m,g);
  }

  float fbm(vec2 p){
    float v=0.; float a=0.5;
    for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.; a*=0.5; }
    return v;
  }

  float flow(vec2 p, float t){
    vec2 q = vec2(fbm(p            ), fbm(p + vec2(5.2,1.3)));
    vec2 r = vec2(fbm(p+2.5*q+vec2(1.7,9.2)+0.15*t),
                  fbm(p+2.5*q+vec2(8.3,2.8)+0.126*t));
    return fbm(p + 3.*r);
  }

  float pulse(float x, float c, float w){
    return smoothstep(c-w,c,x) - smoothstep(c,c+w,x);
  }

  // Anamorphic horizontal light streak
  float streak(vec2 p, float t, float speed, float y0, float thick){
    float travel = mod(t*speed, 4.) - 2.;
    return exp(-abs(p.y-y0)/thick) * exp(-abs(p.x-travel)*1.2);
  }

  // 16-blade camera aperture
  vec2 aperture(vec2 p, float t){
    float r = length(p);
    float a = atan(p.y, p.x);
    float open = 0.42 + 0.04*sin(t*0.35);
    float blades = cos(a*16. - t*0.15)*0.5 + 0.5;
    float bladeEdge = open + blades*0.012;
    float outer = smoothstep(0.58,0.56,r)*smoothstep(0.54,0.56,r);
    float ticks = smoothstep(0.97,1.,
      cos(a*64.-t*0.4)*smoothstep(0.555,0.545,r)*smoothstep(0.535,0.545,r));
    float inner = smoothstep(bladeEdge+0.02, bladeEdge, r);
    return vec2(outer + ticks*0.8, inner);
  }

  // Circuit / data-grid lines for mid-page
  float circuitGrid(vec2 p, float t, float density){
    vec2 g = fract(p*density) - 0.5;
    float hLine = smoothstep(0.48, 0.45, abs(g.y));
    float vLine = smoothstep(0.48, 0.45, abs(g.x));
    float anim = 0.5 + 0.5*sin(p.x*density*6.28 - t*0.9);
    return (hLine + vLine) * anim;
  }

  // Horizontal scan sweep
  float scanSweep(vec2 p, float t, float speed){
    float y = mod(t*speed, 2.2) - 1.1;
    return exp(-abs(p.y - y)*70.);
  }

  // ── Rose-window kaleidoscope helpers ─────────────────────
  float cellRand(float seg, float ring){
    return fract(sin(seg * 12.9898 + ring * 78.233) * 43758.5453);
  }

  // Stained-glass rose window: concentric rings of mirrored
  // petal cells separated by black leading. Each cell is colored
  // from a cathedral triad (cobalt, ruby, violet) chosen via a
  // per-cell hash so the pattern reads as random glass panes.
  vec3 roseWindow(vec2 p, float t){
    // Slow anticlockwise rotation of the whole window
    float rotation = -t * 0.045;
    float cs = cos(rotation);
    float sn = sin(rotation);
    vec2 rp = vec2(cs*p.x - sn*p.y, sn*p.x + cs*p.y);

    float r = length(rp);
    float a = atan(rp.y, rp.x);

    // Ring layout — segment count grows with radius
    float ringIdx, segments, rInner, rOuter, rCenter;
    if (r < 0.10) {
      ringIdx = 0.0; segments = 12.0;
      rInner = 0.00; rOuter = 0.10; rCenter = 0.05;
    } else if (r < 0.28) {
      ringIdx = 1.0; segments = 16.0;
      rInner = 0.10; rOuter = 0.28; rCenter = 0.19;
    } else if (r < 0.52) {
      ringIdx = 2.0; segments = 20.0;
      rInner = 0.28; rOuter = 0.52; rCenter = 0.40;
    } else if (r < 0.82) {
      ringIdx = 3.0; segments = 24.0;
      rInner = 0.52; rOuter = 0.82; rCenter = 0.67;
    } else {
      ringIdx = 4.0; segments = 30.0;
      rInner = 0.82; rOuter = 1.30; rCenter = 1.06;
    }
    float ringWidth = rOuter - rInner;

    // Angular folding into one cell of the current ring
    float seg = 6.28318530718 / segments;
    float aOfs = mod(a + seg*0.5, seg) - seg*0.5;
    float segIdx = floor((a + 3.14159265) / seg);

    // Petal coordinate — angular and radial offset from cell center
    float aw = aOfs * r;
    float rw = (r - rCenter) / max(ringWidth, 0.001);
    float petalD = length(vec2(aw * 1.6, rw * 0.55));

    // Black leading lines — thicken near cell boundaries
    float angRatio = abs(aOfs) / (seg * 0.5);     // 0 at cell center, 1 at boundary
    float radRatio = abs(r - rCenter) / (ringWidth * 0.5);
    float angEdge = smoothstep(0.55, 0.95, angRatio);
    float radEdge = smoothstep(0.60, 0.95, radRatio);
    float leading = max(angEdge, radEdge);

    // Per-cell color from the cathedral triad
    float h = cellRand(segIdx, ringIdx);
    vec3 COBALT = vec3(0.15, 0.30, 0.95);
    vec3 RUBY   = vec3(0.92, 0.15, 0.28);
    vec3 VIOLET = vec3(0.62, 0.18, 0.92);
    vec3 c1 = mix(COBALT, RUBY,   smoothstep(0.0, 0.50, h));
    vec3 cellCol = mix(c1, VIOLET, smoothstep(0.50, 1.0, h));

    // Bright stained-glass glow within the cell
    float glow = exp(-petalD * petalD * 6.0);
    cellCol *= 0.40 + glow * 1.25;

    // Intra-cell glass texture (subtle fbm) for variation
    float tex = fbm(vec2(aOfs * 22.0, r * 17.0 + ringIdx * 7.0)) * 0.15;
    cellCol *= 1.0 + tex;

    // Apply black leading
    cellCol *= 1.0 - leading * 0.94;

    // Outer fade so the window edges blend into the plasma
    float windowMask = smoothstep(1.35, 0.85, r);
    cellCol *= windowMask;

    return cellCol;
  }

  void main(){
    vec2 res = uResolution;
    vec2 uv  = (vUv*res - 0.5*res)/res.y;
    vec2 uv01 = vUv;
    float t  = uTime;
    float s  = uScroll; // 0..1

    // ── Continuous, heavily overlapping phase envelopes ──────
    // Wide, gentle smoothsteps so palette and elements crossfade
    // gradually instead of switching on at fixed thresholds.
    float warm     = 1.0 - smoothstep(0.0, 0.75, s);        // 1 -> 0 across most of page
    float cool     = smoothstep(0.0, 0.85, s);              // 0 -> 1
    float midBias  = 4.0 * s * (1.0 - s);                   // bell curve, peak ~0.5
    float lateBias = smoothstep(0.35, 1.0, s);              // very gradual late ramp
    float apertureK = smoothstep(0.75, 0.0, s);             // iris fades very gradually across the first 75%

    // ── Shared plasma flow ────────────────────────────────────
    float n  = flow(uv*1.4 + vec2(0., t*0.04), t);
    float n2 = flow(uv*2.6 - vec2(t*0.03, 0.), t*1.3);
    float n3 = flow(uv*0.9 + vec2(t*0.02, t*0.015), t*0.7);

    // ── Palette ───────────────────────────────────────────────
    vec3 RED      = vec3(1.00, 0.10, 0.08);
    vec3 EMBER    = vec3(1.00, 0.35, 0.10);
    vec3 CYAN     = vec3(0.10, 0.65, 1.00);
    vec3 ELECTRIC = vec3(0.55, 0.20, 1.00);
    vec3 MAGENTA  = vec3(0.90, 0.15, 0.65);
    vec3 INK      = vec3(0.02, 0.01, 0.03);
    vec3 DEEP     = vec3(0.01, 0.02, 0.06);

    // Background tint slowly drifts from warm-ink to deep-violet ink
    vec3 baseInk = mix(INK, DEEP, smoothstep(0.0, 1.0, s));
    vec3 col = baseInk;

    // ── Continuous core plasma — every color present every-
    //     where, just at smoothly varying strengths ─────────────
    float redK      = mix(0.95, 0.30, smoothstep(0.0, 0.70, s));
    float emberK    = mix(0.90, 0.20, smoothstep(0.0, 0.75, s));
    float cyanK     = mix(0.55, 1.15, smoothstep(0.0, 0.80, s));
    float electricK = mix(0.30, 1.20, smoothstep(0.10, 0.95, s));
    float magentaK  = mix(0.00, 0.85, smoothstep(0.25, 0.95, s));

    col = mix(col, RED      * 0.55, smoothstep(-0.1, 0.6, n)  * redK);
    col = mix(col, EMBER    * 0.35, smoothstep( 0.0, 0.7, n3) * emberK * 0.5);
    col = mix(col, CYAN     * 0.45, smoothstep( 0.2, 0.9, n2) * cyanK);
    col = mix(col, ELECTRIC * 0.32, smoothstep( 0.5, 1.0, n*n2) * electricK);
    col = mix(col, MAGENTA  * 0.30, smoothstep( 0.3, 0.95, n*n3 + 0.1) * magentaK);
    col += EMBER * 0.05 * (n + 0.2) * emberK;

    // ── Aperture iris — smoothly fades out as you scroll ──────
    {
      float rot = t*0.08;
      vec2 pAp = vec2(cos(rot)*uv.x - sin(rot)*uv.y,
                      sin(rot)*uv.x + cos(rot)*uv.y);
      vec2 ap = aperture(pAp, t);
      col += ap.x * RED * 1.4  * apertureK;
      col += ap.x * EMBER*0.5  * apertureK;
      float irisR   = length(uv);
      float irisGlow = smoothstep(0.42,0.52,irisR)*(1.-ap.y);
      col += irisGlow * RED * 0.6 * apertureK;
      col  = mix(col, INK*0.5, ap.y*0.85*apertureK);
      col += exp(-irisR*irisR*14.)*(RED*0.4 + EMBER*0.25)*apertureK;
    }

    // ── Anamorphic neon streaks — palette drifts with scroll ──
    // Base 4 streaks always present, color slowly shifts.
    float streakIntensity = mix(0.9, 1.4, smoothstep(0.0, 1.0, s));
    col += streak(uv,t,0.45, 0.20,0.018) *
           mix(CYAN, ELECTRIC, cool*0.6)   * 1.0 * streakIntensity;
    col += streak(uv,t,0.32,-0.15,0.022) *
           mix(ELECTRIC, MAGENTA, lateBias*0.5) * 0.9 * streakIntensity;
    col += streak(uv,t,0.58, 0.35,0.012) *
           mix(RED, CYAN, cool*0.7)        * 0.75 * streakIntensity;
    col += streak(uv,t,0.27,-0.30,0.020) *
           mix(EMBER, ELECTRIC, cool*0.6)  * 0.65 * streakIntensity;
    // Two extra streaks emerge slowly mid-to-late
    col += streak(uv,t,0.70, 0.08,0.014) * MAGENTA  * 1.0 * midBias * 0.6;
    col += streak(uv,t,0.39,-0.42,0.016) * CYAN     * 0.9 * lateBias;

    // ── Neural mesh — strength peaks in the middle, never gates on ──
    {
      float meshK = mix(0.45, 1.0, midBias);
      float density = mix(4.5, 7.5, midBias);
      vec2 grid = fract(uv*density + vec2(t*0.018,-t*0.013)) - 0.5;
      float node = exp(-dot(grid,grid)*mix(55.,80.,midBias));
      float nodeMask = smoothstep(0.1,0.8, flow(uv*3.+vec2(t*0.02),t*0.5));
      vec3 nodeCol = mix(CYAN, ELECTRIC, 0.5 + 0.5*sin(t*0.4 + uv.x*2.));
      col += node * nodeMask * nodeCol * meshK;
      float lineX = pulse(fract(uv.x*density + t*0.018), 0.5, 0.025);
      float lineY = pulse(fract(uv.y*density - t*0.013), 0.5, 0.025);
      col += (lineX+lineY)*nodeMask*CYAN * mix(0.025, 0.07, midBias);
    }

    // ── Circuit grid — gradual continuous ramp ────────────────
    {
      float cgK = smoothstep(0.15, 0.85, s) * (1.0 - 0.4 * lateBias);
      float cg = circuitGrid(uv, t, mix(3.0, 4.5, cool));
      col += cg * mix(CYAN, ELECTRIC, 0.4) * 0.05 * cgK;
    }

    // ── Rose-window stained-glass kaleidoscope ──
    //     Multi-ring petal cells separated by black leading,
    //     painted in a cobalt / ruby / violet cathedral triad.
    //     Rotates slowly anticlockwise. Emerges gradually so the
    //     top → middle → bottom transition stays smooth.
    {
      float kK = smoothstep(0.35, 0.85, s);
      if (kK > 0.0001) {
        vec3 rose = roseWindow(uv * 1.45, t);

        // At full strength, rose dominates and partially blacks out
        // the plasma where the leading lines fall. Mix is weighted by
        // kK so the rose fades in gradually through the middle section.
        col = mix(col, col * 0.30 + rose * 1.40, kK);
      }
    }

    // ── Slow vortex — very gradual, gentle ────────────────────
    {
      float vK = smoothstep(0.55, 1.0, s);
      float vAngle = atan(uv.y, uv.x);
      float vR = length(uv);
      float vortex = sin(vAngle*3. - t*0.3 + vR*4.) * 0.5 + 0.5;
      vortex *= exp(-vR*vR*1.2);
      col += vortex * mix(MAGENTA, ELECTRIC, 0.5) * 0.22 * vK;
    }

    // ── AI scan line ───────────────────────────────────────────
    col += scanSweep(uv, t, 0.18) * CYAN * 0.45;

    // ── Post-process ───────────────────────────────────────────
    float vig = smoothstep(1.3, 0.25, length(uv));
    col *= vig;

    // Film grain
    float grain = (fract(sin(dot(uv01*res,vec2(12.9898,78.233))+t)*43758.5453)-0.5)*0.055;
    col += grain;

    col = col / (1.0 + col*0.4);
    col = pow(col, vec3(0.92));

    // Edge fade to compose onto html background
    float ef = smoothstep(0.,0.06,uv01.x)*smoothstep(1.,0.94,uv01.x)*
               smoothstep(0.,0.05,uv01.y)*smoothstep(1.,0.95,uv01.y);
    col *= mix(0.6, 1.0, ef);

    gl_FragColor = vec4(col, 1.0);
  }
`

function ShaderPlane({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScroll:     { value: 0 },
    }),
    [],
  )

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value       = state.clock.elapsedTime
    matRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height)
    // Smooth scroll lerp so the shader transition is never jarring
    const cur = matRef.current.uniforms.uScroll.value as number
    matRef.current.uniforms.uScroll.value = cur + (scrollRef.current - cur) * 0.04
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

export default function GlobalShaderBackground() {
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <ShaderPlane scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
