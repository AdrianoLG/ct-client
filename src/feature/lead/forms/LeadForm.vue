<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type FieldName = 'fullName' | 'email' | 'birthDate' | 'city' | 'campaign' | 'acceptedTerms'
type CityOption = { id: number, city_name: string }
type CampaignOption = { id: number, name: string }

const form = ref({
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: false
})

const touched = ref<Record<FieldName, boolean>>({
  fullName: false,
  email: false,
  birthDate: false,
  city: false,
  campaign: false,
  acceptedTerms: false
})

const errors = ref<Record<FieldName, string>>({
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: ''
})

const formData = ref<Record<string, string | number | boolean> | null>(null)
const cities = ref<CityOption[]>([])
const campaigns = ref<CampaignOption[]>([])

const config = useRuntimeConfig()
const fields: FieldName[] = [
  'fullName',
  'email',
  'birthDate',
  'city',
  'campaign',
  'acceptedTerms'
]

function isRequired(value: string | number | boolean | null | undefined) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return false
}

function isValidEmail(value: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date <= today
}

function getFieldError(field: FieldName) {
  const value = form.value[field]

  if (!isRequired(value)) {
    return 'Este campo es obligatorio'
  }

  if (field === 'email' && !isValidEmail(form.value.email)) {
    return 'Formato de email no válido'
  }

  if (field === 'birthDate' && !isValidDate(form.value.birthDate)) {
    return 'Fecha no válida'
  }

  return ''
}

const hasFormErrors = computed(() => fields.some((field) => Boolean(getFieldError(field))))

function validateField(field: FieldName) {
  const error = getFieldError(field)
  errors.value[field] = error
  return !error
}

function touchAndValidate(field: FieldName) {
  touched.value[field] = true
  validateField(field)
}

function validateAllFields() {
  return fields.every((field) => {
    touched.value[field] = true
    return validateField(field)
  })
}

function fieldClass(field: FieldName) {
  if (!touched.value[field]) {
    return 'border-gray-300'
  }

  return errors.value[field] ? 'border-2 border-red-300 bg-red-100' : 'border-2 border-green-300 bg-green-100'
}

function handleSubmit() {
  if (!validateAllFields()) {
    return
  }

  formData.value = {
    fullName: form.value.fullName,
    email: form.value.email,
    birthDate: form.value.birthDate,
    city: form.value.city,
    campaign: form.value.campaign,
    acceptedTerms: form.value.acceptedTerms
  }

  console.log('formData:', formData.value)
}

async function loadInfoOptions() {
  try {
    const response = await $fetch<{ campaigns: CampaignOption[], locations: CityOption[] }>(
      `${config.public.apiBaseUrl}/info`
    )

    campaigns.value = response.campaigns
    cities.value = response.locations
  } catch (error) {
    console.error('Error cargando info de campañas y ciudades:', error)
  }
}

onMounted(() => {
  loadInfoOptions()
})
</script>

<template>
  <form class="bg-white p-6 rounded-lg shadow-md w-full" @submit.prevent="handleSubmit">
    <h3 class="text-lg font-bold">Register New Lead</h3>
    <div class="flex flex-col gap-4 mt-4">
      <div>
        <label class="text-sm">Full Name</label>
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
        <label class="text-sm">Email Address</label>
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
        <label class="text-sm">Birth Date</label>
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
        <label class="text-sm">Select City</label>
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
        <label class="text-sm">Select Campaign</label>
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
        <label for="terms">I agree to the Terms & Conditions</label>
        <p v-if="touched.acceptedTerms && errors.acceptedTerms" class="text-xs text-red-500 mt-1">{{ errors.acceptedTerms }}</p>
      </div>
    </div>
    <button
      type="submit"
      :disabled="hasFormErrors"
      :class="[
        'text-white px-4 py-2 rounded-md mt-6 w-full',
        hasFormErrors ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500'
      ]"
    >
      Submit Registration
    </button>
  </form>
</template>
