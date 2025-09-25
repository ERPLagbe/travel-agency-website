#!/usr/bin/env python3
"""
Script to insert dummy data into Website CMS doctype
Run this script from the bench console or as a bench command
"""

import frappe

def insert_dummy_data():
    """Insert dummy data into Website CMS and related doctypes"""
    
    # Check if Website CMS already exists
    if frappe.db.exists("Website CMS", "Main Website Settings"):
        print("Website CMS already exists. Updating...")
        doc = frappe.get_doc("Website CMS", "Main Website Settings")
    else:
        print("Creating new Website CMS...")
        doc = frappe.get_doc({
            "doctype": "Website CMS",
            "title": "Main Website Settings"
        })
    
    # Business Settings
    doc.business_name = "Bismillah Travel"
    doc.business_phone = "+44 20 1234 5678"
    doc.business_email = "info@bismillahtravel.co.uk"
    doc.business_address = "123 London Street, London, UK"
    doc.whatsapp_number = "+44 20 1234 5678"
    doc.company_number = "12345678"
    doc.atol_number = "ATOL1234"
    doc.atol_certificate_url = "https://example.com/atol-certificate.pdf"
    
    # Hero Section
    doc.hero_background_image = "https://www.bismillahtravel.co.uk/images/banner%20(10).webp"
    doc.hero_floating_image = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
    doc.hero_trusted_text = "Trusted"
    doc.hero_main_title = "ISLAMIC TRAVEL AGENCY"
    doc.hero_subtitle = "For British Muslims"
    
    # Featured Packages
    doc.featured_packages_title = "Featured Packages"
    doc.featured_packages_subtitle = "Discover our most popular travel experiences"
    
    # Hajj Deals
    doc.hajj_deals_title = "Cheap Deals for Hajj 2026"
    
    # Testimonials
    doc.testimonials_title = "What Our Customers Say"
    doc.testimonials_subtitle = "Hear from our satisfied customers"
    
    # Welcome Section
    doc.welcome_title = "Welcome to Bismillah Travel"
    doc.welcome_description = "Your trusted partner for Islamic travel experiences"
    doc.welcome_services_title = "Our Services"
    doc.welcome_services_description = "We provide comprehensive travel services for Hajj and Umrah"
    doc.welcome_image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
    
    # Packages Description
    doc.umrah_title = "Umrah Packages"
    doc.umrah_description = "Experience the spiritual journey of Umrah with our carefully crafted packages"
    doc.hajj_title = "Hajj Packages"
    doc.hajj_description = "Join us for the sacred pilgrimage of Hajj with our comprehensive packages"
    
    # Save the document
    doc.save()
    frappe.db.commit()
    print("✅ Website CMS data inserted successfully!")
    
    # Insert dummy navigation dropdowns
    insert_navigation_dropdowns()
    
    # Insert dummy featured packages
    insert_featured_packages()
    
    # Insert dummy Hajj packages
    insert_hajj_packages()
    
    # Insert dummy testimonials
    insert_testimonials()
    
    # Insert dummy FAQ items
    insert_faq_items()
    
    # Insert dummy footer links
    insert_footer_links()
    
    # Insert dummy social media links
    insert_social_media_links()

def insert_navigation_dropdowns():
    """Insert dummy navigation dropdowns"""
    print("Inserting navigation dropdowns...")
    
    # Hajj Packages Dropdown
    hajj_dropdown = frappe.get_doc({
        "doctype": "Navigation Dropdown",
        "dropdown_name": "Hajj Packages",
        "display_order": 1
    })
    hajj_dropdown.save()
    
    # Add dropdown items
    hajj_items = [
        {"item_name": "5 Star Hajj Package", "item_group": "Hajj Packages", "display_order": 1},
        {"item_name": "4 Star Hajj Package", "item_group": "Hajj Packages", "display_order": 2},
        {"item_name": "3 Star Hajj Package", "item_group": "Hajj Packages", "display_order": 3}
    ]
    
    for item_data in hajj_items:
        item = frappe.get_doc({
            "doctype": "Navigation Dropdown Item",
            "parent": hajj_dropdown.name,
            "parenttype": "Navigation Dropdown",
            "parentfield": "dropdown_items",
            **item_data
        })
        item.save()
    
    # Umrah Packages Dropdown
    umrah_dropdown = frappe.get_doc({
        "doctype": "Navigation Dropdown",
        "dropdown_name": "Umrah Packages",
        "display_order": 2
    })
    umrah_dropdown.save()
    
    # Add dropdown items
    umrah_items = [
        {"item_name": "5 Star Umrah Package", "item_group": "Umrah Packages", "display_order": 1},
        {"item_name": "4 Star Umrah Package", "item_group": "Umrah Packages", "display_order": 2},
        {"item_name": "3 Star Umrah Package", "item_group": "Umrah Packages", "display_order": 3}
    ]
    
    for item_data in umrah_items:
        item = frappe.get_doc({
            "doctype": "Navigation Dropdown Item",
            "parent": umrah_dropdown.name,
            "parenttype": "Navigation Dropdown",
            "parentfield": "dropdown_items",
            **item_data
        })
        item.save()
    
    frappe.db.commit()
    print("✅ Navigation dropdowns inserted!")

def insert_featured_packages():
    """Insert dummy featured packages"""
    print("Inserting featured packages...")
    
    packages = [
        {"package_name": "5 Star Hajj Package", "package_item": "5-Star-Hajj-2026", "display_order": 1},
        {"package_name": "4 Star Umrah Package", "package_item": "4-Star-Umrah-2026", "display_order": 2},
        {"package_name": "3 Star Hajj Package", "package_item": "3-Star-Hajj-2026", "display_order": 3}
    ]
    
    for package_data in packages:
        package = frappe.get_doc({
            "doctype": "Featured Package",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "featured_packages",
            **package_data
        })
        package.save()
    
    frappe.db.commit()
    print("✅ Featured packages inserted!")

def insert_hajj_packages():
    """Insert dummy Hajj packages"""
    print("Inserting Hajj packages...")
    
    packages = [
        {"package_name": "5 Star Hajj Package 2026", "package_item": "5-Star-Hajj-2026", "display_order": 1},
        {"package_name": "4 Star Hajj Package 2026", "package_item": "4-Star-Hajj-2026", "display_order": 2},
        {"package_name": "3 Star Hajj Package 2026", "package_item": "3-Star-Hajj-2026", "display_order": 3}
    ]
    
    for package_data in packages:
        package = frappe.get_doc({
            "doctype": "Hajj Package",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "hajj_packages",
            **package_data
        })
        package.save()
    
    frappe.db.commit()
    print("✅ Hajj packages inserted!")

def insert_testimonials():
    """Insert dummy testimonials"""
    print("Inserting testimonials...")
    
    testimonials = [
        {
            "customer_name": "Ahmed Khan",
            "testimonial_text": "Excellent service! The Hajj package was well organized and the staff was very helpful throughout the journey.",
            "rating": 5,
            "display_order": 1
        },
        {
            "customer_name": "Fatima Ali",
            "testimonial_text": "Amazing experience with Bismillah Travel. The Umrah package exceeded our expectations.",
            "rating": 5,
            "display_order": 2
        },
        {
            "customer_name": "Mohammed Hassan",
            "testimonial_text": "Professional service and great value for money. Highly recommended for Hajj and Umrah packages.",
            "rating": 5,
            "display_order": 3
        }
    ]
    
    for testimonial_data in testimonials:
        testimonial = frappe.get_doc({
            "doctype": "Testimonial",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "testimonials",
            **testimonial_data
        })
        testimonial.save()
    
    frappe.db.commit()
    print("✅ Testimonials inserted!")

def insert_faq_items():
    """Insert dummy FAQ items"""
    print("Inserting FAQ items...")
    
    faqs = [
        {
            "question": "What is included in the Hajj package?",
            "answer": "Our Hajj packages include flights, accommodation, meals, transportation, and guidance throughout the pilgrimage.",
            "display_order": 1
        },
        {
            "question": "How far in advance should I book?",
            "answer": "We recommend booking at least 6 months in advance to secure the best prices and availability.",
            "display_order": 2
        },
        {
            "question": "Do you provide visa assistance?",
            "answer": "Yes, we provide complete visa assistance and guidance for both Hajj and Umrah visas.",
            "display_order": 3
        }
    ]
    
    for faq_data in faqs:
        faq = frappe.get_doc({
            "doctype": "FAQ Item",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "faq_items",
            **faq_data
        })
        faq.save()
    
    frappe.db.commit()
    print("✅ FAQ items inserted!")

def insert_footer_links():
    """Insert dummy footer links"""
    print("Inserting footer links...")
    
    links = [
        {"link_name": "About Us", "link_url": "/about", "display_order": 1},
        {"link_name": "Contact", "link_url": "/contact", "display_order": 2},
        {"link_name": "Privacy Policy", "link_url": "/privacy", "display_order": 3},
        {"link_name": "Terms & Conditions", "link_url": "/terms", "display_order": 4}
    ]
    
    for link_data in links:
        link = frappe.get_doc({
            "doctype": "Footer Link",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "footer_links",
            **link_data
        })
        link.save()
    
    frappe.db.commit()
    print("✅ Footer links inserted!")

def insert_social_media_links():
    """Insert dummy social media links"""
    print("Inserting social media links...")
    
    social_links = [
        {"platform_name": "Facebook", "platform_url": "https://facebook.com/bismillahtravel", "display_order": 1},
        {"platform_name": "Instagram", "platform_url": "https://instagram.com/bismillahtravel", "display_order": 2},
        {"platform_name": "Twitter", "platform_url": "https://twitter.com/bismillahtravel", "display_order": 3},
        {"platform_name": "YouTube", "platform_url": "https://youtube.com/bismillahtravel", "display_order": 4}
    ]
    
    for social_data in social_links:
        social = frappe.get_doc({
            "doctype": "Social Media Link",
            "parent": "Main Website Settings",
            "parenttype": "Website CMS",
            "parentfield": "social_media_links",
            **social_data
        })
        social.save()
    
    frappe.db.commit()
    print("✅ Social media links inserted!")

if __name__ == "__main__":
    insert_dummy_data()
