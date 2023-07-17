<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cityname = ref<string>('')
const select = () => router.push(`/city/${cityname.value}`)
</script>

<template>
  <div class="login">
    <h1>This is an login page</h1>
    <div>
      <input type="cityname" v-model="cityname" />
    </div>
    <div>
      <button @click="select">jump!!</button>
    </div>
  </div>
</template>
