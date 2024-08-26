# Resilient Email Sending Service

## Overview
This project implements a resilient email sending service in TypeScript/JavaScript. The service is designed to be robust and fault-tolerant, with features such as retry logic, fallback between providers, idempotency, rate limiting, and status tracking.

## Features
- **Retry Mechanism with Exponential Backoff**: Retries sending emails with increasing delays between attempts.
- **Provider Fallback**: Switches to a secondary email provider if the primary one fails.
- **Idempotency**: Ensures that emails are not sent multiple times.
- **Rate Limiting**: Limits the number of emails that can be sent within a minute.
- **Status Tracking**: Tracks the status of email sending attempts.
- **Circuit Breaker Pattern** (To be implemented): Stops using a provider temporarily after repeated failures.
- **Structured Logging** (To be implemented): Improved logging with different log levels.

## Setup Instructions

### Prerequisites
- Node.js v14+ installed
- npm or yarn

 # Install dependencies:
npm install
# or
yarn install

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/email-service.git
   cd email-service
   
# npm start 
bash


# POST /send-email: Sends an email.
![Screenshot (1294)](https://github.com/user-attachments/assets/53d41113-4df8-44f2-8940-6403468deffa)

![Screenshot (1297)](https://github.com/user-attachments/assets/06b14ca2-7041-4fea-9a80-f2391548c4fa)



Request body:
json
{
  "id": "1",
  "to": "chahak@example.com",
  "subject": "Hello",
  "body": "This is a test email."
}

Response: Email process initiated.
GET /statuses: Retrieves the statuses of email sending attempts.

![Screenshot (1297)](https://github.com/user-attachments/assets/c2478ee4-63e8-4322-89a0-79047818398d)


# Testing
Run tests:
bash
# npm test
![Screenshot (1300)](https://github.com/user-attachments/assets/f995880c-f877-4b0a-9a69-bb4fae802868)
![Screenshot (1301)](https://github.com/user-attachments/assets/8f7b4569-859b-4ad5-b184-53ec65e4fadc)

Tests cover idempotency, retry mechanism, and fallback logic.

Assumptions
Email providers are mocked for the sake of this exercise.
Rate limiting is basic and may need further refinement for production use.
Future Improvements.
Implement the Circuit Breaker pattern.
Integrate a structured logging system.
Develop a basic in-memory queue system.
Extend status tracking for better monitoring and reporting.
