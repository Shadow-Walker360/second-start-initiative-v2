/**
 * Database Migration Script
 * -------------------------
 * Applies one-time database changes safely
 */

require('dotenv').config();
const mongoose = require('mongoose');

const Migration = mongoose.model(
  'Migration',
  new mongoose.Schema({
    name: { type: String, unique: true },
    executedAt: { type: Date, default: Date.now },
  })
);

const migrations = [
  async () => {
    // Example migration: create index
    await mongoose.connection.collection('payments').createIndex(
      { providerReference: 1 },
      { unique: true }
    );
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (let i = 0; i < migrations.length; i++) {
      const name = `migration_${i + 1}`;

      const alreadyRun = await Migration.findOne({ name });
      if (alreadyRun) continue;

      console.log(`Running ${name}`);
      await migrations[i]();
      await Migration.create({ name });
    }

    console.log('Migrations complete');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
