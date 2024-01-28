import { TLineChartData } from '../types'
import { reactive } from 'vue'

export const locationData: TLineChartData = reactive({
  labels: ['隧道', '地底', '地面'],
  datasets: [
    {
      label: 'Population',
      backgroundColor: [],
      data: [],
    },
  ],
})

export const departmentData: TLineChartData = reactive({
  labels: ['水泥工', '钢筋工', '搬运工'],
  datasets: [
    {
      label: 'Population',
      backgroundColor: [],
      data: [],
    },
  ],
})

export const ageData: TLineChartData = reactive({
  labels: ['20~35', '35~50', '>50'],
  datasets: [
    {
      label: 'Population',
      backgroundColor: ['primary', 'warning', 'danger'],
      data: [],
    },
  ],
})

export const genderData: TLineChartData = reactive({
  labels: ['男性', '女性'],
  datasets: [
    {
      label: 'Population',
      backgroundColor: ['info', 'warning'],
      data: [],
    },
  ],
})