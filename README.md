# TypeScript 学习仓库

自学 TypeScript 的练习场——30 课从类型注解到 Vue 3 类型实战,目标是**能写出好类型**(泛型、联合类型、类型守卫、工具类型,`any` 用得克制)。

## 学习路径

| 阶段 | 课程 | 内容 |
|---|---|---|
| 一 | 第 1-6 课 | 看懂类型:注解、推断、字面量、对象、数组元组、空值 |
| 二 | 第 7-14 课 | 类型系统核心:联合/交叉、类型守卫、可辨识联合、泛型 |
| 三 | 第 15-20 课 | 进阶:工具类型、条件类型与 infer、声明文件、tsconfig |
| 四 | 第 21-24 课 | Vue 3 类型实战:ref/reactive、defineProps/Emits、v-model、axios 封装 |
| 五 | 第 25-30 课 | 毕业项目:strict 全开、零 `any` 的 Vue 3 小应用 + 20 项能力自测 |

完整大纲见 [`课程大纲.md`](课程大纲.md),每课含目标、练习、自测与官方文档链接。

## 使用方式

```bash
npm install        # 安装依赖(typescript + tsx + @types/node)
npm run check      # 全量类型检查(tsc --noEmit)
npm run <文件路径>  # 运行单个练习文件(npx tsx)
```

每天在仓库目录开一个新会话,对 Claude 说 **"学习 TS 第 N 课"** 即可继续——进度与错题本记录在 `progress.md`,规则在 `CLAUDE.md`。

## 学习规则

- **禁止代写**:Claude 只做陪练审阅、苏格拉底式引导、出题官
- **每课循环**:讲解 → 练习 → 审阅 → 自测
- **错题必记**:类型错误与每次 `any` 都记入 `progress.md` 错题本
- **strict 底线**:所有练习在 `strict: true` 下进行,不以改配置消错

## 目录结构

```
├── CLAUDE.md          # Claude 使用规则与学习者画像
├── 课程大纲.md         # 30 课完整大纲
├── progress.md        # 学习进度、错题本、any 记录、毕业自测
├── tsconfig.json      # strict 全开
├── lessons/           # 每课一个目录,练习代码
└── vue-practice/      # (第 21 课起)Vue 3 类型实战项目
```

## 状态

- 开始日期:2026-08-07
- 目标:B 档(能写出好类型),C 档类型体操为可选彩蛋
- 毕业条件:30 课完成 + 毕业项目(strict 全开、零 any)+ 20 项自测清单
