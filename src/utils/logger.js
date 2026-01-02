export const logger = {
  info(message) {
    console.log(`ℹ️  ${message}`);
  },

  success(message) {
    console.log(`✅ ${message}`);
  },

  warn(message) {
    console.log(`⚠️  ${message}`);
  },

  error(message) {
    console.error(`❌ ${message}`);
  }
};
