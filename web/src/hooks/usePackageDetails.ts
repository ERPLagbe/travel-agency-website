import { useFrappeGetDoc, useFrappeGetDocList, useFrappeGetCall } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'

// Hook to get package details from ERPNext Item doctype
export const usePackageDetails = (itemName: string) => {
  const { data: item, error, isValidating } = useFrappeGetDoc('Item', itemName, {
    fields: [
      'name',
      'item_name', 
      'item_group',
      'description',
      'image',
      'standard_rate',
      'published_in_website',
      'custom_category',
      'custom_country',
      'custom_service_id',
      'custom_commission_rate',
      'custom_processing_time',
      'custom_air',
      'custom_air_information',
      'custom_air_destination',
      'custom_hotel',
      'custom_hotel_information',
      'custom_accommodation',
      'custom_accommodation_information',
      'custom_accommodation_list',
      'custom_bustaxi',
      'custom_bustaxi_information',
      'custom_food_child_food_except',
      'custom_food_information',
      'custom_education_qualification',
      'custom_experience',
      'custom_work_types',
      'custom_salary',
      'custom_features',
      'custom_inclusions',
      'custom_itinerary'
    ]
  })

  const [enrichedData, setEnrichedData] = useState<any>(null)
  const [isEnriching, setIsEnriching] = useState(false)

  useEffect(() => {
    const enrichAccommodationData = async () => {
      if (!item || !item.custom_accommodation_list || item.custom_accommodation_list.length === 0) {
        setEnrichedData(item)
        return
      }

      setIsEnriching(true)
        
      try {
        // Fetch all linked accommodation details with attachments
        const accommodationPromises = item.custom_accommodation_list.map(async (acc: any) => {
          if (!acc.hotel) return acc
          
          try {
            // Fetch accommodation details
            const accResponse = await fetch(`http://localhost:8000/api/resource/Accommodation/${acc.hotel}`)
            const accResult = await accResponse.json()
            
            // Use custom API method to get attachments
            const attachmentsResponse = await fetch(`http://localhost:8000/api/method/travel_agency_website.api.get_accommodation_files`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                accommodation_name: acc.hotel
              })
            })
            const attachmentsResult = await attachmentsResponse.json()
            
            console.log('Attachments for', acc.hotel, ':', attachmentsResult)
            
            return {
              ...acc,
              hotel_details: accResult.data,
              images: attachmentsResult.message?.files || []
            }
          } catch (err) {
            console.error(`Error fetching accommodation ${acc.hotel}:`, err)
            return acc
          }
        })

        const enrichedAccommodations = await Promise.all(accommodationPromises)
        
        setEnrichedData({
          ...item,
          custom_accommodation_list: enrichedAccommodations
        })
      } catch (err) {
        console.error('Error enriching accommodation data:', err)
        setEnrichedData(item)
      } finally {
        setIsEnriching(false)
      }
    }

    enrichAccommodationData()
  }, [item])

  return {
    data: enrichedData,
    error,
    isValidating: isValidating || isEnriching
  }
}
