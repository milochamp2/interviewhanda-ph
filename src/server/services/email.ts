// Email service abstraction.
// TODO: Replace with real email provider (e.g. Resend, SendGrid, AWS SES).

export async function sendPdfEmail(
  to: string,
  subject: string,
  pdfBuffer: Buffer,
  filename: string
): Promise<{ success: boolean; messageId?: string }> {
  // TODO: Implement real email sending:
  // 1. Connect to email provider
  // 2. Attach pdfBuffer as PDF
  // 3. Send with professional HTML template
  // 4. Return message ID for tracking

  console.log(`[email-mock] Would send PDF "${filename}" to ${to} with subject "${subject}"`);

  return {
    success: true,
    messageId: `mock_msg_${Date.now()}`,
  };
}
