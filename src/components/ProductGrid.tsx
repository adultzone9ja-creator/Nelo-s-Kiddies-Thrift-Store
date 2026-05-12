import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Kids', 'Ladies', 'Trousers'];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Kids') return p.category.includes('Kids') || p.category.includes('Overall');
    if (activeCategory === 'Ladies') return p.category.includes('Ladies') || p.category.includes('Female');
    if (activeCategory === 'Trousers') return p.category.includes('Jeans') || p.category.includes('Pants');
    return true;
  });

  return (
    <section id="collections" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold tracking-widest text-pink-500 uppercase mb-2">Latest Arrivals</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Fashion Collections
          </h3>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Browse our handpicked selection of premium first-grade thrift wears. Click the button to safely order directly via WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-gradient text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-brand overflow-hidden card-shadow border border-gray-100 flex flex-col p-3"
              >
                <div className="aspect-[4/5] rounded-lg overflow-hidden relative bg-gray-100 mb-3">
                  {product.mediaType === 'video' ? (
                    <video 
                      src={product.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-800 uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{product.name}</h4>
                  <p className="text-gray-500 text-[10px] line-clamp-2 mb-3 flex-1 leading-snug">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-extrabold text-pink-600">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <a 
                      href={`https://wa.me/2349011977064?text=Hi Nelo's Kiddies! I want to order: ${product.name} (₦${product.price})`}
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-green-500 text-white p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-11.4 8.38 8.38 0 013.8.9L21 3m-9 12l-3-3m9-5l-8 8"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500 text-sm">
            No products found for this category.
          </div>
        )}

      </div>
    </section>
  );
}
