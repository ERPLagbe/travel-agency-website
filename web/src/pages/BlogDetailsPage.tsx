import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionContainer, Typography, Button } from '../components';
import { useBlogBySlug } from '../hooks/useBlogs';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isValidating, error } = useBlogBySlug(slug || '');

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading blog post...</Typography>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="error" style={{ marginBottom: 'var(--spacing-4)' }}>
            Blog Post Not Found
          </Typography>
          <Typography variant="body" color="muted" style={{ marginBottom: 'var(--spacing-6)' }}>
            The blog post you're looking for doesn't exist or has been removed.
          </Typography>
          <Link to="/blog">
            <Button variant="primary">
              <ArrowLeft size={16} style={{ marginRight: 'var(--spacing-2)' }} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}


      {/* Featured Image */}
      {blog.featured_image && (
        <img 
          src={getFileUrlWithFallback(blog.featured_image)} 
          alt={blog.title} 
          style={{ 
            width: '100%', 
            height: '300px', 
            objectFit: 'cover',
            marginBottom: 'var(--spacing-4)'
          }} 
        />
      )}

      {/* Blog Content */}
      <SectionContainer>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Title */}
          <Typography variant="h1" align="center" style={{ 
            marginBottom: 'var(--spacing-6)',
            lineHeight: '1.2'
          }}>
            {blog.title}
          </Typography>
          
          {/* Meta Info */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-6)',
            paddingBottom: 'var(--spacing-4)',
            borderBottom: '1px solid var(--color-gray-200)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Calendar size={18} color="var(--color-muted)" />
              <Typography variant="body" color="muted">
                {new Date(blog.published_on || blog.creation).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <User size={18} color="var(--color-muted)" />
              <Typography variant="body" color="muted">
                {blog.author || 'Admin'}
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Clock size={18} color="var(--color-muted)" />
              <Typography variant="body" color="muted">
                {Math.ceil(blog.content?.replace(/<[^>]*>/g, '').length / 200)} min read
              </Typography>
            </div>
          </div>
          
          {/* Content */}
          <div 
            className="blog-content"
            style={{
              lineHeight: '1.7',
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-gray-700)'
            }}
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />
          
          {/* Back to Blog */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 'var(--spacing-8)',
            paddingTop: 'var(--spacing-6)',
            borderTop: '1px solid var(--color-gray-200)'
          }}>
            <Link to="/blog">
              <Button variant="primary" size="lg">
                <ArrowLeft size={18} style={{ marginRight: 'var(--spacing-2)' }} />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default BlogDetailsPage;
