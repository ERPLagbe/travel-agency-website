import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ChevronUp, MapPin, Phone, Mail } from 'lucide-react';
import { useWebsiteCMS, useFooterQuickLinks, useFooterTermsLinks, useSocialMediaLinks } from '../hooks/useWebsiteCMS';
import { getFileUrlWithFallback } from '../utils/frappeFileUtils';
import { useCreateLead } from '../hooks/useCreateLead';

const Footer: React.FC = () => {
  const { data: cmsData } = useWebsiteCMS();
  const { data: footerQuickLinks } = useFooterQuickLinks();
  const { data: footerTermsLinks } = useFooterTermsLinks();
  const { data: socialMediaLinks } = useSocialMediaLinks();
  const { createLead, isLoading } = useCreateLead();

  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        phone: fullPhone,
        subject: formData.subject,
        description: formData.message,
        source: 'Website Footer',
        status: 'Open'
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', countryCode: '+1', phone: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
      console.error('Error creating lead:', err);
    }
  };

  // Use CMS data only
  const quickLinks = footerQuickLinks || [];
  const termsLinks = footerTermsLinks || [];
  const socialLinks = socialMediaLinks || [];

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Get in Touch Form */}
          <div>
            {/* <div className="bg-secondary px-6 py-3 rounded-t-lg inline-block">
              <h3 className="text-primary font-bold text-lg">Get in Touch</h3>
            </div>
             */}
            {/* Logo & Address */}
            <div className="mt-6 mb-6">
              {cmsData?.logo && (
                <img 
                  className='h-16 w-auto object-contain mb-4' 
                  src={getFileUrlWithFallback(cmsData?.logo)} 
                  alt={cmsData?.business_name || 'Logo'} 
                />
              )}
              {cmsData?.business_name && (
                <div className="text-white text-lg font-semibold mb-3">{cmsData.business_name}</div>
              )}
              
              {/* Address */}
              {cmsData?.business_address && (
                <div className="text-gray-300 text-sm leading-relaxed mb-3">
                  <strong>Address:</strong>{' '}
                  <span dangerouslySetInnerHTML={{ __html: cmsData.business_address.replace(/\n/g, ', ') }} />
                </div>
              )}
              
              {/* Phone */}
              {cmsData?.business_phone && (
                <div className="text-white text-sm mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${cmsData.business_phone}`} className="text-white hover:text-secondary transition-colors">
                    {cmsData.business_phone}
                  </a>
            </div>
              )}
              
              {/* Email */}
              {cmsData?.business_email && (
                <div className="text-white text-sm">
                  <strong>E-mail:</strong>{' '}
                  <a href={`mailto:${cmsData.business_email}`} className="text-white hover:text-secondary transition-colors">
                    {cmsData.business_email}
                  </a>
                </div>
              )}
            </div>
            
            {/* Social Media */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social: any, index: number) => (
                  <a 
                    key={index}
                    href={social.platform_url} 
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform_name}`}
                  >
                    {social.platform_name === 'Facebook' && <Facebook className="w-5 h-5" />}
                    {social.platform_name === 'Instagram' && <Instagram className="w-5 h-5" />}
                    {social.platform_name === 'Twitter' && <Facebook className="w-5 h-5" />}
                    {social.platform_name === 'YouTube' && <Instagram className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            )}
            </div>

          {/* Middle Column - Quick Links */}
              <div>
            <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {quickLinks.map((link: any, index: number) => (
                    <Link 
                      key={index}
                      to={link.link_url} 
                  className=" text-white text-sm  h flex items-center gap-2"
                      aria-label={`Navigate to ${link.link_text}`}
                    >
                  <span className="text-secondary">›</span> {link.link_text}
                    </Link>
                  ))}
              </div>

              {/* Our Terms */}
            <h4 className="text-white font-semibold text-base mt-6 mb-4">Our Terms</h4>
                <div className="space-y-2">
                  {termsLinks.map((link: any, index: number) => (
                    <Link 
                      key={index}
                      to={link.link_url} 
                  className=" text-white text-sm  hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                      aria-label={`Navigate to ${link.link_text}`}
                    >
                  <span className="text-secondary">›</span> {link.link_text}
                    </Link>
                  ))}
                </div>
            
            {/* Payment Methods */}
 
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white bg-opacity-5 mb-2 rounded-lg p-6">
            <h4 className="text-black font-semibold text-base mb-4">Get in Touch</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              />

              {/* Phone */}
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                  className="w-20 px-1 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
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
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
                />
            </div>

              {/* Subject */}
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              >
                <option value="">Select Subject</option>
                <option value="Package Inquiry">Package Inquiry</option>
                <option value="Service Inquiry">Service Inquiry</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Visa Information">Visa Information</option>
                <option value="Booking Support">Booking Support</option>
                <option value="Others">Others</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm resize-vertical focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none"
              ></textarea>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-2 bg-green-500 bg-opacity-20 text-white rounded text-xs">
                  ✓ Message sent!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-2 bg-red-500 bg-opacity-20 text-white rounded text-xs">
                  ✗ Error sending.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary text-white px-4 py-2 rounded font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-white border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              {cmsData?.footer_copyright || `© ${new Date().getFullYear()} ${cmsData?.business_name || 'Travel Agency'}. All rights reserved.`}
            </div>

            {/* Legal Text */}
            {cmsData?.footer_legal_text && (
              <div className="text-gray-400 text-xs text-center md:text-right max-w-2xl leading-relaxed">
                {cmsData.footer_legal_text}
              </div>
            )}

            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/90 text-primary flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              aria-label="Scroll to top of page"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
