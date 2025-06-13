const express = require('express');
const client = require('prom-client');
const config = require('./config');

const app = express();
const register = client.register;

// Metrics
const requestCount = new client.Counter({
  name: 'loopr_audit_requests_total',
  help: 'Total number of audit requests'
});
const errorCount = new client.Counter({
  name: 'loopr_audit_errors_total',
  help: 'Total number of audit errors'
});
const durationHistogram = new client.Histogram({
  name: 'loopr_audit_duration_ms',
  help: 'Audit duration in ms',
  buckets: [50, 100, 200, 500, 1000]
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(config.port, () => {
  console.log(`Exporter listening on port ${config.port}`);
});
