# Cloudflare Email Setup Guide

This guide will help you set up email sending through Cloudflare's free tier using Email Workers.

## Overview

The Islander Studio API now includes email sending capabilities using Cloudflare's Email Send binding. This is completely free and integrates seamlessly with Cloudflare Workers.

## Prerequisites

- A domain managed by Cloudflare
- Cloudflare Workers deployed (already set up in this project)
- Access to Cloudflare dashboard

## Setup Steps

### 1. Configure Email Routing in Cloudflare Dashboard

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (`islanderstudio.com`)
3. Go to **Email** → **Email Routing**
4. Click **Get Started** (if not already enabled)
5. Add destination addresses where you want to receive emails
6. Verify your destination email address

### 2. Set Up Sender Email Address

You can send emails from addresses on your domain. Common options:

- `noreply@islanderstudio.com`
- `hello@islanderstudio.com`
- `contact@islanderstudio.com`

**Note:** Email Routing must be enabled on your domain to send emails.

### 3. Deploy the Worker

The email functionality is already coded and configured in `wrangler.toml`. Deploy it:

```bash
cd workers
npm run deploy
```

### 4. Verify the Binding

After deployment, the `EMAIL_SEND` binding should be automatically available. You can verify in the Cloudflare dashboard:

1. Go to **Workers & Pages**
2. Select your worker (`islanderstudio-blog-api`)
3. Go to **Settings** → **Bindings**
4. Confirm `EMAIL_SEND` binding is present

## API Usage

### Send Email Endpoint

**Endpoint:** `POST /api/email/send`

**Authentication:** Requires valid JWT token (same as other API endpoints)

**Request Body:**

```json
{
  "from": "noreply@islanderstudio.com",
  "fromName": "Islander Studio",
  "to": "recipient@example.com",
  "subject": "Welcome to Islander Studio",
  "text": "Plain text version of the email",
  "html": "<h1>HTML version</h1><p>Welcome to Islander Studio!</p>",
  "replyTo": "hello@islanderstudio.com"
}
```

**Required Fields:**
- `from` - Sender email address (must be on your domain)
- `to` - Recipient email address (can be a string or array of strings)
- `subject` - Email subject line
- `text` OR `html` - Email content (at least one is required)

**Optional Fields:**
- `fromName` - Display name for sender
- `replyTo` - Reply-to email address
- `html` - HTML version of email

**Response:**

Success (200):
```json
{
  "success": true,
  "message": "Email sent successfully",
  "to": "recipient@example.com"
}
```

Error (400/500):
```json
{
  "success": false,
  "error": "Error message"
}
```

## Example Usage

### Using cURL

```bash
curl -X POST https://api.islanderstudio.com/api/email/send \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@islanderstudio.com",
    "fromName": "Islander Studio",
    "to": "user@example.com",
    "subject": "Welcome!",
    "html": "<h1>Welcome to Islander Studio</h1><p>Thanks for signing up!</p>",
    "text": "Welcome to Islander Studio! Thanks for signing up!"
  }'
```

### Using JavaScript/Fetch

```javascript
async function sendEmail(to, subject, htmlContent) {
  const response = await fetch('https://api.islanderstudio.com/api/email/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'noreply@islanderstudio.com',
      fromName: 'Islander Studio',
      to: to,
      subject: subject,
      html: htmlContent,
      text: htmlContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    })
  });

  const result = await response.json();
  return result;
}

// Usage
await sendEmail(
  'user@example.com',
  'Welcome to Islander Studio',
  '<h1>Welcome!</h1><p>Thanks for joining us.</p>'
);
```

### Using React

```jsx
import { useState } from 'react';

function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://api.islanderstudio.com/api/email/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'noreply@islanderstudio.com',
          to: 'hello@islanderstudio.com',
          subject: `Contact Form: ${formData.get('subject')}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${formData.get('email')}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.get('message')}</p>
          `,
          replyTo: formData.get('email')
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email: ' + result.error);
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Your email" required />
      <input name="subject" type="text" placeholder="Subject" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
```

## Common Use Cases

### 1. Welcome Emails
Send welcome emails to new users after registration.

### 2. Contact Form Submissions
Forward contact form submissions to your inbox.

### 3. Notifications
Send notifications for important events (new comments, mentions, etc.).

### 4. Password Reset
Send password reset links to users.

### 5. Newsletter
Send newsletters to subscribers (consider rate limits).

## Rate Limits

Cloudflare Email Workers has generous rate limits on the free tier:
- **100 emails per day** per worker

For higher volumes, consider:
- Upgrading to Cloudflare Workers Paid plan
- Using a dedicated email service (SendGrid, Mailgun, etc.)

## Security Best Practices

1. **Always authenticate:** The email endpoint requires JWT authentication
2. **Validate input:** The API validates required fields
3. **Rate limiting:** Consider implementing rate limiting for abuse prevention
4. **SPF/DKIM/DMARC:** Ensure your domain has proper email authentication records
5. **Don't expose from address:** Store sender email in environment variables

## Troubleshooting

### "Email send binding not configured"
- Ensure `wrangler.toml` has the `[[send_email]]` binding
- Redeploy your worker: `npm run deploy`

### Emails not delivering
- Check Email Routing is enabled in Cloudflare dashboard
- Verify sender address is on your domain
- Check spam folder
- Verify SPF/DKIM records are configured

### 401 Unauthorized
- Ensure you're including a valid JWT token in the Authorization header
- Token should be from the `/api/auth/login` endpoint

### Rate limit exceeded
- You've hit the 100 emails/day limit
- Consider upgrading or spacing out emails

## Advanced Configuration

### Environment Variables

You can set a default sender email in your worker environment:

```toml
# In wrangler.toml
[vars]
DEFAULT_EMAIL_FROM = "noreply@islanderstudio.com"
DEFAULT_EMAIL_NAME = "Islander Studio"
```

Then modify the email API to use these defaults:

```javascript
const from = emailData.from || env.DEFAULT_EMAIL_FROM;
const fromName = emailData.fromName || env.DEFAULT_EMAIL_NAME;
```

### Email Templates

Create reusable email templates:

```javascript
// workers/src/api/email-templates.js
export const templates = {
  welcome: (userName) => ({
    subject: 'Welcome to Islander Studio!',
    html: `
      <h1>Welcome, ${userName}!</h1>
      <p>Thanks for joining Islander Studio.</p>
    `,
    text: `Welcome, ${userName}! Thanks for joining Islander Studio.`
  }),

  contactConfirmation: (userName) => ({
    subject: 'We received your message',
    html: `
      <h1>Thanks for reaching out, ${userName}!</h1>
      <p>We'll get back to you soon.</p>
    `,
    text: `Thanks for reaching out, ${userName}! We'll get back to you soon.`
  })
};
```

## Resources

- [Cloudflare Email Routing Documentation](https://developers.cloudflare.com/email-routing/)
- [Cloudflare Workers Email Send API](https://developers.cloudflare.com/workers/runtime-apis/send-email/)
- [Email Best Practices](https://developers.cloudflare.com/email-routing/best-practices/)

## Support

For issues or questions:
- Check the [Cloudflare Community](https://community.cloudflare.com/)
- Review [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- Contact Islander Studio support
