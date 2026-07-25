import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 100 }, // Target is the VUs
    { duration: '5s', target: 300 },
    { duration: '5s', target: 500 },
    { duration: '10s', target: 1000 },
    { duration: '3s', target: 300 },
    { duration: '3s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95) < 800'], // 95% of requests should be below 800ms
    http_req_failed: ['rate < 0.01'], // Error rate should be less than 1%
  }
};

export default function () {
  let res = http.get('http://localhost:8083/api/v1/products');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
