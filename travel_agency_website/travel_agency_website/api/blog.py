# Copyright (c) 2025, ERP Lagbe and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_published_blogs():
	"""Get all published blog posts for frontend"""
	try:
		blogs = frappe.get_all(
			"Blog",
			fields=[
				"name",
				"title", 
				"slug",
				"content",
				"featured_image",
				"author",
				"published_on",
				"creation",
				"modified"
			],
			filters=[["published", "=", 1]],
			order_by="published_on desc"
		)
		
		
		return {
			"status": "success",
			"data": blogs
		}
		
	except Exception as e:
		frappe.log_error(f"Error fetching blogs: {str(e)}")
		return {
			"status": "error", 
			"message": "Failed to fetch blog posts"
		}


@frappe.whitelist(allow_guest=True)
def get_blog_by_slug(slug):
	"""Get a specific blog post by slug"""
	try:
		blog = frappe.get_doc("Blog", {"slug": slug, "published": 1})
		
		return {
			"status": "success",
			"data": blog.as_dict()
		}
		
	except frappe.DoesNotExistError:
		return {
			"status": "error",
			"message": "Blog post not found"
		}
	except Exception as e:
		frappe.log_error(f"Error fetching blog by slug: {str(e)}")
		return {
			"status": "error",
			"message": "Failed to fetch blog post"
		}


