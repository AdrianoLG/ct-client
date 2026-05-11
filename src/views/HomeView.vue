<script setup lang="ts">
import LeadList from '../feature/lead/components/LeadList.vue'
import LeadForm from '../feature/lead/forms/LeadForm.vue'
</script>

<template>
  <div class="flex gap-8 py-16">
    <LeadForm />
    <LeadList />
  </div>
</template>
