import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = async (leadData: LeadData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use custom whitelisted API method
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/method/travel_agency_website.api.create_lead_from_website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          first_name: leadData.lead_name,
          email_id: leadData.email_id || '',
          phone: leadData.phone,
          subject: leadData.subject || '',
          description: leadData.description || '',
          company_name: leadData.company_name || '',
          notes: leadData.notes || '',
          package_id: leadData.package_id || ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Check if the API returned success
      if (result.message && !result.message.success) {
        throw new Error(result.message.message || 'Failed to create lead');
      }
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to create lead');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createLead,
    isLoading,
    error
  };
};