require('dotenv').config();

module.exports = {
  port: process.env.PORT || 9100,
  interval: parseInt(process.env.EXPORT_INTERVAL, 10) || 5000
};
