<template>
  <div class="pt-6 grid grid-cols-12 gap-6">
    <va-card class="col-span-6">
      <va-card-title>
        <h6 class="va-h6">{{ '整体疲劳指数' }}</h6>
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
                <td><va-badge :text="msg.HR" :color="getStatusColor(msg.HR)"/></td>
                <td><va-badge :text="msg.BP" :color="getStatusColor(msg.BP)"/></td>
                <td><va-badge :text="msg.TFI" :color="getStatusColor(msg.TFI)"/></td>
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
                <td><va-badge :text="msg.Wrist" :color="getStatusColor(msg.Wrist)"/></td>
                <td><va-badge :text="msg.Shoulder" :color="getStatusColor(msg.Shoulder)"/></td>
                <td><va-badge :text="msg.Waist" :color="getStatusColor(msg.Waist)"/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'
  const { t } = useI18n()
  const data = ref('')

  onMounted(() =>{
    const fetchDataInterval = setInterval(async () => {
      axios.get('http://123.207.9.26:5000/dashboard', {params: { type: 'Table'}})
           .then(response => { console.log(response);
                               data.value = response.data; })
           .catch(error => { console.error(error); })
    }, 5000);

    onBeforeUnmount(() => {
      clearInterval(fetchDataInterval);
    });
  });

  function getStatusColor(input: number) {
    if (input < 50) {
      return 'success'
    }
    else if (input < 60) {
      return 'info'
    }
    return 'danger'
  }

</script>
