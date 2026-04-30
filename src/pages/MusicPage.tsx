import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Plus, Edit2, Save, X, Music, Disc } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Track {
  id: string
  title: string
  description: string
  duration: string
  coverUrl?: string
  audioUrl?: string
  lyrics?: string
}

const LYRICS_拾年序章 = `零六盛夏 课桌边初遇的篇章
青涩时光 落在高二旧围墙
零八夏章 毕业风吹散少年郎
厦大湖旁 咖啡店藏起念想
留言墙 字几行
落笔皆是 遥遥念想
岁月漫长 牵挂不曾收场

一三年春 邮件翻过旧时光
二月十一 两颗心慢慢张望
情人街巷 奔赴一餐烟火香
我把余生 悄悄对你私藏
白色月光 十四号的温柔立场
你也选定 这一生的远方
双份浪漫 定格专属过往

几座城摇晃 三年异地漫长
日记本收藏 每段思念短章
隔山海相望 风替我奔赴远方
年少的莽撞 熬成稳稳寻常

流年缓缓唱 我们走过半世晴朗
从心动开场 牵手走过人海茫茫
烟火与星光 都融进日常
以爱为航向 岁岁两两不相忘
时光慢慢淌 十年婚书落笔成章
风雨共抵挡 温柔熬过世事无常
岁月皆坦荡 余生慢慢讲

巴厘岛海浪 漫过温柔的过往
偷偷的慌张 复刻你梦中礼堂
远渡重洋 陪你熬过异国风霜
晚风轻轻扬 小小人间添了暖阳
落脚上海滩 重启烟火日常
米兰街巷 见证你理想发光

零六初见 一晃二十载时光
二六春光 恰逢拾年的晴朗
青丝渐长 爱意一如既往
往后山海 携手慢慢闯荡
岁岁年年 共赴来日方长`

const defaultTracks: Track[] = [
  {
    id: '0',
    title: '《拾年序章》',
    description: '十年锡婚，爱的序章',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/《拾年序章》.mp3',
    lyrics: LYRICS_拾年序章,
  },
  {
    id: '2',
    title: "Life's Magic",
    description: '你是我生命中的魔力',
    duration: '',
    coverUrl: '',
    audioUrl: "/images/music/Life's Magic_no-watermark (1).mp3",
    lyrics: `Sunlight dancing on the hardwood floor
Coffee's steaming, you're asking for more
You're messy with your hair, just waking up
But there's a whole universe in your cup

Every corner of this house we built
Is a story of love, without any guilt

They read about us in those black and white lines
But they don't see the way your soul shines
Even when you trip or make a little mess
It's just another reason I love you more, I guess

You're the magic in the mess, my lady
The one who keeps me grounded, never shady
To the world you're the hostess of this space
But to me, you're the heartbeat in every place
You're the melody I sing when the day is long
With you, my girl, is right where I belong

Remember that article, the words on the screen?
Capturing the moments that stay in between
Your laughter is the bassline to my soul
You take the broken pieces and you make me whole

It ain't always perfect, and that's the art
You've got the key to every room in my heart
Let the years roll by, let the story unfold
Our love is a treasure, better than gold

My leading lady...
Yeah, it's you and me, in our own little world
Every day's a new page...

Best answer I ever found... is you.`,
  },
  {
    id: '5',
    title: '《同星赴余生》',
    description: '同星赴余生，三餐四季温柔共韶华',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/同星赴余生_no-watermark.mp3',
    lyrics: `课桌旁 初识的青春盛夏
缘分落在 同班的年华
浅淡好感 酿成知己牵挂
心事温柔 悄悄埋下

隔山海 两座城的晚霞
晚风之下 仰望同片星纱
异地岁月 思念从不落下
默默守望 等一场抵达

踏过风尘 辗转回归长安之下
烟火人间 筑一个小家
朝夕并肩 聊余生的情话
命运馈赠 最珍贵的回答

岁月缓缓 温柔生根发芽
所有奔赴 都不算偏差
岁岁念念 只为一人留下
安稳岁月 因你而圆满啊

五月二号 定格心动的回答
以爱为名 牵手步入婚纱
人海相逢 是上天赐予的缘分啊
此生相遇 何其有幸啊

漫漫余生 拜托你温柔接纳
星空为证 相守不分冬夏
往后朝夕 岁岁年年都不落下
我的余生 请你多指教啊

从青涩相知 到热恋牵挂
从辗转奔波 到安家落下
时光见证 我们所有的牵挂
平凡日子 开出温柔繁花

想拥你入眠 在星光之下
想轻吻眉梢 等晨光洒进家
人间风景 我都陪你去抵达
三餐四季 温柔共韶华

知己情深 熬过异地时差
一城安稳 续写岁岁佳话
十年光阴 爱意从不褪色风化
满心温柔 只赠予你啊

牵你的手掌 走过人间繁华
以一生为期 共赏世间风雅
这一份缘分 温柔横跨年华
余生漫漫 唯你 是我的牵挂`,
  },
  {
    id: '6',
    title: '《城际情书》',
    description: '两千条说说，读遍你的从前',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/城际情书_no-watermark.mp3',
    lyrics: `屏幕亮了又暗 等你一句晚安
绿皮火车载着期盼 开向你那边
手牵手一步两步三步四步望着天
思念叠成票根 藏在我口袋里面
你系鞋带的温柔 定格整个夏天
我轻轻的尝一口 你说的爱我 很甜

地震那一瞬间 你先把我惦念
车站挥别 眼泪盘旋 舍不得说再见
看不见你的笑 我怎么睡得着
距离再远 也拆不散 我们的诺言
两千条说说 读遍你的从前
最美的不是下雨天 是与你躲过雨的屋檐

思念变成海 在窗外进不来
我耐心等 风把你 吹过来
不怕路漫长 不怕等待成灾
因为你 是我 未来的依赖

我想就这样牵着你的手不放开
隔再多城 也不能 把爱分开
等天青色等烟雨 而我在等你到来
一起看 山海与人间 烟火盛开
我想就这样牵着你的手不放开
把所有孤单 都换成 未来
婚纱和旅行 都为你而安排
简单爱 一辈子 只给你 这一段

数着日子期盼 下次和你相见
蒲公英的约定 说好 要走到永远
一起设计嫁衣 走过四季变换
把永远爱你 写进诗的结尾 作伴

思念变成海 在窗外进不来
我耐心等 风把你 吹过来
不怕路漫长 不怕等待成灾
因为你 是我 未来的依赖

我想就这样牵着你的手不放开
隔再多城 也不能 把爱分开
等天青色等烟雨 而我在等你到来
一起看 山海与人间 烟火盛开
我想就这样牵着你的手不放开
把所有孤单 都换成 未来
婚纱和旅行 都为你而安排
简单爱 一辈子 只给你 这一段

岁月在墙上剥落 看见小时候
而我们 把异地 熬成了永久
等不再隔着屏幕 诉说着温柔
一转身 就能拥抱 你的所有
未来的路 我们一起走
最美的爱情 是陪你到最后

我想就这样牵着你的手不放开
简单爱 到白头 永不分开`,
  },
  {
    id: '7',
    title: '《等你赴未来》',
    description: '等未来，并肩再也不分开',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/《等你赴未来》_no-watermark.mp3',
    lyrics: `屏幕微光 陪我到夜半
等你晚安 把孤单冲淡
火车开过 沉默的夜晚
思念在心底 慢慢蔓延
看不见你的笑 我怎么睡得着
每一秒 都在盼 下一次相见

车票叠满 想念的期盼
挥手之间 眼泪在打转
你说未来 会在我身边
一起走过 四季的变换
手牵手一步两步三步四步望着天
把温柔 都兑现 余生的画面

思念变成海 在窗外进不来
我静静等待 花一定会开
距离再远 也不会更改
我们的未来 由爱主宰

我想就这样牵着你的手不放开
隔再多城 也隔不开 深爱
等天青色等烟雨 而我在等你到来
一起把 未来的梦 全都打开
我会陪着你 走过人间山海
简单爱 一辈子 不分开
期待某天 不再隔着屏幕告白
一转身 就拥你 入怀

我期待着 婚纱的纯白
一起旅行 看世界精彩
把每一天 都过成热爱
把永远爱你 写进诗的结尾
岁月漫长 有你就心安

思念变成海 在窗外进不来
我静静等待 花一定会开
距离再远 也不会更改
我们的未来 由爱主宰

我想就这样牵着你的手不放开
隔再多城 也隔不开 深爱
等天青色等烟雨 而我在等你到来
一起把 未来的梦 全都打开
我会陪着你 走过人间山海
简单爱 一辈子 不分开
期待某天 不再隔着屏幕告白
一转身 就拥你 入怀

最美的不是下雨天
是与你 约定好 的明天
不再遥远 不再辗转
未来的路 有你作伴
所有等待 都值得被成全
我们的故事 永远不会写完

我想就这样牵着你的手不放开
等未来 并肩 再也不分开`,
  },
  {
    id: '8',
    title: '《策划之外的浪漫》',
    description: '你策划人间圆满，我策划一生不渝',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/《策划之外的浪漫》_no-watermark.mp3',
    lyrics: `你亲手雕琢 无数场婚礼
看过人海相拥 温柔的轨迹
落笔万千期许 圆满了朝夕
却从没想过 命运的谜题

十二载的光阴 青涩到笃定
旧日寻常宴席 少一点动心
我藏好所有主意 安静筹谋秘密
串通整片天地 只瞒着你

梧桐落满阶梯
白纱藏进静谧
那些手写的情意
慢慢铺满地
一场无声预谋
只为弥补往昔

你策划过世间 每一段佳期
却看不懂 我深藏的爱意
所有人都默契 守住这场惊喜
唯有你 困在温柔谜底

最懂浪漫的你 被我蒙在眼底
生辰晚风为序 补一场婚礼
不用繁华布景 不用万人贺喜
我的偏爱 只予你专属定义

你精通每一种 仪式的细腻
懂浪漫的逻辑 懂心动伏笔
偏偏这一次 故事不由你设计
我用笨拙真心 颠覆所有惯例

阁楼灯火轻轻 故人静静相聚
没有彩排台词 没有刻意演戏
细碎周全的惦记 藏进岁月缝隙
最懂婚礼的人 最后被我宠溺

梧桐落满阶梯
白纱藏进静谧
那些手写的情意
慢慢铺满地
一场无声预谋
只为弥补往昔

你策划过世间 每一段佳期
却看不懂 我深藏的爱意
所有人都默契 守住这场惊喜
唯有你 困在温柔谜底

最懂浪漫的你 被我蒙在眼底
生辰晚风为序 补一场婚礼
不用繁华布景 不用万人贺喜
我的偏爱 只予你专属定义

你成全过太多 别人的朝夕
我只想给你 独一份秘密
看透所有浪漫 却猜不透我心意
这份隐瞒 是最深的珍惜

十二年相守 从未停息
往后余生 岁岁相依
你策划人间圆满
我策划 一生不渝

最懂婚礼的你
被我温柔藏匿
这场不期而遇
是我余生 全部诚意`,
  },
  {
    id: '9',
    title: '《私藏婚约》',
    description: '瞒着全世界，完成我们的约',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/私藏婚约_no-watermark.mp3',
    lyrics: `走过十二载春秋 少年心事依旧
同窗时温柔眼眸 悄悄藏了好久
见过太多烟火 别人盛大的邂逅
唯独欠你一场 专属的温柔
旧婚礼喧闹依旧 少了心动感受
你经手所有浪漫 我都记在心头
借生日夜色相守 悄悄布下所有
全世界都知情 唯独瞒着你走

落叶铺满阁楼 晚风轻轻逗留
一字一句情话 贴满斑驳墙头
未曾说的预谋 藏了太久太久
在你生辰时候 为你揭晓所有

生日的晚风 吹来了婚约
我藏好所有温柔 只为你赴约
梧桐轻摇曳 白帘映月色
世间万千浪漫 都不及这一页
十二年情结 未被岁月冷却
瞒着全世界 完成我们的约
不用喧嚣热烈 不用浮华章节
余生所有朝夕 都归你所有

没提前彩排片刻 真心不用雕琢
细碎温柔的轮廓 我都细心包裹
婚鞋与所有细节 私下一一备好
懂你所有执着 圆你未竟美好
人群寥寥不多 至亲知己落座
时光慢慢停泊 爱意不用言说
岁月褪去青涩 初心从未剥落
一场隐秘婚礼 是我专属承诺

落叶铺满阁楼 晚风轻轻逗留
一字一句情话 贴满斑驳墙头
未曾说的预谋 藏了太久太久
在你生辰时候 为你揭晓所有

生日的晚风 吹来了婚约
我藏好所有温柔 只为你赴约
梧桐轻摇曳 白帘映月色
世间万千浪漫 都不及这一页
十二年情结 未被岁月冷却
瞒着全世界 完成我们的约
不用喧嚣热烈 不用浮华章节
余生所有朝夕 都归你所有

你见证过无数人的圆满
我只给你独一份的浪漫
时光辗转 青春未散
年少的伴 余生相伴
所有隐瞒 皆是深爱
所有等待 终会盛开

生辰为婚 以爱为证
岁岁年年 不离不分
藏尽余生 所有温存
你是我此生 唯一的人`,
  },
  {
    id: '10',
    title: '《十一月十一的约定》',
    description: '圆你一生期许，迟到的婚礼',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/十一月十一的约定_no-watermark.mp3',
    lyrics: `二零一八年 十一月十一
双十一的风 轻轻吹起
今天是你的生日 本该满心欢喜
你却接到任务 奔赴婚礼场地
明明心里有一点 小小的委屈
你却依旧收起情绪 认真扛起
爱着策划的模样 温柔又争气
可爱的你 一直藏在我心底

看着眼前新人 相拥的甜蜜
你眼底藏着羡慕 还有点孤寂
轻声一遍遍问着 默默在叹息
为何我的梦中婚礼 迟迟没踪迹
总说我是钢铁直男 不懂浪漫心意
其实我把所有温柔 都为你收集
瞒着所有时光 憋着所有秘密
只为给你一场 专属的惊喜

全场都在悄悄守候 陪着我藏秘密
就等这一刻 把心里话都告诉你
别再羡慕旁人 你才是最幸运的少女
今天所有浪漫 全都只为你开启
亲爱的婚礼策划师 请别再迟疑
我来兑现承诺 圆你一生期许
所有鲜花掌声 所有温柔光景
都是我给你 迟到的婚礼

你不敢相信 直男也懂浪漫用心
所有隐瞒等待 全都有了意义
在众人见证里 在温柔时光里
把余生的偏爱 全都赠予你

宝贝生日快乐 余生不离不弃
这场梦中婚礼 永远只为你
我爱你 岁岁又朝夕`,
  },
  {
    id: '11',
    title: '《一切都是上天安排好的缘分》',
    description: '从青涩年少，走到白首不离分',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/一切都是上天安排好的缘分.mp3',
    lyrics: `嗯～
缘分早已注定
是上天的宿命
从年少遇见你
就认定是你

2006 盛夏教室微风泛起
高二转校 命运让我遇见你
邻桌的距离 埋下心动伏笔
青春故事 悄悄开启
2008 告别青涩高中雨季
人海走散 缘分却从没远离
心里藏着 一份温柔惦记
冥冥之中 早已命中注定

厦大湖畔 咖啡店留着回忆
一面留言墙 写下两两思绪
没有微信的年纪 纸条书信传递
QQ对话框 陪着四季更替
十二年生辰 我都牢牢记起
走过山河万里 看过世间风景
一点一滴温柔 缠绕彼此生命
缘分的线 从来不曾分离

2013春风 温柔漫过心底
一封邮件 拉近两颗孤寂
情人节奔赴 认定此生唯一
白色情人节 余生交给你
两个纪念日 双向奔赴欢喜
时光缓缓 酝酿深情爱意

一切都是上天安排好的缘分
从青涩年少 走到岁岁温存
走过朝朝暮暮 跨过人海风尘
每一步相遇 都是天意认真
一切都是上天安排好的缘分
熬过异地时光 守住初心本分
春去秋来轮回 爱意落地生根
有你在身旁 就是最好安稳

一三到一六 三年异地光阴
两座城市遥望 思念写进日记
距离隔不开 藏心底的偏爱
岁月沉淀深情 慢慢向我靠近
二零一六五月二 红毯为你走近
亲友祝福声里 许下一生约定
婚礼那句嘱托 照顾好你掌心
余生岁岁年年 坚守这份初心

2017奔赴 演唱会的星光意境
巴厘岛的晚风 吹浪漫的光景
2018深秋 偷偷制造惊喜
复刻一场婚礼 把偏爱都给你
褪去热恋热烈 走入柴米油盐光阴
日常琐碎里面 满是温柔温馨
感恩你的善良 可爱治愈光阴
有家的温暖 岁岁安稳前行

19陪你奔赴 英伦追梦远行
20到21相隔山海 依然温柔守候前行
2022冬日 小生命悄悄降临
二人世界圆满 多了三口之家温馨
2023扎根上海 安家安稳光阴
2024并肩成长 奔赴更好光景
2025跨越山海 陪你站上米兰光影
见证你的梦想 绽放耀眼繁星

一切都是上天安排好的缘分
二十年的相识 十年婚姻情深
从初见的心动 走到白首不离分
世事万般变迁 我们始终认真
一切都是上天安排好的缘分
跨过山海岁月 熬过风雨浮沉
始于心动初心 相守往后晨昏
下一个十年 继续相伴同行

从2006初见 到二零二六时辰
岁岁相守 不负上天缘分
余生漫漫 只愿和你

相守一生`,
  },
  {
    id: '12',
    title: '《你的作品》',
    description: '你是人间安静的诗篇',
    duration: '',
    coverUrl: '',
    audioUrl: '/images/music/你的作品_no-watermark.mp3',
    lyrics: `## 主歌A1
半开窗棂 框住一抹远山
靛蓝褪尽 流云漫过峰峦
暖阳穿过窗格 轻轻落满桌案
勾勒你侧脸 俗世皆淡然

## 副歌
你是案头琉璃 浮沉尘世间
揽尽落花旧梦 无言也惊艳
人间风雨万千 看过千帆走远
你守一方清欢 不惊也不怨

## 主歌A2
茶烟一缕盘旋 绕在指尖
流年缓缓蔓延 拉长了时间
不闻城外喧嚣 人海渐行渐远
把繁华关在门边 只剩心跳浅浅

## 副歌
你是案头琉璃 浮沉尘世间
揽尽落花旧梦 无言也惊艳
人间风雨万千 看过千帆走远
你守一方清欢 不惊也不怨

## 主歌A3
琉璃凝光一盏 静立流年
通透藏尽悲欢 不染尘烟
温润裹住风月 沉淀世事千般
任人间聚散流转 自守方寸安然

## 副歌
琉璃易碎 亦藏温柔万千
以澄澈渡人间 看淡烟火尘缘

## 副歌
你是案头琉璃 浮沉尘世间
揽尽落花旧梦 无言也惊艳
人间风雨万千 看过千帆走远
你守一方清欢 不惊也不怨

## 桥段
浮光掠影斑驳 檐外新燕
飞不进你定格的 旧岁流年
琉璃映尽朝暮 揽遍风月无边
以一身清澄孤远 安度岁岁云烟

## 结尾
暮色漫合庭院 万籁归于无言
你依旧是人间 安静的诗篇
琉璃映着清欢 陪尽风月流年
半生澄澈静好 温柔落笔人间`,
  },
]

export default function MusicPage() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Track | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newTrack, setNewTrack] = useState<Partial<Track>>({
    title: '',
    description: '',
    duration: '',
  })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const isDraggingRef = useRef(false)
  const progressRef = useRef<HTMLDivElement>(null)

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId)
    if (!track?.audioUrl) return

    if (currentlyPlaying === trackId) {
      audioRef.current?.pause()
      setCurrentlyPlaying(null)
    } else {
      // 停止当前播放
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      // 创建新音频
      const audio = new Audio(track.audioUrl)
      audioRef.current = audio

      // 添加事件监听
      audio.addEventListener('timeupdate', () => {
        if (!isDraggingRef.current) setCurrentTime(audio.currentTime)
      })
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null)
        setCurrentTime(0)
      })

      audio.play().catch(e => console.error('播放失败:', e))
      setCurrentlyPlaying(trackId)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const startEditing = (track: Track) => {
    setIsEditing(true)
    setEditData({ ...track })
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditData(null)
  }

  const saveEdit = () => {
    if (editData) {
      setTracks(tracks.map(t => t.id === editData.id ? editData : t))
      setIsEditing(false)
      setEditData(null)
    }
  }

  const startCreating = () => {
    setIsCreating(true)
    setNewTrack({ title: '', description: '', duration: '' })
  }

  const cancelCreating = () => {
    setIsCreating(false)
    setNewTrack({ title: '', description: '', duration: '' })
  }

  const saveNewTrack = () => {
    if (newTrack.title) {
      const track: Track = {
        id: Date.now().toString(),
        title: newTrack.title || '',
        description: newTrack.description || '',
        duration: newTrack.duration || '00:00',
        coverUrl: '',
        audioUrl: '',
      }
      setTracks([...tracks, track])
      setIsCreating(false)
      setNewTrack({ title: '', description: '', duration: '' })
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const url = URL.createObjectURL(event.target.files[0])
      if (isEditing && editData) {
        setEditData({ ...editData, coverUrl: url })
      } else {
        setNewTrack({ ...newTrack, coverUrl: url })
      }
    }
  }

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const url = URL.createObjectURL(event.target.files[0])
      if (isEditing && editData) {
        setEditData({ ...editData, audioUrl: url })
      } else {
        setNewTrack({ ...newTrack, audioUrl: url })
      }
    }
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16">
      {/* Header */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cover-photo.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F3]/90 to-[#FDF8F3] z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Disc className="w-8 h-8 text-[#E8B4B8]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
              音乐专辑
            </h1>
          </div>
          <p className="text-[#7A7A7A]">
            为你制作的音乐，记录我们的故事
          </p>
        </div>
      </section>

      {/* Album Cover */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-md rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5E6D3] to-[#E8E4E1]">
          <CardContent className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Album Art */}
              <div className="w-48 h-48 rounded-2xl bg-white/80 shadow-lg flex items-center justify-center flex-shrink-0">
                {tracks[0]?.coverUrl ? (
                  <img
                    src={tracks[0].coverUrl}
                    alt="专辑封面"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Disc className="w-20 h-20 text-[#E8B4B8]" />
                )}
              </div>

              {/* Album Info */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
                  我们的歌
                </h2>
                <p className="text-[#7A7A7A] mb-4">
                  写给你的每一首歌 · {tracks.length}首歌曲
                </p>
                <p className="text-sm text-[#7A7A7A] italic">
                  "每一首歌都是我们的故事"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Track List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#4A4A4A]">
            歌曲列表
          </h3>
          <Button
            onClick={startCreating}
            size="sm"
            className="bg-[#E8B4B8] hover:bg-[#d9a3a7]"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加歌曲
          </Button>
        </div>

        <div className="space-y-3">
          {tracks.map((track, index) => (
            <Card
              key={track.id}
              className={`border-0 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden ${
                currentlyPlaying === track.id ? 'ring-2 ring-[#E8B4B8]' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Track Number / Play Button */}
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center flex-shrink-0">
                    {currentlyPlaying === track.id ? (
                      <button
                        onClick={() => togglePlay(track.id)}
                        className="w-8 h-8 rounded-full bg-[#E8B4B8] flex items-center justify-center"
                      >
                        <Pause className="w-4 h-4 text-white" />
                      </button>
                    ) : (
                      <button
                        onClick={() => togglePlay(track.id)}
                        className="w-8 h-8 rounded-full bg-[#E8B4B8] flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </button>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#4A4A4A] truncate">
                      {index + 1}. {track.title}
                    </h4>
                    <p className="text-sm text-[#7A7A7A] truncate">
                      {track.description}
                    </p>
                    {track.lyrics && (
                      <div className="mt-3 text-xs text-[#7A7A7A]/70 whitespace-pre-line bg-[#FDF8F3] rounded-lg p-3 max-h-32 overflow-y-auto">
                        {track.lyrics}
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="text-sm text-[#7A7A7A] flex-shrink-0">
                    {track.duration}
                  </div>

                  {/* Edit Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditing(track)}
                    className="text-[#7A7A7A] hover:text-[#E8B4B8]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Audio Progress (when playing) */}
                {currentlyPlaying === track.id && track.audioUrl && (
                  <div className="mt-4">
                    <div
                      ref={progressRef}
                      className="h-2 bg-[#E8E4E1] rounded-full overflow-hidden cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="h-full bg-[#E8B4B8] rounded-full transition-all"
                        style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#7A7A7A] mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{track.duration || formatTime(duration)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A]">
                  添加新歌曲
                </h3>
                <Button variant="ghost" size="sm" onClick={cancelCreating}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    歌曲名称
                  </label>
                  <Input
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                    placeholder="给你的歌起个名字"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    歌曲描述
                  </label>
                  <Textarea
                    value={newTrack.description}
                    onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
                    placeholder="这首歌背后的故事..."
                    className="rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    时长（如 03:45）
                  </label>
                  <Input
                    value={newTrack.duration}
                    onChange={(e) => setNewTrack({ ...newTrack, duration: e.target.value })}
                    placeholder="03:45"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    封面图片
                  </label>
                  <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                    <Music className="w-5 h-5" />
                    <span>添加封面</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    音频文件
                  </label>
                  <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                    <Music className="w-5 h-5" />
                    <span>上传音频</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleAudioUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={cancelCreating} variant="outline" className="flex-1 rounded-lg">
                  取消
                </Button>
                <Button onClick={saveNewTrack} className="flex-1 rounded-lg bg-[#E8B4B8] hover:bg-[#d9a3a7]">
                  <Save className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && editData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#4A4A4A]">
                  编辑歌曲
                </h3>
                <Button variant="ghost" size="sm" onClick={cancelEditing}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    歌曲名称
                  </label>
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    歌曲描述
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
                    时长
                  </label>
                  <Input
                    value={editData.duration}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    封面图片
                  </label>
                  {editData.coverUrl ? (
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-[#E8E4E1]">
                      <img src={editData.coverUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setEditData({ ...editData, coverUrl: '' })}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                      <Music className="w-5 h-5" />
                      <span>添加封面</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
                    音频文件
                  </label>
                  {editData.audioUrl ? (
                    <div className="p-4 bg-[#E8E4E1] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Music className="w-5 h-5 text-[#E8B4B8]" />
                        <span className="text-sm text-[#4A4A4A]">已上传音频</span>
                      </div>
                      <button
                        onClick={() => setEditData({ ...editData, audioUrl: '' })}
                        className="text-sm text-red-500 mt-2"
                      >
                        移除
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 py-8 border-2 border-dashed border-[#E8E4E1] rounded-lg cursor-pointer text-[#7A7A7A] hover:border-[#E8B4B8] transition-colors">
                      <Music className="w-5 h-5" />
                      <span>上传音频</span>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleAudioUpload}
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
