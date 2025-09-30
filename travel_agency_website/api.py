import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def create_lead_from_website(first_name, email_id, phone="", company_name="", notes=""):
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
            "source": "Website"
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