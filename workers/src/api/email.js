/**
 * Email API
 * Handles email sending through Cloudflare Email Workers
 */

/**
 * Send an email using Cloudflare's Email Send binding
 * @param {Object} emailData - Email configuration
 * @param {Object} env - Environment bindings
 * @returns {Response} JSON response
 */
async function sendEmail(emailData, env) {
  try {
    // Validate email send binding exists
    if (!env.EMAIL_SEND) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email send binding not configured. Please set up EMAIL_SEND in wrangler.toml'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { to, from, subject, text, html } = emailData;

    // Validate required fields
    if (!to || !from || !subject || (!text && !html)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: to, from, subject, and either text or html'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Construct email message
    const message = {
      from: {
        email: from,
        name: emailData.fromName || 'Islander Studio'
      },
      to: Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }],
      subject: subject,
      ...(text && { text: text }),
      ...(html && { html: html }),
      ...(emailData.replyTo && {
        reply_to: { email: emailData.replyTo }
      }),
    };

    // Send email using Cloudflare's Email Send API
    await env.EMAIL_SEND.send(message);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        to: to
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Handle email API requests
 * POST /api/email/send - Send an email
 */
export async function handleEmail(request, env, method, path) {
  // Only allow POST for sending emails
  if (path === '/api/email/send' && method === 'POST') {
    try {
      const emailData = await request.json();
      return await sendEmail(emailData, env);
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // Method not allowed
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
