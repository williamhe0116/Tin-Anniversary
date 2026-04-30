import { useState } from 'react'
import { Edit2, Camera, Video, Save, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface TimelineEntry {
  year: string
  title: string
  description: string
  photos: string[]
  video?: string
}

const defaultTimeline: TimelineEntry[] = [
  {
    year: '2006',
    title: '初次相遇',
    description: '高二盛夏，故事悄然开篇。你好，很高兴认识你。',
    photos: ['/images/2008年高中毕业.png'],
    video: '',
  },
  {
    year: '2008',
    title: '高中毕业',
    description: '青涩的青春落幕，缘分却未曾散场。后来都去南方上大学，一起在厦大湖畔咖啡店的留言墙上，写下两两思念。',
    photos: [],
    video: '',
  },
  {
    year: '2013',
    title: '心动落定',
    description: '2月11日，一封跨越距离的邮件；2月14日情人节，奔赴相见；3月14日白色情人节，你认定余生是我。从此拥有两份浪漫，双向奔赴，各自满心欢喜。',
    photos: [],
    video: '',
  },
  {
    year: '2016',
    title: '携手婚礼',
    description: '5月2日，在家人与亲友的祝福下，我们携手步入婚姻殿堂，以爱为名，许下一生的诺言。',
    photos: [
      '/images/2016婚礼照片.png',
      '/images/DSC00256.JPG',
      '/images/f8305a339d57c8b91579b13228ff9720.jpg',
    ],
    video: '',
  },
  {
    year: '2017',
    title: '奔赴热爱',
    description: '一起奔赴周杰伦、五月天的演唱会；携手去往巴厘岛度假，看山川湖海，共享人间浪漫。',
    photos: [],
    video: '',
  },
  {
    year: '2018',
    title: '梦中的婚礼',
    description: '11月11日，偷偷筹备，悄悄惊喜。瞒着所有人，为你复刻一场梦中的婚礼，补齐所有仪式感，把偏爱与浪漫都赠予你。',
    photos: [],
    video: '',
  },
  {
    year: '2019',
    title: '赴英之旅',
    description: '并肩规划未来，为你的英国求学之路，一起奔赴新的旅程。',
    photos: [],
    video: '',
  },
  {
    year: '2020',
    title: '异国相守',
    description: '疫情漫漫，相隔山海。异国相守，双向守候，在漫长的岁月里，彼此支撑，温柔相伴。',
    photos: [],
    video: '',
  },
  {
    year: '2022',
    title: '三口之家',
    description: '12月20日，小生命如约而至，仔仔降临。二人世界升级为温暖三口之家，爱意多了一份圆满与柔软。',
    photos: [],
    video: '',
  },
  {
    year: '2023',
    title: '安家上海',
    description: '事业扎根上海，扎根一座城，安一个家，安稳度日，朝夕相伴。',
    photos: [],
    video: '',
  },
  {
    year: '2024',
    title: '并肩成长',
    description: '步履不停，一同探索，寻找更好的人生方向，彼此成就，共同成长。',
    photos: [],
    video: '',
  },
  {
    year: '2025',
    title: '米兰之旅',
    description: '跨越山海奔赴米兰，陪你站上国际舞台，见证你的设计发光，陪你完成热爱与梦想。',
    photos: [],
    video: '',
  },
  {
    year: '2026',
    title: '锡婚纪念',
    description: '二十年相识，十年婚姻。始于心动，终于白首；岁岁年年，朝夕与共。下一个十年，来日方长，我们继续同行。',
    photos: [],
    video: '',
  },
]

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>(defaultTimeline)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editData, setEditData] = useState<TimelineEntry | null>(null)

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditData({ ...timeline[index] })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
    setEditData(null)
  }

  const saveEdit = () => {
    if (editData !== null && editingIndex !== null) {
      const newTimeline = [...timeline]
      newTimeline[editingIndex] = editData
      setTimeline(newTimeline)
      setEditingIndex(null)
      setEditData(null)
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData && event.target.files) {
      const files = Array.from(event.target.files)
      const newPhotos = files.map(file => URL.createObjectURL(file))
      setEditData({ ...editData, photos: [...editData.photos, ...newPhotos] })
    }
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F5E6D3] to-[#FDF8F3] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-4">
            时光轴
          </h1>
          <p className="text-[#7A7A7A]">
            二十年相识 · 十年婚姻 · 岁岁年年
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8B4B8] via-[#E8E4E1] to-[#E8B4B8]" />

          {/* Timeline Entries */}
          <div className="space-y-8 sm:space-y-12">
            {timeline.map((entry, index) => (
              <div
                key={entry.year}
                className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#E8B4B8] border-4 border-[#FDF8F3] shadow-md z-10" />

                {/* Content Card */}
                <div className={`flex-1 ml-10 sm:ml-0 ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden">
                    <CardContent className="p-5 sm:p-6">
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl sm:text-3xl font-bold text-[#E8B4B8]">
                          {entry.year}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(index)}
                          className="text-[#7A7A7A] hover:text-[#E8B4B8]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">
                        {entry.title}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm leading-relaxed">
                        {entry.description}
                      </p>

                      {/* Video Placeholder */}
                      {entry.video && (
                        <div className="aspect-video rounded-lg bg-[#E8E4E1] overflow-hidden">
                          <video src={entry.video} className="w-full h-full object-cover" controls />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {editingIndex !== null && editData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A]">
                  编辑 {editData.year} 年
                </h3>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    标题
                  </label>
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    描述
                  </label>
                  <Textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    照片 ({editData.photos.length}/4)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {editData.photos.map((photo, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#E8E4E1] relative">
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setEditData({
                            ...editData,
                            photos: editData.photos.filter((_, j) => j !== i)
                          })}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {editData.photos.length < 4 && (
                    <label className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">添加照片</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    视频
                  </label>
                  <label className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                    <Video className="w-4 h-4" />
                    <span className="text-sm">{editData.video ? '更换视频' : '添加视频'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setEditData({ ...editData, video: URL.createObjectURL(e.target.files[0]) })
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={cancelEditing} variant="outline" className="flex-1 rounded-lg">
                  取消
                </Button>
                <Button onClick={saveEdit} className="flex-1 rounded-lg bg-[#E8B4B8] hover:bg-[#d9a3a7]">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
