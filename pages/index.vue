<script setup>
  import {allRows} from '@/composables/useSheet';

  const headings = ref(null)
  const result = ref([])
  const response = await allRows()
  headings.value = response.values[0];
  result.value = [...response.values]
  result.value.splice(0, 1)
</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="col in headings" :key="col" v-html="col"></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in result" :key="col">
          <td>{{col[0]}}</td>
          <td>{{col[1]}}</td>
          <td v-html="col[2]"></td>
          <td><img :src="col[3]" alt=""></td>
          <td>
            <NuxtLink NuxtLink :to="`/${col[0]}`">View</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
    .container {
        display: flex;
        justify-content: center;
        font-family: sans-serif;
    }

    table {
        border-collapse: collapse;
    }

    thead {
        background: #f0f0f0;
        text-transform: uppercase;
    }

    tr {
        border-bottom: 1px solid #444;
    }

    th,
    td {
        padding: 4px 8px;
        border-left: 1px solid #444;
        border-right: 1px solid #444;
    }

    img {
        max-width: 100px;
        border-radius: 8px;
    }
</style>