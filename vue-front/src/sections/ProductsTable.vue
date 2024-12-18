<template>
  <div class="bg-white p-6 shadow-md rounded-lg relative">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Produits</h2>
    <div class="overflow-x-auto">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="(itm, key) in products" :key="key">
              <td class="px-6 py-4">{{ itm.ProductID }}</td>
              <td class="px-6 py-4">{{ itm.ProductName }}</td>
              <td class="px-6 py-4">{{ itm.Category }}</td>
              <td class="px-6 py-4">{{ itm.Price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-row justify-end mt-4">
        <div class="flex flex-row gap-1 basis-1/12 justify-end">
          <div
            :class="[
              pagination.hasPreviousPage
                ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer'
                : 'border rounded-md p-2 hidden',
            ]"
            @click="paginateTo('prev')"
          >
            <span class="p-1 font-semibold text-gray-600"> prev </span>
          </div>
          <select class="block border text-center rounded-lg p-1" v-model="limit">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <div
            :class="[
              pagination.hasNextPage
                ? 'border rounded-md p-2 hover:bg-gray-100 cursor-pointer'
                : 'border rounded-md p-2 hidden ',
            ]"
            @click="paginateTo('next')"
          >
            <span class="p-1 font-semibold text-gray-600"> next </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, inject, watch } from 'vue'
import type { AxiosInstance } from 'axios'

const page = ref(1)
const limit = ref(10)
const products = ref<ProductType[]>([])
const pagination = ref<PaginationType>({
  currentPage: undefined,
  hasNextPage: undefined,
  hasPreviousPage: undefined,
  pageSize: undefined,
  totalCount: undefined,
  totalPages: undefined,
})

const paginateTo = (val: string) => {
  if (val === 'next' && pagination.value.hasNextPage) {
    page.value++
    fetchProducts()
  }
  if (val === 'prev' && pagination.value.hasPreviousPage) {
    page.value--
    fetchProducts()
  }
}
const axios = inject('axios') as AxiosInstance
const fetchProducts = async () => {
  try {
    const rsp = await axios.get<{ products: ProductType[]; pagination: PaginationType }>(
      '/products',
      {
        params: { page: page.value, limit: limit.value },
      },
    )
    if (rsp.status) {
      products.value = rsp.data.products
      pagination.value = rsp.data.pagination
    }
  } catch (error) {
    console.log(error)
  }
}
watch(limit, () => {
  page.value = 1
  fetchProducts()
})

onMounted(() => {
  fetchProducts()
})
</script>
