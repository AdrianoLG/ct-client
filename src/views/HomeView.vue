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
  <div class="flex gap-8 py-16">
    <LeadForm />
    <LeadList />
  </div>
</template>
