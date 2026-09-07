<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// count 的类型是 Ref<number>
const count = ref(0)
// user 的类型是 { name: string; age: number;}
const user = reactive({
  name: 'John Doe',
  age: 30
})
// user.phone = '...'
// 类型“{ name: string; age: number; }”上不存在属性“phone”

// 返回 ComputedRef<string>
const fullName = computed(() => {
  return `${user.name} (${user.age})`
})
console.log(fullName.value) // John Doe (30)
// fullName.value = 'sfdf'
// 无法为“value”赋值，因为它是只读属性。

const reCont = reactive({count})
console.log(reCont.count)
// { count: number;}
const nameInputRef = ref<HTMLInputElement | null>(null)
function focus() {
  nameInputRef.value?.focus()
  // “nameInputRef.value”可能为 “null”
}
</script>

<template>
  <div>
    count: {{ count }}
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
    <button @click="count = 0">Reset</button>

    <input ref="nameInputRef" v-model="user.name" placeholder="Enter name" />
    <button @click="focus">Focus</button>
  </div>
</template>
