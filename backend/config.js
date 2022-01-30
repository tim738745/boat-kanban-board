const configs = {
    development: {
      envDBConnectionString: process.env.DEV_DB_CONNECTION_STRING,
      envPort: 3000
    },
    testing: {
  
    },
    staging: {
  
    },
    production: {
      envDBConnectionString: process.env.DB_CONNECTION_STRING,
      envPort: process.env.PORT
    }
  }
  
  const currentEnv = process.env.NODE_ENV || "development";
  module.exports = configs[currentEnv];