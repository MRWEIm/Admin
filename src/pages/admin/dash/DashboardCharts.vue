<template>
  <div class="grid grid-cols-12 gap-6">
    <va-card class="col-span-8">
      <va-card-title>
        <h6 class="va-h6">{{ '在线人员构成情况' }}</h6>
      </va-card-title>
      <va-card-content>
        <div class="grid grid-cols-12 gap-6">
          <!-- <div class="col-span-3">
            <va-chart :data="locationDataGenerated" type="pie" />
          </div> -->
          <div class="col-span-4">
            <va-chart :data="departmentDataGenerated" type="pie" />
          </div>
          <div class="col-span-4">
            <va-chart :data="ageDataGenerated" type="pie" />
          </div>
          <div class="col-span-4">
            <va-chart :data="genderDataGenerated" type="pie" />
          </div>
        </div>
      </va-card-content>
    </va-card>

    <va-card class="col-span-4">
      <va-card-title>
        <h6 class="va-h6">{{ '疲劳整体情况' }}</h6>
      </va-card-title>
      <va-card-content>
        <va-chart :data="fatigueConditionDataGenerated" type="horizontal-bar" />
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { onMounted, onBeforeUnmount } from 'vue'
  import { useChartData } from '../../../data/charts/composables/useChartData'
  import VaChart from '../../../components/va-charts/VaChart.vue'
  import { ageData, genderData, departmentData, locationData, fatigueConditionData } from './data'

  const color = ['primary', 'secondary', 'success', 'warning', 'danger', 'info']

  locationData.datasets[0].backgroundColor = color.slice(0, 3)
  departmentData.datasets[0].backgroundColor = color.slice(0, 3)

  const locationDataGenerated = useChartData(locationData)
  const departmentDataGenerated = useChartData(departmentData)
  const ageDataGenerated = useChartData(ageData)
  const genderDataGenerated = useChartData(genderData)
  const fatigueConditionDataGenerated = useChartData(fatigueConditionData)

  onMounted(() => {
    const fetchDataInterval = setInterval(async () => {
      axios
        .get('http://123.207.9.26:5000/dashboard', { params: { type: 'Chart' } })
        .then((response) => {
          departmentData.datasets[0].data = response.data.depData.department
          departmentData.datasets[0].backgroundColor = color.slice(0, response.data.depData.Num)
          // locationData.datasets[0].data = response.data.locData.location
          // locationData.datasets[0].backgroundColor = color.slice(0, response.data.locData.Num)
          ageData.datasets[0].data = response.data.ageData.age
          genderData.datasets[0].data = response.data.genderData.gender
          //fatigueConditionData.labels = response.data.columnData.department
          fatigueConditionData.datasets[0].data = response.data.columnData.Energetic
          fatigueConditionData.datasets[1].data = response.data.columnData.STired
          fatigueConditionData.datasets[2].data = response.data.columnData.Tired
        })
        .catch((error) => {
          console.error(error)
        })
    }, 2000)

    onBeforeUnmount(() => {
      clearInterval(fetchDataInterval)
    })
  })
</script>
