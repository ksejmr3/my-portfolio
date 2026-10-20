import {
  siCss,
  siFfmpeg,
  siFigma,
  siGit,
  siGithub,
  siGsap,
  siHtml5,
  siJavascript,
  siReact,
  siVercel,
  siVite,
} from 'simple-icons'

export const skillGroups = [
  { name: 'DESIGN', tools: ['Figma', 'Photoshop', 'Illustrator'] },
  { name: 'FRONTEND', tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite'] },
  { name: 'WORKFLOW', tools: ['Git', 'GitHub', 'VS Code', 'Vercel'] },
  { name: 'INTERACTION', tools: ['GSAP', 'ScrollTrigger'] },
  { name: 'AI TOOLS', tools: ['ChatGPT', 'Claude', 'Gemini', 'Dreamina'] },
  { name: 'VIDEO', tools: ['Premiere Pro', 'CapCut', 'FFmpeg'] },
]

// Larger cards anchor the cluster; cards gather in the center before descending.
export const skillIconCards = [
  { name: 'Figma', icon: siFigma, x: 54, y: 49, mobileX: 40, mobileY: 56, size: 136, mobileSize: 64, angle: -12, orbitXPercent: 47, midXPercent: 43, fallXPercent: 45, mobileOrbitXPercent: 42, mobileMidXPercent: 34, mobileFallXPercent: 24, turns: 1.38, orbitY: -0.015, orbitDriftY: 0.025, dropY: 0.31, exitDriftX: -3, midScale: 1.04, scale: 0.78 },
  { name: 'HTML', icon: siHtml5, x: 20, y: 53, mobileX: 14, mobileY: 59, size: 82, mobileSize: 42, angle: 9, orbitXPercent: 31, midXPercent: 24, fallXPercent: 11, mobileOrbitXPercent: 25, mobileMidXPercent: 17, mobileFallXPercent: 12, turns: -1.18, orbitY: 0.018, orbitDriftY: 0.045, dropY: 0.34, exitDriftX: -2, midScale: 0.92, scale: 0.76 },
  { name: 'CSS', icon: siCss, x: 72, y: 47, mobileX: 74, mobileY: 54, size: 112, mobileSize: 56, angle: -8, orbitXPercent: 68, midXPercent: 76, fallXPercent: 84, mobileOrbitXPercent: 73, mobileMidXPercent: 82, mobileFallXPercent: 87, turns: 1.46, orbitY: -0.005, orbitDriftY: 0.035, dropY: 0.3, exitDriftX: 2, midScale: 0.9, scale: 0.72 },
  { name: 'JavaScript', icon: siJavascript, x: 57, y: 58, mobileX: 59, mobileY: 64, size: 128, mobileSize: 60, angle: 7, orbitXPercent: 57, midXPercent: 65, fallXPercent: 65, mobileOrbitXPercent: 62, mobileMidXPercent: 68, mobileFallXPercent: 70, turns: -1.34, orbitY: 0.035, orbitDriftY: -0.015, dropY: 0.36, exitDriftX: 4, midScale: 1.08, scale: 0.76 },
  { name: 'React', icon: siReact, x: 35, y: 55, mobileX: 27, mobileY: 51, size: 92, mobileSize: 48, angle: 15, orbitXPercent: 40, midXPercent: 32, fallXPercent: 22, mobileOrbitXPercent: 34, mobileMidXPercent: 23, mobileFallXPercent: 13, turns: 1.62, orbitY: 0.012, orbitDriftY: -0.035, dropY: 0.32, exitDriftX: -4, midScale: 0.84, scale: 0.7 },
  { name: 'Vite', icon: siVite, x: 81, y: 55, mobileX: 88, mobileY: 54, size: 72, mobileSize: 38, angle: -7, orbitXPercent: 77, midXPercent: 85, fallXPercent: 91, mobileOrbitXPercent: 83, mobileMidXPercent: 91, mobileFallXPercent: 88, turns: -1.42, orbitY: 0.025, orbitDriftY: 0.02, dropY: 0.35, exitDriftX: 3, midScale: 1.04, scale: 0.72 },
  { name: 'Git', icon: siGit, x: 17, y: 48, mobileX: 9, mobileY: 57, size: 68, mobileSize: 36, angle: -17, orbitXPercent: 24, midXPercent: 18, fallXPercent: 12, mobileOrbitXPercent: 19, mobileMidXPercent: 12, mobileFallXPercent: 8, turns: 1.24, orbitY: -0.025, orbitDriftY: 0.035, dropY: 0.29, exitDriftX: -3, midScale: 0.88, scale: 0.72 },
  { name: 'GitHub', icon: siGithub, x: 78, y: 60, mobileX: 52, mobileY: 61, size: 104, mobileSize: 52, angle: 11, orbitXPercent: 64, midXPercent: 74, fallXPercent: 89, mobileOrbitXPercent: 69, mobileMidXPercent: 77, mobileFallXPercent: 74, turns: -1.55, orbitY: 0.04, orbitDriftY: 0.015, dropY: 0.38, exitDriftX: 5, midScale: 0.94, scale: 0.72 },
  { name: 'GSAP', icon: siGsap, x: 57, y: 61, mobileX: 37, mobileY: 65, size: 84, mobileSize: 44, angle: 14, orbitXPercent: 50, midXPercent: 49, fallXPercent: 50, mobileOrbitXPercent: 48, mobileMidXPercent: 40, mobileFallXPercent: 22, turns: 1.32, orbitY: 0.055, orbitDriftY: -0.025, dropY: 0.4, exitDriftX: -1, midScale: 1.08, scale: 0.78 },
  { name: 'Vercel', icon: siVercel, x: 85, y: 51, mobileX: 92, mobileY: 59, size: 64, mobileSize: 34, angle: 6, orbitXPercent: 81, midXPercent: 89, fallXPercent: 91, mobileOrbitXPercent: 88, mobileMidXPercent: 94, mobileFallXPercent: 90, turns: -1.28, orbitY: 0.005, orbitDriftY: 0.04, dropY: 0.33, exitDriftX: 2, midScale: 0.88, scale: 0.7 },
  { name: 'FFmpeg', icon: siFfmpeg, x: 29, y: 62, mobileX: 20, mobileY: 66, size: 70, mobileSize: 36, angle: -9, orbitXPercent: 35, midXPercent: 27, fallXPercent: 18, mobileOrbitXPercent: 29, mobileMidXPercent: 18, mobileFallXPercent: 8, turns: 1.5, orbitY: 0.065, orbitDriftY: -0.035, dropY: 0.42, exitDriftX: -4, midScale: 0.94, scale: 0.7 },
]
