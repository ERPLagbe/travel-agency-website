# Copyright (c) 2025, ERP Lagbe and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now


class Blog(Document):
	"""Blog post for travel agency website"""
	
	def validate(self):
		"""Validate the document before saving"""
		# Auto-generate slug from title if not provided
		if not self.slug:
			self.slug = self.generate_slug()
	
	def generate_slug(self):
		"""Generate URL-friendly slug from title"""
		if not self.title:
			return ""
		
		import re
		# Convert to lowercase and replace spaces with hyphens
		slug = self.title.lower()
		# Remove special characters except hyphens
		slug = re.sub(r'[^a-z0-9\s-]', '', slug)
		# Replace spaces with hyphens
		slug = re.sub(r'\s+', '-', slug)
		# Remove multiple consecutive hyphens
		slug = re.sub(r'-+', '-', slug)
		# Remove leading/trailing hyphens
		slug = slug.strip('-')
		
		return slug
	
	def on_update(self):
		"""Called after the document is updated"""
		# Clear cache to ensure frontend gets updated data
		frappe.clear_cache()
	
	@frappe.whitelist()
	def get_blog_data(self):
		"""Get blog data for frontend consumption"""
		return {
			"title": self.title,
			"slug": self.slug,
			"content": self.content,
			"featured_image": self.featured_image,
			"creation": self.creation,
			"modified": self.modified
		}
