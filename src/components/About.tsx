import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useSiteData } from '../SiteContext';

export default function About() {
  const { settings } = useSiteData();

  const features = [
      "Stylish kids' outfits",
      "Classy female corporate wears",
      "Neat denim jeans & skirts",
      "Premium overall pants"
  ];

  return (
    <section id="about" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <img 
                src="https://images.unsplash.com/photo-1519014816548-bf5fe459e98b?auto=format&fit=crop&q=80&w=600" 
                alt="Kids Fashion" 
                className="rounded-brand w-full h-56 object-cover shadow-sm"
              />
              <img 
                src="https://images.unsplash.com/photo-1550614000-4b95d4ed1bf1?auto=format&fit=crop&q=80&w=600" 
                alt="Ladies Fashion" 
                className="rounded-brand w-full h-64 object-cover shadow-sm translate-y-6"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-brand p-8 card-shadow"
          >
            <h2 className="text-xs font-bold tracking-widest text-purple-600 uppercase mb-2">Our Story</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
              {settings?.aboutTitle || "Quality fashion doesn't have to be expensive."}
            </h3>
            
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {settings?.aboutDesc1 || <><strong className="text-gray-900">NELO'S KIDDIES THRIFT STORE</strong> provides carefully selected UK and China first grade thrift wears for children (0–14 years) and adult ladies (18–35 years). We focus on quality, neatness, affordability, and customer satisfaction.</>}
            </p>
            
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {settings?.aboutDesc2 || "Based in Aguleri, Anambra State, we exist to help our customers look completely stunning without breaking the bank."}
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-pink-600">1st</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">First Grade Only</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">We painstakingly sort our items to ensure you only get the neatest, most premium pieces available.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
