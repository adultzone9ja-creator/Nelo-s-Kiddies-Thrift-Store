import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useSiteData } from '../SiteContext';

export default function Hero() {
  const { settings } = useSiteData();

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-gray-50 border-b border-gray-100">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-gradient opacity-10" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="text-pink-500 font-semibold text-xs tracking-widest uppercase">{settings?.heroSubtitle || "Reliable First Grade Store"}</span>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mt-1 mb-2 tracking-tight leading-tight hero-title-dynamic"
                dangerouslySetInnerHTML={{ __html: settings?.heroTitle || "NELO'S KIDDIES <br className=\"hidden md:block\" /><span className=\"gradient-text\">THRIFT STORE</span>" }}
              />
            </div>
            
            <p className="text-sm text-gray-600 md:w-4/5 leading-relaxed max-w-lg mb-2">
              {settings?.heroDesc || "Quality UK & China first grade thrift wears for children and ladies at affordable prices. Look good without spending too much. Located right here in Aguleri, Anambra State."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a href="#collections" className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-brand font-medium text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all w-fit">
                Shop Collection
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 border-2 border-purple-500 text-purple-600 px-6 py-2 rounded-brand font-medium text-sm hover:bg-purple-50 transition-all w-fit">
                Contact Us
              </a>
            </div>
            
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200 max-w-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="customer" className="w-8 h-8 rounded-full border-2 border-gray-50 object-cover" />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-xs font-semibold text-gray-700">Trusted by 500+ happy customers</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative rounded-brand overflow-hidden aspect-[4/5] max-w-sm mx-auto card-shadow border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1434389678232-04ce6c13ad15?auto=format&fit=crop&q=80&w=800" 
                alt="Fashion Model in stylish thrift wear" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-brand p-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-inner">
                    <Star size={18} className="fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">First Grade Quality</h3>
                    <p className="text-xs text-gray-600">Neat, stylish and affordable</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
