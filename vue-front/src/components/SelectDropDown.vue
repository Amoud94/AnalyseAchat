<template>
  <select class="p-2 border rounded-md" v-model="selectValue" @change="$emit('setPeriodFilter', selectValue)">
    <option selected value="">Période</option>
    <option value="7days">7 derniers jours</option>
    <option value="30days">30 derniers jours</option>
    <option value="12months">12 derniers mois</option>
  </select>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const selectValue = ref('')
</script>
