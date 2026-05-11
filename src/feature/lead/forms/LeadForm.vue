<script setup lang="ts">
import { useLeadForm } from '../hooks/useLeadForm'

const {
  form,
  touched,
  errors,
  cities,
  campaigns,
  submitError,
  submitSuccess,
  isSubmitting,
  hasFormErrors,
  touchAndValidate,
  fieldClass,
  handleSubmit
} = useLeadForm()
</script>

<template>
  <form class="bg-white p-6 rounded-lg shadow-md w-full" @submit.prevent="handleSubmit">
    <h3 class="text-lg font-bold">Register New Lead</h3>
    <div class="flex flex-col gap-4 mt-4">
      <div>
        <label class="text-sm">Full Name <span class="text-red-500">*</span></label>
        <input
          v-model="form.fullName"
          type="text"
          :class="['border p-2 w-full rounded-md', fieldClass('fullName')]"
          placeholder="Full Name"
          @blur="touchAndValidate('fullName')"
        >
        <p v-if="touched.fullName && errors.fullName" class="text-xs text-red-500 mt-1">{{ errors.fullName }}</p>
      </div>
      <div>
        <label class="text-sm">Email Address <span class="text-red-500">*</span></label>
        <input
          v-model="form.email"
          type="email"
          :class="['border p-2 w-full rounded-md', fieldClass('email')]"
          placeholder="Email Address"
          @blur="touchAndValidate('email')"
        >
        <p v-if="touched.email && errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
      </div>
      <div>
        <label class="text-sm">Birth Date <span class="text-red-500">*</span></label>
        <input
          v-model="form.birthDate"
          type="date"
          :class="['border p-2 w-full rounded-md', fieldClass('birthDate')]"
          placeholder="Birth Date"
          @blur="touchAndValidate('birthDate')"
        >
        <p v-if="touched.birthDate && errors.birthDate" class="text-xs text-red-500 mt-1">{{ errors.birthDate }}</p>
      </div>
      <div>
        <label class="text-sm">Select City <span class="text-red-500">*</span></label>
        <select
          v-model="form.city"
          :class="[!touched.city ? 'bg-white' : '', 'border p-2 w-full rounded-md', fieldClass('city')]"
          @blur="touchAndValidate('city')"
        >
          <option value="">Select City</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.city_name }}
          </option>
        </select>
        <p v-if="touched.city && errors.city" class="text-xs text-red-500 mt-1">{{ errors.city }}</p>
      </div>
      <div>
        <label class="text-sm">Select Campaign <span class="text-red-500">*</span></label>
        <select
          v-model="form.campaign"
          :class="[!touched.campaign ? 'bg-white' : '', 'border p-2 w-full rounded-md', fieldClass('campaign')]"
          @blur="touchAndValidate('campaign')"
        >
          <option value="">Select Campaign</option>
          <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
            {{ campaign.name }}
          </option>
        </select>
        <p v-if="touched.campaign && errors.campaign" class="text-xs text-red-500 mt-1">{{ errors.campaign }}</p>
      </div>
      <div>
        <input
          id="terms"
          v-model="form.acceptedTerms"
          type="checkbox"
          :class="['mr-2 border rounded', fieldClass('acceptedTerms')]"
          @change="touchAndValidate('acceptedTerms')"
          @blur="touchAndValidate('acceptedTerms')"
        >
        <label for="terms">I agree to the Terms & Conditions <span class="text-red-500">*</span></label>
        <p v-if="touched.acceptedTerms && errors.acceptedTerms" class="text-xs text-red-500 mt-1">{{ errors.acceptedTerms }}</p>
      </div>
    </div>
    <button
      type="submit"
      :disabled="hasFormErrors || isSubmitting"
      :class="[
        'text-white px-4 py-2 rounded-md mt-6 w-full',
        hasFormErrors || isSubmitting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500'
      ]"
    >
      Submit Registration
    </button>
    <p v-if="submitError" class="text-sm text-red-600 mt-3">{{ submitError }}</p>
    <p v-if="submitSuccess" class="text-sm text-green-600 mt-3">{{ submitSuccess }}</p>
  </form>
</template>
