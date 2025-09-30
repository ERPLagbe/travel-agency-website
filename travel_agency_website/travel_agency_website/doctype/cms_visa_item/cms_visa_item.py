# Copyright (c) 2025, Bismillah Travel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CMSVisaItem(Document):
	"""CMS Visa Item child doctype for Website CMS"""
	
	def validate(self):
		"""Validate the document before saving"""
		pass
