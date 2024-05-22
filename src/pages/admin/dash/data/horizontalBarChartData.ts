import { TBarChartData } from 'D:/VueProject/demo/src/data/types'
import { reactive } from 'vue'

export const fatigueConditionData: TBarChartData = reactive({
  labels: ['搬运工', '水泥工', '钢筋工'],
  datasets: [
    {
      label: '正常',
      backgroundColor: 'primary',
      data: [10, 20, 30],
    },
    {
      label: '轻度疲劳',
      backgroundColor: 'warning',
      data: [47, 89, 96],
    },
    {
      label: '危险',
      backgroundColor: 'danger',
      data: [32, 62, 95],
    },
  ],
})
