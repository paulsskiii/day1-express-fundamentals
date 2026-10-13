const required = ['MONGO_URI', 'JWT_SECRET', 'REFRESH_TOKEN_SECRET'];

function checkEnv() {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

module.exports = checkEnv;
