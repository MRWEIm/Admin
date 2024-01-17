<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <div class="flex flex-row gap-5">
        <va-select v-model="search.property" class="mb-8" label="Property" :options="Workerspty" />
        <va-input v-model="search.input" class="mb-8" :error-messages="inputError" :error="!!inputError.length" />
        <va-button @click="onsearch"> {{ t('Search') }}</va-button>
      </div>
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
  const itemnum = ref(10)
  const inputError = ref<string[]>([])
  const search = ref({
    property: 'WorkerID',
    input: '',
  })
  const Workerspty = ref(['WorkerID', 'Name', 'Department'])
  const WorkerDatapty = ref(['WorkerID', 'SensorID', 'TIMESTAMP', 'x', 'y', 'z', 'w'])
  const SensorDatapty = ref(['WOrkerID', 'Timestamp', 'HR', 'BP'])
  const property = ref()
  
  // 当表格更换时刷新参数
  watch(  
    () => tabValue.value,  
    (newValue, oldValue) => {  
      activePage.value = 1; 
      search.value.input = '';
    },  
    { immediate: true }  
  );  
  // 获取数据
  watchEffect(() => {  
    
    axios.get('http://123.207.9.26:5000/admin_data',{ 
              params: { 
                request: 'getdata',
                table: tabTitles[tabValue.value],
                item: itemnum.value,
                page: activePage.value }})
          .then(response => { data.value = response.data[1].dt;
                              numofpage.value = response.data[0].page;
                              console.log(response); })
          .catch(error => {  console.error(error); })
  })
  // 获取查询数据
  function onsearch(){
    inputError.value = search.value.input != '' ? [] : ['Input is needed']
    console.log(inputError.value)
    if(inputError.value == ''){
      axios.get('http://123.207.9.26:5000/admin_data',{
              params: {
                request: 'search',
                table: tabTitles[tabValue.value],
                property: search.value.property,
                input: search.value.input,
                item: itemnum.value,
                page: activePage.value }})
          .then(response => { data.value = response.data[1].dt;
                              numofpage.value = response.data[0].page;
                              console.log(response)})
          .catch(error => {console.error(error);})
    }
  }
</script>
