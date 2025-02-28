'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot } from 'lucide-react'

const DocConnection = () => {
  // Animation frame reference
  const animationFrameId = useRef(null)
  const lastConnectionTime = useRef(0)
  
  // State - simplified to just patients and one selected patient
  const [state, setState] = useState({
    patients: [],
    selectedPatientId: null,
    previousPatientId: null,
    connectionStrength: 0,
    isTransitioning: false
  })
  
  // Initialize
  useEffect(() => {
    // Set up patients once
    initializePatients()
    
    // Animation loop
    const animate = (timestamp) => {
      // Change connected patient periodically
      if (timestamp - lastConnectionTime.current > 3000) {
        selectRandomPatient()
        lastConnectionTime.current = timestamp
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
          ringLevel: ring
        })
      }
    }
    
    // Initial random patient selection
    const randomIndex = Math.floor(Math.random() * newPatients.length)
    const selectedPatientId = newPatients[randomIndex].id
    
    setState(prev => ({
      ...prev,
      patients: newPatients,
      selectedPatientId,
      connectionStrength: 0
    }))
  }
  
  // Select a random patient to connect to
  const selectRandomPatient = () => {
    setState(prev => {
      const { patients, selectedPatientId } = prev
      
      // Store current patient as previous
      const previousPatientId = selectedPatientId
      
      // Find a different patient than the current one
      let newSelectedPatientId = previousPatientId
      while (newSelectedPatientId === previousPatientId && patients.length > 1) {
        const randomIndex = Math.floor(Math.random() * patients.length)
        newSelectedPatientId = patients[randomIndex].id
      }
      
      return {
        ...prev,
        selectedPatientId: newSelectedPatientId,
        previousPatientId,
        connectionStrength: 0,
        isTransitioning: true
      }
    })
  }
  
  // Helper function to calculate connection endpoint at circle edge
  const calculateConnectionEndpoint = (patientX, patientY, progress) => {
    // Calculate distance from center to patient
    const distance = Math.sqrt(patientX * patientX + patientY * patientY)
    
    // Calculate circle radius (same formula as in render)
    const circleRadius = 13 + (4 * progress)
    
    // Calculate the unit vector from center to patient
    const unitX = patientX / distance
    const unitY = patientY / distance
    
    // Calculate the endpoint (patient position minus the circle radius in the direction of the center)
    const endX = patientX - (unitX * circleRadius)
    const endY = patientY - (unitY * circleRadius)
    
    return { x: endX * progress, y: endY * progress }
  }
  
  // Update animation for movement and connection
  const updateAnimation = (timestamp) => {
    setState(prev => {
      const { patients, selectedPatientId, previousPatientId, connectionStrength, isTransitioning } = prev
      
      // Update patients
      const updatedPatients = patients.map(patient => {
        // Determine illumination state
        let newIllumination = 0
        
        // Only illuminate the selected patient
        if (patient.id === selectedPatientId) {
          newIllumination = connectionStrength
        } else if (isTransitioning && patient.id === previousPatientId) {
          // Fade out previous patient
          newIllumination = Math.max(0, 1 - connectionStrength)
        }
        
        // Add subtle movement
        return {
          ...patient,
          illuminated: newIllumination,
          x: patient.x + Math.sin(timestamp * 0.0005 + parseInt(patient.id.split('-')[2])) * 0.1,
          y: patient.y + Math.cos(timestamp * 0.0005 + parseInt(patient.id.split('-')[2])) * 0.1
        }
      })
      
      // Update connection strength (animate up to 1)
      const newConnectionStrength = Math.min(1, connectionStrength + 0.03)
      const newIsTransitioning = newConnectionStrength < 1
      
      return {
        patients: updatedPatients,
        selectedPatientId,
        previousPatientId,
        connectionStrength: newConnectionStrength,
        isTransitioning: newIsTransitioning
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
    
    // Parse RGB values
    const darkRGB = dark.match(/\d+/g).map(Number)
    const lightRGB = light.match(/\d+/g).map(Number)
    
    // Interpolate between dark and light colors
    const interpolatedRGB = darkRGB.map((value, index) => {
      return Math.round(value + (lightRGB[index] - value) * illuminated)
    })
    
    return `rgb(${interpolatedRGB.join(', ')})`
  }
  
  const { patients, selectedPatientId, previousPatientId, connectionStrength, isTransitioning } = state
  
  // Find the selected and previous patients
  const selectedPatient = patients.find(p => p.id === selectedPatientId)
  const previousPatient = isTransitioning ? patients.find(p => p.id === previousPatientId) : null
  
  // Calculate connection endpoints
  const selectedEndpoint = selectedPatient ? 
    calculateConnectionEndpoint(selectedPatient.x, selectedPatient.y, connectionStrength) : 
    { x: 0, y: 0 }
    
  const previousEndpoint = previousPatient ? 
    calculateConnectionEndpoint(previousPatient.x, previousPatient.y, 1 - connectionStrength) : 
    { x: 0, y: 0 }
  
  return (
    <div className="w-full max-w-xl mx-auto aspect-square">
      <svg 
        viewBox="-220 -220 440 440"
        className="w-full h-full rounded-3xl bg-black"
      >
        {/* Previous connection (fading out) */}
        {previousPatient && isTransitioning && (
          <g key={`connection-prev-${previousPatient.id}`} opacity={1 - connectionStrength} className="transition-opacity duration-300">
            <path
              d={`M0,0 Q${previousPatient.x * 0.5 + previousPatient.y * 0.05},${previousPatient.y * 0.5 - previousPatient.x * 0.05} ${previousEndpoint.x},${previousEndpoint.y}`}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeOpacity="0.8"
              fill="none"
            />
          </g>
        )}
        
        {/* Current connection (fading in) */}
        {selectedPatient && (
          <g key={`connection-${selectedPatient.id}`} opacity={connectionStrength} className="transition-opacity duration-300">
            <path
              d={`M0,0 Q${selectedPatient.x * 0.5 + selectedPatient.y * 0.05},${selectedPatient.y * 0.5 - selectedPatient.x * 0.05} ${selectedEndpoint.x},${selectedEndpoint.y}`}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeOpacity="0.8"
              fill="none"
            />
          </g>
        )}
        
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

export default DocConnection