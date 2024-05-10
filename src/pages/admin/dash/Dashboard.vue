<template>
  <div class="dashboard">
    <DashboardCharts />
    <DashboardTab />
  </div>
</template>

<script setup lang="ts">
  import DashboardCharts from './DashboardCharts.vue'
  import DashboardTab from './DashboardTab.vue'
</script>

<style lang="scss">
  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
