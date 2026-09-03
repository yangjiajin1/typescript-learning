/**
 * 第 17 课练习:工具类型(下)——ReturnType/Parameters/Exclude/Extract/NonNullable
 *
 * 运行方式:
 *   npx tsx lessons/17-工具类型下/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   typeof fn     → 函数的"签名类型"本身(⚠️ 不是运行结果!从函数借类型的第一步)
 *   ReturnType<F> → F 的返回值类型      Parameters<F> → F 的参数,是一个【元组】
 *   Exclude<U,K>  → 从联合 U 里【删】掉 K 列出的成员   (差集)
 *   Extract<U,K>  → 从联合 U 里【留】下也在 K 里的成员 (交集)
 *   NonNullable<T>→ 把 T 里的 null / undefined 全部抽掉
 *   Awaited<T>    → 拆掉 Promise 那层(配合 ReturnType 处理 async 函数)
 *
 * 核心思维(务必先读懂再动手):
 *   工具类型 = "类型的函数"。上一课输入对象类型,这一课换成两类输入:
 *     ① 函数类型 → ReturnType / Parameters / InstanceType
 *     ② 联合类型 → Exclude / Extract / NonNullable
 *   从函数"借"类型最常踩的坑:写成 ReturnType<fn>(×)
 *   必须 ReturnType<typeof fn>(√)。typeof 取到"函数签名",工具类型才能往里钻。
 *   借类型的好处:函数是唯一类型源头,返回结构改一处,借来的类型自动跟上,不用手抄接口。
 */

// ============================================================
// 任务 1:读源码,预测类型(先读后写)
// 下面两个函数 + 一个 class 是"别人写好的"(同事/第三方库),你【不许改它们】,
// 但你的代码要用到它们的参数形状和返回形状 —— 只能靠 typeof 去借。
// 每一问先在注释里写预测,再运行/悬停验证。
// ============================================================

/** 同事写好的人事接口:注册一个用户(模拟,不真连后端) */
function createUser(input: { name: string; age: number; email?: string }) {
  // 返回对象故意没有显式注解 —— 让 TS 自己推断,我们正好学 ReturnType 去"借"
  return { id: Math.floor(Math.random() * 1e6), name: input.name }
}

/** 同事写好的订单查询接口:异步,拿订单详情 */
async function fetchOrder(orderId: number, opts: { withItems?: boolean }) {
  return { id: orderId, items: [] as string[] }
}
// ① ReturnType<typeof createUser> —— 悬停看,它等价于手写什么?
// 你的预测:__{id:number; name: string}_
// ② ReturnType<typeof fetchOrder> —— 注意 fetchOrder 是 async。
//    ReturnType 只剥一层:它拿到的是 Promise<...> 还是里面那个对象?
//    你的预测:_Promise<...>__
// ②a 想真正拿到"订单详情对象",要用 Awaited<> 再拆一层:Awaited<ReturnType<typeof fetchOrder>>
//    悬停对比 ② 和 ②a 的结果,说出差别。你的话:_Promise<{ id: number; items: string[];}>  和 { id: number; items: string[];} 的差别__

// ③ Parameters<typeof createUser> —— 参数类型是一个【元组】,悬停看长什么样?
//    你的预测:__[input: { name: string; age: number; email?: string | undefined;}]_
// ③a 只想取"第一个参数"的类型:用索引从元组里抠。你的写法:
//  type UserFormData = Parameters<typeof createUser>[0]  //没错就这么写

// ④ class 也适用(先看懂"typeof 一个 class"到底是什么)
class Account {
  constructor(
    public id: number,
    public owner: string,
  ) {}
}

// ④a typeof Account 的类型是"构造器签名",不是"实例"。要实例类型,用哪个工具?
//    你的预测:type Acc = InstanceType<typeof Account>
// ④b 对比:Acc 的对象能不能直接 new Account(...) 赋给它?两者是什么关系?
//   你的预测:可以直接赋值。Acc 是 Account 的实例类型，new Account(...) 返回的对象就是 Acc 类型。

// ⑤ 集合三兄弟:先口头说清各自是"删/留/抽",再预测结果
type OrderStage = 'pending' | 'paid' | 'shipped' | 'cancelled'
// ⑤a Exclude<OrderStage, 'cancelled'> → 你的预测:__'pending' | 'paid' | 'shipped'_
// ⑤b Extract<OrderStage, 'paid' | 'shipped'> → 你的预测:__'paid' | 'shipped'_
// ⑤c NonNullable<string | null | undefined> → 你的预测:_string__
// ⑤d type Email = string | null;NonNullable<Email> → 你的预测:__string_

// ============================================================
// 任务 2:你自己写(本课核心)
// 目标:① 从别人写好的函数"借"类型,不手抄重复接口;
//       ② 用 Exclude/Extract/NonNullable 做联合的集合运算。
// 规则:不许 any;能用工具类型借,就不手写接口;写完悬停确认再往下。
// ============================================================

// ① 借类型:页面组件要做"注册表单",数据层要用"订单详情"。
// ①a 表单类型 = 调用 createUser 时需要的东西(就是它的第一个参数):
//    在下面落一行真类型(提示:Parameters 结果是元组,元组 [0] 取第一个):
type UserFormData = Parameters<typeof createUser>[0]

// ①b createUser 返回的"用户记录",别手抄 { id: number; name: string }:
type UserRecord = ReturnType<typeof createUser>

// ①c 真·订单详情:它裹在 Promise 里,先 ReturnType 再 Awaited 拆一层:
type OrderDetail = Awaited<ReturnType<typeof fetchOrder>>

// ② 集合运算:订单状态机(和第 15 课 OrderPhase 同类)
// ②a "用户能自己取消的"只有未完结的 pending / paid:
//    从 OrderStage 里删掉 shipped / cancelled。用 Exclude:
type CancelableState = Exclude<OrderStage, 'shipped' | 'cancelled'>

// ②b "已支付后进入发货" —— 只留 shipped 这一个。用 Extract 和 Exclude 各写一行,
//    对比两个工具在"只保留一个成员"时谁更顺口:
type DeliveredByExtract = Extract<OrderStage, 'shipped'> // 这个更顺
type DeliveredByExclude = Exclude<OrderStage, 'pending' | 'paid' | 'cancelled'>

// ②c 列表接口可能给空值(标题可为 null/undefined),下拉框只吃真字符串:
type MaybeTitle = string | null | undefined
type CleanTitle = NonNullable<MaybeTitle>

// ③ 真·借类型实战:fetchUsers 封装在别的文件里,你没权限改。
//    store 初始化想给 users 一个准确类型 —— 不用 any、不手抄、不许看返回实现猜:
async function fetchUsers() {
  return [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ]
}
type UserList = Awaited<ReturnType<typeof fetchUsers>>

// ============================================================
// 任务 3:消费验证(改完任务 2 后取消注释 / 补全,运行看结果)
// 底下的声明想表达"这些类型真的能用",每行都应 check 绿。
// 被注释掉的 bad 行,取消注释应当报错 —— 这就是类型在拦你。
//
// 为什么包一层 async main()?两个原因(都跟"全仓一起编译"有关):
//   ① 顶层不能写 await(仓库 tsconfig 是 CommonJS,顶层 await 报 TS1378);
//   ② 所有练习文件共享全局作用域,顶层 const 名要全仓唯一;
//      把演示值包进函数里,它们就不再是全局,不跟别的课撞名。
// ============================================================
async function main() {
  const form: UserFormData = { name: '小明', age: 18 }
  const rec: UserRecord = { id: 1, name: '小明' }
  // const recBad: UserRecord = { id: 1, name: '小明', email: 'x' }  // 取消注释:应报错(email 不在返回里)
  // 对象字面量只能指定已知属性，并且“email”不在类型“{ id: number; name: string; }”中

  const detail: OrderDetail = { id: 7, items: ['键盘'] }
  const cancels: CancelableState[] = ['pending', 'paid']
  // const cancelBad: CancelableState = 'shipped'   // 取消注释:应报错
  // 不能将类型“"shipped"”分配给类型“CancelableState”

  const delivA: DeliveredByExtract = 'shipped'
  const delivB: DeliveredByExclude = 'shipped'
  // const delivBad: DeliveredByExtract = 'paid'     // 取消注释:应报错
  // 不能将类型“"paid"”分配给类型“"shipped"”

  const title: CleanTitle = '首页'
  // const titleBad: CleanTitle = null                // 取消注释:应报错
  // 不能将类型“null”分配给类型“string”

  const acc: Account = new Account(1, '小明')
  const acc2: InstanceType<typeof Account> = acc // 两行应能互赋

  const users: UserList = await fetchUsers()
  console.log({ form, rec, detail, cancels, delivA, delivB, title, acc2, users })
  //   {
  //   form: { name: '小明', age: 18 },
  //   rec: { id: 1, name: '小明' },
  //   detail: { id: 7, items: [ '键盘' ] },
  //   cancels: [ 'pending', 'paid' ],
  //   delivA: 'shipped',
  //   delivB: 'shipped',
  //   title: '首页',
  //   acc2: Account { id: 1, owner: '小明' },
  //   users: [ { id: 1, name: 'A' }, { id: 2, name: 'B' } ]
  // }
}

void main()
