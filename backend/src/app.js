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

/**
 * Application Bootstrap
 * ---------------------
 * Starts server, jobs, and background workers
 */

const express = require('express');
const cron = require('node-cron');
const connectDB = require('./config/database');
const routes = require('./routes');
const logger = require('./utils/logger');

// Jobs
const cryptoWatcherJob = require('./jobs/crypto-watcher.job');
const receiptSenderJob = require('./jobs/receipt-sender.job');
const reconciliationJob = require('./jobs/reconciliation.job');

const app = express();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

// Database
connectDB();

// ---- BACKGROUND JOBS ----
if (process.env.ENABLE_JOBS === 'true') {
  logger.info('Background jobs enabled');

  // Crypto watcher (every 2 minutes)
  cron.schedule('*/2 * * * *', async () => {
    try {
      await cryptoWatcherJob.run();
    } catch (err) {
      logger.error('Crypto watcher failed', err);
    }
  });

  // Receipt sender (every 5 minutes)
  cron.schedule('*/5 * * * *', async () => {
    try {
      await receiptSenderJob.run();
    } catch (err) {
      logger.error('Receipt sender failed', err);
    }
  });

  // Reconciliation (every night at 02:00)
  cron.schedule('0 2 * * *', async () => {
    try {
      await reconciliationJob.run();
    } catch (err) {
      logger.error('Reconciliation failed', err);
    }
  });
}

const helmet = require('helmet');
app.use(helmet());


module.exports = app;

