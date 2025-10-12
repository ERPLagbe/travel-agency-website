import { useFrappePostCall } from 'frappe-react-sdk';

interface LeadData {
  lead_name: string;
  email_id?: string;
  phone: string;
  subject?: string;
  description?: string;
  company_name?: string;
  source?: string;
  status?: string;
  notes?: string;
  package_id?: string;
}

export const useCreateLead = () => {
  const { call, loading, error } = useFrappePostCall('travel_agency_website.api.create_lead_from_website');

  const createLead = async (leadData: LeadData) => {
    try {
      const result = await call({
        first_name: leadData.lead_name,
        email_id: leadData.email_id || '',
        phone: leadData.phone,
        subject: leadData.subject || '',
        description: leadData.description || '',
        company_name: leadData.company_name || '',
        notes: leadData.notes || '',
        package_id: leadData.package_id || ''
      });
      
      return result;
    } catch (err: any) {
      throw err;
    }
  };

  return {
    createLead,
    isLoading: loading,
    error
  };
};