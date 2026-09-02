/**
 * 第 16 课练习:映射类型与工具类型(上)——Partial/Required/Readonly/Pick/Omit
 *
 * 运行方式:
 *   npx tsx lessons/16-工具类型上/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   映射类型 → { [K in keyof T]?: T[K] }   "遍历键 + 逐键变换"的一行语法
 *   Partial<T> → T 全可选    Required<T> → T 全必填(Partial 的逆操作)
 *   Readonly<T> → T 全只读   Pick<T, K> → 只留 K 列出的键
 *   Omit<T, K>  → 去掉 K 列出的键,留剩下(Pick 的反义词)
 *
 * 核心思维(务必先读懂再动手):
 *   工具类型 = "类型的函数":输入一个已有类型,输出一个新类型。
 *   它们不是魔法,源码就是一行映射类型。读懂这一个句式,五个全会:
 *     { [K in keyof T]?: T[K] }
 *     ├─ keyof T    = T 的所有键(键名联合,第 15 课)
 *     ├─ K in ...   = 遍历,K 依次取每个键名
 *     ├─ T[K]       = T 中键 K 的值类型(索引访问,第 12 课)
 *     └─ ?          = 每个生成的属性都加可选
 *   变换方式不同 → Partial(加?)/Required(去?)/Readonly(加 readonly);
 *   选哪些键不同 → Pick(只留 K)/Omit(去掉 K)。就这两条轴。
 */

// ============================================================
// 任务 1:读源码,预测类型(先读后写)
// 每一问先在注释里写预测,再运行/悬停验证。这几问是"读懂映射语法"的体检。
// ============================================================

// ① 逐段拆 Partial 源码(把你对每一段的预测写在右边)
//    type Partial<T> = { [K in keyof T]?: T[K] }
// ①a 对 type Config = { host: string; port: number },Partial<Config> 展开后等价于手写什么?
// 你的预测:{ host?: string; port?: number }

// ①b 悬停验证:Partial<Config> 实际推断成长什么样?(答出每个属性带不带 ?)
// 属性都带？

// ①c 判断:Partial<Config> 的对象缺字段合法吗?例如下面这行报不报错?为什么?
// const c1: Partial<Config> = { host: 'localhost' }
// 你的预测:不报错，因为 Partial<Config> 的属性都是可选的，缺字段是合法的。

// ② Required 是 Partial 的逆操作
//    type Required<T> = { [K in keyof T]-?: T[K] }   // "-?" 表示删除可选标记
// ②a 对 { host?: string; port?: number },Required 之后每个属性变 __必填__(必填/可选)
// ②b 判断:newConfig 下面声明报不报错?为什么?
// const newConfig: Required<{ host?: string; port?: number }> = { host: 'x' }
// 你的预测:报错，因为 Required<{ host?: string; port?: number }> 的属性都是必填的，缺字段是不合法的。

// ③ Readonly
//    type Readonly<T> = { readonly [K in keyof T]: T[K] }
// ③a 悬停看:Readonly<{ a: string }> 的对象,属性 a 还能重新赋值吗?(obj.a = 'y')
// 你的预测:不能，因为 Readonly<{ a: string }> 的属性都是只读的。

// ④ Pick 与 Omit(本课核心考点:语义区别)
//    type Pick<T, K extends keyof T> = { [P in K]: T[P] }
//    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>  // Exclude 先当"排除"理解
// ④a 对 interface User { id: number; name: string; email: string }
//    Pick<User, 'id' | 'name'> 展开后长什么样?
// 你的预测:{ id: number; name: string; }
// ④b 同一个 User,Omit<User, 'email'> 展开后长什么样?
// 你的预测:{ id: number; name: string; }
// ④c 现在回答:什么场景该用 Pick,什么场景该用 Omit?(一句话各自举一个生活化场景)
// 你的预测: Pick 用于只需要部分属性的场景，例如只需要用户的 id 和 name 来显示用户列表。Omit 用于需要排除某些敏感属性的场景，例如在前端展示用户信息时排除 passwordHash。

// ④d 判断:Pick<User, 'id' | 'boss'> 会报错吗?为什么?(想 K 上面的约束 extends keyof T)
// 你的预测:会报错，因为 'boss' 不是 User 的键，K 必须是 T 的键的子集。

// ④e 判断:下面两个变量类型等价吗?思考两秒再答。
// type A = Pick<User, 'id' | 'name'>    type B = Omit<User, 'email'>
// 你的预测:目前等价。以后增加了会不等价 A 只包含 id 和 name，B 包含除了 email 之外的所有属性。

// ============================================================
// 任务 2:你自己写(本课核心)
// 目标:① 手写自己的 Partial/Required/Readonly;② 用 Pick/Omit 给真实场景裁剪类型。
// 规则:
//   ① 不许用 any
//   ② 手写版签名必须与内置版一致(同名同参),用你自己写的版本(改名 My* 避免冲突)
//   ③ 写完悬停确认,自己说出"我这几行做了什么变换"
// ============================================================

// ① 手写三个工具类型(要求:只用映射类型语法,不许用内置 Partial/Required/Readonly)
//    提示:一行就够。照葫芦画瓢,把 ? / -? / readonly 放到该放的位置。
//    先写 MyPartial,卡住就看讲解里那张表,再写 MyRequired、MyReadonly。
interface DraftUser {
  name?: string
  age?: number
}

// ① 你的 MyPartial(签名:type MyPartial<T> = ???):
type MyPartial<T> = { [K in keyof T]?: T[K] }

// ① 你的 MyRequired(签名:type MyRequired<T> = ???):
type MyRequired<T> = { [K in keyof T]-?: T[K] }

// ① 你的 MyReadonly(签名:type MyReadonly<T> = ???):
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }

// ② 用 Pick/Omit 裁剪真实场景类型(用内置的即可,关键是选对用哪个)
// 场景 A:会员系统
interface Member {
  id: number
  nickname: string
  email: string
  phone: string
  passwordHash: string      // 敏感,永远不该泄露给前端
  createdAt: Date
}
// ②A-1 对外展示用的"公开资料":只要 id、nickname(别人能看到的)。用 Pick 还是 Omit?为什么?
//     你的理由: Pick，因为我们只需要公开展示的部分属性 id 和 nickname，而不需要其他属性。
// ②A-2 前端个人中心用的"我的信息":不该有 passwordHash,其余都要。用 Pick 还是 Omit?为什么?
//     你的理由: Omit，因为我们想要排除敏感字段 passwordHash，而包含其余所有属性。
// 写下面两个类型并各给一个对象常量验证(check 绿即可):
type PublicProfile = Pick<Member, 'id' | 'nickname'>   // 用上面第 A-1 的理由
type MyProfile = Omit<Member, 'passwordHash'>       // 用上面第 A-2 的理由

// ②B 表单草稿 vs 提交(把 Partial 用在真实流里)
// 场景:编辑会员资料,页面允许"改一半就存草稿"、"改完才提交完整表单"。
// ① 草稿类型 = Member 全可选?哪个工具类型?存草稿对象要用哪个?
// ② 但草稿不该包含 passwordHash 这种敏感字段 —— 先 Pick/Omit 去掉,再包工具类型,
//   两个工具类型可以嵌套:外层(内层(Member))。
// ② 写一个 EditDraft 类型:在 Member 基础上去掉 passwordHash,再所有字段可选。
//    卡点提示:先写"去掉 passwordHash 的版本",再问自己"怎么把它变可选",两者套起来。
type EditDraft = Partial<Omit<Member, 'passwordHash'>>
// 写一个草稿对象常量验证:
const draft: EditDraft = { nickname: '小明(改到一半)' }

// ============================================================
// 任务 3:消费验证(改完上面后取消注释,运行看结果)
// ============================================================
const pub: PublicProfile = { id: 1, nickname: '小明' }
const mine: MyProfile = {
  id: 1, nickname: '小明', email: 'a@b.com', phone: '138', createdAt: new Date()
}
// const draft: EditDraft = { nickname: '小明(改到一半)' }
console.log(pub, mine, draft)
// { id: 1, nickname: '小明' } {
//   id: 1,
//   nickname: '小明',
//   email: 'a@b.com',
//   phone: '138',
//   createdAt: 2026-09-02T07:11:00.503Z
// } { nickname: '小明(改到一半)' }