

const express = require('express');
const app = express();

const productsRouter = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get('/api/products', (req, res) => {
//   res.json([{ id: 1, name: 'Keyboard' }, { id: 2, name: 'Mouse' }]);
// });

// app.get('/api/products/:id', (req, res) => {
//   res.json({ id: req.params.id, name: 'Sample Product' });
// });

// app.post('/api/products', (req, res) => {
//   console.log('Body received:', req.body);
//   res.status(201).json({ message: 'Product created', data: req.body });
// });


// app.put('/api/products/:id', (req, res) => {
//   res.json({ message: `Product ${req.params.id} updated (stub)` });
// });

// app.delete('/api/products/:id', (req, res) => {
//   res.status(204).send();
// });

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} — ${req.method} ${req.url}`);
  next();
});

// app.use('/api/products', productsRouter);

app.use('/api/v1/products', productsRouter);