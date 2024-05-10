import { TLineChartData } from '../../../../data/types'
import { reactive } from 'vue'

const arrayWithEmptyStrings = new Array(30).fill('')
const arrayHR = new Array(30).fill(1)
const arrayTFI = new Array(30).fill(1)
const arrayFI1 = new Array(30).fill(1)
const arrayFI2 = new Array(30).fill(1)
const arrayFI3 = new Array(30).fill(1)

export const HRData: TLineChartData = reactive({
  labels: arrayWithEmptyStrings,
  datasets: [
    {
      label: '心率',
      backgroundColor: 'primary',
      data: arrayHR,
    },
  ],
})

export const TFIData: TLineChartData = reactive({
  labels: arrayWithEmptyStrings,
  datasets: [
    {
      label: 'TFI',
      backgroundColor: '#1b9a7c',
      data: arrayTFI,
    },
  ],
})

export const FIData: TLineChartData = reactive({
  labels: arrayWithEmptyStrings,
  datasets: [
    {
      label: 'FI-腕',
      backgroundColor: '#d3ff00',
      data: arrayFI1,
    },
    {
      label: 'FI-肩',
      backgroundColor: '#d40d52',
      data: arrayFI2,
    },
    {
      label: 'FI-腰',
      backgroundColor: '#8f4ed6',
      data: arrayFI3,
    },
  ],
})
