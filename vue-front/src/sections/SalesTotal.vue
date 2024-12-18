<template>
  <div class="col-span-1 lg:col-span-1 bg-white p-6 shadow-md rounded-lg relative">
    <div class="absolute top-5 right-5">
      <SelectDropDown @setPeriodFilter="updateFilterValue" />
    </div>
    <h2 class="text-lg font-semibold text-gray-700 mb-5">Ventes totales</h2>
    <LoadingDots v-if="isLoading" />
    <p v-else class="h-full my-auto text-4xl font-bold text-gray-800 pt-5">
      €{{ totalSales.toFixed(2) }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import SelectDropDown from '../components/SelectDropDown.vue'
import LoadingDots from '../components/LoadingDots.vue'

const isLoading = ref(false)
const periodFilter = ref('')
const totalSales = ref(0)

const updateFilterValue = (payload: string) => {
  periodFilter.value = payload
}
const axios = inject('axios') as AxiosInstance
const fetchTotalSales = async () => {
  try {
    isLoading.value = true
    const rsp = await axios.get('/analytics/total_sales', {
      params: { period_time: periodFilter.value },
    })
    if (rsp.status) totalSales.value = rsp.data.totalSales
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
watch(periodFilter, fetchTotalSales)
onMounted(() => {
  fetchTotalSales()
})
</script>
