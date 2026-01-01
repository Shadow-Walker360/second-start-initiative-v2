/**
 * Logger Utility
 * --------------
 * Centralized logging abstraction.
 */

const isProd = process.env.NODE_ENV === 'production';

const format = (level, message, meta = {}) => ({
  timestamp: new Date().toISOString(),
  level,
  message,
  ...meta,
});

module.exports = {
  info: (message, meta) => {
    console.log(format('info', message, meta));
  },

  warn: (message, meta) => {
    console.warn(format('warn', message, meta));
  },

  error: (message, meta) => {
    console.error(format('error', message, meta));
  },

  debug: (message, meta) => {
    if (!isProd) {
      console.debug(format('debug', message, meta));
    }
  },
};
