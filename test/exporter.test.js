const request = require('supertest');
const express = require('express');
const exporter = require('../src/exporter');

describe('Exporter Metrics Endpoint', () => {
  let server;

  beforeAll(() => {
    const app = express();
    app.use('/', exporter);
    server = app.listen(0);
  });

  afterAll((done) => server.close(done));

  it('should respond with Prometheus metrics', async () => {
    const res = await request(server).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/loopr_audit_requests_total/);
  });
});
