import { useState, useEffect } from 'react'
import { Edit2, Camera, Video, Save, X, Play, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface StoryChapter {
  id: string
  title: string
  subtitle: string
  content: string
  photos: string[]
  video?: string
}

const defaultStory: StoryChapter[] = [
  {
    id: 'encounter',
    title: '相遇',
    subtitle: '2006 · 高二盛夏',
    content: '2006年，高二的盛夏，我们初次相遇，故事悄然开篇。那时的你，笑起来眼睛弯弯的，像一束光照进了我的世界。',
    photos: ['/images/2008年高中毕业.png'],
    video: '',
  },
  {
    id: 'transformation',
    title: '心动',
    subtitle: '2013 · 两座城市的距离',
    content: '漫漫大学时光，牵挂从未间断。厦门大学湖畔的咖啡店，一面留言墙，写下两两思念，藏着独属于我们的温柔惦念。\n\n2013年，是我们故事真正升温的一年。2月11日，一封跨越距离的邮件，让两颗心慢慢靠近；2月14日情人节，奔赴相见，一餐烟火，我在心里正式认定了你；3月14日白色情人节，你心动落定，认定余生是我。从此我们拥有两份浪漫，两个专属纪念日，双向奔赴，各自满心欢喜。',
    photos: ['/images/2013年春节的邮件.png', '/images/厦门找当时你写的纸条.jpg'],
    video: '',
  },
  {
    id: 'marriage',
    title: '相守',
    subtitle: '2016 · 携手婚礼',
    content: '2013至2016，三年异地恋。两座城市，遥遥相望，我们用恋日记记录日常、收藏思念，距离隔不开偏爱，时光沉淀深情。\n\n2016年5月2日，在家人与亲友的祝福之下，我们携手步入婚姻殿堂，以爱为名，许下一生的诺言。从恋人到夫妻，我们学会了包容与理解。',
    photos: [
      '/images/2016婚礼照片.png',
      '/images/DSC00256.JPG',
      '/images/f8305a339d57c8b91579b13228ff9720.jpg',
    ],
    video: '',
  },
  {
    id: 'journey2017',
    title: '奔赴',
    subtitle: '2017 · 奔赴热爱',
    content: '2017年，奔赴热爱，共赴山海。一起奔赴周杰伦、五月天的演唱会，奔赴一场又一场心动；携手去往巴厘岛度假，看山川湖海，共享人间浪漫。',
    photos: [
      '/images/2017/2017年.jpg',
      '/images/2017/2017年6月巴厘岛 (1).JPG',
      '/images/2017/2017年6月巴厘岛 (2).JPG',
      '/images/2017/2017年6月巴厘岛 (3).JPG',
      '/images/2017/2017年6月巴厘岛 (4).JPG',
      '/images/2017/2017年去巴厘岛.jpg',
      '/images/2017/2017年去巴厘岛2.jpg',
      '/images/2017/2017年生日礼物.jpg',
      '/images/2017/2017年五月天演唱会.jpg',
      '/images/2017/2017年西安看杰伦演唱会.jpg',
      '/images/2017/2017年在家.jpg',
    ],
    video: '',
  },
  {
    id: 'journey2018',
    title: '惊喜',
    subtitle: '2018 · 梦中的婚礼',
    content: '2018年11月11日，偷偷筹备，悄悄惊喜。瞒着所有人，为你复刻一场梦中的婚礼，补齐所有仪式感，把偏爱与浪漫都赠予你。',
    photos: [
      '/images/2018/第二场婚礼/images/2018-12-17_03eacfcda552f9bfcf5fd050c9abe250_49.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_05f00203a93eed9c9b0eae29ecfa29de_32.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_17543666a5f6dfbacac415788ad34fd1_16.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_252d13ffc7f0192657022f6ab675df58_28.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_31a773929d9a7541357cfa8dcd072ed1_39.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_362e0dd4f3c8214ba2494c88b4cc29af_20.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_37e22bfcd5cfea34de7fbbdedf1cb7bf_7.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_4ac8a7b59a885ff8cb6ca7cba858ba0e_8.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_519ac2b03cadaea6b1e859c8e3253bd8_5.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_5f3c197bcc6efc4baf92d86f3a492133_27.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_685ddabbfdd193e3526138fa29b45802_50.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_740d1f0bd550523b9f64aed71b227523_14.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_82eca6738094defe67e3d091aa1044ac_13.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_848b082336d3c36e1982f68ce1d9e1df_17.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_88c1b87b1bee07db5e4b78a9c64d1eb1_46.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_a9e597c4822988e3a88f34a67928445f_6.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_ae321f2529f2a666a1c7b080cbfe7f6f_3.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_b8c4c8549a28578698108c4d2329aaca_1.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_bb1d79f517a22bd9b685e4d128a77713_40.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_cd796f6f06713c122fe299552b8d4640_48.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_d6ef5bccdd2185e39c8373b348764d05_15.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_d72d661a14369c2700217019524b2180_18.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_dead492aa5facc66ce25dc817846af34_19.jpeg',
      '/images/2018/第二场婚礼/images/2018-12-17_e0bfec9bf759531c7c696a9b1db7cd15_44.jpeg',
    ],
    video: '',
  },
  {
    id: 'journey2019',
    title: '同行',
    subtitle: '2019 · 奔赴梦想',
    content: '2019年，并肩规划未来，为你的英国求学之路，一起奔赴新的旅程。',
    photos: [
      '/images/2019/2019年.jpg',
    ],
    video: '',
  },
  {
    id: 'journey2020',
    title: '守候',
    subtitle: '2020-2021 · 疫情相守',
    content: '2020-2021年，疫情漫漫，相隔山海。异国相守，双向守候，在漫长的岁月里，彼此支撑，温柔相伴。',
    photos: [
      '/images/2025年冬天.jpg',
    ],
    video: '',
  },
  {
    id: 'journey2022',
    title: '新生',
    subtitle: '2022 · 三口之家',
    content: '2022年12月20日，小生命如约而至，仔仔降临，二人世界升级为温暖三口之家。',
    photos: [
      '/images/2022/2022 年来上海外滩.jpg',
      '/images/2022/2022年来上海.JPEG',
      '/images/2022/2023年西安.jpg',
      '/images/2022/2023/2023年去千岛湖.jpg',
      '/images/2022/2023/2023年在上海外滩.HEIC.jpg',
      '/images/2022/2023/2023年生日.jpg',
      '/images/2022/2023/2024/2024年过年合照.PNG',
    ],
    video: '',
  },
  {
    id: 'journey2023',
    title: '安家',
    subtitle: '2023 · 扎根上海',
    content: '2023年，步履不停，事业扎根上海，安一个家。',
    photos: [
      '/images/2023/2025年交大一起开学.jpg',
      '/images/2023/2025年前滩休闲公园.JPEG',
      '/images/2023/2025年千岛湖.JPG',
    ],
    video: '',
  },
  {
    id: 'journey2025',
    title: '圆梦',
    subtitle: '2025 · 米兰之旅',
    content: '2025年，跨越山海奔赴米兰，陪你站上国际舞台，见证你的设计发光，陪你完成热爱与梦想。',
    photos: [
      '/images/米兰/2025年意大利.JPEG',
      '/images/米兰/21de6ebe32a0ba978035e5b3a802f33.jpg',
      '/images/米兰/e28f39862a309a9d4fc7458e569e726.jpg',
    ],
    video: '',
  },
  {
    id: 'wish',
    title: '锡婚寄语',
    subtitle: '2026 · 十年婚姻',
    content: '从2006年初见，到2026年5月2日，一晃二十年相识，十年婚姻。\n\n始于心动，终于白首；\n岁岁年年，朝夕与共。\n\n下一个十年，来日方长，我们继续同行。',
    photos: [
      '/images/2026年元旦.JPG',
    ],
    video: '',
  },
]

export default function StoryPage() {
  const [story, setStory] = useState<StoryChapter[]>(defaultStory)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<StoryChapter | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const startEditing = (chapter: StoryChapter) => {
    setEditingId(chapter.id)
    setEditData({ ...chapter })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditData(null)
  }

  const saveEdit = () => {
    if (editData) {
      setStory(story.map(s => s.id === editData.id ? editData : s))
      setEditingId(null)
      setEditData(null)
    }
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16">
      {/* Header */}
      <section className="relative bg-gradient-to-b from-[#E8B4B8]/30 to-[#FDF8F3] py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#E8B4B8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F5E6D3]/50 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-[#E8B4B8] mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4A4A4A] mb-4 tracking-tight">
            我们的故事
          </h1>
          <p className="text-lg text-[#7A7A7A]">
            二十年相识 · 十年婚姻 · 岁岁年年
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E8B4B8]" />
            <div className="w-2 h-2 rounded-full bg-[#E8B4B8]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E8B4B8]" />
          </div>
        </div>
      </section>

      {/* Story Chapters - Full Width Layout */}
      <section className="max-w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {story.map((chapter, index) => (
            <div key={chapter.id} className="relative">
              {/* Chapter Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E8B4B8] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#4A4A4A]">
                      {chapter.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-[#E8B4B8]/10 text-[#E8B4B8] text-sm font-medium rounded-full">
                      {chapter.subtitle}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(chapter)}
                  className="text-[#7A7A7A] hover:text-[#E8B4B8] hover:bg-[#E8B4B8]/10"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Full Width Card */}
              <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                {/* Photos Grid - Flat Display */}
                {chapter.photos.length > 0 && (
                  <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8E4E1] p-4">
                    <div className={`grid gap-3 ${
                      chapter.photos.length === 1
                        ? 'grid-cols-1 max-w-2xl mx-auto'
                        : chapter.photos.length === 2
                        ? 'grid-cols-2'
                        : chapter.photos.length === 3
                        ? 'grid-cols-1 md:grid-cols-3'
                        : chapter.photos.length <= 4
                        ? 'grid-cols-2'
                        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}>
                      {chapter.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden bg-white/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                            chapter.photos.length === 1 ? 'aspect-[4/3] max-h-[60vh]' : 'aspect-[3/4]'
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`${chapter.title} - ${idx + 1}`}
                            className="w-full h-full object-contain"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Photos Placeholder */}
                {chapter.photos.length === 0 && (
                  <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8E4E1] p-12 flex flex-col items-center justify-center text-[#7A7A7A]">
                    <Camera className="w-16 h-16 mb-4 opacity-50" />
                    <span className="text-lg">暂无照片</span>
                  </div>
                )}

                {/* Content Section */}
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-[#7A7A7A] leading-relaxed whitespace-pre-line text-base sm:text-lg text-center">
                    {chapter.content}
                  </p>

                  {/* Video link */}
                  {chapter.video && (
                    <button
                      onClick={() => setPlayingVideo(chapter.video || null)}
                      className="mt-6 inline-flex items-center gap-2 text-[#E8B4B8] hover:text-[#d9a3a7] transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-sm">观看视频</span>
                    </button>
                  )}
                </CardContent>
              </Card>

              {/* Connector Line */}
              {index < story.length - 1 && (
                <div className="absolute left-6 top-full w-px h-8 bg-gradient-to-b from-[#E8B4B8]/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Video Player Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#E8B4B8]"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={playingVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A]">
                  编辑「{editData.title}」
                </h3>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      副标题
                    </label>
                    <Input
                      value={editData.subtitle}
                      onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    内容
                  </label>
                  <Textarea
                    value={editData.content}
                    onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    className="rounded-lg"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    照片 ({editData.photos.length})
                  </label>
                  {editData.photos.length > 0 && (
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
                  )}
                  <label className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                    <Camera className="w-4 h-4" />
                    <span className="text-sm">添加照片</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file))
                          setEditData({ ...editData, photos: [...editData.photos, ...newPhotos] })
                        }
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    视频
                  </label>
                  {editData.video ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-[#E8E4E1]">
                      <video src={editData.video} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setEditData({ ...editData, video: '' })}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                      <Video className="w-5 h-5" />
                      <span>添加视频</span>
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
                  )}
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
