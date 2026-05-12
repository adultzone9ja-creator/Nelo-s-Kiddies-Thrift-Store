import { motion } from 'motion/react';
import { MapPin, Phone, User, Send } from 'lucide-react';
import { useSiteData } from '../SiteContext';

export default function Contact() {
  const { settings } = useSiteData();
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber || '2349011977064'}`;

  return (
    <section id="contact" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Get In Touch</h2>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Let's talk about your next outfit.
            </h3>
            <p className="text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
              Have questions about our collections? Looking for something specific? Don't hesitate to reach out. We're always happy to help!
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-brand border border-gray-100 hover:border-pink-100 transition-colors">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 shadow-sm flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Our Location</h4>
                  <p className="text-xs text-gray-600 leading-snug">{settings?.contactLocation || "Aguleri, Anambra State, Nigeria"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-brand border border-gray-100 hover:border-purple-100 transition-colors">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-500 shadow-sm flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Call / WhatsApp</h4>
                  <a href={`tel:${settings?.contactPhone || '09011977064'}`} className="text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors block">{settings?.contactPhone || '09011977064'}</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-brand border border-gray-100 hover:border-pink-100 transition-colors">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-500 shadow-sm flex-shrink-0">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">CEO</h4>
                  <p className="text-xs text-gray-600">{settings?.contactCEO || "Mirabel Chinelo Onuorah"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 md:p-8 rounded-brand card-shadow"
          >
            <h4 className="text-lg font-extrabold text-gray-900 mb-6">Send us a message</h4>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email or Phone</label>
                <input 
                  type="text" 
                  placeholder="09010000000" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Message</label>
                <textarea 
                  rows={4}
                  placeholder="I'm looking for clothes for a 5-year-old girl..." 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all resize-none text-sm"
                ></textarea>
              </div>

              <button 
                type="button" 
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full bg-brand-gradient text-white font-bold text-sm px-6 py-3 rounded-brand hover:opacity-90 transition-opacity flex justify-center items-center gap-2 shadow-sm"
              >
                Chat on WhatsApp <Send size={16} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
