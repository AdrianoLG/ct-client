<script setup lang="ts">
import { onMounted } from 'vue'
import { useReportData } from '../hooks/useReportData'

const { campaigns, fetchReportData } = useReportData()

onMounted(() => {
  fetchReportData()
})
</script>

<template>
  <div class="p-6 w-full">
    <h3 class="text-lg font-bold">Campaign Performance Report</h3>
    <table class="shadow-md w-full mt-8 rounded-md overflow-hidden">
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left px-4 py-2 text-sm">Campaign Name</th>
          <th class="text-left px-4 py-2 text-sm">Total Leads</th>
          <th class="text-left px-4 py-2 text-sm">Top Contributing City</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.campaignName" class="bg-white">
          <td class="px-4 py-2">{{ campaign.campaignName }}</td>
          <td class="px-4 py-2">{{ campaign.totalLeads }}</td>
          <td class="px-4 py-2">{{ campaign.topContributingCity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


