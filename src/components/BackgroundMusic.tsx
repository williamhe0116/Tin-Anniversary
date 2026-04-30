import { useState, useRef, useEffect } from 'react'
import { Music } from 'lucide-react'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {})
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/images/Cold_Coffee_Mornings.mp3"
        loop
        preload="auto"
      />

      {/* 播放时的光环效果 */}
      {isPlaying && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#E8B4B8]/30 animate-ping" />
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#E8B4B8]/20 animate-pulse" />
        </div>
      )}

      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isPlaying
            ? 'bg-gradient-to-br from-[#E8B4B8] to-[#d9a3a7] text-white'
            : 'bg-white text-[#7A7A7A]'
        } hover:scale-110 hover:shadow-xl`}
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
      </button>

      {/* 音符飘散效果 */}
      {isPlaying && (
        <div className="fixed bottom-16 right-8 z-40 pointer-events-none">
          <div className="absolute text-[#E8B4B8]/60 animate-float-up-1">♪</div>
          <div className="absolute text-[#E8B4B8]/40 animate-float-up-2">♫</div>
          <div className="absolute text-[#E8B4B8]/30 animate-float-up-3">♪</div>
        </div>
      )}

      <style>{`
        @keyframes float-up-1 {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0.6; }
          50% { transform: translateY(-30px) translateX(10px) scale(1); opacity: 0.8; }
          100% { transform: translateY(-60px) translateX(-5px) scale(0.6); opacity: 0; }
        }
        @keyframes float-up-2 {
          0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0.4; }
          50% { transform: translateY(-40px) translateX(-15px) scale(0.9); opacity: 0.6; }
          100% { transform: translateY(-80px) translateX(5px) scale(0.4); opacity: 0; }
        }
        @keyframes float-up-3 {
          0% { transform: translateY(0) translateX(0) scale(0.7); opacity: 0.3; }
          50% { transform: translateY(-35px) translateX(8px) scale(1.1); opacity: 0.5; }
          100% { transform: translateY(-70px) translateX(-10px) scale(0.5); opacity: 0; }
        }
        .animate-float-up-1 { animation: float-up-1 2s ease-out infinite; }
        .animate-float-up-2 { animation: float-up-2 2.5s ease-out infinite 0.5s; }
        .animate-float-up-3 { animation: float-up-3 2s ease-out infinite 1s; }
      `}</style>
    </>
  )
}
