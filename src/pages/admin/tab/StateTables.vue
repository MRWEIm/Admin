<template>
  <va-card class="markup-tables mb-8">
    <va-card-title>{{ t('tables.basic') }}</va-card-title>
    <va-card-content class="overflow-auto">
      <va-tabs v-model="tabValue" class="w-fill" grow>
        <template #tabs>
          <va-tab v-for="title in tabTitles.slice(0, 1)" :key="title">
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <table class="va-table va-table--striped va-table--hoverable w-full">
        <thead>
          <tr>
            <th v-for="heads in tab[tabValue].heads" :key="heads.head">{{ heads.head }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dt, index) in data" :key="index">
            <td>{{ (activePage - 1) * itemnum + index + 1 }}</td>
            <td v-for="item in tab[tabValue].bodys" :key="item.body">
              <span
                v-if="
                  item.body === 'WristSensorState' ||
                  item.body === 'WatchState' ||
                  item.body === 'ShoulderSensorState' ||
                  item.body === 'WaistSensorState'
                "
              >
                <va-badge :text="(dt as any)[item.body]" :color="getStatusColor((dt as any)[item.body])" />
              </span>
              <span v-else>
                {{ (dt as any)[item.body] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <va-pagination
        v-model="activePage"
        class="col-span-12 xl:col-span-6 row justify-center"
        :visible-pages="3"
        :pages="numofpage"
      />
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { reactive, ref, onBeforeUnmount, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import tab from '../../../data/tab/state/table.json'

  const { t } = useI18n()
  const data = ref('')
  const tabTitles = reactive(['state'])
  const tabValue = ref(0)
  const activePage = ref(1)
  const numofpage = ref(1)
  const itemnum = ref(100)

  function getStatusColor(status: string) {
    if (status === 'active') {
      return 'success'
    }
    return 'danger'
  }

  // onMounted(() => {
  //   const fetchDataInterval = setInterval(async () => {
  //     axios
  //       .get('http://123.207.9.26:5000/state')
  //       .then((response) => {
  //         data.value = response.data
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }, 1000)

  //   onBeforeUnmount(() => {
  //     clearInterval(fetchDataInterval)
  //   })
  // })
</script>
