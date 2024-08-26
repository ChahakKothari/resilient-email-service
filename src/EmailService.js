const MockEmailProvider = require('./MockEmailProvider');
const RateLimiter = require('./RateLimiter');

class EmailService {
  constructor() {
    this.provider1 = new MockEmailProvider('Provider1');
    this.provider2 = new MockEmailProvider('Provider2');
    this.rateLimiter = new RateLimiter(5); // 5 emails per minute
    this.maxRetries = 3;
    this.sentEmails = new Set(); // To ensure idempotency
    this.statuses = [];
  }

  async sendEmail(email) {
    await this.rateLimiter.limit();

    if (this.sentEmails.has(email.id)) {
      console.log(`Email with ID ${email.id} has already been sent. Skipping.`);
      return;
    }

    try {
      await this.trySendEmail(email, this.provider1);
      this.sentEmails.add(email.id);
      this.trackStatus(email.id, 'sent', 'Provider1');
    } catch (error) {
      console.log(`Provider1 failed: ${error.message}. Trying Provider2...`);
      try {
        await this.trySendEmail(email, this.provider2);
        this.sentEmails.add(email.id);
        this.trackStatus(email.id, 'sent', 'Provider2');
      } catch (error) {
        console.log(`Provider2 also failed: ${error.message}. Email not sent.`);
        this.trackStatus(email.id, 'failed', 'Provider2');
      }
    }
  }

  async trySendEmail(email, provider) {
    let attempts = 0;
    while (attempts < this.maxRetries) {
      try {
        await provider.sendEmail(email);
        return;
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} failed. Retrying...`);
        await this.delay(this.getExponentialBackoffTime(attempts));
        if (attempts >= this.maxRetries) {
          throw error;
        }
      }
    }
  }

  getExponentialBackoffTime(attempt) {
    return Math.pow(2, attempt) * 1000; // Exponential backoff time in milliseconds
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  trackStatus(emailId, status, provider) {
    this.statuses.push({ emailId, status, provider, timestamp: new Date() });
  }

  getStatuses() {
    return this.statuses;
  }
}

module.exports = EmailService;
