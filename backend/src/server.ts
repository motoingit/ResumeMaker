import app from './app.js';
import { config } from './config/envSchemaChecker.js';

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server successfully launched in [${config.NODE_ENV}] mode`);
  console.log(`📡 Listening for HTTP requests on port http://localhost:${config.PORT}`);
});

// Graceful termination for container lifetime management (SIGTERM / SIGINT)
const gracefulShutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Initializing graceful shutdown sequence...`);
  
  server.close(() => {
    console.log('🔒 Active HTTP connections successfully closed. Exiting process safely.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
