# Copyright (c) 2025, ERP Lagbe and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WebsiteCMS(Document):
	"""Website CMS for managing all website content"""
	
	def validate(self):
		"""Validate the document before saving"""
		pass
		
		# Prevent deletion of the main record
		if self.name == "Main Website Settings":
			if frappe.flags.in_delete:
				frappe.throw("Cannot delete the main Website CMS record. Please contact system administrator.")
	
	def on_update(self):
		"""Called after the document is updated"""
		# Clear cache to ensure frontend gets updated data
		frappe.clear_cache()
	
	@frappe.whitelist()
	def get_website_data(self):
		"""Get all website data for frontend consumption"""
		return {
			"business_settings": {
				"business_name": self.business_name,
				"business_phone": self.business_phone,
				"business_email": self.business_email,
				"business_address": self.business_address,
				"whatsapp_number": self.whatsapp_number,
				"company_number": self.company_number,
				"atol_number": self.atol_number,
				"atol_certificate_url": self.atol_certificate_url,
				"contact_card_rating": self.contact_card_rating,
				"contact_card_rating_text": self.contact_card_rating_text,
				"logo": self.logo
			},
			"navigation": {
				"dropdowns": self.get_navigation_dropdowns()
			},
			"hero_section": {
				"background_image": self.hero_background_image,
				"floating_image": self.hero_floating_image,
				"trusted_text": self.hero_trusted_text,
				"main_title": self.hero_main_title,
				"subtitle": self.hero_subtitle,
				"description": self.hero_description,
				"primary_button_text": self.hero_primary_button_text,
				"secondary_button_text": self.hero_secondary_button_text,
				"years_experience": self.hero_years_experience,
				"happy_pilgrims": self.hero_happy_pilgrims,
				"customer_rating": self.hero_customer_rating
			},
			"packages": {
				"featured": {
					"title": self.featured_packages_title,
					"subtitle": self.featured_packages_subtitle,
					"packages": self.get_featured_packages()
				},
				"hajj": {
					"title": self.hajj_deals_title,
					"packages": self.get_hajj_packages()
				}
			},
			"testimonials": {
				"title": self.testimonials_title,
				"subtitle": self.testimonials_subtitle,
				"testimonials": self.get_testimonials()
			},
			"welcome_section": {
				"title": self.welcome_title,
				"description": self.welcome_description,
				"services_title": self.welcome_services_title,
				"services_description": self.welcome_services_description,
				"image": self.welcome_image
			},
			"packages_description": {
				"umrah_title": self.umrah_title,
				"umrah_description": self.umrah_description,
				"hajj_title": self.hajj_title,
				"hajj_description": self.hajj_description,
				"image": self.packages_image
			},
			"faq": {
				"title": self.faq_title,
				"subtitle": self.faq_subtitle,
				"items": self.get_faq_items()
			},
			"footer": {
				"quick_links": self.get_footer_quick_links(),
				"terms_links": self.get_footer_terms_links(),
				"social_media": self.get_social_media_links(),
				"copyright": self.footer_copyright,
				"legal_text": self.footer_legal_text
			}
		}
	
	def get_navigation_dropdowns(self):
		"""Get navigation dropdowns with their items"""
		dropdowns = []
		for dropdown in self.navigation_dropdowns:
			items = []
			for item in dropdown.dropdown_items:
				items.append({
					"name": item.item_name,
					"item_group": item.item_group,
					"display_order": item.display_order
				})
			dropdowns.append({
				"name": dropdown.dropdown_name,
				"items": sorted(items, key=lambda x: x["display_order"])
			})
		return dropdowns
	
	def get_featured_packages(self):
		"""Get featured packages from ERPNext Items"""
		packages = []
		for pkg in self.featured_packages:
			item = frappe.get_doc("Item", pkg.item)
			packages.append({
				"id": item.name,
				"name": pkg.package_name,
				"title": item.item_name,
				"description": item.description,
				"price": item.standard_rate,
				"image": item.image,
				"display_order": pkg.display_order
			})
		return sorted(packages, key=lambda x: x["display_order"])
	
	def get_hajj_packages(self):
		"""Get Hajj packages from ERPNext Items"""
		packages = []
		for pkg in self.hajj_packages:
			item = frappe.get_doc("Item", pkg.item)
			packages.append({
				"id": item.name,
				"name": pkg.package_name,
				"title": item.item_name,
				"description": item.description,
				"price": item.standard_rate,
				"image": item.image,
				"display_order": pkg.display_order
			})
		return sorted(packages, key=lambda x: x["display_order"])
	
	def get_testimonials(self):
		"""Get testimonials"""
		testimonials = []
		for testimonial in self.testimonials:
			testimonials.append({
				"id": testimonial.name,
				"name": testimonial.customer_name,
				"location": testimonial.customer_location,
				"rating": testimonial.rating,
				"text": testimonial.testimonial_text,
				"image": testimonial.customer_avatar,
				"display_order": testimonial.display_order
			})
		return sorted(testimonials, key=lambda x: x["display_order"])
	
	def get_faq_items(self):
		"""Get FAQ items"""
		faqs = []
		for faq in self.faq_items:
			faqs.append({
				"question": faq.question,
				"answer": faq.answer,
				"display_order": faq.display_order
			})
		return sorted(faqs, key=lambda x: x["display_order"])
	
	def get_footer_quick_links(self):
		"""Get footer quick links"""
		links = []
		for link in self.footer_quick_links:
			links.append({
				"text": link.link_text,
				"url": link.link_url,
				"display_order": link.display_order
			})
		return sorted(links, key=lambda x: x["display_order"])
	
	def get_footer_terms_links(self):
		"""Get footer terms links"""
		links = []
		for link in self.footer_terms_links:
			links.append({
				"text": link.link_text,
				"url": link.link_url,
				"display_order": link.display_order
			})
		return sorted(links, key=lambda x: x["display_order"])
	
	def get_social_media_links(self):
		"""Get social media links"""
		links = []
		for link in self.footer_social_media:
			links.append({
				"platform": link.platform_name,
				"url": link.platform_url,
				"icon_class": link.icon_class,
				"display_order": link.display_order
			})
		return sorted(links, key=lambda x: x["display_order"])


@frappe.whitelist()
def get_website_cms_data():
	"""Get website CMS data for frontend"""
	website_cms = frappe.get_all("Website CMS", limit=1)
	if not website_cms:
		return None
	
	doc = frappe.get_doc("Website CMS", website_cms[0].name)
	return doc.get_website_data()
