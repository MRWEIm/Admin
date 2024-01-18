<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <form>
        <div class="grid grid-cols-12 gap-6">
          <div class="flex col-span-3">
            <va-select v-model="search.property" label="Property" :options="users[tabValue].property" />
          </div>
          <div class="flex col-span-7">
            <va-input v-model="search.input" :error-messages="inputError" :error="!!inputError.length" placeholder="Input data for search" />
          </div>
          <div class="flex col-span-2">
            <va-button style="margin-right: 0" @click="onsearch">Search</va-button>
          </div>
        </div>
      </form>
      <va-tabs v-model="tabValue" class="w-fill" grow>
        <template #tabs>
          <va-tab v-for="title in tabTitles.slice(0, 3)" :key="title">
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <table class="va-table va-table--striped va-table--hoverable w-full">
        <thead>
          <tr>
            <th v-for="heads in users[tabValue].heads" :key="heads.head">{{ heads.head }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dt, index) in data" :key="index">
            <td>{{ (activePage - 1) * itemnum + index + 1  }}</td>
            <td v-for="item in users[tabValue].bodys" :key="item.body">{{ dt[item.body] }}</td>
          </tr>
        </tbody>
      </table>
      <va-pagination v-model="activePage" class="col-span-12 xl:col-span-6 row justify-center" :visible-pages="3" :pages=numofpage />
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { reactive, ref, watchEffect, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import users from '../../../data/tab/users.json'

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

  // 当表格更换时刷新参数
  watch(  
    () => tabValue.value,  
    (newValue, oldValue) => {  
      activePage.value = 1; 
      search.value.input = '';
      search.value.property = users[tabValue.value].property[0]
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
