import frappe
from frappe import _
from datetime import datetime

@frappe.whitelist(allow_guest=True)
def create_lead_from_website(first_name, email_id="", phone="", company_name="", notes="", package_id="", subject="", description=""):
    """
    Create a Lead from website contact form
    This method is whitelisted for guest users
    """
    try:
        # Validate required fields
        if not first_name:
            frappe.throw(_("Name is required"))
        
        if not phone:
            frappe.throw(_("Phone is required"))
        
        # Check if email already exists (only if email is provided)
        existing_lead = None
        if email_id:
            existing_lead = frappe.get_all("Lead", 
                filters={"email_id": email_id}, 
                fields=["name"], 
                limit=1
            )
        
        # Handle existing email
        if existing_lead:
            # Update existing lead instead of creating new one
            lead = frappe.get_doc("Lead", existing_lead[0].name)
            lead.first_name = first_name
            lead.phone = phone
            lead.company_name = company_name or ""
            lead.custom_subject = subject or ""
            lead.custom_description = description or ""
            lead.custom_package = package_id or ""
            lead.save(ignore_permissions=True)
        else:
            # Create new Lead document
            lead = frappe.get_doc({
                "doctype": "Lead",
                "first_name": first_name,
                "email_id": email_id or "",
                "phone": phone,
                "company_name": company_name or "",
                "status": "Lead",
                "source": "Website",
                "custom_package": package_id or "",
                "custom_subject": subject or "",
                "custom_description": description or ""
            })
            
            # Insert with ignore_permissions to bypass Guest restrictions
            lead.insert(ignore_permissions=True)
        
        # Add notes as a comment if provided (for backward compatibility)
        if notes:
            lead.add_comment("Comment", notes)
        
        frappe.db.commit()
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We will get back to you soon.",
            "lead_name": lead.name,
            "is_update": bool(existing_lead)
        }
        
    except Exception as e:
        frappe.log_error(f"Error creating lead from website: {str(e)}")
        return {
            "success": False,
            "message": str(e)
        }

@frappe.whitelist(allow_guest=True)
def get_accommodation_files(accommodation_name):
    """
    Get files attached to an Accommodation
    This method is whitelisted for guest users
    """
    try:
        # Log the accommodation name being queried
        frappe.logger().info(f"Fetching files for accommodation: {accommodation_name}")
        
        # Use get_all with ignore_permissions for guest users
        files = frappe.get_all("File", 
            filters={
                "attached_to_doctype": "Accommodation",
                "attached_to_name": accommodation_name
            },
            fields=["name", "file_name", "file_url", "is_private"],
            ignore_permissions=True
        )
        
        # Return files as-is, including private files
        # Private files will be served through Frappe's file serving mechanism
        processed_files = []
        for file in files:
            processed_files.append({
                "name": file["name"],
                "file_name": file["file_name"],
                "file_url": file.get("file_url", ""),
                "is_private": file.get("is_private", 0)
            })
        
        frappe.logger().info(f"Found {len(processed_files)} files for {accommodation_name}")
        
        return {
            "success": True,
            "files": processed_files,
            "accommodation_name": accommodation_name
        }
        
    except Exception as e:
        frappe.log_error(f"Error fetching accommodation files: {str(e)}")
        return {
            "success": False,
            "message": str(e),
            "files": []
        }

@frappe.whitelist(allow_guest=True)
def get_website_cms():
    """Get Website CMS data with all related child tables"""
    try:
        # Get the main Website CMS document
        cms_doc = frappe.get_doc("Website CMS", "Website CMS", ignore_permissions=True)
        
        # Convert to dict and include all child table data
        cms_data = cms_doc.as_dict()
        
        return {
            "docs": [cms_data]
        }
    except Exception as e:
        frappe.log_error(f"Error in get_website_cms: {str(e)}")
        return {
            "error": str(e),
            "docs": []
        }

@frappe.whitelist(allow_guest=True)
def get_items_with_accommodation():
    """Get all items with their accommodation list and custom fields"""
    try:
        # Get all items with basic fields
        items = frappe.get_all("Item",
            filters={"disabled": 0, "custom_publish_on_website": 1}, # Only published & enabled items
            fields=[
                "name", 
                "item_name", 
                "item_group", 
                "standard_rate",
                "custom_website_price_to_show",
                "image",
                "custom_duration",
                "custom_package_rating",
                "custom_air_information",
                "custom_food_information",
                "custom_bustaxi_information"
            ],
            ignore_permissions=True
        )
        
        # For each item, get the accommodation list
        for item in items:
            # Get accommodation list for this item
            accommodation_list = frappe.get_all("Accommodation List",
                filters={"parent": item.name},
                fields=["hotel", "distance"],
                ignore_permissions=True
            )
            item["custom_accommodation_list"] = accommodation_list
            
            # Get features for this item
            features = frappe.get_all("Package Feature",
                filters={"parent": item.name},
                fields=["title"],
                ignore_permissions=True
            )
            item["custom_features"] = features
            
            # Get inclusions for this item
            inclusions = frappe.get_all("Title With Description",
                filters={"parent": item.name, "parentfield": "custom_inclusions"},
                fields=["title", "description"],
                ignore_permissions=True
            )
            item["custom_inclusions"] = inclusions
            
            # Get itinerary for this item
            itinerary = frappe.get_all("Title With Description",
                filters={"parent": item.name, "parentfield": "custom_itinerary"},
                fields=["title", "description"],
                ignore_permissions=True
            )
            item["custom_itinerary"] = itinerary
            
            # Get special services for this item
            special_services = frappe.get_all("Title With Description",
                filters={"parent": item.name, "parentfield": "custom_special_services"},
                fields=["title", "description"],
                ignore_permissions=True
            )
            item["custom_special_services"] = special_services
        
        return {
            "error": None,
            "data": items
        }
    except Exception as e:
        frappe.log_error(f"Error in get_items_with_accommodation: {str(e)}")
        return {
            "error": str(e),
            "data": None
        }

@frappe.whitelist(allow_guest=True)
def get_sitemap():
    """Generate XML sitemap for SEO"""
    try:
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
        
        # Generate XML
        xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        
        for url in urls:
            xml += '  <url>\n'
            xml += f"    <loc>{url['loc']}</loc>\n"
            xml += f"    <lastmod>{url['lastmod']}</lastmod>\n"
            xml += f"    <changefreq>{url['changefreq']}</changefreq>\n"
            xml += f"    <priority>{url['priority']}</priority>\n"
            xml += '  </url>\n'
        
        xml += '</urlset>'
        
        frappe.response['type'] = 'xml'
        frappe.response['filename'] = 'sitemap.xml'
        return xml
        
    except Exception as e:
        frappe.log_error(f"Error generating sitemap: {str(e)}")
        frappe.throw(_("Error generating sitemap"))

@frappe.whitelist(allow_guest=True)
def get_seo_settings(route):
	"""Get SEO settings for a specific route"""
	try:
		from travel_agency_website.travel_agency_website.doctype.seo_settings.seo_settings import get_seo_by_route
		return get_seo_by_route(route)
	except ImportError:
		# Fallback if DocType not yet migrated
		return None

@frappe.whitelist(allow_guest=True)
def get_public_website_analytics():
	"""Expose Google Analytics settings from Website Settings for the React SPA."""
	settings = frappe.get_cached_doc("Website Settings")
	return {
		"google_analytics_id": (settings.google_analytics_id or "").strip(),
		"google_analytics_anonymize_ip": bool(settings.google_analytics_anonymize_ip),
	}


@frappe.whitelist(allow_guest=True)
def get_robots_txt():
    """Generate robots.txt for SEO"""
    try:
        site_url = frappe.utils.get_url()
        
        robots = f"""User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /app/

Sitemap: {site_url}/api/method/travel_agency_website.api.get_sitemap
"""
        
        frappe.response['type'] = 'txt'
        frappe.response['filename'] = 'robots.txt'
        return robots
        
    except Exception as e:
        frappe.log_error(f"Error generating robots.txt: {str(e)}")
        frappe.throw(_("Error generating robots.txt"))