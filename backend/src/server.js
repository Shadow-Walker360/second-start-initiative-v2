/**
 * Server Entry Point
 * ------------------
 * This file is responsible for:
 * - Loading environment variables
 * - Connecting to the database
 * - Starting the HTTP server
 * - Handling graceful shutdown
 *
 * No Express configuration lives here.
 */

require('dotenv').config();

const http = require('http');
const app = require('./app');
const connectDatabase = require('./config/database');

/* ===========================
   ENV VALIDATION
   =========================== */
const env = require('./config/env');
const PORT = env.port;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined');
  process.exit(1);
}

/* ===========================
   DATABASE CONNECTION
   =========================== */
connectDatabase();

/* ===========================
   SERVER CREATION
   =========================== */
const server = http.createServer(app);

/* ===========================
   SERVER START
   =========================== */
server.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`
  );
});

/* ===========================
   GRACEFUL SHUTDOWN
   =========================== */
const shutdown = async (signal) => {
  console.log(`\n⚠️  Received ${signal}. Shutting down gracefully...`);

  server.close(() => {
    console.log('🛑 HTTP server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⏱Force shutdown.');
    process.exit(1);
  }, 10000).unref();
};

/* ===========================
   PROCESS SIGNALS
   =========================== */
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

/* ===========================
   UNHANDLED ERRORS
   =========================== */
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});
