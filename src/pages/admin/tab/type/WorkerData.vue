<template>
  <table class="va-table va-table--striped va-table--hoverable w-full">
    <thead>
      <tr>
        <th>Index</th>
        <th>WorkerID</th>
        <th>Timestamp</th>
        <th>HR</th>
        <th>BP</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in receiveddata" :key="index">
        <td>{{ (page - 1) * itemnum + index + 1  }}</td>
        <td>{{ data.WorkerID }}</td>
        <td>{{ data.Timestamp }}</td>
        <td>{{ data.HR }}</td>
        <td>{{ data.BP }}</td>
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