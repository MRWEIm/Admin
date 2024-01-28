import { TBarChartData } from '../types'
import { reactive } from 'vue'

export const fatigueConditionData: TBarChartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Energetic',
      backgroundColor: 'primary',
      data: [],
    },
    {
      label: 'Slightly Tired',
      backgroundColor: 'warning',
      data: [],
    },
    {
      label: 'Tired',
      backgroundColor: 'danger',
      data: [],
    },
  ],
})
