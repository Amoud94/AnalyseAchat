<template>
  <div class="col-span-1 lg:col-span-2 bg-white p-6 shadow-md rounded-lg relative">
    <div class="absolute top-5 right-5">
      <SelectDropDown @setPeriodFilter="updateFilterValue" />
    </div>
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Produits les plus vendus</h2>
    <LoadingDots v-if="isLoading" />
    <ul v-else class="space-y-2" v-for="(itm, key) in TopProducts" :key="key">
      <li class="flex justify-between items-center py-2">
        <span class="font-bold text-gray-800 w-full">{{ itm.name }}</span>
        <span class="text-gray-500 w-full text-center">Total : ${{ itm.totalSales.toFixed(2) }}</span>
        <span class="text-gray-500 w-1/4">Qty : {{ itm.quantity }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import SelectDropDown from '../components/SelectDropDown.vue'
import LoadingDots from '../components/LoadingDots.vue'

const isLoading = ref(false)
const periodFilter = ref('')
const TopProducts = ref<ProductBySalesType[]>([])

const updateFilterValue = (payload: string) => {
  periodFilter.value = payload
}
const axios = inject('axios') as AxiosInstance
const fetchTopProducts = async () => {
  try {
    isLoading.value = true
    const rsp = await axios.get<{ trendingProducts: ProductBySalesType[] }>(
      '/analytics/trending_products',
      { params: { period_time: periodFilter.value } },
    )
    if (rsp.status) TopProducts.value = rsp.data.trendingProducts
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
watch(periodFilter, fetchTopProducts)

onMounted(() => {
  fetchTopProducts()
})
</script>
