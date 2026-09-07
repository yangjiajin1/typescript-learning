# 学习进度

> 每个会话结束时由 Claude 更新。这是跨会话续学的唯一依据,必须保持准确。
> 更新时间:2026-09-07(第 21 课完成)

## 学习者信息

- 起点:A 档(JS/ES6+ 扎实,TS 未系统学过)
- 目标:B 档(能写出好类型,克制 any)
- 当前课程:第 21 课已完成,下一课第 22 课(defineProps/defineEmits 类型)
- 学习开始日期:2026-08-07

## 课程进度

| 课 | 名称 | 状态 | 完成日期 | 备注 |
|---|---|---|---|---|
| 1 | TS 是什么——类型注解 | ✅ | 2026-08-07 | 练习四任务完成,check 全绿;自测全对 |
| 2 | 类型推断 | ✅ | 2026-08-07 | 预判 7/8;联合类型+元组概念留悬念 |
| 3 | 原始类型与字面量类型 | ✅ | 2026-08-07 | 动手验证 as const 推断;自测 3/3 |
| 4 | interface 与 type | ✅ | 2026-08-10 | 练习四任务完成,check 全绿;extends/交叉/声明合并要点已讲;自测 2/3 |
| 5 | 数组与元组 | ✅ | 2026-08-11 | 四任务全过,check 全绿;自测 2/3(第 1 题漏 undefined 叠加)|
| 6 | null/undefined 与严格空检查 | ✅ | 2026-08-11 | 五任务全过,check 全绿;自测 3/3;已能用 if 判断做"窄化"雏形(第 9 课正式学)|
| 7 | 联合类型 | ✅ | 2026-08-12 | 练习 check 全绿,运行正确;审阅纠正"报错看类型不看值";任务3漏 undefined(旧错复发,已记错题本);自测 3/3 |
| 8 | 交叉类型与接口扩展 | ✅ | 2026-08-12 | 练习 check 全绿;任务4"定义时报错 vs 使用时才炸"总结到位,第4课同名属性错题翻篇;自测:题1补声明合并、题2报错类型看走眼、题3(interface不能extends字面量联合)讲解后验证通过 |
| 9 | 类型守卫与窄化 | ✅ | 2026-08-13 | 五任务全过,check 全绿,运行正确;自测 3 题:题1 漏 in/字面量守卫、题3 typeof 窄化陷阱答反(TS 排除 null 得 never) |
| 10 | 可辨识联合与穷尽检查 | ✅ | 2026-08-13 | 五任务全过,check 全绿;自测题1全对、题2 default 漏 never 断言(已讲解修正);引入 assertNever 模式 |
| 11 | any / unknown / never | ✅ | 2026-08-13 | 四任务完成,check 全绿,改写零 any;任务1预测"toUpperCase 对中文会报错"错误(JS 运行时行为:对中文原样返回,非类型错误);任务3用 allowUnreachableCode:false 亲眼验证 never 调用后 TS7027;自测 3 题全对 |
| 12 | 泛型入门 | ✅ | 2026-08-18 | 练习四任务全过,check 全绿;掌握 泛型&lt;T&gt; / 推断保留字面量(identity(42)→42) / extends 约束(keyof)/ T[K];first 全局重名改名 firstItem;自测 3 题全对 |
| 13 | 泛型进阶 | ✅ | 2026-08-24 | 任务1-3全过(任务3卡点3个:方括号索引Map/new Map隐含any/新建数组漏元素);任务4默认参数三问初答偏题(默认值=最常用类型、约束vs默认值两轴、T是元素类型非分页参数),函数默认参数类比讲解后改正;自测题1漏a/c状态、题2默认值须满足约束答对;check全绿 |
| 14 | 泛型实战 + 阶段复盘 | ✅ | 2026-08-26 | 任务1预测基本全对(②字段名笔误 value→error);任务2 Result+request 首版把 T 当元素致 value 成 [][] 双层数组(check 报错),改 T 承载整体后全绿;复盘改口头三连问;自测3题全对(题3 as T 边界断言理解到位) |
| 15 | 索引签名、Record 与 keyof | ✅ | 2026-08-31 | 任务1预测全对(索引签名读值叠undefined/Record展开/keyof/泛型键T[K]);任务2①首版值类型误用 number(场景是 string 文案)已改对,Record 锁键 vs 索引签名放行体会到位;②getValue 泛型 T[K] 不叠 undefined(与任务1④具体类型 Dict 叠 undefined 对照);自测3题全对,零 any |
| 16 | 工具类型(上) | ✅ | 2026-09-02 | 任务1预测基本全对(②a 填空漏了、④e 判断当前结构等价答反);手写 MyPartial/MyRequired/MyReadonly 与内置逐字一致;Pick/Omit 选型理由到位;EditDraft 嵌套方向对;自测 3 题全对;零 any |
| 17 | 工具类型(下) | ✅ | 2026-09-02 | 任务1预测全对(②async只剥一层拿Promise、③Parameters元组含可选undefined、④InstanceType、⑤集合三兄弟);任务2全对(①借类型三连零手抄、③UserList async拆两层、②b白名单Extract直觉对→讲解对比Exclude黑名单:源加状态时Exclude会漏新成员);自测3题:题1、题2全对,题3两处口误已纠正(函数是值非"不是值";typeof Class是构造器类型非实例,实例须InstanceType拆);check绿、运行对、零any。注:脚手架全局撞名(OrderState/const users)为讲师失误非用户错误,已记长期记忆防复发 |
| 18 | 条件类型与 infer | ✅ | 2026-09-03 | 任务1预测:①a/b对、①c"多了判断"表述含糊(补:条件extends=可赋值性,与普通赋值同规则)、②a/b对、③Parameters源码猜中一字不差(③a方向对,补:元组因参数个数不定需列表表达);任务2三手写全对(MyReturnType与内置一字不差、UnwrapPromise两分支全、IsArray先用any[]→指出占位any后主动改unknown[],check仍绿);挑战题IsArray<string\|number[]>预测false漏分布式,实为boolean——已记错题本,讲解裸T/包住[T]对照后自测3题:题1✅(number\|string推理完整)、题2✅(无架子无形状,命中infer本质)、题3包住版AllStr<'a'\|42>=false✅(裸版boolean未实敲,机制此前已两推);check绿、运行对。文件尾部补"裸vs包住"四行复习对照 |
| 19 | 声明文件 .d.ts | ✅ | 2026-09-03 | 任务1 预测+TS7016 抄译全对;任务2 首版变量 declare 漏 export、函数 export(受 auto-imports.d.ts 的 declare global 语境误导),实验钉死规则「被 import 的模块声明统一 export、declare 可省」;任务3 试错①②③全对;挑战 escapeHtml 预做:check 绿但运行崩 → 声明必须忠实于实现;自测 Q1(declare module 场景)/Q2(三斜线)补讲后确认题过、Q3 对;全程零 any;新结构为多文件(main.ts + string-utils.js + .d.ts),运行命令是 npx tsx .../main.ts |
| 20 | tsconfig 解读与渐进加固 | ✅ | 2026-09-04 | 用户主动定位为"了解级/现查知识",撤掉「抄 tsconfig 逐项写注释」的写文件作业(合理减负,已记学习偏好防复发);口语快查 4 题全对:数出 strictNullChecks/useUnknownInCatchVariables/noImplicitAny 且作用全对(其余 strict 旋钮低频定位现查)、noUncheckedIndexedAccess 非 strict 成员且答"管越界 undefined"、target=编译语法版本/module=模块格式、渐进先 noImplicitAny 抓隐式再啃 strictNullChecks(策略到位);无真实 TS 工作项目可读,读项目实战环节跳过、留待 Vue 部分真配置;零 any、零错题 |
| 21 | Vue3 环境与 ref/reactive 类型 | ✅ | 2026-09-07 | 建 vue-practice(Vite vue-ts 模板,独立 tsconfig,vue-tsc -b 基线绿);讲解 ref/reactive/computed 推导 + 显式 Ref&lt;T&gt; 两场景 + 解包规则;练习四任务+加分题全过:ref(0)→Ref&lt;number&gt;、reactive 无 .value 且按字面量锁死形状(运行时加属性报错,连回第15课索引签名对比)、computed→ComputedRef 只读、加分题 reactive({ref}) 自动解包成原始值类型且响应式仍活、模板 ref 用 ref&lt;HTMLInputElement\|null&gt;(null)+?. 判空(null! 克制);自测3题核心全对,题2表述把完整类型当裸类型(ComputedRef&lt;boolean&gt; 说成 boolean)已口头补正:「完整类型带 Ref/ComputedRef 壳,裸 T 只出现在 .value 与模板解包处」;零 any、零新错题 |
| 22 | defineProps/defineEmits 类型 | ⬜ | | |
| 23 | v-model 与 defineModel | ⬜ | | |
| 24 | 数据层类型实践 | ⬜ | | |
| 25 | 毕业项目启动 | ⬜ | | |
| 26-29 | 毕业项目迭代 | ⬜ | | |
| 30 | 毕业评估 | ⬜ | | |

## 错题本

> 格式:`- [日期] 错误描述(错误代码/报错)→ 原因 → 教训`

- [2026-08-07] 预判多分支函数 `pick(x)` 返回类型,猜成 `number` → 只看了 else 分支,没合并所有 return 路径 → 多返回路径时,返回值类型 = 所有可能类型的并集(如 `string | number`)
- [2026-08-07] 预判混合数组 `[1, "a"]`,猜成元组 `[number, string]` → 元组需显式注解,默认推断是联合元素数组 → 混合数组推断为 `(string | number)[]`;元组第 5 课再学
- [2026-08-10] 自测:说不出 interface 的两种独有能力,只答出"继承" → 还没接触"声明合并"概念 → interface 独有:声明合并(同名 interface 自动合并)与 extends 继承;type 用 `&` 只能近似模拟继承,声明合并 type 完全做不到
- [2026-08-10] 自测:判断 `Person & { name: string; title: string }`,以为用 name 时必报错 → 把"同名属性"当成"必然冲突" → 交叉类型同名属性:类型相同(都 string)→ 交集仍是 string,合法;只有类型不同(如 `string & number`)→ 交集为 `never`,使用处才报错
- [2026-08-11] 自测:判断 `(string | number)[]` 的 `arr[0]`,答成 `string | number` → 只想到"元素本身是联合类型",忘了 noUncheckedIndexedAccess 下下标访问可能越界 → 数组下标取值 = 元素类型与 `undefined` 的叠加;元素是联合时就是 `string | number | undefined`(任务 4 里 `string[]` 判断对了,元素一换就漏——两个独立问题叠在一起,不可混为一谈)
- [2026-08-12] 练习任务 3:预判 `(string | number)[]` 的 `flags[0]`,又答成 `string | number`,漏 `undefined` → 只想到"联合只能调共有方法",再次忘了越界叠加(2026-08-11 同款,**复发**) → 联合 + 下标两个独立约束叠加时,任何元素访问都是「元素联合类型 | undefined」;「数组下标取值 = 元素 | undefined」这条要钉死
- [2026-08-12] 自测:问 `{a}&{b}` 与 interface extends 的差异,只答"结果一样" → 光想结果类型,没想起第 4 课 interface 独有能力(声明合并) → 两者结果等价但行为边界不同:同名冲突时 `&` 合成 never(使用时才炸)、extends 定义处直接拒绝;同名 interface 可声明合并、`&` 不能。比差异要往"行为"想
- [2026-08-12] 自测:`type X = {id:string} & {id:number}`,构造 `{id:"1"}` 报错,却写成"number 不能分配给 never",实际是 "string" → 套用了任务 4b 的报错(number),没看题里值给的是 "1"(string) → 报错信息里出现的类型 = 被赋值表达式的类型(赋 "1"→报 string,赋 123→报 number);看报错先看"赋进去的是什么类型"
- [2026-08-13] 自测:问 `string | null` 在 `typeof x === "object"` 分支里 TS 认为 x 是什么,答成 "null" → 把"运行时 typeof null 确实是 object"当成了"TS 类型上也这样想",方向想反 → TS 窄化时特意把 null 排除在 object 分支之外(只剩 string 被排掉→该分支是 never);运行时 null 反而真会进这个分支 → typeof 碰对象不可靠:判断 null 用 `=== null`,判断数组用 `Array.isArray`,判断类实例用 instanceof;「TS 类型视角 ≠ 运行时视角」
- [2026-08-13] 自测题 2:default 只写 `return '未知状态'`,漏了 never 断言,预测"加草稿状态写了 default 就返回呗" → 把运行时兜底误当成也有编译期保护 → 穷尽检查的保护来自 never 断言行(`const x: never = state` 或 `assertNever`),default 本身只管运行时;只兜底 → 加新状态静默返回,带 never 断言 → 加新状态编译报错,两行两个世界
- [2026-08-19] 任务2:容器换成 `new Map<K, V>()` 后仍写 `cacheObj[key] = value` 方括号索引 → 只换了存储对象,没换访问方式 → Map 不是普通对象,读写用方法 `.set()`/`.get()`;换容器时,访问语法要跟着换(对象用方括号,Map 用方法)
- [2026-08-19] 任务3:indexBy 里写 `per.set(key, item)`,用"键的名字"当 Map 的键 → 把 `key`(字符串 "id"/"name")与 `item[key]`(字段的值 1/2/"张三")混为一谈 → 按字段值分组时,键必须取 `item[key]`(每项对应字段的值),不是 key 本身;键名 vs 键值,两个概念
- [2026-08-19] 任务3:问"Map 有 push 方法吗",想直接对 Map push → 混淆 Map 与 Array → push 是数组的方法;Map 只有 set/get;合并操作 = 先 get 出数组,对数组 push,没有就 set 一个带当前元素的新数组
- [2026-08-19] 任务3:else 分支写 `per.set(item[key], [])`,新建空数组把当前 item 弄丢(李四只出现一次→返回 [])→ "新建"分支忘了带上当前元素 → 头一回见某键时,数组要建 `[item]` 直接带上当前项;验证输出(张三丢第一条/李四空数组)才暴露
- [2026-08-24] 任务4a:问"什么接口适合加默认类型参数",答"语义明确的" → 概念题答成空话,没落到判断标准 → 判断标准要具体:「绝大多数调用方都用同一个类型时加默认,让调用方少写」;默认值 = 最常用的那个类型
- [2026-08-24] 任务4b:答"不冲突,继承关系" → 把约束和默认值当成继承关系 → extends 管"调用方能填什么",默认值管"不填时用哪个",两根独立轴、不冲突;且默认值本身也要满足约束(`T extends string` 时默认 `number` 直接报错)
- [2026-08-24] 任务4c:答"不合理,分页请求应该有分页相关参数" → 把 `Paginated<T>` 的 T 当成"分页参数" → T 是"列表元素类型"(`Paginated<User>` = 一页 User),与请求侧分页参数无关;合不合理只看默认值是否最常用,不常用时忘写会静默用错类型,编译不报、运行才炸
- [2026-08-24] 自测题1:判断 `Box<T=string>` 三个变量,只答 b 报错,漏说 a、c 都合法 → 只挑报错的答,没逐个覆盖 → 判断类型题要把每个选项过一遍:a(默认string/赋string)合法、b(默认string/赋number)报错、c(显式number/赋number)合法;漏"不报错的"也是覆盖不全
- [2026-08-26] 任务1②:预测 err1 类型写成 `{ ok: false; value: string }`,字段名写成 value → 只想着"有个 string 字段",没核对字段名 → 字段名是类型结构的一部分,写错照样报错(bad2 撞的就是 "value 不在类型中";成功分支才是 value,失败分支是 error)
- [2026-08-26] 任务2:request 首版签名 `request<T>(url, params: T[]): Promise<MyResult<T[], string>>`,把 T 当"单个元素",成功数据另套一层 T[],调用方又填 `{ id: number }[]`,叠加成 `{ id: number }[][]`,check 报 "id 不在 { id: number }[] 中" → 泛型参数的角色(元素 vs 整体)设计错 → T 应代表"成功数据整体"(`mock: T`,value 直接用 T);写完悬停看实际推断,check 绿 ≠ 类型对
- [2026-08-31] 任务2①:statusAction 首版写成 `Record<OrderPhase, number>`、值填 1/2/1/1 → 场景是"下一步动作按钮文案"(应为 string),却随手建模成 number → 类型是对场景的建模,值类型由需求决定,不是随手挑的;check 绿 ≠ 场景对(与第 14 课"check 绿 ≠ 类型对"同一教训),先读需求再定类型
- [2026-09-02] 任务1④e:判断 `Pick<User,'id'|'name'>` 与 `Omit<User,'email'>`"不等价" → 只凭"语义分工不同"下结论,没落到当前结构上:User 恰好 3 键,去掉 email 剩的正是 id+name,结构上相等、能互赋 → 判断等价先看结构(当前相等),再想演进(Pick=写死的保留名单,源加字段不变;Omit=开放差额,源加字段自动跟上;"当前撞车 ≠ 行为相同"与第 8 课"结果等价但行为边界不同"同类)
- [2026-09-02] 自测题3:问 ApiResp 只留 code/message 该用 Pick 还是 Omit(现在两者都行),结论 Pick 对,但理由写成"因为不想要 data/extra、也就是想要 code/message" → "不想要哪些"本身也导向 Omit,单凭它判断会绕 → 判据是该类型是固定契约还是自动跟随源类型:前端展示"只要 code+message"是固定契约 → Pick 不让类型漂移;需要随源新增字段再考虑 Omit
- [2026-09-02] 自测题3:答"直接写 `ReturnType<createUser>` 报错因为函数不是值" → 函数恰恰是值(能 `createUser(...)` 调用),真正问题是类型位置要放"类型",而 `createUser` 是值名不是类型名 → 类型上下文想引用"某值对应的类型",必须先 `typeof 值名` 翻译;值与类型是两套名字(值空间/类型空间)
- [2026-09-02] 自测题3:答"`typeof Account` 取实例" → `typeof Account` 拿到的是 class 整体类型(构造器签名),不含实例 → `typeof Class` ≠ 实例类型;实例要 `InstanceType<typeof Class>` 再拆一层,与"ReturnType 拿 Promise → Awaited 再拆"同套剥层思路
- [2026-09-03] 挑战题:预测 `IsArray<string | number[]>` 得 false → 只把"整个联合"当一个东西判"是不是数组",没想起条件类型左侧是**裸 T** 时会分布式 → 裸类型参数 + 联合实参 = 联合被拆成成员逐个过、结果拼回联合:`string`→false、`number[]`→true → `boolean`(非 false);Exclude 能对联合逐个删也是这机制。判断"会不会分布式"就看左侧 T 是不是"光着"的;想关掉用 `[T]` 包住 = 整个联合当整体、一个不达标全盘否(`AllStr<'a'|42>`=false vs 裸版=boolean)
- [2026-09-03] 任务2 写 string-utils.d.ts:变量写 `declare const version`(无 export)、函数写 `export function`,把 export/declare 当成"函数用/变量用"的分工 → 参考了 auto-imports.d.ts(它站在 `declare global{}` 块内,declare 隐含、const 天然是全局声明),把"全局声明语境"的写法误搬到"模块声明" → export 管"进不进模块对外接口"、declare 管"是否纯类型声明",两根独立轴;被 import 的模块 .d.ts 每个导出都写 export、declare 可省(官方模板 `export declare` 亦可);先问"这符号是 import 用还是全局直接用"再选声明形态
- [2026-09-03] 自测 Q1:declare module 的应用场景答不上("不太清楚")→ 没分清「裸包 import(无自带类型又无 @types)」与「相对路径 import(有真 JS、同名 .d.ts 配对)」是两条不同的类型供给路径 → 裸包且无人供类型 → 在任意 .d.ts 用 `declare module '包名' { ... }` 无中生有声明模块(背后无可配对的 .d.ts,用字符串模块名当锚点);相对路径有真 JS → 同名 .d.ts + export;全局免 import 用 declare global;确认题(老 xlsx 包 → declare module 'xlsx')已答对翻篇

## any 记录

> 格式:`- [日期] 场景:什么代码用了 any → 原因 → 是否已消除`

- [2026-08-19] 场景:indexBy 的 reduce 初始值写 `new Map()`,被推断成 `Map<any, any>`,`per.set` 塞什么都放行,类型检查形同虚设 → 原因:没写 any 但任何默认推断给逃逸 → 是否已消除:是,显式写 `new Map<T[K], T[]>()` 后类型接管;教训:any 不一定是写出来的,可能从推断溜进来,`new Map()`/`new Set()` 等默认推断要显式标注
- [2026-09-03] 场景:IsArray 手写写 `T extends any[] ? true : false`(any[])→ 原因是"凭感觉",想表达"数组元素类型不在乎" → 是否已消除:是,当场指出后主动改 `unknown[]`,check 仍绿(`unknown` = 我不知道/不在乎,正是该位置的语义);另 MyReturnType 假分支 `: any` 为官方 ReturnType 同款"死分支兜底"(约束门槛已拦非函数、到不了),保留与内置一致。教训:条件类型的**架子上**判"是不是数组/函数"不需要 any,用 `unknown[]` 即可零 any;占位 any(不进结果)≠ 逃逸 any(流进签名/返回值)——看 any 有没有被"吐出去"判断危险程度

## 20 项毕业能力自测清单

> 毕业评估(第 30 课)时逐项现场验证,通过勾选。

- [ ] 1. 能解释 TS 是编译期检查,运行时输出就是 JS
- [ ] 2. 能预判简单代码的类型推断结果
- [ ] 3. 能写接口与类型别名,并说明取舍
- [ ] 4. 能用字面量类型与 as const
- [ ] 5. 能写元组并说明与数组的区别
- [ ] 6. 理解 strictNullChecks,会用 ?. 和 ??
- [ ] 7. 能用联合类型表达"或"
- [ ] 8. 能用交叉类型 / extends 组合类型
- [ ] 9. 能写类型守卫收窄类型
- [ ] 10. 能用可辨识联合 + never 做穷尽检查
- [ ] 11. 能解释 any / unknown / never 的区别与取舍
- [ ] 12. 能写带约束的泛型函数
- [ ] 13. 能设计泛型接口 / 多参数泛型
- [ ] 14. 能用 keyof / Record / 索引签名
- [ ] 15. 能说明 Partial / Pick / Omit / ReturnType 等工具类型的原理
- [ ] 16. 能读懂条件类型与 infer(如 ReturnType 源码)
- [ ] 17. 知道 @types 机制,能写简单 .d.ts
- [ ] 18. 能逐项解释自己项目的 tsconfig(strict 相关)
- [ ] 19. Vue:能解释 ref / computed 的类型推导,会显式标注 Ref&lt;T&gt;
- [ ] 20. Vue:能给组件定义类型化 props / emits / v-model

## 毕业证书

> 第 30 课通过后填写。

- 毕业日期:____
- 评估结果:____
- 后续建议:____
