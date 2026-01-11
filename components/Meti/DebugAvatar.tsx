'use client'

import React, { useEffect, useImperativeHandle, forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { AvatarHandle } from './MetiAvatar'

const DebugAvatar = forwardRef<AvatarHandle, any>((props, ref) => {
  const { nodes, animations } = useGLTF('/models/meti_full.glb')

  useEffect(() => {
    console.group('🔍 METI GLB INSPECTOR')
    console.log('Nodes:', nodes ? Object.keys(nodes) : 'No nodes')
    console.log('Animations:', animations)
    console.groupEnd()
  }, [nodes, animations])

  // Mock implementation to prevent parent crashes
  useImperativeHandle(ref, () => ({
    speak: async (text: string) => { console.log('DebugAvatar speak:', text) },
    playAudioBlob: async (blob: Blob) => { console.log('DebugAvatar playAudioBlob') },
    stop: () => { console.log('DebugAvatar stop') }
  }))

  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  )
})

DebugAvatar.displayName = 'DebugAvatar'

export default DebugAvatar
