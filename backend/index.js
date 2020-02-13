require('dotenv').config();
const app = require('./config/app');
const logger = require('./config/logger');
// const { sequelize } = require('./api/models');
const { port } = require('./config/vars');

const PORT = port || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Running on port ${PORT}`);
});

function shutDown() {
  logger.info('Received kill signal, shutting down gracefully');
  server.close(() => {
    logger.info('Closed out remaining connections');
    // sequelize.connectionManager.close()
      // .then(() => {
        // logger.info('DB connections closed ');
        // process.exit(0);
      // });
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
