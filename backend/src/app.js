/**
 * Application Bootstrap
 * ---------------------
 * This file configures the Express application.
 * It does NOT start the server.
 * It is safe to import for tests, jobs, and server startup.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

/* ===========================
   TRUST PROXY (IMPORTANT)
   =========================== */
app.set('trust proxy', 1);

/* ===========================
   SECURITY HEADERS
   =========================== */
app.use(
  helmet({
    contentSecurityPolicy: false, // handled at CDN / frontend
    crossOriginEmbedderPolicy: false,
  })
);

/* ===========================
   CORS POLICY
   =========================== */
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow server-to-server & same-origin
      if (!origin) return cb(null, true);
      return cb(null, true); // tighten in prod via env
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  })
);

/* ===========================
   RATE LIMITING
   =========================== */
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ===========================
   BODY PARSING
   =========================== */
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

/* ===========================
   PERFORMANCE
   =========================== */
app.use(compression());

/* ===========================
   LOGGING
   =========================== */
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
  );
}

/* ===========================
   HEALTH CHECK
   =========================== */
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ===========================
   API ROUTES
   =========================== */
app.use('/api', routes);

/* ===========================
   404 HANDLER
   =========================== */
app.use(notFoundHandler);

/* ===========================
   GLOBAL ERROR HANDLER
   =========================== */
app.use(errorHandler);

/* ===========================
   EXPORT
   =========================== */
module.exports = app;
