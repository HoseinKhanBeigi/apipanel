/** @type {import('next').NextConfig} */

const environments = {
  PROD: {
    SERVER_ADDRESS: "https://api.kiandigital.com/api-channel/v1/report",
    SERVER_FILE: "https://api.kiandigital.com/api-channel/v1/admin",
    SERVER_MESSAGE: "https://api.kiandigital.com/api-channel/v1/",
    AUTH_BASEURL: "https://neshanid.com/auth/realms/KIAN/protocol/openid-connect",
  },
  UAT: {
    SERVER_ADDRESS: "https://uat.kian.digital/api-channel/v1/report",
    SERVER_FILE: "https://uat.kian.digital/api-channel/v1/admin",
    SERVER_MESSAGE: "https://uat.kian.digital/api-channel/v1/",
    AUTH_BASEURL: "https://uat.neshanid.com/auth/realms/KIAN/protocol/openid-connect",
  }
};

const getEnvConfig = () => {
  const environment = process.env.BUILD_ENV || 'UAT';
  
  console.log('=============== Environment Debug ===============');
  console.log('BUILD_ENV:', process.env.BUILD_ENV);
  console.log('Selected Environment:', environment);
  console.log('=============================================');

  return environments[environment] || environments.UAT;
};

const nextConfig = {
  reactStrictMode: false,
  // basePath: "/main",
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "kyc-gateway.levants.io",
        "kycgateway.mt.levants.io",
        "levant.apipanel.levants.io",
        "apipanel.uat.kian.digital"
      ],
    },
  },
  env: getEnvConfig(),
};

module.exports = nextConfig;
