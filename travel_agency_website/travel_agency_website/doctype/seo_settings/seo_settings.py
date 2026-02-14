# Copyright (c) 2025, ERP Lagbe and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.model.document import Document


class SEOSettings(Document):
	"""SEO Settings for managing page-level SEO metadata"""
	
	def validate(self):
		"""Validate the document before saving"""
		# Validate meta title length
		if self.meta_title and len(self.meta_title) > 70:
			frappe.throw(f"Meta title should not exceed 70 characters. Current length: {len(self.meta_title)} characters")
		
		# Validate meta description length
		if self.meta_description and len(self.meta_description) > 320:
			frappe.throw(f"Meta description should not exceed 320 characters. Current length: {len(self.meta_description)} characters")
		
		# Validate structured data JSON if enabled
		if self.enable_structured_data and self.structured_data_json:
			try:
				json.loads(self.structured_data_json)
			except json.JSONDecodeError as e:
				frappe.throw(f"Invalid JSON in Structured Data: {str(e)}")
		
		# Ensure page_route starts with /
		if self.page_route and not self.page_route.startswith('/'):
			self.page_route = '/' + self.page_route
	
	def on_update(self):
		"""Called after the document is updated"""
		# Clear cache to ensure frontend gets updated data
		frappe.clear_cache()
	
	@frappe.whitelist()
	def get_seo_data(self):
		"""Get SEO data for frontend consumption"""
		site_url = frappe.utils.get_url()
		
		# Process structured data JSON with placeholders
		structured_data = None
		if self.enable_structured_data and self.structured_data_json:
			try:
				structured_data_str = self.structured_data_json
				structured_data_str = structured_data_str.replace('{page_route}', self.page_route)
				structured_data_str = structured_data_str.replace('{meta_title}', self.meta_title or '')
				structured_data_str = structured_data_str.replace('{meta_description}', self.meta_description or '')
				structured_data_str = structured_data_str.replace('{site_url}', site_url)
				structured_data = json.loads(structured_data_str)
			except:
				structured_data = None
		
		return {
			"page_route": self.page_route,
			"page_name": self.page_name,
			"meta_title": self.meta_title,
			"meta_description": self.meta_description,
			"meta_keywords": self.meta_keywords,
			"og_title": self.og_title or self.meta_title,
			"og_description": self.og_description or self.meta_description,
			"og_image": self.og_image,
			"og_type": self.og_type or "website",
			"twitter_card": self.twitter_card or "summary_large_image",
			"twitter_title": self.twitter_title or self.meta_title,
			"twitter_description": self.twitter_description or self.meta_description,
			"twitter_image": self.twitter_image or self.og_image,
			"canonical_url": self.canonical_url or f"{site_url}{self.page_route}",
			"robots_index": self.robots_index,
			"robots_follow": self.robots_follow,
			"structured_data": structured_data
		}


@frappe.whitelist(allow_guest=True)
def get_seo_by_route(route):
	"""Get SEO settings for a specific route"""
	try:
		# Normalize route
		if not route.startswith('/'):
			route = '/' + route
		
		# Try exact match first
		seo_doc = frappe.get_all(
			"SEO Settings",
			filters={"page_route": route},
			limit=1
		)
		
		if seo_doc:
			doc = frappe.get_doc("SEO Settings", seo_doc[0].name)
			return doc.get_seo_data()
		
		# Try to find default/home page
		home_seo = frappe.get_all(
			"SEO Settings",
			filters={"page_route": "/"},
			limit=1
		)
		
		if home_seo:
			doc = frappe.get_doc("SEO Settings", home_seo[0].name)
			return doc.get_seo_data()
		
		return None
	except Exception as e:
		frappe.log_error(f"Error fetching SEO settings: {str(e)}")
		return None
