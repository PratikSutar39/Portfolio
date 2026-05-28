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

  void main(){
    vec2 res = uResolution;
    vec2 uv  = (vUv*res - 0.5*res)/res.y;
    vec2 uv01 = vUv;
    float t  = uTime;
    float s  = uScroll; // 0..1

    // ── Phase helpers ──────────────────────────────────────────
    float phase0 = 1. - smoothstep(0.0, 0.35, s);   // hero
    float phase1 = smoothstep(0.1, 0.4, s) * (1.-smoothstep(0.55, 0.75, s)); // mid
    float phase2 = smoothstep(0.6, 0.85, s);          // lower sections

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

    // ── Phase 0: Hero plasma + aperture (as before) ───────────
    vec3 col = mix(INK, DEEP, s);

    // Core plasma — always present, intensity modulated
    col = mix(col, RED   *0.55, smoothstep(-0.1,0.6,n)  * mix(1.,0.55,s));
    col = mix(col, CYAN  *0.45, smoothstep( 0.2,0.9,n2) * mix(0.8,1.2,s));
    col = mix(col, ELECTRIC*0.30, smoothstep(0.5,1.0,n*n2) * mix(0.7,1.4,s));
    col += EMBER*0.05*(n+0.2) * mix(1.,0.4,s);

    // ── Phase 0: Aperture iris ─────────────────────────────────
    if(phase0 > 0.01){
      float rot = t*0.08;
      vec2 pAp = vec2(cos(rot)*uv.x - sin(rot)*uv.y,
                      sin(rot)*uv.x + cos(rot)*uv.y);
      vec2 ap = aperture(pAp, t);
      col += ap.x * RED * 1.4  * phase0;
      col += ap.x * EMBER*0.5  * phase0;
      float irisR   = length(uv);
      float irisGlow = smoothstep(0.42,0.52,irisR)*(1.-ap.y);
      col += irisGlow * RED * 0.6 * phase0;
      col  = mix(col, INK*0.5, ap.y*0.85*phase0);
      col += exp(-irisR*irisR*14.)*(RED*0.4 + EMBER*0.25)*phase0;
    }

    // ── Phase 0+1: Anamorphic neon streaks ─────────────────────
    float streakIntensity = mix(1., 1.6, s);
    col += streak(uv,t,0.45, 0.20,0.018)*CYAN    *1.2*streakIntensity;
    col += streak(uv,t,0.32,-0.15,0.022)*ELECTRIC*1.0*streakIntensity;
    col += streak(uv,t,0.58, 0.35,0.012)*RED     *0.8*streakIntensity*(1.-phase2*0.4);
    col += streak(uv,t,0.27,-0.30,0.020)*EMBER   *0.7*streakIntensity;
    // Extra streaks that appear deeper in scroll
    col += streak(uv,t,0.70, 0.08,0.014)*MAGENTA *1.3*phase1;
    col += streak(uv,t,0.39,-0.42,0.016)*CYAN    *1.1*phase2;
    col += streak(uv,t,0.52, 0.52,0.010)*ELECTRIC*1.5*phase2;

    // ── Phase 1: Dense neural mesh ─────────────────────────────
    {
      float density = mix(4., 8., phase1);
      vec2 grid = fract(uv*density + vec2(t*0.018,-t*0.013)) - 0.5;
      float node = exp(-dot(grid,grid)*mix(50.,80.,phase1));
      float nodeMask = smoothstep(0.1,0.8, flow(uv*3.+vec2(t*0.02),t*0.5));
      vec3 nodeCol = mix(CYAN, ELECTRIC, 0.5 + 0.5*sin(t*0.4 + uv.x*2.));
      col += node * nodeMask * nodeCol * mix(0.5, 1.1, phase1);
      float lineX = pulse(fract(uv.x*density + t*0.018), 0.5, 0.025);
      float lineY = pulse(fract(uv.y*density - t*0.013), 0.5, 0.025);
      col += (lineX+lineY)*nodeMask*CYAN*mix(0.03,0.08,phase1);
    }

    // ── Phase 1→2: Circuit grid ────────────────────────────────
    if(phase1 > 0.02 || phase2 > 0.02){
      float cg = circuitGrid(uv, t, mix(3.,5.,phase2));
      col += cg * mix(CYAN,ELECTRIC,0.4) * 0.06 * max(phase1,phase2);
    }

    // ── Phase 2: Data streams — diagonal particle trails ───────
    if(phase2 > 0.02){
      for(int i=0;i<4;i++){
        float fi = float(i);
        vec2 dir = normalize(vec2(
          cos(fi*1.2 + 0.5),
          sin(fi*0.9 + 1.1)
        ));
        float proj = dot(uv, dir);
        float travel = mod(t*(0.3+fi*0.07) + fi*0.8, 3.) - 1.5;
        float dist   = abs(proj - travel);
        float perp   = length(uv - dir*proj);
        float beam   = exp(-dist*40.) * exp(-perp*perp*6.);
        vec3 beamCol = (mod(fi,2.)==0.) ? ELECTRIC : CYAN;
        col += beam * beamCol * 0.9 * phase2;
      }
    }

    // ── Phase 2: Big slow vortex ───────────────────────────────
    if(phase2 > 0.02){
      float vAngle = atan(uv.y, uv.x);
      float vR = length(uv);
      float vortex = sin(vAngle*3. - t*0.3 + vR*4.) * 0.5 + 0.5;
      vortex *= exp(-vR*vR*1.2);
      col += vortex * mix(MAGENTA, ELECTRIC, 0.5) * 0.35 * phase2;
    }

    // ── AI scan line ───────────────────────────────────────────
    col += scanSweep(uv, t, 0.18) * CYAN * 0.5;

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
