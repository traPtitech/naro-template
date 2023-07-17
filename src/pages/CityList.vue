<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ countryCode: string }>()
const cityList = ref<{ name: string }[]>()
onMounted(async () => {
  const res = await fetch(`/api/country/${props.countryCode}`)
  if (res.ok) {
    cityList.value = await res.json()
  }
})
</script>

<template>
  <div>
    <h1>国家一覧</h1>
    <div v-if="cityList">
      <div v-for="city in cityList" :key="city.name">
        <router-link :to="`/city/${city.name}`">{{ city.name }}</router-link>
      </div>
    </div>
    <div v-else>ネットワークエラー</div>
  </div>
</template>
