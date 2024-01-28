<template>
  <div class="dashboard">
    <DashboardCharts />
    <DashboardTab />
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import DashboardCharts from './DashboardCharts.vue'
  import DashboardTab from './DashboardTab.vue'

  const data = ref('')

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
