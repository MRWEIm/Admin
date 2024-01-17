<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <va-tabs v-model="tabValue" class="w-fill" grow>
        <template #tabs>
          <va-tab v-for="title in tabTitles.slice(0, 3)" :key="title">
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <div v-if="tabValue == 0">
        <Workers :receiveddata="data" :page="activePage" :itemnum="itemnum"></Workers>
      </div>
      <div v-else-if="tabValue == 1">
        <SensorData :receiveddata="data" :page="activePage" :itemnum="itemnum"></SensorData>
      </div>
      <div v-else-if="tabValue == 2">
        <WorkerData :receiveddata="data" :page="activePage" :itemnum="itemnum"></WorkerData>
      </div>
      <va-pagination v-model="activePage" class="col-span-12 xl:col-span-6 row justify-center" :visible-pages="3" :pages=numofpage />
    </va-card-content>
  </va-card>

</template>

<script setup lang="ts">
  import axios from 'axios'
  import { reactive, ref, watchEffect, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import SensorData from './type/SensorData.vue'
  import Workers from './type/Workers.vue'
  import WorkerData from './type/WorkerData.vue'

  const { t } = useI18n()
  const data = ref('')
  const tabTitles = reactive(['Workers', 'SensorData', 'WorkerData'])
  const tabValue = ref(0)
  const activePage = ref(1)
  const numofpage = ref(1)
  const itemnum = ref(20)
  // 当表格更换时计算页码总数
  watch(  
    () => tabValue.value,  
    (newValue, oldValue) => {  
      axios.post('http://123.207.9.26:5000/admin_data', 
                 { table: tabTitles[tabValue.value],
                   item: itemnum.value })
           .then(response => { numofpage.value = response.data.page;
                               activePage.value = 1;
                               console.log(numofpage.value); })
           .catch(error => {  console.error(error); })
    },  
    { immediate: true }  
  );  
  // 获取数据
  watchEffect(() => {  
    axios.post('http://123.207.9.26:5000/admin_data', 
              { table: tabTitles[tabValue.value], 
                page: activePage.value,
                item: itemnum.value})
              .then(response => { data.value = response.data;
                                  console.log(response); })
              .catch(error => {  console.error(error); })
  })

</script>
