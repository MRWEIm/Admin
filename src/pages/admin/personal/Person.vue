<!-- eslint-disable prettier/prettier -->
<template>
  <div class="grid grid-cols-12 gap-6">
    <va-card class="col-span-12">
      <va-card-title>{{ '个人信息' }}</va-card-title>
      <va-card-content>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-10 sm:col-span-6 col-span-12">
              <va-input v-model="id" placeholder="工号" :error="!!idErrors.length" :error-messages="idErrors" />
            </div>
            <div class="flex md:col-span-1 sm:col-span-6 col-span-12">
              <va-button style="margin-right: 0" small @click="search">搜索</va-button>
            </div>
            <div class="flex md:col-span-1 sm:col-span-6 col-span-12">
              <va-button style="margin-right: 0" small @click="toggleEdit">{{ buttonText }}</va-button>
            </div>
            <div class="flex md:col-span-3 sm:col-span-6 col-span-12">
              <va-input v-model="name" placeholder="姓名" :readonly="isEditable" />
            </div>
            <div class="flex md:col-span-3 sm:col-span-6 col-span-12">
              <va-input v-model="department" placeholder="工种" :readonly="isEditable" />
            </div>
            <div class="flex md:col-span-3 sm:col-span-6 col-span-12">
              <va-input v-model="age" placeholder="年龄" :readonly="isEditable" />
            </div>
            <div class="flex md:col-span-3 col-span-12">
              <va-input v-model="gender" placeholder="性别" :readonly="isEditable" />
            </div>
          </div>
        </form>
      </va-card-content>
    </va-card>

    <va-card class="col-span-12">
      <table class="va-table va-table--striped va-table--hoverable w-full">
        <thead>
          <tr>
            <th>心率</th>
            <th>血氧</th>
            <th>FI-腕</th>
            <th>FI-肩</th>
            <th>FI-腰</th>
            <th>TFI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><va-badge :text="msg.HR" :color="getStatusColor(msg.HR)" /></td>
            <td><va-badge :text="msg.BP" :color="getStatusColor(msg.BP)" /></td>
            <td><va-badge :text="msg.Wrist" :color="getStatusColor(msg.Wrist)" /></td>
            <td><va-badge :text="msg.Shoulder" :color="getStatusColor(msg.Shoulder)" /></td>
            <td><va-badge :text="msg.Waist" :color="getStatusColor(msg.Waist)" /></td>
            <td><va-badge :text="msg.TFI" :color="getStatusColor(msg.TFI)" /></td>
          </tr>
        </tbody>
      </table>
    </va-card>

    <va-card class="chart-widget col-span-4">
      <va-card-title>{{ t('charts.lineChart') }}</va-card-title>
      <va-card-content>
        <div>
          <va-chart :data="HRDataGenerated" type="line" />
        </div>
      </va-card-content>
    </va-card>

    <va-card class="chart-widget col-span-4">
      <va-card-title>{{ t('charts.lineChart') }}</va-card-title>
      <va-card-content>
        <div>
          <va-chart :data="TFIDataGenerated" type="line" />
        </div>
      </va-card-content>
    </va-card>

    <va-card class="chart-widget col-span-4">
      <va-card-title>{{ t('charts.lineChart') }}</va-card-title>
      <va-card-content>
        <div>
          <va-chart :data="FIDataGenerated" type="line" />
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { onMounted, onBeforeUnmount } from 'vue'
  import { useChartData } from '../../../data/charts/composables/useChartData'
  import { HRData, TFIData, FIData } from '../personal/data/LineChartData'
  import VaChart from '../../../components/va-charts/VaChart.vue'
  import axios from 'axios'
  import { ScatterDataPoint } from 'chart.js'

  const { t } = useI18n()

  const name = ref('')
  const department = ref('')
  const age = ref('')
  const gender = ref('')
  const id = ref('')
  const isEditable = ref(true)
  const buttonText = ref('修改')

  const idErrors = ref<string[]>([])
  const nameErrors = ref<string[]>([])
  const ageErrors = ref<string[]>([])
  const departmentErrors = ref<string[]>([])
  const genderErrors = ref<string[]>([])

  const msg = ref({ HR: 0, BP: 0, TFI: 0, Wrist: 0, Shoulder: 0, Waist: 0 })

  const HRDataGenerated = useChartData(HRData, 0.7)
  const TFIDataGenerated = useChartData(TFIData, 0.7)
  const FIDataGenerated = useChartData(FIData, 0.7)

  function getStatusColor(input: number) {
    if (input < 50) {
      return 'success'
    } else if (input < 60) {
      return 'info'
    }
    return 'danger'
  }

  const formReady = computed(
    () =>
      !nameErrors.value.length &&
      !ageErrors.value.length &&
      !departmentErrors.value.length &&
      !genderErrors.value.length,
  )

  function toggleEdit() {
    isEditable.value = !isEditable.value
    if (isEditable.value) {
      buttonText.value = '修改'
      nameErrors.value = name.value == '' ? ['Email does not exist'] : []
      ageErrors.value = age.value == '' ? ['Email does not exist'] : []
      departmentErrors.value = department.value == '' ? ['Email does not exist'] : []
      genderErrors.value = gender.value == '' ? ['Email does not exist'] : []
      if (formReady.value) {
        save()
      }
    } else {
      buttonText.value = '保存'
    }
  }

  function search() {
    axios
      .get('http://123.207.9.26:5000/search_worker_data', {
        params: {
          Type: 'Search',
          WorkerID: id.value,
        },
      })
      .then((response) => {
        console.log(response)
        if (response.data.Result) {
          name.value = response.data.Name
          department.value = response.data.Department
          age.value = response.data.Age
          gender.value = response.data.Gender
          idErrors.value = []
        } else {
          idErrors.value = ['未找到信息']
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function save() {
    axios
      .get('http://123.207.9.26:5000/search_worker_data', {
        params: {
          Type: 'Save',
          WorkerID: id.value,
          Name: name.value,
          Age: age.value,
          Gender: gender.value,
          Department: department.value,
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onMounted(() => {
    const fetchDataInterval = setInterval(async () => {
      axios
        .get('http://123.207.9.26:5000/search_worker_data', {
          params: {
            Type: 'Data',
            WorkerID: id.value,
          },
        })
        .then((response) => {
          if (response.data.Result) {
            msg.value.HR = response.data.HR
            msg.value.BP = response.data.BP
            msg.value.TFI = response.data.TFI
            msg.value.Wrist = response.data.FI_Wrist
            msg.value.Shoulder = response.data.FI_Shoulder
            msg.value.Waist = response.data.FI_Waist
            nextTick(() => {
              alterChart()
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }, 2000)

    onBeforeUnmount(() => {
      clearInterval(fetchDataInterval)
    })
  })

  function alterChart() {
    alterData(HRData.datasets[0].data, msg.value.HR)
    alterData(TFIData.datasets[0].data, msg.value.TFI)
    alterData(FIData.datasets[0].data, msg.value.Wrist)
    alterData(FIData.datasets[1].data, msg.value.Shoulder)
    alterData(FIData.datasets[2].data, msg.value.Waist)
  }

  function alterData<T extends number | ScatterDataPoint | null>(data: T[], num2input: T) {
    for (var i = 0; i < data.length - 1; i++) {
      data[i] = data[i + 1]
    }
    data[i] = num2input
  }
</script>
