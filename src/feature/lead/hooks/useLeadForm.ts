import { computed, onMounted, ref } from 'vue'

import { isRequired, isValidDate, isValidEmail } from '../utils/leadValidators'

type FieldName =
  | 'fullName'
  | 'email'
  | 'birthDate'
  | 'city'
  | 'campaign'
  | 'acceptedTerms'
type CityOption = { id: number; city_name: string }
type CampaignOption = { id: number; name: string }

type LeadFormState = {
  fullName: string
  email: string
  birthDate: string
  city: string
  campaign: string
  acceptedTerms: boolean
}

const initialForm: LeadFormState = {
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: false
}

const initialTouched: Record<FieldName, boolean> = {
  fullName: false,
  email: false,
  birthDate: false,
  city: false,
  campaign: false,
  acceptedTerms: false
}

const initialErrors: Record<FieldName, string> = {
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: ''
}

export function useLeadForm() {
  const form = ref<LeadFormState>({ ...initialForm })
  const touched = ref<Record<FieldName, boolean>>({ ...initialTouched })
  const errors = ref<Record<FieldName, string>>({ ...initialErrors })

  const formData = ref<Record<string, string | number | boolean> | null>(null)
  const cities = ref<CityOption[]>([])
  const campaigns = ref<CampaignOption[]>([])
  const submitError = ref('')
  const submitSuccess = ref('')
  const isSubmitting = ref(false)

  const config = useRuntimeConfig()
  const fields: FieldName[] = [
    'fullName',
    'email',
    'birthDate',
    'city',
    'campaign',
    'acceptedTerms'
  ]

  function getFieldError(field: FieldName) {
    const value = form.value[field]

    if (!isRequired(value)) {
      return 'Este campo es obligatorio'
    }

    if (field === 'email' && !isValidEmail(form.value.email)) {
      return 'Formato de email no valido'
    }

    if (field === 'birthDate' && !isValidDate(form.value.birthDate)) {
      return 'Fecha no valida'
    }

    return ''
  }

  const hasFormErrors = computed(() =>
    fields.some(field => Boolean(getFieldError(field)))
  )

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
    return fields.every(field => {
      touched.value[field] = true
      return validateField(field)
    })
  }

  function fieldClass(field: FieldName) {
    if (!touched.value[field]) {
      return 'border-gray-300'
    }

    return errors.value[field]
      ? 'border-2 border-red-300 bg-red-100'
      : 'border-2 border-green-300 bg-green-100'
  }

  function resetForm() {
    form.value = { ...initialForm }
    touched.value = { ...initialTouched }
    errors.value = { ...initialErrors }
    formData.value = null
  }

  async function handleSubmit() {
    submitError.value = ''
    submitSuccess.value = ''

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

    try {
      isSubmitting.value = true

      await $fetch(`${config.public.apiBaseUrl}/leads`, {
        method: 'POST',
        body: {
          full_name: form.value.fullName,
          email: form.value.email,
          birth_date: form.value.birthDate,
          location_id: Number(form.value.city),
          campaign_id: Number(form.value.campaign)
        }
      })

      submitSuccess.value = 'Lead creado correctamente'
      resetForm()
    } catch (error: unknown) {
      const typedError = error as {
        data?: { message?: string }
        message?: string
      }
      submitError.value =
        typedError?.data?.message ||
        typedError?.message ||
        'No se pudo crear el lead'
    } finally {
      isSubmitting.value = false
    }
  }

  async function loadInfoOptions() {
    try {
      const response = await $fetch<{
        campaigns: CampaignOption[]
        locations: CityOption[]
      }>(`${config.public.apiBaseUrl}/info`)

      campaigns.value = response.campaigns
      cities.value = response.locations
    } catch (error) {
      console.error('Error cargando info de campañas y ciudades:', error)
    }
  }

  onMounted(() => {
    loadInfoOptions()
  })

  return {
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
  }
}
