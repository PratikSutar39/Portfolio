import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Global 3D background: a stylized RED Dragon cinema camera floating
 * in deep space. Scroll progress drives a graceful dismantling — each
 * part flies outward along its own vector and tumbles. Scrolling back
 * up reassembles the camera. Palette is monochrome graphite with soft
 * cyan rim accents — no harsh red.
 */

type PartDef = {
  geom: 'box' | 'cyl'
  args: number[]
  pos: [number, number, number]
  rot?: [number, number, number]
  dir: [number, number, number]
  tumble: [number, number, number]
  color?: string
  metalness?: number
  roughness?: number
  emissive?: string
  emissiveIntensity?: number
}

// ----- Camera blueprint (centered at origin) -----
const PARTS: PartDef[] = [
  // Main body — dark anodized aluminum
  { geom: 'box', args: [1.5, 1.3, 1.6], pos: [0, 0, 0],
    dir: [-0.2, -0.4, -0.5], tumble: [0.35, 0.25, 0.15], color: '#1c1c20' },

  // Top handle bracket — left leg
  { geom: 'box', args: [0.1, 0.4, 0.25], pos: [-0.55, 0.85, 0],
    dir: [-0.6, 0.6, 0.0], tumble: [0.3, 0.4, 0.5], color: '#26262a' },
  // Top handle bracket — right leg
  { geom: 'box', args: [0.1, 0.4, 0.25], pos: [0.55, 0.85, 0],
    dir: [0.6, 0.6, 0.0], tumble: [0.4, 0.3, 0.5], color: '#26262a' },
  // Handle bar
  { geom: 'box', args: [1.4, 0.12, 0.22], pos: [0, 1.1, 0],
    dir: [0.0, 1.0, 0.05], tumble: [0.2, 0.3, 0.6], color: '#2e2e32' },

  // Lens mount collar
  { geom: 'cyl', args: [0.5, 0.5, 0.08, 32], pos: [0, -0.05, 0.85],
    rot: [Math.PI / 2, 0, 0],
    dir: [0.2, -0.05, 0.3], tumble: [0.4, 0.4, 0.3], color: '#36363c' },
  // Lens housing barrel
  { geom: 'cyl', args: [0.42, 0.42, 0.9, 32], pos: [0, -0.05, 1.2],
    rot: [Math.PI / 2, 0, 0],
    dir: [0.05, 0.3, 0.6], tumble: [0.5, 0.3, 0.4], color: '#28282d' },
  // Focus ring (slightly larger)
  { geom: 'cyl', args: [0.46, 0.46, 0.15, 32], pos: [0, -0.05, 1.45],
    rot: [Math.PI / 2, 0, 0],
    dir: [-0.1, 0.4, 0.5], tumble: [0.3, 0.5, 0.4], color: '#34343a' },
  // Lens front bezel
  { geom: 'cyl', args: [0.48, 0.48, 0.12, 32], pos: [0, -0.05, 1.7],
    rot: [Math.PI / 2, 0, 0],
    dir: [0.15, 0.2, 0.6], tumble: [0.6, 0.2, 0.5], color: '#18181c' },
  // Lens glass — glossy disc
  { geom: 'cyl', args: [0.42, 0.42, 0.04, 32], pos: [0, -0.05, 1.78],
    rot: [Math.PI / 2, 0, 0],
    dir: [0.2, 0.25, 0.7], tumble: [0.5, 0.3, 0.5],
    color: '#0a0a14', metalness: 0.95, roughness: 0.1 },

  // Side rosette mount — left
  { geom: 'cyl', args: [0.18, 0.18, 0.1, 20], pos: [-0.81, 0.15, 0.35],
    rot: [0, 0, Math.PI / 2],
    dir: [-1.0, 0.1, 0.2], tumble: [0.5, 0.3, 0.2], color: '#3a3a3e' },
  // Side rosette mount — right
  { geom: 'cyl', args: [0.18, 0.18, 0.1, 20], pos: [0.81, 0.15, 0.35],
    rot: [0, 0, Math.PI / 2],
    dir: [1.0, 0.1, 0.2], tumble: [0.3, 0.5, 0.4], color: '#3a3a3e' },

  // Rear screen — dark glossy panel
  { geom: 'box', args: [1.05, 0.75, 0.04], pos: [0, 0.05, -0.84],
    dir: [-0.1, 0.2, -1.0], tumble: [0.6, 0.3, 0.4],
    color: '#06060a', metalness: 0.7, roughness: 0.2 },
  // Media card slot
  { geom: 'box', args: [0.5, 0.35, 0.06], pos: [0.4, -0.5, -0.84],
    dir: [0.7, -0.4, -0.8], tumble: [0.4, 0.5, 0.3], color: '#1a1a1d' },

  // Top viewfinder block
  { geom: 'box', args: [0.45, 0.15, 0.3], pos: [-0.3, 0.74, -0.45],
    dir: [-0.4, 0.7, -0.3], tumble: [0.3, 0.4, 0.5], color: '#26262a' },

  // Baseplate
  { geom: 'box', args: [1.55, 0.06, 1.65], pos: [0, -0.71, 0],
    dir: [0.0, -1.0, 0.1], tumble: [0.2, 0.3, 0.4], color: '#1e1e22' },

  // ===== Cyan AI accents (the only colored light on the rig) =====
  // Tally / recording dot
  { geom: 'cyl', args: [0.05, 0.05, 0.03, 12], pos: [0.55, 0.55, 0.85],
    rot: [Math.PI / 2, 0, 0],
    dir: [0.8, 0.5, 0.6], tumble: [0.4, 0.5, 0.3],
    color: '#000', emissive: '#22d3ee', emissiveIntensity: 2.4 },
  // Side indicator strip
  { geom: 'box', args: [0.04, 0.1, 0.1], pos: [-0.78, 0.5, 0.7],
    dir: [-0.9, 0.5, 0.5], tumble: [0.5, 0.4, 0.3],
    color: '#000', emissive: '#0ea5e9', emissiveIntensity: 1.7 },
  // Status LED on rear
  { geom: 'cyl', args: [0.025, 0.025, 0.02, 10], pos: [-0.42, 0.32, -0.86],
    rot: [Math.PI / 2, 0, 0],
    dir: [-0.6, 0.4, -0.7], tumble: [0.4, 0.5, 0.3],
    color: '#000', emissive: '#7dd3fc', emissiveIntensity: 2.0 },
]

function smoothstep(x: number) {
  const c = Math.max(0, Math.min(1, x))
  return c * c * (3 - 2 * c)
}

function Part({
  def,
  scrollRef,
  distance,
}: {
  def: PartDef
  scrollRef: React.MutableRefObject<number>
  distance: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const target = useRef(0)

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh) return

    // Lerp displayed progress toward target so explosion stays smooth
    target.current += (smoothstep(scrollRef.current) - target.current) *
      Math.min(1, delta * 6)
    const p = target.current

    const [bx, by, bz] = def.pos
    const [dx, dy, dz] = def.dir
    mesh.position.set(
      bx + dx * p * distance,
      by + dy * p * distance,
      bz + dz * p * distance,
    )
    const [rx, ry, rz] = def.rot ?? [0, 0, 0]
    const [tx, ty, tz] = def.tumble
    mesh.rotation.set(
      rx + tx * p * 1.8,
      ry + ty * p * 1.8,
      rz + tz * p * 1.8,
    )
  })

  return (
    <mesh ref={ref} castShadow={false} receiveShadow={false}>
      {def.geom === 'box' ? (
        <boxGeometry args={def.args as [number, number, number]} />
      ) : (
        <cylinderGeometry
          args={def.args as [number, number, number, number]}
        />
      )}
      <meshStandardMaterial
        color={def.color ?? '#26262a'}
        metalness={def.metalness ?? 0.85}
        roughness={def.roughness ?? 0.42}
        emissive={def.emissive ?? '#000000'}
        emissiveIntensity={def.emissiveIntensity ?? 0}
      />
    </mesh>
  )
}

function CameraRig({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = scrollRef.current

    // Idle float + slow rotation; accentuates as you scroll
    g.rotation.y = -0.35 + Math.sin(t * 0.18) * 0.12 + p * 0.6
    g.rotation.x = 0.06 + Math.sin(t * 0.4) * 0.03
    g.position.y = -0.4 + Math.sin(t * 0.5) * 0.08 - p * 0.5
    g.position.z = -p * 0.8 // recedes slightly into space
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.06, -0.35, 0]}>
      {PARTS.map((def, i) => (
        <Part key={i} def={def} scrollRef={scrollRef} distance={4.0} />
      ))}
    </group>
  )
}

function StarField() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 450
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 6
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#9bd5f7"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

export default function SceneBackground() {
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
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7.5], fov: 36 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#06070b']} />
        <fog attach="fog" args={['#06070b', 8, 22]} />

        {/* Lighting — soft graphite with cool rim */}
        <ambientLight intensity={0.22} />
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.15}
          color="#f5f5f8"
        />
        <pointLight position={[-3, 1.5, 4]} intensity={0.85} color="#22d3ee" />
        <pointLight position={[3, -2, -2]} intensity={0.45} color="#a5b4fc" />
        <pointLight position={[0, 3, -4]} intensity={0.35} color="#ffffff" />

        <CameraRig scrollRef={scrollRef} />
        <StarField />
      </Canvas>

      {/* Soft edge vignette so content sections read cleanly */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}
