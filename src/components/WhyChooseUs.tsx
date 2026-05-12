import { motion } from 'motion/react';
import { ShieldCheck, Tag, HeartHandshake, Sparkles, Clock, Smile } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "First Grade Quality",
      desc: "Each item is carefully picked to ensure neatness and premium quality."
    },
    {
      icon: <Tag className="w-6 h-6 text-purple-500" />,
      title: "Affordable Prices",
      desc: "Look expensive without spending a fortune. True value for your money."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-pink-500" />,
      title: "Trusted Store",
      desc: "A reliable fashion brand with hundreds of satisfied customers."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-purple-500" />,
      title: "Neat & Stylish",
      desc: "Washed, ironed, and ready to wear straight out of the package."
    },
    {
      icon: <Clock className="w-6 h-6 text-pink-500" />,
      title: "Fast Response",
      desc: "Quick replies to inquiries and super fast delivery arrangements."
    },
    {
      icon: <Smile className="w-6 h-6 text-purple-500" />,
      title: "Customer Satisfaction",
      desc: "We prioritize your happiness. We want you coming back for more."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">The Nelo's Difference</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Why Choose Us?
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-brand bg-gray-50 hover:bg-white border border-transparent hover:border-pink-100 card-shadow transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                {/* Clone element to override classes dynamically */}
                <div className="scale-75">
                  {reason.icon}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{reason.title}</h4>
                <p className="text-xs text-gray-600 leading-snug">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
