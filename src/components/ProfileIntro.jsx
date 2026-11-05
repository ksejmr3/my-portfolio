import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { fragmentShader, vertexShader } from './profilePageCurlShaders.js'

export default function ProfileIntro() {
  const portraitRef = useRef(null)
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const container = portraitRef.current
    const image = container?.querySelector('img')
    if (!container || !image) return undefined
    const originalInlinePosition = container.style.position
    const setPositioningContext = getComputedStyle(container).position === 'static'
    if (setPositioningContext) container.style.position = 'relative'

    let renderer
    let texture
    let geometry
    let material
    let mesh
    let resizeObserver
    let disposed = false
    let shaderFailed = false
    let readyFrame = 0

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
        shaderFailed = true
        const diagnostics = [gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment), gl.getProgramInfoLog(program)].filter(Boolean).join('\n')
        console.error('PROFILE Page Curl shader compilation failed.', diagnostics)
      }
      renderer.domElement.className = 'profile-intro__canvas'
      renderer.domElement.setAttribute('aria-hidden', 'true')

      const uniforms = {
        uTexture: { value: null },
        uImageSize: { value: new THREE.Vector2(1, 1) },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
        uPad: { value: new THREE.Vector2(0.25, 0.25) },
        uProgress: { value: 0 },
      }

      geometry = new THREE.PlaneGeometry(2, 2)
      material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true })
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      container.appendChild(renderer.domElement)

      const render = () => {
        if (!disposed) renderer.render(scene, camera)
      }
      const handleCurlProgress = (event) => {
        uniforms.uProgress.value = THREE.MathUtils.clamp(Number(event.detail) || 0, 0, 1)
        render()
      }
      const resize = () => {
        if (disposed) return
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width * 2, height * 2, false)
        uniforms.uPlaneSize.value.set(width, height)
        render()
      }
      const showCanvas = () => {
        if (disposed || !uniforms.uTexture.value) return
        render()
        readyFrame = requestAnimationFrame(() => {
          if (!disposed && !shaderFailed) setWebglReady(true)
        })
      }

      texture = new THREE.TextureLoader().load(image.currentSrc || image.src, (loadedTexture) => {
        if (disposed) return loadedTexture.dispose()
        loadedTexture.colorSpace = THREE.SRGBColorSpace
        loadedTexture.minFilter = THREE.LinearFilter
        loadedTexture.magFilter = THREE.LinearFilter
        loadedTexture.generateMipmaps = false
        uniforms.uTexture.value = loadedTexture
        uniforms.uImageSize.value.set(loadedTexture.image.width, loadedTexture.image.height)
        resize()
        showCanvas()
      }, undefined, () => setWebglReady(false))

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      window.addEventListener('resize', resize)
      container.addEventListener('profilecurlprogress', handleCurlProgress)

      return () => {
        disposed = true
        cancelAnimationFrame(readyFrame)
        resizeObserver.disconnect()
        window.removeEventListener('resize', resize)
        container.removeEventListener('profilecurlprogress', handleCurlProgress)
        scene.remove(mesh)
        texture?.dispose()
        geometry?.dispose()
        material?.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
        setWebglReady(false)
        if (setPositioningContext) container.style.position = originalInlinePosition
      }
    } catch (error) {
      console.error('PROFILE WebGL preview could not be initialized.', error)
      renderer?.dispose()
      renderer?.forceContextLoss()
      renderer?.domElement.remove()
      if (setPositioningContext) container.style.position = originalInlinePosition
      return undefined
    }
  }, [])

  return (
    <section className="profile-intro" aria-labelledby="profile-intro-title">
      <div className="profile-intro__layout">
        <figure className={`profile-intro__portrait${webglReady ? ' is-webgl-ready' : ''}`} ref={portraitRef}>
          <img src="/images/profile/profile-portrait.jpg.jpg" crossOrigin="anonymous" alt="김지영 프로필 사진" />
        </figure>
        <div className="profile-intro__content">
          <p className="profile-intro__meta">PROFILE INTRO / 2026</p>
          <h2 id="profile-intro-title">KIM<br />JIYOUNG</h2>
          <p className="profile-intro__roles">WEB DESIGNER<span>UI/UX DESIGN</span></p>
          <p className="profile-intro__summary">브랜드의 맥락과 사용 흐름을 구조화하고,<br />디자인을 실제 웹 화면으로 구현하는 웹디자이너입니다.</p>
        </div>
      </div>
    </section>
  )
}
