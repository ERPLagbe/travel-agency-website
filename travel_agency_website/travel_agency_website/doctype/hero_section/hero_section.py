# Copyright (c) 2025, ERP Lagbe and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class HeroSection(Document):
	def validate(self):
		# Validate slide description character limit
		if self.slide_description and len(self.slide_description) > 200:
			frappe.throw(f"Slide description cannot exceed 200 characters. Current length: {len(self.slide_description)} characters")
