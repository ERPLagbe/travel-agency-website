import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def create_lead_from_website(first_name, email_id, phone="", company_name="", notes="", package_id=""):
    """
    Create a Lead from website contact form
    This method is whitelisted for guest users
    """
    try:
        # Validate required fields
        if not first_name:
            frappe.throw(_("Name is required"))
        
        if not email_id:
            frappe.throw(_("Email is required"))
        
        # Create Lead document
        lead = frappe.get_doc({
            "doctype": "Lead",
            "first_name": first_name,
            "email_id": email_id,
            "phone": phone or "",
            "company_name": company_name or "",
            "status": "Lead",
            "source": "Website",
            "custom_package": package_id or ""
        })
        
        # Insert with ignore_permissions to bypass Guest restrictions
        lead.insert(ignore_permissions=True)
        
        # Add notes as a comment if provided
        if notes:
            lead.add_comment("Comment", notes)
        
        frappe.db.commit()
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We will get back to you soon.",
            "lead_name": lead.name
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
def get_items_with_accommodation():
    """Get all items with their accommodation list and custom fields"""
    try:
        # Get all items with basic fields
        items = frappe.get_all("Item",
            filters={"disabled": 0},
            fields=[
                "name", 
                "item_name", 
                "item_group", 
                "standard_rate", 
                "image",
                "custom_duration",
                "custom_package_rating",
                "custom_air_information",
                "custom_hotel_information", 
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