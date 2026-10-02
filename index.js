// require('dotenv').config()

// const mongoose = require('mongoose');
// const Product = require('./models/Product');
// const Category = require('./models/Category');

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     const electronics = await Category.create({ name: 'Electronics' });
//     const testProduct = await Product.create({
//       name: 'Test Keyboard',
//       price: 49.99,
//       category: electronics._id,
//     });
//     console.log('Inserted product with category ref:', testProduct);

//     const populatedProduct = await Product.findById(testProduct._id).populate('category');
//     console.log('Populated product:', populatedProduct);
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));

// const express = require('express');
// const app = express();

// const productsRouter = require('./routes/products');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const PORT = 3000;


// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // app.get('/api/products', (req, res) => {
// //   res.json([{ id: 1, name: 'Keyboard' }, { id: 2, name: 'Mouse' }]);
// // });

// // app.get('/api/products/:id', (req, res) => {
// //   res.json({ id: req.params.id, name: 'Sample Product' });
// // });

// // app.post('/api/products', (req, res) => {
// //   console.log('Body received:', req.body);
// //   res.status(201).json({ message: 'Product created', data: req.body });
// // });


// // app.put('/api/products/:id', (req, res) => {
// //   res.json({ message: `Product ${req.params.id} updated (stub)` });
// // });

// // app.delete('/api/products/:id', (req, res) => {
// //   res.status(204).send();
// // });

// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} — ${req.method} ${req.url}`);
//   next();
// });

// // app.use('/api/products', productsRouter);

// app.use('/api/v1/products', productsRouter);

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} — ${req.method} ${req.url}`);
  next();
});

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', tasksRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});