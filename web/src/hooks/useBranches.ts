import { useFrappeGetDocList } from 'frappe-react-sdk'

// Hook to get branches from ERPNext
export const useBranches = () => {
  const { data: branches, error, isValidating } = useFrappeGetDocList('Branch', {
    fields: [
      'name',
      'branch',
      'custom_address',
      'custom_address_line_1',
      'custom_address_line_2', 
      'custom_city',
      'custom_postal_code',
      'custom_country',
      'custom_branch_code',
      'custom_head_office',
      'custom_disabled',
      'custom_map_location',
      'custom_bank',
      'custom_contact_number'
    ],
    filters: [['custom_disabled', '!=', 1]], // Only show non-disabled branches
    orderBy: { field: 'custom_head_office', order: 'desc' } // Head office first
  })

  return {
    data: branches || [],
    error,
    isValidating
  }
}

