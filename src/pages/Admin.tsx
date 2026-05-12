import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Plus, Trash2, Edit, Box, FileText, Users, X, Check } from 'lucide-react';
import { useSiteData } from '../SiteContext';

export default function Admin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { settings, testimonials, refreshData } = useSiteData();
  const [activeTab, setActiveTab] = useState<'products'|'settings'|'testimonials'>('products');

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', category: 'Kids Shirts', image: '', desc: '', mediaType: 'image' });

  const [settingsForm, setSettingsForm] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', review: '', image: '' });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("File must be less than 50MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm({...productForm, image: reader.result as string, mediaType: file.type.startsWith('video/') ? 'video' : 'image'});
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  useEffect(() => {
    if (settings) {
      setSettingsForm(settings);
    }
  }, [settings]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // ---- Product Handlers ----
  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
      fetchProducts();
      if (editingProduct?.id === id) {
        setEditingProduct(null);
        setIsAddingProduct(false);
      }
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingProduct;
      const url = isEdit ? `/api/products/${editingProduct.id}` : '/api/products';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify({ ...productForm, price: Number(productForm.price) || 0 })
      });
      if (res.ok) {
        setIsAddingProduct(false);
        setEditingProduct(null);
        setProductForm({ name: '', price: '', category: 'Kids Shirts', image: '', desc: '', mediaType: 'image' });
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  // ---- Settings Handlers ----
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify(settingsForm)
      });
      refreshData();
    } catch (error) {
      console.error('Failed to save settings', error);
    }
    setIsSavingSettings(false);
  };

  // ---- Testimonial Handlers ----
  const handleDeleteTestimonial = async (id: string) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
      refreshData();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingTestimonial;
      const url = isEdit ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials';
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: JSON.stringify(testimonialForm)
      });
      if (res.ok) {
        setIsAddingTestimonial(false);
        setEditingTestimonial(null);
        setTestimonialForm({ name: '', review: '', image: '' });
        refreshData();
      }
    } catch (error) {
      console.error('Failed to save testimonial', error);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-200 flex flex-col fixed h-full z-10 text-white">
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-bold text-xl text-pink-500 tracking-tight">Nelo's Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'products' ? 'bg-pink-600/20 text-pink-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <Box size={20} /> Products
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-pink-600/20 text-pink-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <FileText size={20} /> Site Settings
          </button>
          <button onClick={() => setActiveTab('testimonials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-pink-600/20 text-pink-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
            <Users size={20} /> Testimonials
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-4 py-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
                  <p className="text-gray-500">Add, edit, or remove your thrift wears.</p>
                </div>
                <button 
                  onClick={() => { setIsAddingProduct(!isAddingProduct); setEditingProduct(null); setProductForm({ name: '', price: '', category: 'Kids Shirts', image: '', desc: '' }); }}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-pink-600 transition-colors flex items-center gap-2"
                >
                  {isAddingProduct ? <><X size={20} /> Cancel</> : <><Plus size={20} /> Add Product</>}
                </button>
              </div>

              {(isAddingProduct || editingProduct) && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleSaveProduct} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                      <input type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₦)</label>
                      <input type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                      <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required>
                        <option>Kids Shirts</option>
                        <option>Overall Pants</option>
                        <option>Skirts</option>
                        <option>Ladies Corporate Wears</option>
                        <option>Female Jeans</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image / Video Upload</label>
                      <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="w-full px-4 py-1.5 border rounded-lg bg-gray-50 mb-2" />
                      <input type="url" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} placeholder="Or Enter URL: https://..." className="w-full px-4 py-2 border rounded-lg" required />
                      {productForm.image && productForm.image.startsWith('data:') && <p className="text-xs text-green-600 mt-1">Local file attached.</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                      <textarea value={productForm.desc} onChange={e => setProductForm({...productForm, desc: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3}></textarea>
                    </div>
                    <div className="col-span-2 flex gap-2 w-full">
                      <button type="submit" className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 shadow-sm">Save Product</button>
                      <button type="button" onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }} className="px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 text-gray-600 transition-colors border border-transparent">Cancel</button>
                      {editingProduct && (
                        <button type="button" onClick={() => { handleDeleteProduct(editingProduct.id); setIsAddingProduct(false); setEditingProduct(null); }} className="px-6 py-2.5 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors ml-auto flex items-center gap-2">
                          <Trash2 size={18} /> Delete Product
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                        <th className="px-6 py-4 font-medium">Product</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Price</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr><td colSpan={4} className="p-8 text-center text-gray-400">Loading...</td></tr>
                      ) : products.length === 0 ? (
                         <tr><td colSpan={4} className="p-8 text-center text-gray-400">No products found.</td></tr>
                      ) : products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-4">
                            {product.mediaType === 'video' ? (
                              <video src={product.image} className="w-12 h-12 rounded-lg object-cover bg-black" muted />
                            ) : (
                              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            )}
                            <div>
                              <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1 w-48">{product.desc}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">₦{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => { setEditingProduct(product); setIsAddingProduct(false); setProductForm(product); }} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Edit">
                                <Edit size={18} />
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && settingsForm && (
            <>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Settings</h1>
                  <p className="text-gray-500">Update frontend text content.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSaveSettings} className="grid grid-cols-2 gap-6">
                  
                  {/* Hero Section */}
                  <div className="col-span-2">
                    <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">Hero Section</h3>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Title (Allows HTML)</label>
                    <input type="text" value={settingsForm.heroTitle} onChange={e => setSettingsForm({...settingsForm, heroTitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Subtitle</label>
                    <input type="text" value={settingsForm.heroSubtitle} onChange={e => setSettingsForm({...settingsForm, heroSubtitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Description</label>
                    <textarea value={settingsForm.heroDesc} onChange={e => setSettingsForm({...settingsForm, heroDesc: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={2}></textarea>
                  </div>

                  {/* About Section */}
                  <div className="col-span-2 mt-4">
                    <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">About Section</h3>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">About Title</label>
                    <input type="text" value={settingsForm.aboutTitle} onChange={e => setSettingsForm({...settingsForm, aboutTitle: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">About Paragraph 1 (Allows HTML)</label>
                    <textarea value={settingsForm.aboutDesc1} onChange={e => setSettingsForm({...settingsForm, aboutDesc1: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3}></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">About Paragraph 2</label>
                    <textarea value={settingsForm.aboutDesc2} onChange={e => setSettingsForm({...settingsForm, aboutDesc2: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={2}></textarea>
                  </div>

                  {/* Contact Section */}
                  <div className="col-span-2 mt-4">
                    <h3 className="font-bold text-lg text-gray-900 border-b pb-2 mb-4">Contact & WhatsApp</h3>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number (e.g. 2349011977064)</label>
                    <input type="text" value={settingsForm.whatsappNumber} onChange={e => setSettingsForm({...settingsForm, whatsappNumber: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Display Phone Number</label>
                    <input type="text" value={settingsForm.contactPhone} onChange={e => setSettingsForm({...settingsForm, contactPhone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Address</label>
                    <input type="text" value={settingsForm.contactLocation} onChange={e => setSettingsForm({...settingsForm, contactLocation: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CEO Name</label>
                    <input type="text" value={settingsForm.contactCEO} onChange={e => setSettingsForm({...settingsForm, contactCEO: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                  </div>

                  <div className="col-span-2 mt-4 flex gap-2">
                    <button type="submit" disabled={isSavingSettings} className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 shadow-sm flex-1 sm:flex-none flex items-center justify-center gap-2">
                      {isSavingSettings ? 'Saving...' : <><Check size={18} /> Save Settings</>}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonials</h1>
                  <p className="text-gray-500">Manage customer reviews displayed on the site.</p>
                </div>
                <button 
                  onClick={() => { setIsAddingTestimonial(!isAddingTestimonial); setEditingTestimonial(null); setTestimonialForm({ name: '', review: '', image: '' }); }}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-pink-600 transition-colors flex items-center gap-2"
                >
                  {isAddingTestimonial ? <><X size={20} /> Cancel</> : <><Plus size={20} /> Add Review</>}
                </button>
              </div>

              {(isAddingTestimonial || editingTestimonial) && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4">{editingTestimonial ? 'Edit Review' : 'Add New Review'}</h3>
                  <form onSubmit={handleSaveTestimonial} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
                      <input type="text" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                      <input type="url" value={testimonialForm.image} onChange={e => setTestimonialForm({...testimonialForm, image: e.target.value})} placeholder="https://..." className="w-full px-4 py-2 border rounded-lg" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
                      <textarea value={testimonialForm.review} onChange={e => setTestimonialForm({...testimonialForm, review: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} required></textarea>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <button type="submit" className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 shadow-sm">Save Review</button>
                      <button type="button" onClick={() => { setIsAddingTestimonial(false); setEditingTestimonial(null); }} className="px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 text-gray-600 transition-colors border border-transparent">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map(t => (
                  <div key={t.id} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 border-b border-gray-50 pb-3">
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-gray-900">{t.name}</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <button onClick={() => { setEditingTestimonial(t); setIsAddingTestimonial(false); setTestimonialForm(t); }} className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-sm line-clamp-3">"{t.review}"</p>
                  </div>
                ))}
                {testimonials.length === 0 && <div className="col-span-2 text-center text-gray-500 py-8">No testimonials found.</div>}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
