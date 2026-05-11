export type FieldName =
  | 'fullName'
  | 'email'
  | 'birthDate'
  | 'city'
  | 'campaign'
  | 'acceptedTerms'

export type CityOption = { id: number; city_name: string }
export type CampaignOption = { id: number; name: string }

export type Campaign = {
  campaignName: string
  totalLeads: number
  topContributingCity: string
}

export type ReportResponse = {
  campaigns: Campaign[]
}

export type LeadFormState = {
  fullName: string
  email: string
  birthDate: string
  city: string
  campaign: string
  acceptedTerms: boolean
}

export const initialForm: LeadFormState = {
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: false
}

export const initialTouched: Record<FieldName, boolean> = {
  fullName: false,
  email: false,
  birthDate: false,
  city: false,
  campaign: false,
  acceptedTerms: false
}

export const initialErrors: Record<FieldName, string> = {
  fullName: '',
  email: '',
  birthDate: '',
  city: '',
  campaign: '',
  acceptedTerms: ''
}
