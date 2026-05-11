<script setup lang="ts">
import FooterComponent from '~/src/components/layout/FooterComponent.vue'
import HeaderComponent from '~/src/components/layout/HeaderComponent.vue'
import MainComponent from '~/src/components/layout/MainComponent.vue'
defineOptions({
  name: 'DefaultLayout'
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <HeaderComponent />
    <MainComponent class="flex-1">
      <slot />
    </MainComponent>
    <FooterComponent />
  </div>
</template>
