// Copyright (c) 2025, ERP Lagbe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Blog', {
	refresh: function(frm) {
		// Add custom buttons or actions if needed
		if (frm.doc.published) {
			frm.add_custom_button(__('View Blog Post'), function() {
				// Open blog post in new tab (you'll need to implement the frontend route)
				window.open(`/blog/${frm.doc.slug}`, '_blank');
			}, __('Actions'));
		}
	},
	
	title: function(frm) {
		// Auto-generate slug when title changes
		if (frm.doc.title && !frm.doc.slug) {
			frm.set_value('slug', frm.doc.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
		}
	},
	
});
