import frappe
from datetime import datetime

def get_context(context):
    """Generate sitemap XML"""
    site_url = frappe.utils.get_url()
    urls = []
    
    # Static pages
    static_pages = [
        {'loc': '/', 'changefreq': 'daily', 'priority': '1.0'},
        {'loc': '/about', 'changefreq': 'monthly', 'priority': '0.8'},
        {'loc': '/contact', 'changefreq': 'monthly', 'priority': '0.8'},
        {'loc': '/visa', 'changefreq': 'monthly', 'priority': '0.8'},
        {'loc': '/blog', 'changefreq': 'daily', 'priority': '0.9'},
        {'loc': '/gallery', 'changefreq': 'weekly', 'priority': '0.7'},
        {'loc': '/terms', 'changefreq': 'yearly', 'priority': '0.5'},
        {'loc': '/privacy', 'changefreq': 'yearly', 'priority': '0.5'},
        {'loc': '/refund-policy', 'changefreq': 'yearly', 'priority': '0.5'},
        {'loc': '/branches', 'changefreq': 'monthly', 'priority': '0.7'},
    ]
    
    for page in static_pages:
        urls.append({
            'loc': f"{site_url}{page['loc']}",
            'changefreq': page['changefreq'],
            'priority': page['priority'],
            'lastmod': datetime.now().strftime('%Y-%m-%d')
        })
    
    # Package pages
    packages = frappe.get_all("Item",
        filters={"disabled": 0, "published_in_website": 1},
        fields=["name", "modified"],
        ignore_permissions=True
    )
    
    for package in packages:
        lastmod = package.get('modified', datetime.now()).strftime('%Y-%m-%d') if hasattr(package.get('modified'), 'strftime') else datetime.now().strftime('%Y-%m-%d')
        urls.append({
            'loc': f"{site_url}/packages/{package['name']}",
            'changefreq': 'weekly',
            'priority': '0.8',
            'lastmod': lastmod
        })
    
    # Blog posts
    blogs = frappe.get_all("Blog",
        filters={"published": 1},
        fields=["slug", "modified"],
        ignore_permissions=True
    )
    
    for blog in blogs:
        lastmod = blog.get('modified', datetime.now()).strftime('%Y-%m-%d') if hasattr(blog.get('modified'), 'strftime') else datetime.now().strftime('%Y-%m-%d')
        urls.append({
            'loc': f"{site_url}/blog/{blog['slug']}",
            'changefreq': 'monthly',
            'priority': '0.7',
            'lastmod': lastmod
        })
    
    context.urls = urls
    context.site_url = site_url
    frappe.response['content_type'] = 'application/xml'
