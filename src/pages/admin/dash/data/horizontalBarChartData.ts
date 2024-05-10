import { TBarChartData } from 'D:/VueProject/demo/src/data/types'
import { reactive } from 'vue'

export const fatigueConditionData: TBarChartData = reactive({
  labels: ['搬运工', '水泥工', '钢筋工'],
  datasets: [
    {
      label: '正常',
      backgroundColor: 'primary',
      data: [],
    },
    {
      label: '轻度疲劳',
      backgroundColor: 'warning',
      data: [],
    },
    {
      label: '危险',
      backgroundColor: 'danger',
      data: [],
    },
  ],
})
