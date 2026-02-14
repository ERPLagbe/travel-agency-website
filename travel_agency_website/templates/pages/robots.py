import frappe

def get_context(context):
    """Generate robots.txt"""
    site_url = frappe.utils.get_url()
    context.site_url = site_url
    frappe.response['content_type'] = 'text/plain'
