# Copyright (c) 2025, Bismillah Travel and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_website_cms_data():
	"""Get website CMS data for frontend consumption"""
	try:
		website_cms = frappe.get_all("Website CMS", limit=1)
		if not website_cms:
			return {
				"error": "No Website CMS record found. Please create one first.",
				"data": None
			}
		
		doc = frappe.get_doc("Website CMS", website_cms[0].name)
		return {
			"error": None,
			"data": doc.get_website_data()
		}
	except Exception as e:
		frappe.log_error(f"Error in get_website_cms_data: {str(e)}")
		return {
			"error": str(e),
			"data": None
		}


@frappe.whitelist(allow_guest=True)
def get_package_details(package_id):
	"""Get detailed package information from ERPNext Item"""
	try:
		if not package_id:
			return {
				"error": "Package ID is required",
				"data": None
			}
		
		item = frappe.get_doc("Item", package_id)
		
		# Get custom fields from ERPNext Item
		custom_fields = {
			"custom_air": item.get("custom_air", False),
			"custom_air_information": item.get("custom_air_information", ""),
			"custom_hotel": item.get("custom_hotel", False),
			"custom_hotel_information": item.get("custom_hotel_information", ""),
			"custom_bustaxi": item.get("custom_bustaxi", False),
			"custom_bustaxi_information": item.get("custom_bustaxi_information", ""),
			"custom_food_child_food_except": item.get("custom_food_child_food_except", False),
			"custom_food_information": item.get("custom_food_information", "")
		}
		
		package_data = {
			"id": item.name,
			"title": item.item_name,
			"description": item.description,
			"price": item.standard_rate,
			"image": item.image,
			"item_group": item.item_group,
			"custom_fields": custom_fields
		}
		
		return {
			"error": None,
			"data": package_data
		}
	except Exception as e:
		frappe.log_error(f"Error in get_package_details: {str(e)}")
		return {
			"error": str(e),
			"data": None
		}


@frappe.whitelist(allow_guest=True)
def get_packages_by_item_group(item_group):
	"""Get all packages from a specific item group"""
	try:
		if not item_group:
			return {
				"error": "Item Group is required",
				"data": None
			}
		
		items = frappe.get_all(
			"Item",
			filters={
				"item_group": item_group,
				"disabled": 0
			},
			fields=["name", "item_name", "description", "standard_rate", "image", "item_group"]
		)
		
		packages = []
		for item in items:
			packages.append({
				"id": item.name,
				"title": item.item_name,
				"description": item.description,
				"price": item.standard_rate,
				"image": item.image,
				"item_group": item.item_group
			})
		
		return {
			"error": None,
			"data": packages
		}
	except Exception as e:
		frappe.log_error(f"Error in get_packages_by_item_group: {str(e)}")
		return {
			"error": str(e),
			"data": None
		}
