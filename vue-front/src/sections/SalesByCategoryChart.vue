<template>
  <div class="bg-white p-6 shadow-md rounded-lg relative">
    <div class="absolute top-5 right-5">
      <SelectDropDown @setPeriodFilter="updateFilterValue" />
    </div>
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Répartition des ventes par catégorie</h2>
    <LoadingDots v-if="isLoading" />
    <div v-else class="p-2 flex justify-center items-center bg-gray-100 rounded-lg">
      <DoughnutChart :chartData="chartData" :options="options" :styles="myStyles" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { ChartData } from 'chart.js'
import { onMounted, ref, inject, watch } from 'vue'
import type { AxiosInstance } from 'axios'
Chart.register(...registerables)
import SelectDropDown from '../components/SelectDropDown.vue'
import LoadingDots from '../components/LoadingDots.vue'


const isLoading = ref(false)
const periodFilter = ref('')

const myStyles = {
  height: '100%',
  width: '100%',
}

const options = ref({
  responsive: true,
  cutout: 150,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: '#555555',
        usePointStyle: true, // Use circular markers in the legend
      },
    },
    tooltip: {
      backgroundColor: '#FFFFFF',
      bodyFont: {
        size: 12,
        family: 'Arial, sans-serif',
      },
      bodyColor: '#333333',
      borderColor: '#CCCCCC',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label(tooltipItem: { dataset: DatasetType; dataIndex: number; label: string }) {
          const dataset = tooltipItem.dataset
          const index = tooltipItem.dataIndex
          const label = tooltipItem.label
          const value = dataset.data[index] ? dataset.data[index].toFixed(2) : 0
          const total = dataset.totals ? dataset.totals[index] : 0
          return [
            `${label}:`, // Category name
            `  Total: $ ${total}`, // Total sales
            `  Percentage: ${value}%`, // Percentage
          ]
        },
      },
    },
  },
  layout: {},
  elements: {
    arc: {
      borderWidth: 2, // Thickness of the border
      borderColor: '#FFFFFF', // Border color of segments
    },
  },
})
const chartData = ref<ChartData<'doughnut'>>({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderRadius: 10,
    },
  ],
})
// Function to generate random colors
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

const transformCategorySales = (categorySales: SalesByCategoryType[]) => {
  // Use a Set to ensure unique colors for each category
  const colorMap: Record<string, string> = {}
  const labels = categorySales.map((item) => item.category)
  const data = categorySales.map((item) => item.percentage)
  const totals = categorySales.map((item) => item.totalSalesByCategory) // Include total sales

  // Assign colors dynamically
  const backgroundColor = categorySales.map((item) => {
    if (!colorMap[item.category]) {
      colorMap[item.category] = generateRandomColor()
    }
    return colorMap[item.category]
  })

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderRadius: 10,
        totals,
      },
    ],
  }
}
const updateFilterValue = (payload: string) => {
  periodFilter.value = payload
}
const axios = inject('axios') as AxiosInstance
const fetchSalesByCategories = async () => {
  try {
    isLoading.value = true
    const rsp = await axios.get<{ categorySales: SalesByCategoryType[] }>(
      '/analytics/category_sales',
      { params: { period_time: periodFilter.value } },
    )
    if (rsp.status && rsp.data.categorySales) {
      chartData.value = transformCategorySales(rsp.data.categorySales)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
watch(periodFilter, fetchSalesByCategories)
onMounted(() => {
  fetchSalesByCategories()
})
</script>
