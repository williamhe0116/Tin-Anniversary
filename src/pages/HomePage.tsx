import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Clock, BookHeart, Gift, Disc, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const VIDEO_URL = '/images/写给最爱的策划师小姐姐___我们也想这样被骗啊.mp4'

const quickLinks = [
  {
    href: '/timeline',
    icon: Clock,
    title: '时光轴',
    description: '二十年相识，十年婚姻，一点一滴',
    color: 'bg-[#F5E6D3]',
  },
  {
    href: '/story',
    icon: BookHeart,
    title: '我们的故事',
    description: '相遇 · 心动 · 相守 · 奔赴',
    color: 'bg-[#E8B4B8]/20',
  },
  {
    href: '/music',
    icon: Disc,
    title: '音乐专辑',
    description: '为你制作的音乐，记录我们的故事',
    color: 'bg-[#E8E4E1]',
  },
  {
    href: '/blessings',
    icon: Gift,
    title: '亲友祝福',
    description: '爱的见证，心的温度',
    color: 'bg-[#F5E6D3]',
  },
]

export default function HomePage() {
  const [playingVideo, setPlayingVideo] = useState(false)

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDF8F3] to-[#F5E6D3]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#E8B4B8]/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#E8E4E1]/50 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 text-[#E8B4B8]/40 rotate-45 border-2 border-[#E8B4B8]/40" />
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-[#E8B4B8]/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Anniversary Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8">
            <span className="text-3xl font-bold text-[#E8B4B8]">10</span>
            <span className="text-[#7A7A7A] text-sm">年婚姻纪念</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A4A4A] mb-4 leading-tight">
            十周年爱情纪实
            <span className="block text-[#E8B4B8]">岁岁年年，朝夕与共</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#7A7A7A] mb-8">
            2006年初见 · 2016年婚礼 · 2026年锡婚
          </p>

          {/* Couple Photo */}
          <div className="relative mx-auto mb-10 w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/cover-photo.jpeg"
              alt="我们的合照"
              className="w-full h-full object-cover"
            />
            {/* Tin texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>

          {/* Video Entry */}
          <button
            onClick={() => setPlayingVideo(true)}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-[#E8B4B8] flex items-center justify-center group-hover:bg-[#d9a3a7] transition-colors">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-[#4A4A4A] font-medium">观看纪念视频</span>
          </button>
        </div>
      </section>

      {/* Video Player Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPlayingVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#E8B4B8]"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={VIDEO_URL}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Key Milestones */}
      <section className="py-12 bg-[#FDF8F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {[
              { year: '2006', label: '初次相遇' },
              { year: '2013', label: '心动落定' },
              { year: '2016', label: '携手婚礼' },
              { year: '2022', label: '三口之家' },
              { year: '2026', label: '锡婚纪念' },
            ].map((milestone) => (
              <div key={milestone.year} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-[#E8B4B8]">{milestone.year}</span>
                </div>
                <span className="text-xs text-[#7A7A7A]">{milestone.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 sm:py-24 bg-[#FDF8F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {quickLinks.map((link) => (
              <Link key={link.href} to={link.href} className="block group">
                <Card className={`${link.color} border-0 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center mb-4 shadow-sm">
                      <link.icon className="w-7 h-7 text-[#E8B4B8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#4A4A4A] mb-2">
                      {link.title}
                    </h3>
                    <p className="text-[#7A7A7A]">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#F5E6D3] via-[#E8B4B8]/20 to-[#E8E4E1]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#4A4A4A] mb-4">
            始于心动，终于白首
          </h2>
          <p className="text-[#7A7A7A] mb-8 leading-relaxed">
            从青涩年少，到岁岁相守。<br />
            二十年相识，十年婚姻。<br />
            下一个十年，来日方长，我们继续同行。
          </p>
          <Button
            asChild
            className="bg-[#E8B4B8] hover:bg-[#d9a3a7] text-white rounded-full px-8 py-6 text-lg"
          >
            <Link to="/story">阅读我们的故事</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
