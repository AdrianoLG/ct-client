<script setup lang="ts">
import LeadList from '../feature/lead/components/LeadList.vue'
import LeadForm from '../feature/lead/forms/LeadForm.vue'
useHead({
  title: 'Campaign Tracker',
  meta: [
    {
      name: 'description',
      content: 'Welcome to the Campaign Tracker! Manage your marketing campaigns and leads effectively.'
    }
  ]
})
</script>

<template>
  <div class="flex gap-8 py-8 lg:py-16 lg:flex-nowrap flex-wrap">
    <LeadForm />
    <LeadList />
  </div>
</template>
