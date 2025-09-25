import { useFrappeGetDoc, useFrappeGetDocList, useFrappeGetCall } from 'frappe-react-sdk'
import { useState, useEffect } from 'react'

// Simple hook to get Website CMS data
export const useWebsiteCMS = () => {
  return useFrappeGetDoc('Website CMS', 'Main Website Settings')
}

// Simple hook to get testimonials from parent Website CMS
export const useTestimonials = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.testimonials || [],
    error: null,
    isValidating: false
  }
}

// Simple hook to get featured packages from parent Website CMS
export const useFeaturedPackages = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.featured_packages || [],
    error: null,
    isValidating: false
  }
}

// Simple hook to get Hajj packages from parent Website CMS
export const useHajjPackages = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.hajj_packages || [],
    error: null,
    isValidating: false
  }
}

// Simple hook to get FAQ items from parent Website CMS
export const useFAQItems = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.faq_items || [],
    error: null,
    isValidating: false
  }
}

// Simple hook to get footer links from parent Website CMS
export const useFooterLinks = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.footer_links || [],
    error: null,
    isValidating: false
  }
}

// Simple hook to get social media links from parent Website CMS
export const useSocialMediaLinks = () => {
  const { data: cmsData } = useFrappeGetDoc('Website CMS', 'Main Website Settings')
  return {
    data: cmsData?.social_media_links || [],
    error: null,
    isValidating: false
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

  console.log('🔍 API Response Debug:', {
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