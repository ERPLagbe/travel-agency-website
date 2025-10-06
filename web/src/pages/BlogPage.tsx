import React from 'react';
import { Link } from 'react-router-dom';
import { SectionContainer, Typography, Card } from '../components';
import { useBlogs } from '../hooks/useBlogs';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const { data: blogs, isValidating, error } = useBlogs();

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Typography variant="body" color="muted">Loading blog posts...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" color="error" style={{ marginBottom: 'var(--spacing-4)' }}>
            Error Loading Blog Posts
          </Typography>
          <Typography variant="body" color="muted">
            Please try again later.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <SectionContainer>
        <div style={{ paddingTop: 'var(--spacing-6)', paddingBottom: 'var(--spacing-4)' }}>
          <Typography variant="h1" align="center" style={{ marginBottom: 'var(--spacing-2)' }}>
            Blog Posts
          </Typography>
          <Typography variant="body" color="muted" align="center">
            Discover travel tips, insights, and stories from our experts
          </Typography>
        </div>
      </SectionContainer>

      {/* Blog Posts */}
      <SectionContainer>
        {blogs.length === 0 ? (
          <div className="text-center" style={{ padding: 'var(--spacing-8) 0' }}>
            <Typography variant="h3" style={{ marginBottom: 'var(--spacing-4)' }}>
              No Blog Posts Yet
            </Typography>
            <Typography variant="body" color="muted">
              Check back soon for travel insights and tips!
            </Typography>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: 'var(--spacing-8)' 
          }}>
            {blogs.map((blog) => (
              <Card key={blog.name} className="blog-card">
                <Link 
                  to={`/blog/${blog.slug}`}
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  {/* Featured Image */}
                  {/* {blog.featured_image && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundImage: `url(${getFileUrlWithFallback(blog.featured_image)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                      marginBottom: 'var(--spacing-4)'
                    }} />
                  )} */}
                  <img src={getFileUrlWithFallback(blog.featured_image)} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  
                  <div style={{ padding: 'var(--spacing-6)' }}>
                    {/* Title */}
                    <Typography variant="h3" style={{ 
                      marginBottom: 'var(--spacing-3)',
                      lineHeight: '1.3'
                    }}>
                      {blog.title}
                    </Typography>
                    
                    {/* Content Preview */}
                    <Typography 
                      variant="body" 
                      color="muted" 
                      style={{ 
                        marginBottom: 'var(--spacing-4)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {blog.content?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </Typography>
                    
                    {/* Meta Info */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-4)',
                      marginBottom: 'var(--spacing-4)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                        <Calendar size={16} color="var(--color-muted)" />
                        <Typography variant="body-small" color="muted">
                          {new Date(blog.creation).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                        <User size={16} color="var(--color-muted)" />
                        <Typography variant="body-small" color="muted">
                          Admin
                        </Typography>
                      </div>
                    </div>
                    
                    {/* Read More */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-2)',
                      color: 'var(--color-primary)'
                    }}>
                      <Typography variant="body-small" color="primary">
                        Read More
                      </Typography>
                      <ArrowRight size={16} color="var(--color-primary)" />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
};

export default BlogPage;
