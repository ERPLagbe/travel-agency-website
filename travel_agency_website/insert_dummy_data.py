#!/usr/bin/env python3
"""
Script to insert dummy data for Travel Agency Website
This includes:
- ERPNext Item Groups and Items (for packages)
- Website CMS with all settings
- Child table data (testimonials, FAQs, etc.)
- Blog posts

Run this script from bench console:
    bench --site [site-name] console
    >>> from travel_agency_website.insert_dummy_data import insert_dummy_data
    >>> insert_dummy_data()
"""

import frappe
from frappe.utils import nowdate, add_days


def clear_child_table(doc, child_table_name):
    """Helper function to safely clear child table data"""
    if hasattr(doc, child_table_name):
        child_table = getattr(doc, child_table_name)
        if child_table:
            child_table.clear()
        else:
            setattr(doc, child_table_name, [])


def insert_dummy_data():
    """Main function to insert all dummy data"""
    
    print("\n" + "="*60)
    print("🚀 Starting Travel Agency Website Data Insertion")
    print("="*60 + "\n")
    
    # Step 1: Create Item Groups (ERPNext structure)
    insert_item_groups()
    
    # Step 2: Create Items (actual packages in ERPNext)
    insert_items()
    
    # Step 3: Create or update Website CMS
    insert_website_cms()
    
    # Step 4: Create Blog posts
    insert_blog_posts()
    
    # Step 5: Create Branch data
    insert_branches()
    
    print("\n" + "="*60)
    print("✅ All dummy data inserted successfully!")
    print("="*60 + "\n")


def insert_item_groups():
    """Create Item Groups for organizing packages"""
    print("📂 Creating Item Groups...")
    
    # Get or create root item group
    if not frappe.db.exists("Item Group", "All Item Groups"):
        root_group = frappe.get_doc({
            "doctype": "Item Group",
            "item_group_name": "All Item Groups",
            "is_group": 1
        })
        root_group.insert(ignore_permissions=True)
        print("  ✓ Created root Item Group: All Item Groups")
    
    item_groups = [
        {
            "item_group_name": "Travel Packages",
            "parent_item_group": "All Item Groups",
            "is_group": 1
        },
        {
            "item_group_name": "Hajj Packages",
            "parent_item_group": "Travel Packages",
            "is_group": 0
        },
        {
            "item_group_name": "Umrah Packages",
            "parent_item_group": "Travel Packages",
            "is_group": 0
        },
        {
            "item_group_name": "Ramadan Umrah",
            "parent_item_group": "Umrah Packages",
            "is_group": 0
        },
        {
            "item_group_name": "December Umrah",
            "parent_item_group": "Umrah Packages",
            "is_group": 0
        }
    ]
    
    for group_data in item_groups:
        if not frappe.db.exists("Item Group", group_data["item_group_name"]):
            group = frappe.get_doc({
                "doctype": "Item Group",
                **group_data
            })
            group.insert(ignore_permissions=True)
            print(f"  ✓ Created Item Group: {group_data['item_group_name']}")
        else:
            print(f"  ↪ Item Group already exists: {group_data['item_group_name']}")
    
    frappe.db.commit()
    print("✅ Item Groups created!\n")


def insert_items():
    """Create Items (packages) in ERPNext"""
    print("📦 Creating Items (Packages)...")
    
    items = [
        # Hajj Packages
        {
            "item_code": "5-Star-Hajj-2026",
            "item_name": "5 Star Hajj Package 2026",
            "item_group": "Hajj Packages",
            "description": """<h3>Premium 5 Star Hajj Package 2026</h3>
<p>Experience the sacred pilgrimage of Hajj with our premium 5-star package. This comprehensive package includes:</p>
<ul>
<li>Direct flights from UK to Saudi Arabia</li>
<li>5-star accommodation in Makkah (500m from Haram)</li>
<li>5-star accommodation in Madinah (200m from Masjid Nabawi)</li>
<li>Full board meals (breakfast, lunch, dinner)</li>
<li>All ground transportation in luxury coaches</li>
<li>Experienced guides and scholars</li>
<li>Hajj training sessions</li>
<li>Visa processing and documentation</li>
<li>24/7 support throughout the journey</li>
</ul>
<p><strong>Duration:</strong> 21 days<br>
<strong>Departure:</strong> June 2026</p>""",
            "standard_rate": 12500.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
        },
        {
            "item_code": "4-Star-Hajj-2026",
            "item_name": "4 Star Hajj Package 2026",
            "item_group": "Hajj Packages",
            "description": """<h3>Comfort 4 Star Hajj Package 2026</h3>
<p>Perform your Hajj pilgrimage in comfort with our 4-star package:</p>
<ul>
<li>Direct flights from UK major cities</li>
<li>4-star accommodation in Makkah (800m from Haram)</li>
<li>4-star accommodation in Madinah (400m from Masjid Nabawi)</li>
<li>Daily meals provided</li>
<li>Air-conditioned transportation</li>
<li>Qualified religious guides</li>
<li>Hajj preparation workshops</li>
<li>Complete visa assistance</li>
</ul>
<p><strong>Duration:</strong> 18 days<br>
<strong>Departure:</strong> June 2026</p>""",
            "standard_rate": 9500.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop"
        },
        {
            "item_code": "3-Star-Hajj-2026",
            "item_name": "3 Star Hajj Package 2026",
            "item_group": "Hajj Packages",
            "description": """<h3>Economy 3 Star Hajj Package 2026</h3>
<p>Affordable Hajj package without compromising on essential services:</p>
<ul>
<li>Flights from UK to Saudi Arabia</li>
<li>3-star accommodation in Makkah (1.5km from Haram)</li>
<li>3-star accommodation in Madinah (800m from Masjid Nabawi)</li>
<li>Breakfast and dinner included</li>
<li>Group transportation</li>
<li>Experienced tour leaders</li>
<li>Hajj training provided</li>
<li>Visa processing support</li>
</ul>
<p><strong>Duration:</strong> 16 days<br>
<strong>Departure:</strong> June 2026</p>""",
            "standard_rate": 7500.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
        },
        
        # Umrah Packages
        {
            "item_code": "5-Star-Umrah-2026",
            "item_name": "5 Star Umrah Package 2026",
            "item_group": "Umrah Packages",
            "description": """<h3>Luxury 5 Star Umrah Package</h3>
<p>Premium Umrah experience with the finest accommodations and services:</p>
<ul>
<li>Direct flights with premium airlines</li>
<li>5-star hotel in Makkah (300m from Haram)</li>
<li>5-star hotel in Madinah (150m from Masjid Nabawi)</li>
<li>All meals included</li>
<li>Private airport transfers</li>
<li>Expert religious guides</li>
<li>Ziyarat tours included</li>
<li>Fast-track visa processing</li>
</ul>
<p><strong>Duration:</strong> 10 days<br>
<strong>Flexible Dates:</strong> Year-round availability</p>""",
            "standard_rate": 2800.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
        },
        {
            "item_code": "4-Star-Umrah-2026",
            "item_name": "4 Star Umrah Package 2026",
            "item_group": "Umrah Packages",
            "description": """<h3>Deluxe 4 Star Umrah Package</h3>
<p>Perfect balance of comfort and value for your spiritual journey:</p>
<ul>
<li>Quality airline flights</li>
<li>4-star hotel in Makkah (600m from Haram)</li>
<li>4-star hotel in Madinah (300m from Masjid Nabawi)</li>
<li>Breakfast and dinner provided</li>
<li>Shared airport transfers</li>
<li>Knowledgeable guides</li>
<li>City tours of Makkah and Madinah</li>
<li>Visa assistance included</li>
</ul>
<p><strong>Duration:</strong> 7 days<br>
<strong>Available:</strong> Throughout the year</p>""",
            "standard_rate": 1950.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop"
        },
        {
            "item_code": "3-Star-Umrah-2026",
            "item_name": "3 Star Umrah Package 2026",
            "item_group": "Umrah Packages",
            "description": """<h3>Budget-Friendly 3 Star Umrah Package</h3>
<p>Affordable Umrah package with all essential services:</p>
<ul>
<li>Economy flights to Saudi Arabia</li>
<li>3-star hotel in Makkah (1km from Haram)</li>
<li>3-star hotel in Madinah (600m from Masjid Nabawi)</li>
<li>Breakfast included</li>
<li>Group transportation</li>
<li>Basic Umrah guidance</li>
<li>Essential ziyarat tours</li>
<li>Visa processing</li>
</ul>
<p><strong>Duration:</strong> 7 days<br>
<strong>Best Value:</strong> Perfect for first-time pilgrims</p>""",
            "standard_rate": 1450.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
        },
        
        # Special Umrah Packages
        {
            "item_code": "Ramadan-Umrah-2026",
            "item_name": "Ramadan Umrah Special 2026",
            "item_group": "Ramadan Umrah",
            "description": """<h3>Special Ramadan Umrah Package</h3>
<p>Experience the blessed month of Ramadan in the holy cities:</p>
<ul>
<li>Premium flights during Ramadan</li>
<li>4-star accommodation near Haram</li>
<li>Iftar and Suhoor meals included</li>
<li>Taraweeh prayers at Haram</li>
<li>Special Ramadan activities</li>
<li>Laylatul Qadr in Makkah</li>
<li>Experienced Ramadan guides</li>
<li>All transfers included</li>
</ul>
<p><strong>Duration:</strong> 15 days<br>
<strong>Limited Availability:</strong> Ramadan 2026</p>""",
            "standard_rate": 3500.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
        },
        {
            "item_code": "December-Umrah-2026",
            "item_name": "December Special Umrah 2026",
            "item_group": "December Umrah",
            "description": """<h3>December Special Umrah Package</h3>
<p>End the year with a spiritual journey during winter break:</p>
<ul>
<li>Scheduled flights from major UK airports</li>
<li>4-star hotels in prime locations</li>
<li>Full board meals</li>
<li>Comfortable winter travel</li>
<li>Extended Ziyarat tours</li>
<li>Shopping time in Makkah and Madinah</li>
<li>Professional tour management</li>
<li>Family-friendly options</li>
</ul>
<p><strong>Duration:</strong> 10 days<br>
<strong>Perfect For:</strong> Families and groups</p>""",
            "standard_rate": 2200.00,
            "is_stock_item": 0,
            "is_sales_item": 1,
            "stock_uom": "Unit",
            "image": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop"
        }
    ]
    
    for item_data in items:
        try:
            if not frappe.db.exists("Item", item_data["item_code"]):
                item = frappe.get_doc({
                    "doctype": "Item",
                    **item_data
                })
                item.insert(ignore_permissions=True)
                print(f"  ✓ Created Item: {item_data['item_name']}")
            else:
                # Update existing item
                item = frappe.get_doc("Item", item_data["item_code"])
                for key, value in item_data.items():
                    if key != "item_code":
                        setattr(item, key, value)
                item.save(ignore_permissions=True)
                print(f"  ↻ Updated Item: {item_data['item_name']}")
        except Exception as e:
            print(f"  ❌ Error creating/updating item {item_data['item_name']}: {str(e)}")
            continue
    
    frappe.db.commit()
    print("✅ Items (Packages) created!\n")


# Navigation dropdowns removed to avoid issues - can be created manually later


def insert_website_cms():
    """Insert or update Website CMS single doctype"""
    print("🌐 Creating/Updating Website CMS...")
    
    # Check if Website CMS already exists
    if frappe.db.exists("Website CMS", "Website CMS"):
        print("  ↻ Website CMS exists, updating...")
        doc = frappe.get_doc("Website CMS", "Website CMS")
    else:
        print("  ✓ Creating new Website CMS...")
        doc = frappe.get_doc({
            "doctype": "Website CMS",
            "title": "Main Website Settings"
        })
    
    # Business Settings
    doc.business_name = "Bismillah Travel"
    doc.business_phone = "+44 20 1234 5678"
    doc.business_email = "info@bismillahtravel.co.uk"
    doc.business_address = "123 London Street, London, UK, SW1A 1AA"
    doc.whatsapp_number = "+44 7700 900000"
    doc.company_number = "12345678"
    doc.atol_number = "ATOL1234"
    doc.atol_certificate_url = "https://example.com/atol-certificate.pdf"
    doc.logo = "/files/logo.png"
    
    # Hero Section
    doc.hero_background_image = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&h=1080&fit=crop"
    doc.hero_floating_image = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop"
    doc.hero_trusted_text = "Trusted Since 2008"
    doc.hero_main_title = "ISLAMIC TRAVEL AGENCY"
    doc.hero_subtitle = "For British Muslims"
    doc.hero_description = "Experience the journey of a lifetime with our expertly crafted Hajj and Umrah packages"
    doc.hero_primary_button_text = "Explore Packages"
    doc.hero_secondary_button_text = "Contact Us"
    
    # CTA Section
    doc.cta_title = "Customise Your Package"
    doc.cta_description = "We are specialists in Customised packages according to your needs."
    doc.cta_subtitle = "Allow us to offer Umrah according to your Budget, Travel Dates, Hotel Choice."
    doc.cta_button_text = "Customise Your Package"
    doc.cta_button_link = "/contact"
    
    # Featured Packages Section
    doc.featured_packages_title = "Featured Packages"
    doc.featured_packages_subtitle = "Discover our most popular travel experiences"
    
    # Clear existing featured packages
    clear_child_table(doc, 'featured_packages')
    
    # Add featured packages (child table)
    featured_packages = [
        {"package_name": "5 Star Hajj Package 2026", "item": "5-Star-Hajj-2026", "display_order": 1},
        {"package_name": "5 Star Umrah Package 2026", "item": "5-Star-Umrah-2026", "display_order": 2},
        {"package_name": "Ramadan Umrah Special 2026", "item": "Ramadan-Umrah-2026", "display_order": 3}
    ]
    
    for pkg in featured_packages:
        doc.append("featured_packages", pkg)
    
    # Testimonials Section
    doc.testimonials_title = "What Our Customers Say"
    doc.testimonials_subtitle = "Real experiences from our satisfied pilgrims"
    
    # Clear existing testimonials
    clear_child_table(doc, 'testimonials')
    
    # Add testimonials (child table)
    testimonials = [
        {
            "customer_name": "Ahmed Khan",
            "customer_location": "Birmingham, UK",
            "rating": 5,
            "testimonial_text": "Excellent service! The Hajj package was well organized and the staff was very helpful throughout the journey. Hotels were close to Haram and the guides were knowledgeable.",
            "customer_avatar": "/files/avatar1.jpg",
            "display_order": 1
        },
        {
            "customer_name": "Fatima Ali",
            "customer_location": "London, UK",
            "rating": 5,
            "testimonial_text": "Amazing experience with Bismillah Travel. The Umrah package exceeded our expectations. Everything was taken care of professionally.",
            "customer_avatar": "/files/avatar2.jpg",
            "display_order": 2
        },
        {
            "customer_name": "Mohammed Hassan",
            "customer_location": "Manchester, UK",
            "rating": 5,
            "testimonial_text": "Professional service and great value for money. Highly recommended for Hajj and Umrah packages. Will definitely book again.",
            "customer_avatar": "/files/avatar3.jpg",
            "display_order": 3
        },
        {
            "customer_name": "Aisha Rahman",
            "customer_location": "Bradford, UK",
            "rating": 5,
            "testimonial_text": "The Ramadan Umrah package was incredible. Praying Taraweeh at Haram was a dream come true. Thank you Bismillah Travel!",
            "customer_avatar": "/files/avatar4.jpg",
            "display_order": 4
        }
    ]
    
    for testimonial in testimonials:
        doc.append("testimonials", testimonial)
    
    # Welcome Section
    doc.welcome_title = "Welcome to Bismillah Travel - Your Trusted Umrah Travel Agency in the UK"
    doc.welcome_description = "With over 15 years of experience, Bismillah Travel has been serving the British Muslim community with exceptional Hajj and Umrah packages. We are committed to making your spiritual journey comfortable, memorable, and hassle-free."
    doc.welcome_services_title = "Our Services - Tailored Islamic Travel Solutions"
    doc.welcome_services_description = "We provide comprehensive travel services including accommodation, flights, visas, guided tours, and 24/7 support throughout your journey."
    doc.welcome_image = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop"
    
    # Packages Description
    doc.umrah_title = "Umrah Packages"
    doc.umrah_description = "Experience the spiritual journey of Umrah with our carefully crafted packages. We offer year-round Umrah services with 3, 4, and 5-star accommodation options close to Masjid al-Haram."
    doc.hajj_title = "Hajj Packages"
    doc.hajj_description = "Join us for the sacred pilgrimage of Hajj with our comprehensive packages. Our experienced team ensures all your needs are met during this once-in-a-lifetime journey."
    doc.packages_image = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop"
    
    # FAQ Section
    doc.faq_title = "Frequently Asked Questions"
    doc.faq_subtitle = "Find answers to common questions about our travel services"
    
    # Clear existing FAQs
    clear_child_table(doc, 'faq_items')
    
    # Add FAQ items (child table)
    faqs = [
        {
            "question": "What is included in the Hajj package?",
            "answer": "Our Hajj packages include round-trip flights, accommodation in Makkah and Madinah, meals (depending on package tier), transportation, visa processing, experienced guides, Hajj training, and 24/7 support.",
            "display_order": 1
        },
        {
            "question": "How far in advance should I book?",
            "answer": "We recommend booking Hajj packages at least 8-10 months in advance. For Umrah, booking 2-3 months ahead is advisable, especially during peak seasons like Ramadan.",
            "display_order": 2
        },
        {
            "question": "Do you provide visa assistance?",
            "answer": "Yes, we provide complete visa assistance and guidance for both Hajj and Umrah visas. Our team will help you with all documentation and submission processes.",
            "display_order": 3
        },
        {
            "question": "Are your packages ATOL protected?",
            "answer": "Yes, all our packages are ATOL protected (ATOL1234), ensuring your financial protection and peace of mind.",
            "display_order": 4
        },
        {
            "question": "Can I customize my package?",
            "answer": "Absolutely! We offer flexible packages that can be customized according to your preferences, group size, and budget. Contact us to discuss your requirements.",
            "display_order": 5
        },
        {
            "question": "What are the accommodation distances from Haram?",
            "answer": "5-star packages: 300-500m, 4-star packages: 600-800m, 3-star packages: 1-1.5km from Masjid al-Haram. All accommodations are carefully selected for quality and convenience.",
            "display_order": 6
        }
    ]
    
    for faq in faqs:
        doc.append("faq_items", faq)
    
    # Visa Page
    doc.visa_title = "Visa Services"
    doc.visa_subtitle = "Professional visa processing for all your travel needs"
    doc.visa_background_image = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=600&fit=crop"
    
    # Clear existing visa sections
    clear_child_table(doc, 'visa_sections')
    
    # Add visa sections (child table)
    visa_sections = [
        {
            "heading": "Hajj Visa Processing",
            "content": "We handle all aspects of your Hajj visa application, from documentation to submission. Our experienced team ensures a smooth and hassle-free process.",
            "image": "/files/hajj-visa.jpg",
            "display_order": 1
        },
        {
            "heading": "Umrah Visa Assistance",
            "content": "Get your Umrah visa processed quickly and efficiently. We provide complete guidance on required documents and handle the entire application process.",
            "image": "/files/umrah-visa.jpg",
            "display_order": 2
        }
    ]
    
    for section in visa_sections:
        doc.append("visa_sections", section)
    
    # About Page
    doc.about_title = "About Bismillah Travel"
    doc.about_subtitle = "Your trusted partner in spiritual journeys since 2008"
    doc.about_background_image = "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1920&h=600&fit=crop"
    
    # Clear existing about sections
    clear_child_table(doc, 'about_sections')
    
    # Add about sections (child table)
    about_sections = [
        {
            "heading": "Our Story",
            "content": "Founded in 2008, Bismillah Travel has been dedicated to serving the British Muslim community with exceptional Hajj and Umrah services. What started as a small family business has grown into one of the UK's most trusted Islamic travel agencies.",
            "image": "/files/our-story.jpg",
            "display_order": 1
        },
        {
            "heading": "Our Mission",
            "content": "To provide affordable, comfortable, and spiritually enriching pilgrimage experiences while maintaining the highest standards of service and customer care.",
            "image": "/files/our-mission.jpg",
            "display_order": 2
        },
        {
            "heading": "Why Choose Us",
            "content": "With over 15 years of experience, ATOL protection, competitive prices, and thousands of satisfied customers, we are your ideal partner for Hajj and Umrah journeys.",
            "image": "/files/why-choose-us.jpg",
            "display_order": 3
        }
    ]
    
    for section in about_sections:
        doc.append("about_sections", section)
    
    # Footer Settings
    doc.footer_copyright = "All rights reserved Bismillah Travel © 2010 - 2026"
    doc.footer_legal_text = "ATOL Protected | Company Number: 12345678 | Registered in England and Wales"
    
    # Clear existing footer links
    clear_child_table(doc, 'footer_quick_links')
    clear_child_table(doc, 'footer_terms_links')
    
    # Add footer quick links (child table)
    quick_links = [
        {"link_text": "About Us", "link_url": "/about", "display_order": 1},
        {"link_text": "Contact", "link_url": "/contact", "display_order": 2},
        {"link_text": "Visa Services", "link_url": "/visa", "display_order": 3},
        {"link_text": "Branches", "link_url": "/branches", "display_order": 4}
    ]
    
    for link in quick_links:
        doc.append("footer_quick_links", link)
    
    # Add footer terms links (child table)
    terms_links = [
        {"link_text": "Terms & Conditions", "link_url": "/terms", "display_order": 1},
        {"link_text": "Privacy Policy", "link_url": "/privacy", "display_order": 2},
        {"link_text": "Refund Policy", "link_url": "/refund", "display_order": 3}
    ]
    
    for link in terms_links:
        doc.append("footer_terms_links", link)
    
    # Clear existing social media links
    clear_child_table(doc, 'footer_social_media')
    
    # Add social media links (child table)
    social_links = [
        {"platform_name": "Facebook", "platform_url": "https://facebook.com/bismillahtravel", "icon_class": "facebook", "display_order": 1},
        {"platform_name": "Instagram", "platform_url": "https://instagram.com/bismillahtravel", "icon_class": "instagram", "display_order": 2},
        {"platform_name": "Twitter", "platform_url": "https://twitter.com/bismillahtravel", "icon_class": "twitter", "display_order": 3}
    ]
    
    for social in social_links:
        doc.append("footer_social_media", social)
    
    # Terms & Conditions
    doc.terms_title = "Terms and Conditions"
    doc.terms_content = """<h2>Terms and Conditions</h2>
<p>Please read these terms and conditions carefully before booking with Bismillah Travel.</p>

<h3>1. Booking and Payment</h3>
<p>A deposit is required to secure your booking. Full payment must be made 60 days before departure.</p>

<h3>2. Cancellation Policy</h3>
<p>Cancellations made more than 60 days before departure: 20% administration fee<br>
30-60 days: 50% of total cost<br>
Less than 30 days: 100% of total cost</p>

<h3>3. Travel Documents</h3>
<p>You are responsible for ensuring all travel documents are valid and in order.</p>

<h3>4. Health Requirements</h3>
<p>It is your responsibility to ensure you meet all health requirements for travel to Saudi Arabia.</p>

<h3>5. Insurance</h3>
<p>We strongly recommend comprehensive travel insurance for all bookings.</p>

<p>For full terms and conditions, please contact our office.</p>"""
    
    # Navigation dropdowns skipped to avoid issues - can be configured manually later
    
    # Save the document with proper error handling
    try:
        doc.save(ignore_permissions=True)
        frappe.db.commit()
        print("✅ Website CMS data inserted/updated successfully!")
    except Exception as e:
        print(f"❌ Error saving Website CMS: {str(e)}")
        frappe.db.rollback()
        raise e
    
    print("✅ Website CMS data inserted/updated!\n")


def insert_blog_posts():
    """Create sample blog posts"""
    print("📝 Creating Blog Posts...")
    
    blogs = [
        {
            "title": "Top 10 Tips for First-Time Hajj Pilgrims",
            "slug": "top-10-tips-first-time-hajj-pilgrims",
            "content": """<h2>Essential Tips for Your First Hajj Journey</h2>

<p>Embarking on your first Hajj can be both exciting and overwhelming. Here are our top 10 tips to help you prepare:</p>

<h3>1. Start Preparing Early</h3>
<p>Begin your preparations at least 6 months in advance. This includes physical fitness, learning the rituals, and gathering necessary documents.</p>

<h3>2. Get Physically Fit</h3>
<p>Hajj requires a lot of walking. Start a walking routine months before to build your stamina.</p>

<h3>3. Learn the Rituals</h3>
<p>Attend Hajj training sessions to understand the rituals properly. Knowledge will make your journey more meaningful.</p>

<h3>4. Pack Smart</h3>
<p>Bring comfortable walking shoes, unscented toiletries, medications, and appropriate ihram clothing.</p>

<h3>5. Stay Hydrated</h3>
<p>The Saudi weather can be very hot. Drink plenty of water and avoid direct sun exposure during peak hours.</p>

<h3>6. Be Patient</h3>
<p>You'll encounter crowds and challenges. Maintain patience and remember the spiritual significance of your journey.</p>

<h3>7. Take Care of Your Health</h3>
<p>Carry essential medications and don't hesitate to seek medical help if needed.</p>

<h3>8. Follow Your Group</h3>
<p>Stay with your group and follow your guide's instructions for a smooth experience.</p>

<h3>9. Make Dua</h3>
<p>This is a blessed time. Make plenty of dua for yourself, your family, and the entire Ummah.</p>

<h3>10. Enjoy the Experience</h3>
<p>While Hajj is demanding, it's also a once-in-a-lifetime spiritual experience. Embrace every moment.</p>

<p>May Allah accept your Hajj and make it easy for you. Ameen.</p>""",
            "featured_image": "/files/blog-hajj-tips.jpg"
        },
        {
            "title": "Umrah During Ramadan: A Complete Guide",
            "slug": "umrah-during-ramadan-complete-guide",
            "content": """<h2>The Blessed Journey of Ramadan Umrah</h2>

<p>Performing Umrah during Ramadan is considered equivalent to Hajj in reward. Here's everything you need to know:</p>

<h3>Why Ramadan Umrah is Special</h3>
<p>The Prophet Muhammad (peace be upon him) said: "Umrah in Ramadan is equivalent to Hajj" (Sahih Bukhari).</p>

<h3>Best Times to Perform Umrah in Ramadan</h3>
<p>The first 10 days are less crowded, while the last 10 days, especially odd nights seeking Laylatul Qadr, are most blessed but extremely crowded.</p>

<h3>Managing Fasting While Performing Umrah</h3>
<ul>
<li>Perform Umrah after Iftar or before Fajr when you're not fasting</li>
<li>If performing during fasting hours, take extra care and stay hydrated after Iftar</li>
<li>Carry dates and water for Iftar if you're near the Haram</li>
</ul>

<h3>What to Expect</h3>
<p>Expect large crowds, especially during Taraweeh. The atmosphere is incredibly spiritual, with millions of Muslims from around the world.</p>

<h3>Booking Tips</h3>
<ul>
<li>Book early (6-8 months in advance)</li>
<li>Choose accommodation close to Haram</li>
<li>Consider longer stays to experience the full blessing of Ramadan</li>
</ul>

<h3>Essential Items to Pack</h3>
<ul>
<li>Comfortable clothes for Ihram and Tawaf</li>
<li>Prayer mat</li>
<li>Quran and Dua books</li>
<li>Unscented toiletries</li>
<li>Energy snacks for Suhoor and Iftar</li>
</ul>

<p>May Allah grant you the opportunity to perform Umrah in Ramadan. Ameen.</p>""",
            "featured_image": "/files/blog-ramadan-umrah.jpg"
        },
        {
            "title": "How to Choose the Right Hajj Package",
            "slug": "how-to-choose-right-hajj-package",
            "content": """<h2>Selecting Your Perfect Hajj Package</h2>

<p>With so many Hajj packages available, choosing the right one can be challenging. Here's our guide to help you decide:</p>

<h3>Understand Your Budget</h3>
<p>Hajj packages range from budget 3-star to luxury 5-star options. Determine your budget first.</p>

<h3>Consider the Hotel Location</h3>
<p>Proximity to Haram is crucial. Closer hotels cost more but save you energy and time:
<ul>
<li>5-star: Usually 300-500m from Haram</li>
<li>4-star: Typically 600-800m from Haram</li>
<li>3-star: Generally 1-1.5km from Haram</li>
</ul>
</p>

<h3>Check What's Included</h3>
<p>Always verify what's included in the package:
<ul>
<li>Flights (direct or with stops?)</li>
<li>Accommodation in Makkah and Madinah</li>
<li>Meals (full board, half board, breakfast only?)</li>
<li>Transportation</li>
<li>Visa processing</li>
<li>Guides and training</li>
<li>Ziyarat tours</li>
</ul>
</p>

<h3>Group Size Matters</h3>
<p>Smaller groups (20-30 people) offer more personalized attention. Larger groups may be more economical but less flexible.</p>

<h3>Check the Company's Reputation</h3>
<ul>
<li>Look for ATOL protection</li>
<li>Read reviews and testimonials</li>
<li>Ask about their experience and track record</li>
<li>Verify their license and registrations</li>
</ul>

<h3>Quality of Guides</h3>
<p>Experienced, knowledgeable guides make a huge difference. Ask about the qualifications of the guides.</p>

<h3>Departure Dates</h3>
<p>Longer packages allow more time for spiritual activities and rest. Shorter packages are more economical but can be rushed.</p>

<h3>Additional Services</h3>
<p>Some packages include:
<ul>
<li>Pre-departure training sessions</li>
<li>Hajj guidebooks and materials</li>
<li>24/7 support during the journey</li>
<li>Medical support</li>
<li>Wheelchair services for elderly</li>
</ul>
</p>

<h3>Ask Questions</h3>
<p>Don't hesitate to ask the travel agency questions about anything you're unsure about.</p>

<p>Remember, Hajj is a once-in-a-lifetime experience for many. Choose wisely and may Allah accept your Hajj.</p>""",
            "featured_image": "/files/blog-choose-package.jpg"
        },
        {
            "title": "Understanding the Umrah Rituals Step by Step",
            "slug": "understanding-umrah-rituals-step-by-step",
            "content": """<h2>Complete Guide to Umrah Rituals</h2>

<p>Learn the step-by-step process of performing Umrah correctly:</p>

<h3>1. Entering Ihram</h3>
<p>Before crossing the Miqat (boundary), enter the state of Ihram:
<ul>
<li>Take a shower (Ghusl)</li>
<li>Wear Ihram clothing (men: two white unstitched sheets; women: modest clothing)</li>
<li>Make the intention (Niyyah) for Umrah</li>
<li>Recite Talbiyah: "Labbayk Allahumma Labbayk..."</li>
</ul>
</p>

<h3>2. Tawaf (Circumambulation)</h3>
<p>Upon arrival at Masjid al-Haram:
<ul>
<li>Enter with your right foot, making dua</li>
<li>Proceed to the Black Stone (Hajar al-Aswad)</li>
<li>Point towards it or kiss it if possible</li>
<li>Circle the Kaaba seven times counter-clockwise</li>
<li>Men: Uncover right shoulder (Idtiba) and jog first three rounds (Raml)</li>
<li>After completion, pray two rak'ahs near Maqam Ibrahim</li>
</ul>
</p>

<h3>3. Sa'i (Walking between Safa and Marwa)</h3>
<p>Walk seven times between the hills of Safa and Marwa:
<ul>
<li>Start at Safa, facing the Kaaba</li>
<li>Walk to Marwa (this counts as one)</li>
<li>Return from Marwa to Safa (this counts as two)</li>
<li>Complete seven laps ending at Marwa</li>
<li>Recite duas and dhikr throughout</li>
</ul>
</p>

<h3>4. Halq or Taqsir (Hair Cutting)</h3>
<p>Finally, trim or shave your hair:
<ul>
<li>Men: Shave head completely (Halq) or trim hair (Taqsir)</li>
<li>Women: Cut a fingertip's length of hair</li>
<li>This completes your Umrah</li>
</ul>
</p>

<h3>After Umrah</h3>
<p>You can now exit Ihram and resume normal activities. It's recommended to:
<ul>
<li>Pray as many prayers as possible in the Haram</li>
<li>Make Tawaf as much as you can</li>
<li>Increase your worship and duas</li>
<li>Drink Zamzam water with good intentions</li>
</ul>
</p>

<h3>Important Reminders</h3>
<ul>
<li>Stay in wudu throughout the rituals when possible</li>
<li>Be patient with crowds</li>
<li>Help and show kindness to fellow pilgrims</li>
<li>Focus on the spiritual aspect of the journey</li>
</ul>

<p>May Allah accept your Umrah and grant you a spiritually uplifting experience. Ameen.</p>""",
            "featured_image": "/files/blog-umrah-rituals.jpg"
        },
        {
            "title": "Packing List for Hajj and Umrah: What to Bring",
            "slug": "packing-list-hajj-umrah-what-to-bring",
            "content": """<h2>Complete Packing Checklist for Your Pilgrimage</h2>

<p>Make sure you're fully prepared with this comprehensive packing list:</p>

<h3>Travel Documents</h3>
<ul>
<li>Valid passport (at least 6 months validity)</li>
<li>Visa</li>
<li>Flight tickets</li>
<li>Travel insurance documents</li>
<li>Vaccination certificates</li>
<li>Hotel vouchers</li>
<li>Emergency contact numbers</li>
<li>Photocopies of all important documents</li>
</ul>

<h3>Ihram Clothing</h3>
<p><strong>For Men:</strong></p>
<ul>
<li>2-3 sets of white Ihram cloth (unstitched)</li>
<li>Belt or safety pins for Ihram</li>
<li>Slippers/sandals (no stitching over feet)</li>
</ul>

<p><strong>For Women:</strong></p>
<ul>
<li>Modest abayas or loose clothing</li>
<li>Hijabs and scarves</li>
<li>Comfortable shoes (no restrictions like men)</li>
</ul>

<h3>Prayer Items</h3>
<ul>
<li>Prayer mat (optional, available there)</li>
<li>Quran (small portable size)</li>
<li>Dua books (Hajj/Umrah specific)</li>
<li>Tasbeeh (prayer beads)</li>
<li>Mus'haf holder/stand</li>
</ul>

<h3>Personal Care Items</h3>
<ul>
<li>Unscented toiletries (body wash, shampoo)</li>
<li>Toothbrush and toothpaste</li>
<li>Unscented moisturizer and lip balm</li>
<li>Sunscreen (unscented)</li>
<li>First aid kit</li>
<li>Personal medications</li>
<li>Prescription medications with doctor's note</li>
<li>Pain relievers</li>
<li>Anti-diarrhea medicine</li>
<li>Antiseptic cream</li>
</ul>

<h3>Clothing (for outside Ihram)</h3>
<ul>
<li>Comfortable loose clothing</li>
<li>Light jacket or shawl (hotels and buses are air-conditioned)</li>
<li>Socks</li>
<li>Underwear</li>
<li>Sleepwear</li>
</ul>

<h3>Footwear</h3>
<ul>
<li>Comfortable walking shoes/sneakers</li>
<li>Sandals</li>
<li>Extra pair in case one breaks</li>
</ul>

<h3>Accessories</h3>
<ul>
<li>Small backpack or shoulder bag</li>
<li>Money belt or secure pouch</li>
<li>Umbrella (for sun and rain)</li>
<li>Eye mask and ear plugs</li>
<li>Power bank and charger</li>
<li>Universal adapter</li>
<li>Small torch/flashlight</li>
<li>Reusable water bottle</li>
</ul>

<h3>Health & Hygiene</h3>
<ul>
<li>Wet wipes (unscented)</li>
<li>Tissues</li>
<li>Hand sanitizer</li>
<li>Face masks</li>
<li>Nail clippers</li>
<li>Small scissors</li>
</ul>

<h3>Optional but Useful</h3>
<ul>
<li>Small folding chair for Sa'i</li>
<li>Cooling towel</li>
<li>Ziplock bags for organizing</li>
<li>Laundry detergent packets</li>
<li>Clothesline and clips</li>
<li>Snacks (dates, nuts, energy bars)</li>
<li>Small sewing kit</li>
</ul>

<h3>Electronics</h3>
<ul>
<li>Mobile phone</li>
<li>Camera (optional)</li>
<li>Chargers for all devices</li>
<li>Power bank</li>
<li>International SIM card or roaming plan</li>
</ul>

<h3>Money</h3>
<ul>
<li>Saudi Riyals (cash)</li>
<li>Credit/debit cards</li>
<li>Keep money in multiple secure places</li>
</ul>

<h3>Important Reminders</h3>
<ul>
<li>Pack light - you'll be moving around a lot</li>
<li>Avoid valuable items and expensive jewelry</li>
<li>Check airline baggage restrictions</li>
<li>Use a sturdy, easily identifiable suitcase</li>
<li>Keep essentials in carry-on luggage</li>
</ul>

<h3>What NOT to Bring While in Ihram</h3>
<ul>
<li>Scented products (perfume, deodorant, soap)</li>
<li>Men: Stitched clothing, covered shoes</li>
<li>Items that could violate Ihram restrictions</li>
</ul>

<p>This list covers most situations. Adjust based on your personal needs and the season of travel. May your journey be smooth and blessed!</p>""",
            "featured_image": "/files/blog-packing-list.jpg"
        }
    ]
    
    for blog_data in blogs:
        if not frappe.db.exists("Blog", blog_data["title"]):
            blog = frappe.get_doc({
                "doctype": "Blog",
                **blog_data
            })
            blog.insert(ignore_permissions=True)
            print(f"  ✓ Created Blog: {blog_data['title']}")
        else:
            # Update existing blog
            blog = frappe.get_doc("Blog", blog_data["title"])
            for key, value in blog_data.items():
                setattr(blog, key, value)
            blog.save(ignore_permissions=True)
            print(f"  ↻ Updated Blog: {blog_data['title']}")
    
    frappe.db.commit()
    print("✅ Blog posts created!\n")


def insert_branches():
    """Create Branch data for contact information"""
    print("🏢 Creating Branch data...")
    
    branches = [
        {
            "branch": "Head Office - London",
            "custom_address_line_1": "Suite No.5, The Old Dispensary",
            "custom_address_line_2": "30 Romford Road, Stratford",
            "custom_city": "London",
            "custom_postal_code": "E15 4BZ",
            "custom_country": "United Kingdom",
            "custom_branch_code": "HO-LDN",
            "custom_head_office": 1,
            "custom_disabled": 0,
            "custom_map_location": "https://maps.google.com/?q=30+Romford+Road+Stratford+London+E15+4BZ"
        },
        {
            "branch": "Birmingham Branch",
            "custom_address_line_1": "123 High Street",
            "custom_address_line_2": "Birmingham City Centre",
            "custom_city": "Birmingham",
            "custom_postal_code": "B1 1AA",
            "custom_country": "United Kingdom",
            "custom_branch_code": "BRM",
            "custom_head_office": 0,
            "custom_disabled": 0,
            "custom_map_location": "https://maps.google.com/?q=123+High+Street+Birmingham"
        },
        {
            "branch": "Manchester Branch",
            "custom_address_line_1": "456 Oxford Road",
            "custom_address_line_2": "Manchester City Centre",
            "custom_city": "Manchester",
            "custom_postal_code": "M1 7ED",
            "custom_country": "United Kingdom",
            "custom_branch_code": "MCR",
            "custom_head_office": 0,
            "custom_disabled": 0,
            "custom_map_location": "https://maps.google.com/?q=456+Oxford+Road+Manchester"
        }
    ]
    
    for branch_data in branches:
        try:
            if not frappe.db.exists("Branch", branch_data["branch"]):
                branch = frappe.get_doc({
                    "doctype": "Branch",
                    **branch_data
                })
                branch.insert(ignore_permissions=True)
                print(f"  ✓ Created Branch: {branch_data['branch']}")
            else:
                # Update existing branch
                branch = frappe.get_doc("Branch", branch_data["branch"])
                for key, value in branch_data.items():
                    if key != "branch":
                        setattr(branch, key, value)
                branch.save(ignore_permissions=True)
                print(f"  ↻ Updated Branch: {branch_data['branch']}")
        except Exception as e:
            print(f"  ❌ Error creating/updating branch {branch_data['branch']}: {str(e)}")
            continue
    
    frappe.db.commit()
    print("✅ Branch data created!\n")


if __name__ == "__main__":
    insert_dummy_data()
