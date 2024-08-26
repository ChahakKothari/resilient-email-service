// src/MockEmailProvider.js

class MockEmailProvider {
    constructor(name) {
      this.name = name;
    }
  
    async sendEmail(email) {
      return new Promise((resolve, reject) => {
        // Simulate random failure
        const isSuccess = Math.random() > 0.5;
        setTimeout(() => {
          if (isSuccess) {
            console.log(`${this.name} successfully sent email to ${email.to}`);
            resolve();
          } else {
            reject(new Error(`${this.name} failed to send email to ${email.to}`));
          }
        }, 1000);
      });
    }
  }
  
  module.exports = MockEmailProvider;
  