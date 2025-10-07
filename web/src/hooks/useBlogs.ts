import { useFrappeGetDocList } from 'frappe-react-sdk';

// Hook to get all blogs
export const useBlogs = () => {
  const { data: blogs, error, isValidating } = useFrappeGetDocList('Blog', {
    fields: [
      'name',
      'title', 
      'slug',
      'content',
      'featured_image',
      'author',
      'published_on',
      'creation',
      'modified'
    ],
    filters: [['published', '=', 1]],
    orderBy: { field: 'published_on', order: 'desc' }
  });

  return { 
    data: blogs || [], 
    error, 
    isValidating 
  };
};

// Hook to get a specific blog by slug
export const useBlogBySlug = (slug: string) => {
  const { data: blogs, error, isValidating } = useFrappeGetDocList('Blog', {
    fields: [
      'name',
      'title', 
      'slug',
      'content',
      'featured_image',
      'author',
      'published_on',
      'creation',
      'modified'
    ],
    filters: [['slug', '=', slug], ['published', '=', 1]],
    limit: 1
  });

  return { 
    data: blogs?.[0] || null, 
    error, 
    isValidating 
  };
};


