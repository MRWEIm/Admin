<template>
  <div class="pt-6 grid grid-cols-12 gap-6">
    <va-card class="col-span-6">
      <va-card-title>
        <h6 class="va-h6">{{ '全身疲劳指数' }}</h6>
      </va-card-title>
      <va-card-content>
        <div>
          <table class="va-table va-table--striped va-table--hoverable w-full">
            <thead>
              <tr>
                <th>姓名</th>
                <th>心率</th>
                <th>血氧</th>
                <th>TFI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="msg in data" :key="msg.WorkerID">
                <td>{{ msg.WorkerID }}</td>
                <td><va-badge :text="msg.HR" :color="getStatusColor(msg.HR)" /></td>
                <td><va-badge :text="msg.BP" :color="getStatusColor(msg.BP)" /></td>
                <td><va-badge :text="msg.TFI" :color="getStatusColor(msg.TFI)" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>

    <va-card class="col-span-6">
      <va-card-title>
        <h6 class="va-h6">{{ '局部疲劳指数' }}</h6>
      </va-card-title>
      <va-card-content>
        <div>
          <table class="va-table va-table--striped va-table--hoverable w-full">
            <thead>
              <tr>
                <th>姓名</th>
                <th>手腕</th>
                <th>肩部</th>
                <th>腰部</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="msg in data" :key="msg.WorkerID">
                <td>{{ msg.WorkerID }}</td>
                <td><va-badge :text="msg.FIWrist" :color="getStatusColor(msg.FIWrist)" /></td>
                <td><va-badge :text="msg.FIShoulder" :color="getStatusColor(msg.FIShoulder)" /></td>
                <td><va-badge :text="msg.FIWaist" :color="getStatusColor(msg.FIWaist)" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>
k
<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import axios from 'axios'
  const data = ref([{ WorkerID: '123', HR: 87, BP: 99, TFI: 4.315, FIWrist: 5.178, FIShoulder: 5.694, FIWaist: 5.147 },
                    { WorkerID: '456', HR: 96, BP: 94, TFI: 5.145, FIWrist: 4.843, FIShoulder: 8.456, FIWaist: 3.175 },
                    { WorkerID: '789', HR: 63, BP: 98, TFI: 6.547, FIWrist: 6.148, FIShoulder: 6.545, FIWaist: 9.174 },
  ])

  onMounted(() => {
    console.log('tab')
    get_table_data()
    const fetchDataInterval = setInterval(async () => {
      get_table_data()
    }, 2000)

    onBeforeUnmount(() => {
      clearInterval(fetchDataInterval)
    })
  })

  function get_table_data() {
    axios
      .get('http://123.207.9.26:5000/dashboard', { params: { type: 'Table' } })
      .then((response) => {
        data.value = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getStatusColor(input: number) {
    if (input < 50) {
      return 'success'
    } else if (input < 60) {
      return 'info'
    }
    return 'danger'
  }
</script>
