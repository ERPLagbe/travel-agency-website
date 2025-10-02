import { useFrappeGetDoc, useFrappeGetDocList, useFrappeGetCall } from 'frappe-react-sdk'
import { useState, useEffect } from 'react'

// Simple hook to get Website CMS data (Single DocType)
export const useWebsiteCMS = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData,
    error,
    isValidating
  }
}

// Simple hook to get testimonials from parent Website CMS
export const useTestimonials = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.testimonials || [],
    error,
    isValidating
  }
}

// Simple hook to get featured packages from parent Website CMS
export const useFeaturedPackages = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.featured_packages || [],
    error,
    isValidating
  }
}

// Simple hook to get Hajj packages from parent Website CMS
export const useHajjPackages = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.hajj_packages || [],
    error,
    isValidating
  }
}

// Simple hook to get FAQ items from parent Website CMS
export const useFAQItems = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.faq_items || [],
    error,
    isValidating
  }
}

// Simple hook to get footer quick links from parent Website CMS
export const useFooterQuickLinks = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.footer_quick_links || [],
    error,
    isValidating
  }
}

// Simple hook to get footer terms links from parent Website CMS
export const useFooterTermsLinks = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.footer_terms_links || [],
    error,
    isValidating
  }
}

// Simple hook to get social media links from parent Website CMS
export const useSocialMediaLinks = () => {
  const { data, error, isValidating } = useFrappeGetCall('frappe.desk.form.load.getdoc', {
    doctype: 'Website CMS',
    name: 'Website CMS'
  })
  
  // Extract the actual document from the docs array
  const cmsData = data?.docs?.[0] || null
  
  return {
    data: cmsData?.footer_social_media || [],
    error,
    isValidating
  }
}

// Hook to get packages by item group
export const usePackagesByItemGroup = (itemGroup: string) => {
  // Convert URL format to proper Item Group name
  const properItemGroup = itemGroup
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  console.log('🔍 PackageListing Debug:', {
    originalItemGroup: itemGroup,
    properItemGroup: properItemGroup
  });

  // Use useFrappeGetDocList with proper configuration
  const { data: packages, error, isValidating } = useFrappeGetDocList('Item', {
    fields: ['name', 'item_name', 'item_group', 'description', 'image', 'standard_rate'],
    filters: [['item_group', '=', properItemGroup]],
    orderBy: { field: 'creation', order: 'desc' }
  });

  console.log('API Response Debug:', {
    packages,
    error: error ? {
      message: error.message,
      httpStatus: error.httpStatus,
      exception: error.exception
    } : null,
    isValidating
  });

  return {
    data: packages || [],
    error,
    isValidating
  };
}