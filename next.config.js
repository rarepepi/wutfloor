require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    SMART_CONTRACT_ENV: process.env.SMART_CONTRACT_ENV,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
};
