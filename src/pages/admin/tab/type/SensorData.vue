<template>
  <table class="va-table va-table--striped va-table--hoverable w-full">
    <thead>
      <tr>
        <th>Index</th>
        <th>WorkerID</th>
        <th>SensorID</th>
        <th>Timestamp</th>
        <th>x</th>
        <th>y</th>
        <th>z</th>
        <th>w</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(data, index) in receiveddata" :key="index">
        <td>{{ (page - 1) * itemnum + index + 1  }}</td>
        <td>{{ data.WorkerID }}</td>
        <td>{{ data.SensorID }}</td>
        <td>{{ data.Timestamp }}</td>
        <td>{{ data.x }}</td>
        <td>{{ data.y }}</td>
        <td>{{ data.z }}</td>
        <td>{{ data.w }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      receiveddata: {
        type: Object,
      },
      page: {
        type: Number,
      },
      itemnum: {
        type: Number,
      }
    }
 };
</script>