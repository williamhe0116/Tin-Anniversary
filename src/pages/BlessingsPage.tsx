import { useState, useEffect } from 'react'
import { Heart, Send, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Blessing {
  id: string
  nickname: string
  content: string
  createdAt: string
}

const defaultBlessings: Blessing[] = [
  {
    id: '1',
    nickname: '小明',
    content: '祝福你们锡婚快乐！十年的感情真让人羡慕，愿你们永远幸福甜蜜！',
    createdAt: '2026-03-20',
  },
  {
    id: '2',
    nickname: '匿名',
    content: '百年好合，永结同心！',
    createdAt: '2026-03-21',
  },
  {
    id: '3',
    nickname: '小红',
    content: '看着你们一路走来，真的很感动。祝福你们的下一个十年更加美好！',
    createdAt: '2026-03-22',
  },
]

export default function BlessingsPage() {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('tin-anniversary-blessings')
    if (saved) {
      setBlessings(JSON.parse(saved))
    } else {
      setBlessings(defaultBlessings)
    }
  }, [])

  const saveBlessings = (newBlessings: Blessing[]) => {
    setBlessings(newBlessings)
    localStorage.setItem('tin-anniversary-blessings', JSON.stringify(newBlessings))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      nickname: nickname.trim() || '匿名',
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    }

    saveBlessings([newBlessing, ...blessings])
    setNickname('')
    setContent('')
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const deleteBlessing = (id: string) => {
    saveBlessings(blessings.filter(b => b.id !== id))
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#E8B4B8]/20 to-[#FDF8F3] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-4">
            亲友祝福
          </h1>
          <p className="text-[#7A7A7A]">
            爱的见证 · 心的温度
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blessing Form */}
        <Card className="border-0 shadow-md rounded-2xl mb-12">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#4A4A4A] mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#E8B4B8] fill-[#E8B4B8]" />
              写下你的祝福
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  昵称（选填）
                </label>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="留下你的名字，或选择匿名"
                  className="rounded-lg"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                  祝福语
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你对新人的祝福..."
                  className="rounded-lg"
                  rows={4}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-[#7A7A7A] mt-1 text-right">
                  {content.length}/200
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E8B4B8] hover:bg-[#d9a3a7] rounded-lg py-6"
                disabled={!content.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                发送祝福
              </Button>

              {isSubmitted && (
                <p className="text-center text-[#E8B4B8] text-sm animate-pulse">
                  祝福已送达，感谢您的祝福！💕
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Blessings Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#4A4A4A]">
            祝福墙 ({blessings.length})
          </h2>
        </div>

        {blessings.length === 0 ? (
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-12 text-center">
              <Heart className="w-12 h-12 text-[#E8E4E1] mx-auto mb-4" />
              <p className="text-[#7A7A7A]">
                还没有祝福，成为第一个送上祝福的人吧！
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {blessings.map((blessing) => (
              <Card
                key={blessing.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8B4B8] to-[#F5E6D3] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {blessing.nickname === '匿名' ? '♡' : blessing.nickname[0]}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-[#4A4A4A] text-sm">
                          {blessing.nickname}
                        </span>
                        <p className="text-xs text-[#7A7A7A]">
                          {blessing.createdAt}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBlessing(blessing.id)}
                      className="text-[#7A7A7A] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-[#4A4A4A] leading-relaxed">
                    {blessing.content}
                  </p>

                  <div className="flex items-center gap-1 mt-4 text-[#E8B4B8]">
                    <Heart className="w-4 h-4 fill-[#E8B4B8]" />
                    <span className="text-xs">收到祝福</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
