<template>
  <div class="bg-white p-6 shadow-md rounded-lg relative">
    <div class="absolute top-5 right-5">
      <SelectDropDown @setPeriodFilter="updateFilterValue" />
    </div>
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Les ventes par produit</h2>
    <LoadingDots v-if="isLoading" />
    <div v-else class="p-2 flex justify-center items-center bg-gray-100 rounded-lg">
      <BarChart :chartData="chartData" :options="options" :styles="myStyles" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { ChartData } from 'chart.js'
import { onMounted, ref, inject, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import SelectDropDown from '../components/SelectDropDown.vue'
import LoadingDots from '../components/LoadingDots.vue'

Chart.register(...registerables)

const isLoading = ref(false)
const periodFilter = ref('')
const myStyles = {
  height: '100%',
  width: '100%',
}
const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
})
const chartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      borderColor: '',
      backgroundColor: '',
      borderWidth: 0,
      borderRadius: 0,
    },
  ],
})

// Function to generate random colors
const transformToBarChartDataset = (data: SalesByProductType[]) => {
  // Generate unique colors for each bar
  const colors = data.map(() => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, 0.5)` // Background color
  })

  const borderColors = colors.map((color) => color.replace('0.5', '1')) // Border colors

  return {
    labels: data.map((item) => item.productName),
    datasets: [
      {
        label: `Total des ventes: $`,
        data: data.map((item) => item.totalSales),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  }
}
const updateFilterValue = (payload: string) => {
  periodFilter.value = payload
}

const axios = inject('axios') as AxiosInstance
const fetchTotalSales = async () => {
  try {
    isLoading.value = true
    const rsp = await axios.get<{ salesByProduct: SalesByProductType[] }>(
      '/analytics/sales_by_product',
      { params: { period_time: periodFilter.value } },
    )
    if (rsp.status && rsp.data.salesByProduct) {
      chartData.value = transformToBarChartDataset(rsp.data.salesByProduct)
    }
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
