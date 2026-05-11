import { useRuntimeConfig } from '#app'
import { ref } from 'vue'

import type { Ref } from 'vue'
import type { Campaign, ReportResponse } from '../types/leadTypes'

interface ReportDataInstance {
  campaigns: Ref<Campaign[]>
  fetchReportData: () => Promise<void>
}

let reportDataInstance: ReportDataInstance | null = null

export function useReportData() {
  const config = useRuntimeConfig()
  const campaigns = ref<Campaign[]>([])

  const fetchReportData = async () => {
    try {
      const response = await $fetch<ReportResponse>(
        `${config.public.apiBaseUrl}/report`
      )
      campaigns.value = response.campaigns || []
    } catch (error) {
      console.error('Error fetching report data:', error)
      campaigns.value = []
    }
  }

  if (!reportDataInstance) {
    reportDataInstance = {
      campaigns,
      fetchReportData
    }
  }

  return {
    campaigns: reportDataInstance.campaigns,
    fetchReportData: reportDataInstance.fetchReportData
  }
}
