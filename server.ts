import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Set up temporary local memory store as a fallback
let memoryProducts: any[] = [
  { id: '1', name: 'Girls Floral Dress', price: 15000, category: 'Kids Shirts', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', desc: 'Beautiful floral dress for 5-8 years.' },
  { id: '2', name: 'Ladies Corporate Shirt', price: 12000, category: 'Ladies Corporate Wears', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=400', desc: 'Neat corporate shirt.' },
  { id: '3', name: 'Boys Overall Pants', price: 18000, category: 'Overall Pants', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=400', desc: 'Quality UK thrift overall for toddlers.' },
  { id: '4', name: 'Female Denim Jeans', price: 10000, category: 'Female Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400', desc: 'First grade denim.' }
];

let memorySettings = {
  heroTitle: "NELO'S KIDDIES THRIFT STORE",
  heroSubtitle: "Reliable First Grade Store",
  heroDesc: "Quality UK & China first grade thrift wears for children and ladies at affordable prices. Look good without spending too much. Located right here in Aguleri, Anambra State.",
  whatsappNumber: "2349011977064",
  aboutTitle: "Quality fashion doesn't have to be expensive.",
  aboutDesc1: "NELO'S KIDDIES THRIFT STORE provides carefully selected UK and China first grade thrift wears for children (0–14 years) and adult ladies (18–35 years). We focus on quality, neatness, affordability, and customer satisfaction.",
  aboutDesc2: "Based in Aguleri, Anambra State, we exist to help our customers look completely stunning without breaking the bank.",
  contactLocation: "Aguleri, Anambra State, Nigeria",
  contactPhone: "09011977064",
  contactCEO: "Mirabel Chinelo Onuorah"
};

let memoryTestimonials: any[] = [
  { id: '1', name: "Chidinma O.", review: "I got clothes for my two boys, and I was so surprised at how neat they were. It legit looks like brand new boutique clothes. Highly recommended!", image: "https://i.pravatar.cc/150?img=32" },
  { id: '2', name: "Jessica N.", review: "The corporate shirts I bought here are a lifesaver. Perfect for work and they smell really nice. Customer service is top-notch too.", image: "https://i.pravatar.cc/150?img=47" },
  { id: '3', name: "Mrs. Amaka", review: "Nelo's Kiddies Thrift is my go-to plug. The overall pants I got for my daughter fit so perfectly. Very affordable prices for first-grade items.", image: "https://i.pravatar.cc/150?img=44" }
];

// Initialize DB Strategy
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided. Using in-memory fallback store for preview.');
}

// Multer strategy for local file uploads (in a real app you'd upload to Cloudinary/S3)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes: Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // A mock admin credentials for preview purposes
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, message: 'Logged in successfully' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware: Auth
const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Routes: Products
app.get('/api/products', (req, res) => {
  res.json(memoryProducts); // Return mock store for AI Studio preview
});

app.post('/api/products', requireAuth, (req, res) => {
  const newProduct = { id: Date.now().toString(), ...req.body };
  memoryProducts.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', requireAuth, (req, res) => {
  const index = memoryProducts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    memoryProducts[index] = { ...memoryProducts[index], ...req.body };
    res.json(memoryProducts[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', requireAuth, (req, res) => {
  memoryProducts = memoryProducts.filter(p => p.id !== req.params.id);
  res.json({ message: 'Product deleted' });
});

// Routes: Settings
app.get('/api/settings', (req, res) => {
  res.json(memorySettings);
});

app.put('/api/settings', requireAuth, (req, res) => {
  memorySettings = { ...memorySettings, ...req.body };
  res.json(memorySettings);
});

// Routes: Testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(memoryTestimonials);
});

app.post('/api/testimonials', requireAuth, (req, res) => {
  const newTestimonial = { id: Date.now().toString(), ...req.body };
  memoryTestimonials.push(newTestimonial);
  res.status(201).json(newTestimonial);
});

app.put('/api/testimonials/:id', requireAuth, (req, res) => {
  const index = memoryTestimonials.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    memoryTestimonials[index] = { ...memoryTestimonials[index], ...req.body };
    res.json(memoryTestimonials[index]);
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.delete('/api/testimonials/:id', requireAuth, (req, res) => {
  memoryTestimonials = memoryTestimonials.filter(t => t.id !== req.params.id);
  res.json({ message: 'Testimonial deleted' });
});

// Setup Vite for development and static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
