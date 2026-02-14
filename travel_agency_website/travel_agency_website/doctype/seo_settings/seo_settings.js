// Copyright (c) 2025, ERP Lagbe and contributors
// For license information, please see license.txt

frappe.ui.form.on('SEO Settings', {
	refresh: function(frm) {
		// Add character counter for meta title
		if (frm.doc.meta_title) {
			frm.set_df_property('meta_title', 'description', 
				`${frm.doc.meta_title.length}/70 characters (50-60 recommended)`);
		}
		
		// Add character counter for meta description
		if (frm.doc.meta_description) {
			frm.set_df_property('meta_description', 'description', 
				`${frm.doc.meta_description.length}/320 characters (150-160 recommended)`);
		}
		
		// Add preview button
		frm.add_custom_button(__('Preview SEO'), function() {
			frappe.msgprint({
				title: __('SEO Preview'),
				message: `
					<div style="max-width: 600px;">
						<h3>Search Engine Result Preview</h3>
						<div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0;">
							<div style="color: #1a0dab; font-size: 18px; margin-bottom: 5px;">
								${frm.doc.meta_title || 'Page Title'}
							</div>
							<div style="color: #006621; font-size: 14px; margin-bottom: 5px;">
								${frm.doc.page_route}
							</div>
							<div style="color: #545454; font-size: 13px;">
								${frm.doc.meta_description || 'Page description...'}
							</div>
						</div>
					</div>
				`
			});
		});
	},
	
	meta_title: function(frm) {
		if (frm.doc.meta_title) {
			const length = frm.doc.meta_title.length;
			const color = length > 70 ? 'red' : (length > 60 ? 'orange' : 'green');
			frm.set_df_property('meta_title', 'description', 
				`<span style="color: ${color}">${length}/70 characters (50-60 recommended)</span>`);
		}
	},
	
	meta_description: function(frm) {
		if (frm.doc.meta_description) {
			const length = frm.doc.meta_description.length;
			const color = length > 320 ? 'red' : (length > 160 ? 'orange' : 'green');
			frm.set_df_property('meta_description', 'description', 
				`<span style="color: ${color}">${length}/320 characters (150-160 recommended)</span>`);
		}
	},
	
	page_route: function(frm) {
		// Ensure route starts with /
		if (frm.doc.page_route && !frm.doc.page_route.startsWith('/')) {
			frm.set_value('page_route', '/' + frm.doc.page_route);
		}
	}
});
