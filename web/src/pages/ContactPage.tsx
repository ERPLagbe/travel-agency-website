import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionContainer, Typography, Button, Card, PageLayout } from '../components';
import { Clock, Shield, Star, Phone, Mail, MapPin } from 'lucide-react';
import { useCreateLead } from '../hooks/useCreateLead';
import { useWebsiteCMS } from '../hooks/useWebsiteCMS';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';

const CompleteContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  
  const { createLead, isLoading } = useCreateLead();
  const { data: cmsData, isValidating: cmsLoading } = useWebsiteCMS();
  // const { data: packageData } = useFrappeGetDoc('Item', packageId || '', {
  //   fields: ['name', 'item_name', 'item_group'],
  //   shouldFetch: !!packageId
  // });
  
  // Fetch all available packages for dropdown
  const { data: allPackages } = useFrappeGetDocList('Item', {
    fields: ['name', 'item_name', 'item_group'],
    filters: [['disabled', '=', 0]],
    limit: 1000
  });
  
  // Use CMS data only
  const contactData = cmsData;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    message: '',
    packageInterest: packageId || ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Update packageInterest when packageId changes
  useEffect(() => {
    if (packageId) {
      setFormData(prev => ({ ...prev, packageInterest: packageId }));
    }
  }, [packageId]);

  // Show loading state if CMS data is still being fetched
  if (cmsLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid var(--color-primary)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--spacing-4) auto'
          }}></div>
          <Typography variant="body">Loading contact information...</Typography>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    try {
      const fullPhone = `${formData.countryCode}${formData.phone}`;
      await createLead({
        lead_name: formData.name,
        email_id: formData.email,
        phone: fullPhone,
        subject: formData.subject,
        description: formData.message,
        source: 'Website',
        status: 'Open',
        package_id: formData.packageInterest
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', countryCode: '+1', phone: '', subject: '', message: '', packageInterest: '' });
    } catch (err) {
      setSubmitStatus('error');
      console.error('Error creating lead:', err);
    }
  };

  return (
    <PageLayout 
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Contact Us' }
      ]}
    >
      {/* Hero Section - Clean Design */}
      <SectionContainer size="lg" className="text-center relative h-[20vh] flex items-center bg-primary text-white contact-hero">
        <div style={{ paddingTop: 'var(--spacing-8)', paddingBottom: 'var(--spacing-8)' }}>
          <Typography variant="h1" color="white" align="center" style={{ marginBottom: 'var(--spacing-4)' }}>
            Contact {contactData?.business_name}
          </Typography>
          {/* <Typography variant="body-large" color="white" align="center">
            Get in touch with us to start planning your spiritual journey
          </Typography> */}
        </div>
      </SectionContainer>

      {/* Contact Form and Info */}
      <SectionContainer className="py-8">
        <div id='contact-form' className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Form */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
              Get in Touch
            </Typography>
            
     
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                onChange={handleChange}
                required
                    className="w-24 sm:w-28 px-2 sm:px-3 py-3 border border-gray-300 rounded-lg text-sm sm:text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+880">🇧🇩 +880</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+58">🇻🇪 +58</option>
                    <option value="+51">🇵🇪 +51</option>
                    <option value="+593">🇪🇨 +593</option>
                    <option value="+595">🇵🇾 +595</option>
                    <option value="+598">🇺🇾 +598</option>
                    <option value="+592">🇬🇾 +592</option>
                    <option value="+597">🇸🇷 +597</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+420">🇨🇿 +420</option>
                    <option value="+421">🇸🇰 +421</option>
                    <option value="+36">🇭🇺 +36</option>
                    <option value="+40">🇷🇴 +40</option>
                    <option value="+359">🇧🇬 +359</option>
                    <option value="+385">🇭🇷 +385</option>
                    <option value="+386">🇸🇮 +386</option>
                    <option value="+372">🇪🇪 +372</option>
                    <option value="+371">🇱🇻 +371</option>
                    <option value="+370">🇱🇹 +370</option>
                    <option value="+353">🇮🇪 +353</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+30">🇬🇷 +30</option>
                    <option value="+357">🇨🇾 +357</option>
                    <option value="+356">🇲🇹 +356</option>
                    <option value="+39">🇻🇦 +39</option>
                    <option value="+378">🇸🇲 +378</option>
                    <option value="+377">🇲🇨 +377</option>
                    <option value="+376">🇦🇩 +376</option>
                    <option value="+423">🇱🇮 +423</option>
                    <option value="+352">🇱🇺 +352</option>
                    <option value="+375">🇧🇾 +375</option>
                    <option value="+380">🇺🇦 +380</option>
                    <option value="+373">🇲🇩 +373</option>
                    <option value="+355">🇦🇱 +355</option>
                    <option value="+389">🇲🇰 +389</option>
                    <option value="+381">🇷🇸 +381</option>
                    <option value="+382">🇲🇪 +382</option>
                    <option value="+387">🇧🇦 +387</option>
                    <option value="+383">🇽🇰 +383</option>
                    <option value="+995">🇬🇪 +995</option>
                    <option value="+374">🇦🇲 +374</option>
                    <option value="+994">🇦🇿 +994</option>
                    <option value="+7">🇰🇿 +7</option>
                    <option value="+996">🇰🇬 +996</option>
                    <option value="+998">🇺🇿 +998</option>
                    <option value="+992">🇹🇯 +992</option>
                    <option value="+993">🇹🇲 +993</option>
                    <option value="+93">🇦🇫 +93</option>
                    <option value="+98">🇮🇷 +98</option>
                    <option value="+964">🇮🇶 +964</option>
                    <option value="+963">🇸🇾 +963</option>
                    <option value="+961">🇱🇧 +961</option>
                    <option value="+962">🇯🇴 +962</option>
                    <option value="+972">🇮🇱 +972</option>
                    <option value="+970">🇵🇸 +970</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+973">🇧🇭 +973</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+967">🇾🇪 +967</option>
                    <option value="+252">🇸🇴 +252</option>
                    <option value="+253">🇩🇯 +253</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+255">🇹🇿 +255</option>
                    <option value="+256">🇺🇬 +256</option>
                    <option value="+257">🇧🇮 +257</option>
                    <option value="+250">🇷🇼 +250</option>
                    <option value="+251">🇪🇹 +251</option>
                    <option value="+249">🇸🇩 +249</option>
                    <option value="+211">🇸🇸 +211</option>
                    <option value="+235">🇹🇩 +235</option>
                    <option value="+236">🇨🇫 +236</option>
                    <option value="+237">🇨🇲 +237</option>
                    <option value="+240">🇬🇶 +240</option>
                    <option value="+241">🇬🇦 +241</option>
                    <option value="+242">🇨🇬 +242</option>
                    <option value="+243">🇨🇩 +243</option>
                    <option value="+244">🇦🇴 +244</option>
                    <option value="+245">🇬🇼 +245</option>
                    <option value="+246">🇮🇴 +246</option>
                    <option value="+247">🇦🇨 +247</option>
                    <option value="+248">🇸🇨 +248</option>
                    <option value="+261">🇲🇬 +261</option>
                    <option value="+230">🇲🇺 +230</option>
                    <option value="+262">🇷🇪 +262</option>
                    <option value="+269">🇰🇲 +269</option>
                    <option value="+590">🇬🇵 +590</option>
                    <option value="+596">🇲🇶 +596</option>
                    <option value="+594">🇬🇫 +594</option>
                    <option value="+508">🇵🇲 +508</option>
                    <option value="+262">🇾🇹 +262</option>
                    <option value="+590">🇧🇱 +590</option>
                    <option value="+596">🇲🇫 +596</option>
                    <option value="+590">🇸🇽 +590</option>
                    <option value="+1">🇻🇮 +1</option>
                    <option value="+1">🇵🇷 +1</option>
                    <option value="+1">🇬🇺 +1</option>
                    <option value="+1">🇦🇸 +1</option>
                    <option value="+1">🇻🇬 +1</option>
                    <option value="+1">🇦🇮 +1</option>
                    <option value="+1">🇰🇾 +1</option>
                    <option value="+1">🇹🇨 +1</option>
                    <option value="+1">🇧🇸 +1</option>
                    <option value="+1">🇧🇧 +1</option>
                    <option value="+1">🇩🇲 +1</option>
                    <option value="+1">🇬🇩 +1</option>
                    <option value="+1">🇯🇲 +1</option>
                    <option value="+1">🇰🇳 +1</option>
                    <option value="+1">🇱🇨 +1</option>
                    <option value="+1">🇻🇨 +1</option>
                    <option value="+1">🇹🇹 +1</option>
                    <option value="+1">🇦🇬 +1</option>
                    <option value="+1">🇧🇿 +1</option>
                    <option value="+1">🇨🇷 +1</option>
                    <option value="+1">🇨🇺 +1</option>
                    <option value="+1">🇩🇴 +1</option>
                    <option value="+1">🇸🇻 +1</option>
                    <option value="+1">🇬🇹 +1</option>
                    <option value="+1">🇭🇳 +1</option>
                    <option value="+1">🇳🇮 +1</option>
                    <option value="+1">🇵🇦 +1</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+679">🇫🇯 +679</option>
                    <option value="+685">🇼🇸 +685</option>
                    <option value="+676">🇹🇴 +676</option>
                    <option value="+678">🇻🇺 +678</option>
                    <option value="+687">🇳🇨 +687</option>
                    <option value="+689">🇵🇫 +689</option>
                    <option value="+684">🇦🇸 +684</option>
                    <option value="+691">🇫🇲 +691</option>
                    <option value="+692">🇲🇭 +692</option>
                    <option value="+680">🇵🇼 +680</option>
                    <option value="+686">🇰🇮 +686</option>
                    <option value="+688">🇹🇻 +688</option>
                    <option value="+690">🇹🇰 +690</option>
                    <option value="+683">🇳🇺 +683</option>
                    <option value="+675">🇵🇬 +675</option>
                    <option value="+677">🇸🇧 +677</option>
                    <option value="+674">🇳🇷 +674</option>
                    <option value="+682">🇨🇰 +682</option>
                    <option value="+681">🇼🇫 +681</option>
                  </select>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                    required
                    className="flex-1 min-w-0 px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="Package Inquiry">Package Inquiry</option>
                  <option value="Service Inquiry">Service Inquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Visa Information">Visa Information</option>
                  <option value="Booking Support">Booking Support</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Package Interest
                </label>
              <select
                name="packageInterest"
                value={formData.packageInterest}
                onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                >
                  <option value="">Select Package (Optional)</option>
                {allPackages && allPackages.length > 0 ? (
                  allPackages.map((pkg: any) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.item_name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Loading packages...</option>
                )}
              </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base resize-vertical focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              ></textarea>
              </div>
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-800 rounded-lg mb-4">
                  ✅ Thank you! Your message has been sent successfully. We will contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-800 rounded-lg mb-4">
                  ❌ Sorry, there was an error sending your message. Please try again.
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <Card>
            <Typography variant="h2" style={{ marginBottom: 'var(--spacing-6)' }}>
              Our Contact Details
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              {/* Address from CMS */}
              <div>
                <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                  <MapPin size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                  Address
                </Typography>
                {contactData?.business_address ? (
                  <div 
                    style={{ 
                      fontSize: 'var(--font-size-base)', 
                      lineHeight: 'var(--line-height-base)',
                      color: 'var(--color-gray-700)'
                    }}
                    dangerouslySetInnerHTML={{ __html: contactData.business_address.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <Typography variant="body">Address information not available</Typography>
                )}
              </div>
              
              {/* Phone from CMS */}
              {contactData?.business_phone && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Phone size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                    Phone
                  </Typography>
                  <Typography variant="body">{contactData.business_phone}</Typography>
                  <Typography variant="body-small" color="muted">Available 24/7 for emergencies</Typography>
                </div>
              )}
              
              {/* Email from CMS */}
              {contactData?.business_email && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Mail size={20} style={{ marginRight: 'var(--spacing-2)', display: 'inline' }} />
                    Email
                  </Typography>
                  <Typography variant="body">{contactData.business_email}</Typography>
                  <Typography variant="body-small" color="muted">We respond within 24 hours</Typography>
                </div>
              )}
              
              {/* Company Number from CMS */}
              {contactData?.company_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    Company Number
                  </Typography>
                  <Typography variant="body">{contactData.company_number}</Typography>
                </div>
              )}
              
              {/* ATOL Number from CMS */}
              {/* {contactData?.atol_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    ATOL Protected
                  </Typography>
                  <Typography variant="body">ATOL Number: {contactData.atol_number}</Typography>
                  <Typography variant="body-small" color="muted">Your financial protection is guaranteed</Typography>
                </div>
              )} */}
              
              {/* WhatsApp from CMS */}
              {contactData?.whatsapp_number && (
                <div>
                  <Typography variant="h3" color="primary" style={{ marginBottom: 'var(--spacing-2)' }}>
                    WhatsApp
                  </Typography>
                  <Typography variant="body">{contactData.whatsapp_number}</Typography>
                  <Typography variant="body-small" color="muted">Quick messaging for inquiries</Typography>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
                <Clock size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-2)' }}>
                Quick Response
              </Typography>
              <Typography variant="body" color="muted">
                We respond to all inquiries within 24 hours during business days.
              </Typography>
            </Card>

            <Card className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
                <Shield size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-2)' }}>
                Licensed & Insured
              </Typography>
              <Typography variant="body" color="muted">
                Fully licensed travel agency with comprehensive insurance coverage.
              </Typography>
            </Card>

            <Card className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-white">
                <Star size={32} />
              </div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-2)' }}>
                5-Star Service
              </Typography>
              <Typography variant="body" color="muted">
                Rated 5 stars by thousands of satisfied customers worldwide.
              </Typography>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default CompleteContactPage;
