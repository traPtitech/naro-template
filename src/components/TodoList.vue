<script setup lang="ts">
import { computed, ref } from 'vue'

interface Task {
  name: string
  isFinished: boolean
}

const tasks = ref<Task[]>([])
// 完了済みタスクを計算して保持しておく
const finishedTasks = computed(() => tasks.value.filter((task) => task.isFinished))
// 未完タスクを計算して保持しておく
const notFinishedTasks = computed(() => tasks.value.filter((task) => !task.isFinished))

const newTaskName = ref('')

const addTask = () => {
  // バリデーションを通ったらタスク一覧に追加する
  if (newTaskName.value === '') {
    alert('タスク名を入力してください')
    return
  }
  if (tasks.value.some((task) => task.name === newTaskName.value)) {
    alert('同じ名前のタスクが存在します')
    return
  }
  tasks.value.push({
    name: newTaskName.value,
    isFinished: false
  })
  newTaskName.value = ''
}
const finishTask = (taskName: string) => {
  // タスク名がtaskNameのタスクを完了済みにする
  tasks.value = tasks.value.map((task) => {
    if (task.name === taskName) {
      return {
        ...task,
        isFinished: true
      }
    }
    return task
  })
}
</script>

<template>
  <div>
    <div>TodoList</div>
    <div>完了済みタスク一覧</div>
    <ul>
      <li v-for="task in finishedTasks" :key="task.name">
        <div>{{ task.name }}</div>
      </li>
    </ul>
    <div>未完タスク一覧</div>
    <ul>
      <li v-for="task in notFinishedTasks" :key="task.name">
        <div>{{ task.name }}</div>
        <div>
          <button @click="finishTask(task.name)">完了する</button>
        </div>
      </li>
    </ul>
    <div>
      <label>
        名前
        <input v-model="newTaskName" type="text" />
      </label>
      <button @click="addTask">追加</button>
    </div>
  </div>
</template>

<style></style>
