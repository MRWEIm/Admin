import { TBarChartData } from '../types'

export const horizontalBarChartData: TBarChartData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Vuestic',
      backgroundColor: 'primary',
      data: [80, 90, 50, 70],
    },
    {
      label: 'Bulma',
      backgroundColor: 'danger',
      data: [20, 30, 20, 40],
    },
  ],
}
