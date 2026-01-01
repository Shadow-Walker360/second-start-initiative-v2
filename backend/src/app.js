/**
 * Application Bootstrap
 */
require('dotenv').config();

const validateEnv = require('./config/env');
validateEnv(); // hard stop if misconfigured

const express = require('express');
const cors = require('cors');

const connectDatabase = require('./config/database');
const security = require('./config/security');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

// Security
security(app);

// Core middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Error fallback
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Boot
(async () => {
  await connectDatabase();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
})();

module.exports = app;
