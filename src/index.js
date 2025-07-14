require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { loggerMiddleware, log } = require('./middlewares/logger');

const shortUrlRoutes = require('./routes/shorturl.routes'); 

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/shorturls', shortUrlRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8000;
(async () => {
  await connectDB();
  app.listen(PORT, () => log('INFO', `Server listening on port ${PORT}`));
})();
