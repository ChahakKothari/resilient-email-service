// src/RateLimiter.js

class RateLimiter {
    constructor(maxRequestsPerMinute) {
      this.maxRequestsPerMinute = maxRequestsPerMinute;
      this.requests = 0;
      this.queue = [];
      this.interval = setInterval(() => this.resetRequests(), 60000); // Reset every minute
    }
  
    resetRequests() {
      this.requests = 0;
      while (this.queue.length > 0 && this.requests < this.maxRequestsPerMinute) {
        const { resolve } = this.queue.shift();
        this.requests++;
        resolve();
      }
    }
  
    async limit() {
      if (this.requests < this.maxRequestsPerMinute) {
        this.requests++;
        return Promise.resolve();
      } else {
        return new Promise((resolve) => {
          this.queue.push({ resolve });
        });
      }
    }
  }
  
  module.exports = RateLimiter;
  