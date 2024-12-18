<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Dashboard Container -->
    <div class="max-w-7xl mx-auto">
      <!-- Page Title -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
      </div>

      <!-- Top Row: Ventes Totales and Produits les plus vendus -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Ventes Totales -->
        <SalesTotal />
        <!-- Produits les plus vendus -->
        <TopProducts />
      </div>

      <!-- Middle Row: Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Répartition des ventes par catégorie -->
        <SalesByCategoryChart />
        <!-- Les ventes par produit -->
        <ProductSalesChart />
      </div>
      <!-- Bottom Row: Afficher les produits -->
      <ProductsTable />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SalesByCategoryChart from '@/sections/SalesByCategoryChart.vue'
import ProductsTable from '@/sections/ProductsTable.vue'
import SalesTotal from '@/sections/SalesTotal.vue'
import TopProducts from '@/sections/TopProducts.vue'
import ProductSalesChart from '@/sections/ProductSalesChart.vue'
</script>
