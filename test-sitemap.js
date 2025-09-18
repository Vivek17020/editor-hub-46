// test-sitemap.js
// Simple test to verify sitemap function works

const sitemapHandler = require('./api/sitemap.xml.js');

// Mock request and response
const mockReq = {
  method: 'GET',
  query: { debug: '1' }
};

const mockRes = {
  status: (code) => ({
    json: (data) => console.log('Response:', code, data),
    send: (data) => console.log('Response:', code, 'XML length:', data.length)
  }),
  setHeader: (key, value) => console.log('Header:', key, '=', value)
};

// Test the function
console.log('Testing sitemap function...');
sitemapHandler(mockReq, mockRes);
