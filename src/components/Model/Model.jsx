import { useRef, useEffect, useState } from 'react'
import { Vector3 } from "three"
import { useFrame } from '@react-three/fiber'
import { useGLTF, useCubeTexture } from '@react-three/drei'


const Title = ({ nodes, shopPage }) => {

  useEffect(() => {
    const names = ["Sh", "U", "S2", "H", "I", "S3", "H2", "O", "P", "Login", "Store"]
    const intervals = []
    if (!shopPage)
      names.forEach((name, i) => {
        intervals[i] = setInterval(() => {
          nodes[name].position.setY(0)
        }, i * 150)
      })
    else
      names.slice().reverse().forEach((name, i) => {
        intervals[i] = setInterval(() => {
          nodes[name].position.setY(-10)
        }, i * 150)
      })
    return () => intervals.forEach(interval => clearInterval(interval))
  }, [shopPage, nodes])

  return (
    <>
      <primitive object={nodes.Sh} />
      <primitive object={nodes.U} />
      <primitive object={nodes.S2} />
      <primitive object={nodes.H} />
      <primitive object={nodes.I} />
      <primitive object={nodes.S3} />
      <primitive object={nodes.H2} />
      <primitive object={nodes.O} />
      <primitive object={nodes.P} />
    </>
  )
}


const Lights = ({ shopPage }) => {

  const smallLight1 = useRef()
  const smallLight2 = useRef()
  const yellowLight = useRef()
  const standLight = useRef()

  useFrame(({ clock }) => {
    if (!shopPage) {
      if (standLight.current.intensity < 10 && clock.elapsedTime > 3)
        standLight.current.intensity += 0.1
      if (yellowLight.current.intensity < 20 && clock.elapsedTime > 1)
        yellowLight.current.intensity += 0.1
      if (clock.elapsedTime > 2.25 && smallLight1.current.intensity < 1)
        smallLight1.current.intensity += 0.1
      if (clock.elapsedTime > 2.5 && smallLight2.current.intensity < 0.51)
        smallLight2.current.intensity += 0.1
    }
    else {
      standLight.current.intensity = 10
      if (yellowLight.current.intensity > 0)
        yellowLight.current.intensity -= 0.5
    }
  })

  return (
    <>

      <pointLight ref={smallLight1} color={0xFFBF84} distance={8} intensity={0} decay={2} position={[-6.5, 3.25, 1.8]} />
      <pointLight ref={smallLight2} color={0xFFBF84} distance={8} intensity={0} decay={2} position={[-4.5, 3.25, -0.3]} />
      <pointLight ref={yellowLight} color={0xFFA200} distance={6} intensity={0} decay={2} position={[0.4, 2.8, 0.4]} />
      <pointLight ref={standLight} color={0xFFB682} distance={8} intensity={0} decay={2} position={[3.4, 3.9, -7.5]} />

    </>
  )
}

const Controls = ({ shopPage }) => {

  const [camTarget, setcamTarget] = useState(new Vector3(0, 2.25, -1.25))
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  const handleMouseMove = (event) => {
    setMousePosition({ x: (event.pageX / window.innerWidth - 0.5) / 3, y: (event.pageY / window.innerHeight - 0.5) / 6 })
  }
  const handleDeviceOrientationMove = (event) => {
    setMousePosition({ x: ((event.gamma + 90) / 180 - 0.5) / 3, y: ((Math.abs(event.beta) + 40) / 180 - 0.5) / 3 })
  }


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientationMove)
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientationMove)
  }, [])

  useFrame(({ camera }) => {
    if (!shopPage) {
      if (mousePosition.x && mousePosition.y) {
        camera.position.x += mousePosition.x
        camera.position.y += mousePosition.y
      }
      camera.position.lerp(new Vector3(8.3, 2.8, 12.25), 0.04)
      setcamTarget(camTarget.lerp(new Vector3(0, 2.25, -1.25), 0.05))
    }
    else {
      camera.position.lerp(new Vector3(3.4, 3, 2.3), 0.04)
      setcamTarget(camTarget.lerp(new Vector3(3.4, 3, -10), 0.05))

    }
    camera.lookAt(camTarget)
  })
  return null
}


const Water = ({ geometry, material, shopPage }) => {

  const water = useRef()
  const envMap = useCubeTexture(
    ["nx.jpg", "nx.jpg", "nx.jpg", "nx.jpg", "nx.jpg", "nz.jpg"],
    { path: "./" })

  useEffect(() => {
    material.envMap = envMap
    material.envMapIntensity = 10
    material.transparent = true
    material.opacity = 0
  }, [material, envMap])

  useFrame(() => {
    if (!shopPage) {
      if (water.current.material.opacity < 1)
        water.current.material.opacity += 0.005
    }
  })
  return <mesh geometry={geometry} material={material} ref={water} />
}



const Model = ({ shopPage, onStoreButton }) => {

  const { nodes, materials } = useGLTF("./Shop.glb")

  return (
    <group dispose={null}>

      <Controls shopPage={shopPage} />
      <Title nodes={nodes} shopPage={shopPage} />
      <Lights nodes={nodes} shopPage={shopPage} />

      <primitive object={nodes.Login} />
      <primitive object={nodes.Store} onClick={onStoreButton} />


      <mesh geometry={nodes.Merged_1.geometry} material={materials.Floor} />
      <mesh geometry={nodes.Merged_2.geometry} material={materials.Wood2} />
      <mesh geometry={nodes.Merged_3.geometry} material={materials.Grass} />
      <mesh geometry={nodes.Merged_4.geometry} material={materials.Grey} />
      <mesh geometry={nodes.Merged_5.geometry} material={materials.Shingle} />
      <mesh geometry={nodes.Merged_6.geometry} material={materials.Window} />
      <mesh geometry={nodes.Merged_7.geometry} material={materials.Rock} />
      <mesh geometry={nodes.Merged_8.geometry} material={materials.Roof} />
      <mesh geometry={nodes.Merged_9.geometry} material={materials.Red} />
      <mesh geometry={nodes.Merged_10.geometry} material={materials.Wood} />
      <mesh geometry={nodes.Merged_11.geometry} material={materials.Gold} />
      <Water geometry={nodes.Merged_12.geometry} material={materials.Water} shopPage={shopPage} />
      <mesh geometry={nodes.Merged_13.geometry} material={materials.Water2} />

    </group>
  )
}

useGLTF.preload("/Shop.glb")
export default Model
