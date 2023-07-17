<script setup lang="ts">
import { ref, onMounted } from 'vue'
const CountryList = ref<{ countrycode: string; name: string }[]>()
onMounted(async () => {
  const res = await fetch('/api/countrylist')
  if (res.ok) {
    CountryList.value = await res.json()
  }
})
</script>

<template>
  <div>
    <h1>国家一覧</h1>
    <div v-if="CountryList">
      <div v-for="country in CountryList" :key="country.countrycode">
        <router-link :to="`/country/${country.countrycode}`">{{ country.name }}</router-link>
      </div>
    </div>
    <div v-else>ネットワークエラー</div>
  </div>
</template>
