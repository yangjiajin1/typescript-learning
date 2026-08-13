/**
 * 第 10 课练习:可辨识联合与穷尽检查
 *
 * 运行方式:
 *   npx tsx lessons/10-可辨识联合/exercise.ts   # 运行本文件
 *   npm run check                              # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   可辨识联合(discriminated union) → 联合的每个成员都带一个"判别字段"
 *     三要素:① 所有成员有同一个判别字段(通常叫 type 或 kind)
 *            ② 判别字段是字面量类型(不是 string!)
 *            ③ 每个成员的判别值互不相同
 *   switch 收窄 → switch(order.type) 后,每个 case 里 order 被收窄成对应成员
 *   穷尽检查   → default 分支里写 const x: never = order,未来新增状态就报错
 *
 * 和第 9 课的关系:你写的 kind === "cat" 就是可辨识联合的雏形。
 * 今天升级成完整形态:每个状态可以携带自己的专属数据。
 */

// ===== 任务 1:建模"订单"可辨识联合 =====
// 需求:一个订单有 4 种状态,每种状态携带自己的数据:
//   - 待支付:有支付链接 paymentUrl 和金额 amount
//   - 已支付:有支付时间 paidAt
//   - 已发货:有运单号 trackingNo
//   - 已取消:有原因 reason
// 做法:先定义 4 个成员类型(判别字段统一叫 type,值是字面量),
//   再联合成 type OrderState = ...(命名已避开了其他课程占用的名字)
// 写完构造 4 个订单对象(每种状态一个),console.log 验证。
// 卡点提示:判别字段的值是"待支付"这样的字面量,不是 string!
type OrderPending = {
  type: '待支付'
  paymentUrl: string
  amount: number
}
type OrderPaid = {
  type: '已支付'
  paidAt: string
}
type OrderShipped = {
  type: '已发货'
  trackingNo: string
}
type OrderCancelled = {
  type: '已取消'
  reason: string
}
type OrderRefunded = {
  type: '已退款'
  refundAt: string
}
type OrderState = OrderPending | OrderPaid | OrderShipped | OrderCancelled | OrderRefunded

const order_1: OrderState = {
  type: '待支付',
  paymentUrl: 'https://pay.example.com',
  amount: 100,
}
const order_2: OrderState = {
  type: '已支付',
  paidAt: '2024-06-01T10:00:00Z',
}
const order_3: OrderState = {
  type: '已发货',
  trackingNo: '1234567890',
}
const order_4: OrderState = {
  type: '已取消',
  reason: '用户取消订单',
}

console.log(order_1, order_2, order_3, order_4)

// ===== 任务 2:写渲染函数 renderOrder =====
// 需求:renderOrder(order: OrderState): string,用 switch (order.type) 收窄:
//   - 待支付 → 返回 `请去 ${order.paymentUrl} 支付 ${order.amount} 元`
//   - 已支付 → 返回 `已支付,时间 ${order.paidAt}`
//   - 已发货 → 返回 `已发货,运单号 ${order.trackingNo}`
//   - 已取消 → 返回 `已取消:${order.reason}`
// 写注释:每个 case 里 order 被收窄成了哪个成员?为什么能访问专属字段?
// 写完调用 4 次(每种状态一次),运行验证。
function renderOrder(order: OrderState): string {
  switch (order.type) {
    case '待支付': // order 在这个分支里是 OrderPending 类型
      return `请去 ${order.paymentUrl} 支付 ${order.amount} 元`
    case '已支付': // order 在这个分支里是 OrderPaid 类型
      return `已支付,时间 ${order.paidAt}`
    case '已发货': // order 在这个分支里是 OrderShipped 类型
      return `已发货,运单号 ${order.trackingNo}`
    case '已取消': // order 在这个分支里是 OrderCancelled 类型
      return `已取消:${order.reason}`
    case '已退款': // order 在这个分支里是 OrderRefunded 类型
      return `已退款,时间 ${order.refundAt}`
    default: {
      return assertNever(order)
    }
  }
}
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}
console.log(renderOrder(order_1))
console.log(renderOrder(order_2))
console.log(renderOrder(order_3))
console.log(renderOrder(order_4))

// ===== 任务 3:故意漏一个分支 =====
// 把任务 2 的 "已取消" case 注释掉(或者删掉),跑 npm run check。
// 观察报错信息,抄写下来并翻译成大白话(写在注释里)。
// (提示:这验证了你第 9 课结尾的猜测——漏状态会怎样)
// 看完后把 case 恢复。
// Function lacks ending return statement and return type does not include 'undefined'

// ===== 任务 4:default: never 穷尽检查 + 运行时兜底 =====
// 在任务 2 的 switch 末尾加 default 分支:
//   default: {
//     const _exhaustive: never = order   // ← 编译期穷尽检查
//     return "未知状态"                    // ← 运行时兜底
//   }
// 注意:这行 never 断言是"编译期"的检查——类型没穷尽就报错;
//   后面的 return 是"运行时"的兜底——真实数据超出类型定义时给个安全响应。
//   两者职责不同,可以共存。为什么?见下方"思考"。
// 这时代码应该全绿。
// 然后模拟"未来新增状态":临时在 OrderState 里加第 5 个成员
//   { type: "已退款"; refundAt: string }
// 跑 check,观察 default 里报什么错,写注释。
// Type 'OrderRefunded' is not assignable to type 'never'
// (提示:新增状态后,default 里的 order 还是 never 吗?报错的是哪一行?)
// 看完把新成员删掉,恢复全绿。
//
// 思考(写注释):"default 永远到不了"只是【类型层面】的说法。
//   如果后端下发了一个 type 为"已退款"的订单(前端类型定义里没有),
//   运行时 switch 找不到匹配的 case,会真的走进 default——
//   因为运行时根本没有类型检查。这就是为什么 default 里既要
//   never 断言(管"代码演进"),也要兜底逻辑(管"运行时脏数据")。

// ===== 任务 5:为什么判别字段必须是字面量 =====
// 临时把任务 1 里"待支付"成员的 type: "待支付" 改成 type: string,
// 跑 check,看报错出现在哪、说什么。写注释说明原因。
// Type 'OrderState' is not assignable to type 'never'.
  // Type 'OrderPending' is not assignable to type 'never'
// (提示:判别字段变成 string 后,case "待支付" 能匹配几个成员?
//   TS 还分得清"这个 case 是哪个成员"吗?)
// 看完改回来,保持全绿。
// 最后写注释总结:判别字段必须是字面量的本质原因是什么?
// 因为 TypeScript 需要通过字面量的精确值来进行类型收窄。如果使用 string 类型，TypeScript 无法确定具体的类型，导致类型收窄失败。
