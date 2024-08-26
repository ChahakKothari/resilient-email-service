// tests/EmailService.test.js

const EmailService = require('../src/EmailService');
const MockEmailProvider = require('../src/MockEmailProvider');

jest.mock('../src/MockEmailProvider');

describe('EmailService', () => {
  let emailService;
  let provider1;
  let provider2;

  beforeEach(() => {
    provider1 = new MockEmailProvider('Provider1');
    provider2 = new MockEmailProvider('Provider2');
    emailService = new EmailService();
    emailService.provider1 = provider1;
    emailService.provider2 = provider2;
  });

  test('should not send the same email twice (idempotency)', async () => {
    provider1.sendEmail.mockResolvedValueOnce();
    const email = { id: '1', to: 'user@example.com', subject: 'Test', body: 'Hello' };

    await emailService.sendEmail(email);
    await emailService.sendEmail(email); // Second call should be skipped

    expect(provider1.sendEmail).toHaveBeenCalledTimes(1);
  });

  test('should retry on failure with exponential backoff', async () => {
    provider1.sendEmail.mockRejectedValueOnce(new Error('Failed to send')).mockResolvedValueOnce();
    const email = { id: '2', to: 'user@example.com', subject: 'Test', body: 'Hello' };

    await emailService.sendEmail(email);

    expect(provider1.sendEmail).toHaveBeenCalledTimes(2);
  });

  test('should fallback to second provider if the first fails', async () => {
    provider1.sendEmail.mockRejectedValue(new Error('Failed to send'));
    provider2.sendEmail.mockResolvedValueOnce();
    const email = { id: '3', to: 'user@example.com', subject: 'Test', body: 'Hello' };

    await emailService.sendEmail(email);

    expect(provider1.sendEmail).toHaveBeenCalledTimes(3); // Max retries reached
    expect(provider2.sendEmail).toHaveBeenCalledTimes(1); // Fallback to provider2
  });
});
