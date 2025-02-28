'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot } from 'lucide-react'

const DigitalEmpathyVisualization = () => {
  // Animation frame reference
  const animationFrameId = useRef(null)
  const lastHeartbeatTime = useRef(0)
  
  // State - combined waves and patients into single state update
  const [state, setState] = useState({
    waves: [],
    patients: [],
    activeConnections: 0
  })
  
  // Initialize
  useEffect(() => {
    // Set up patients once
    initializePatients()
    
    // Animation loop
    const animate = (timestamp) => {
      // Create heartbeat pattern
      if (timestamp - lastHeartbeatTime.current > 2000) {
        emitWaves(timestamp)
        lastHeartbeatTime.current = timestamp
      }
      
      // Update animation state
      updateAnimation(timestamp)
      
      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animationFrameId.current = requestAnimationFrame(animate)
    
    // Cleanup
    return () => animationFrameId.current && cancelAnimationFrame(animationFrameId.current)
  }, [])
  
  // Create patient positions
  const initializePatients = () => {
    const newPatients = []
    const ringCount = 3
    
    for (let ring = 0; ring < ringCount; ring++) {
      const distance = (70 + ring * 40) * 0.95
      const patientCount = Math.round((8 + ring * 3) * 0.6)
      const angleOffset = ring * (Math.PI / patientCount / 2.5)
      
      for (let i = 0; i < patientCount; i++) {
        const angle = (i * 2 * Math.PI / patientCount) + angleOffset
        const distanceVariance = distance * (1 + (Math.random() * 0.06 - 0.03))
        
        newPatients.push({
          id: `patient-${ring}-${i}`,
          x: distanceVariance * Math.cos(angle),
          y: distanceVariance * Math.sin(angle),
          distance: distanceVariance,
          illuminated: 0,
          lastIlluminated: 0,
          ringLevel: ring
        })
      }
    }
    
    setState(prev => ({ ...prev, patients: newPatients }))
  }
  
  // Emit both waves in sequence
  const emitWaves = (timestamp) => {
    setState(prev => ({
      ...prev,
      waves: [
        ...prev.waves,
        { id: `wave-${Date.now()}-1`, radius: 0, timestamp, variance: 0.95 },
        { id: `wave-${Date.now()}-2`, radius: 0, timestamp: timestamp + 300, variance: 1.05 }
      ]
    }))
  }
  
  // Combined update function for all animation elements
  const updateAnimation = (timestamp) => {
    setState(prev => {
      // Update waves
      const updatedWaves = prev.waves
        .map(wave => ({
          ...wave,
          radius: (timestamp - wave.timestamp) * 0.08 * wave.variance,
          opacity: Math.max(0, 0.8 - (timestamp - wave.timestamp) * 0.0003)
        }))
        .filter(wave => wave.opacity > 0)
      
      // Update patients
      const updatedPatients = prev.patients.map(patient => {
        // Check wave collision
        const nearbyWave = updatedWaves.find(wave => 
          Math.abs(wave.radius - patient.distance) < 7
        )
        
        // Determine illumination state
        const now = timestamp
        const timeSinceIllumination = now - patient.lastIlluminated
        
        let newIllumination = patient.illuminated
        let newLastIlluminated = patient.lastIlluminated
        
        if (nearbyWave) {
          newIllumination = 1
          newLastIlluminated = now
        } else if (timeSinceIllumination < 800) {
          newIllumination = 1
        } else {
          newIllumination = Math.max(0, patient.illuminated - 0.04)
        }
        
        // Add subtle movement
        return {
          ...patient,
          illuminated: newIllumination,
          lastIlluminated: newLastIlluminated,
          x: patient.x + Math.sin(timestamp * 0.0005 + parseInt(patient.id.split('-')[2])) * 0.1,
          y: patient.y + Math.cos(timestamp * 0.0005 + parseInt(patient.id.split('-')[2])) * 0.1
        }
      })
      
      // Count active connections
      const activeConnectionsCount = updatedPatients.filter(p => p.illuminated > 0).length
      
      return {
        waves: updatedWaves,
        patients: updatedPatients,
        activeConnections: activeConnectionsCount
      }
    })
  }
  
  // Get patient color based on illumination and ring level
  const getPatientColor = (illuminated, ringLevel) => {
    // Colors by ring level (dark to light)
    const colors = [
      ['rgb(107, 114, 128)', 'rgb(255, 255, 255)'],      // Ring 0
      ['rgb(100, 116, 139)', 'rgb(224, 242, 254)'],      // Ring 1
      ['rgb(113, 113, 122)', 'rgb(240, 249, 255)']       // Ring 2
    ]
    
    const [dark, light] = colors[ringLevel % colors.length]
    
    // Only calculate interpolation if needed
    if (illuminated <= 0) return dark
    if (illuminated >= 1) return light
    
    // Simple RGB interpolation for in-between values
    return `rgb(${
      colors[ringLevel % colors.length].map((color, i) => {
        const rgb = color.match(/\d+/g).map(Number)
        const targetRgb = i === 0 ? rgb : rgb
        const sourceRgb = i === 0 ? rgb : colors[0][1].match(/\d+/g).map(Number)
        
        // Only interpolate for light color
        return i === 1 
          ? rgb.map((v, j) => Math.round(sourceRgb[j] + (v - sourceRgb[j]) * illuminated))
          : rgb
      })[1].join(', ')
    })`
  }
  
  const { patients, activeConnections } = state
  
  return (
    <div className="w-full max-w-xl mx-auto aspect-square">
      <svg 
        viewBox="-220 -220 440 440"
        className="w-full h-full rounded-3xl bg-black"
      >
        {/* Main circle */}
        <circle
          cx="0"
          cy="0"
          r="210"
          // fill="rgba(56, 56, 56, 0.15)"
          // stroke="white"
          // strokeOpacity="0.3"
        />
        
        {/* Dimming overlay */}
        <circle
          cx="0"
          cy="0"
          r="210"
          fill="rgba(0, 0, 0, 0.5)"
          opacity={activeConnections > 0 ? 0.2 : 0}
          className="transition-opacity duration-500"
        />
        
        {/* Connection paths */}
        {patients.filter(p => p.illuminated > 0).map(patient => {
          const connectionProgress = Math.min(1, patient.illuminated * 1.5)
          const midX = patient.x * 0.5
          const midY = patient.y * 0.5
          const curveOffsetX = patient.y * 0.05
          const curveOffsetY = -patient.x * 0.05
          
          return (
            <g key={`connection-${patient.id}`} opacity={patient.illuminated} className="transition-opacity duration-500">
              <path
                d={`M0,0 Q${midX + curveOffsetX},${midY + curveOffsetY} ${patient.x * connectionProgress},${patient.y * connectionProgress}`}
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeOpacity="0.8"
                fill="none"
              />
              <circle 
                cx={patient.x}
                cy={patient.y}
                r="8"
                fill="#60A5FA"
                fillOpacity="0.3"
              />
            </g>
          )
        })}
        
        {/* Patient icons */}
        {patients.map(patient => {
          const color = getPatientColor(patient.illuminated, patient.ringLevel)
          const scale = 1 + 0.08 * patient.illuminated
          
          return (
            <g 
              key={patient.id}
              transform={`translate(${patient.x - 12}, ${patient.y - 12})`}
            >
              <circle 
                cx="12" 
                cy="12" 
                r={13 + (4 * patient.illuminated)}
                fill="rgba(59, 130, 246, 0.3)"
                opacity={patient.illuminated}
                className="transition-all duration-500"
              />
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: 'transform 0.5s'
                }}
              >
                <circle 
                  cx="12" 
                  cy="8" 
                  r="4" 
                  stroke={color} 
                  strokeWidth="2" 
                  className="transition-colors duration-500"
                />
                <path 
                  d="M20 21c0-4.418-3.582-8-8-8s-8 3.582-8 8" 
                  stroke={color} 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="transition-colors duration-500"
                />
              </svg>
            </g>
          )
        })}
        
        {/* Bot at center */}
        <g>
          {/* Outer glow */}
          <circle 
            cx="0" 
            cy="0" 
            r="32"
            fill="rgba(30, 64, 175, 0.5)" 
            opacity="0.8"
            filter="blur(3px)"
          />
          
          {/* Mid glow */}
          <circle 
            cx="0" 
            cy="0" 
            r="24"
            fill="#1E40AF" 
            opacity="0.7"
          />
          
          {/* Bot icon */}
          <foreignObject x="-18" y="-18" width="36" height="36">
            <Bot 
              color="#FFFFFF"
              size={36}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}

export default DigitalEmpathyVisualization