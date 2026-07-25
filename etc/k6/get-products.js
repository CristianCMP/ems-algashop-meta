import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8083';

export const options = {
  // Here, you can create internal tests without needing to create separate files
  scenarios: {
      get_products_smoke_test: {
        executor: 'constant-vus',  // Use the constant-vus executor for the smoke test
        vus: 1,
        duration: '5s'
      },
      get_products_load_test: {
        executor: 'constant-arrival-rate', // Use the constant-arrival-rate executor for load testing
        rate: 100, // 100 iterations per second
        timeUnit: '1s', // 100 iterations per second
        duration: '1m', // Run the load test for 1 minute
        startTime: '5s', // Start this scenario after the smoke test
        maxVUs: 200, // Maximum number of VUs to allow for the test
        preAllocatedVUs: 50 // Pre-allocate 50 VUs to handle the load
      }
  },
  thresholds: {
    http_req_duration: ['p(95) < 800'], // 95% of requests should be below 800ms
    http_req_failed: ['rate < 0.01'], // Error rate should be less than 1%
  }
};

export default function() {
  const url = `${BASE_URL}/api/v1/products`
  let res = http.get(url);
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}