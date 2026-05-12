import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useSiteData } from '../SiteContext';

export default function Testimonials() {
  const { testimonials } = useSiteData();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-brand-gradient relative overflow-hidden text-white">
      {/* Decorative */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold tracking-widest text-pink-200 uppercase mb-2">Happy Clients</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
            What Our Customers Say
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={t.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-brand border border-white/20 card-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-white/20" />
              
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              
              <p className="text-sm italic text-gray-100 leading-snug mb-5 relative z-10">
                "{t.review}"
              </p>
              
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/30" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-[10px] text-pink-200 uppercase tracking-wider font-bold mt-0.5">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
