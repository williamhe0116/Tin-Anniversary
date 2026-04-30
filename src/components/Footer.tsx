import { Heart } from 'lucide-react'

export default function Footer() {
  const anniversaryDate = new Date('2026-05-02')
  const today = new Date()
  const diffTime = anniversaryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return (
    <footer className="bg-[#E8E4E1] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#E8B4B8] fill-[#E8B4B8]" />
            <span className="text-[#4A4A4A] font-medium">十年相伴，锡暖一生</span>
            <Heart className="w-5 h-5 text-[#E8B4B8] fill-[#E8B4B8]" />
          </div>

          <p className="text-[#7A7A7A] text-sm mb-4">
            2016.05.02 — 2026.05.02
          </p>

          {diffDays > 0 && (
            <p className="text-[#E8B4B8] font-semibold">
              距离锡婚纪念日还有 {diffDays} 天
            </p>
          )}

          {diffDays === 0 && (
            <p className="text-[#E8B4B8] font-semibold text-xl">
              🎉 今天是锡婚纪念日！🎉
            </p>
          )}

          {diffDays < 0 && (
            <p className="text-[#7A7A7A] text-sm">
              纪念日已过 {Math.abs(diffDays)} 天
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-[#D0CCC8]">
            <p className="text-[#7A7A7A] text-xs">
              © 2026 锡婚纪念 · 珍藏每一刻
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
