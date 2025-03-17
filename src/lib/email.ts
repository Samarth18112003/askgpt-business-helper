
// This is a simulated email sending service
// In production, replace with actual email API (SendGrid, AWS SES, etc.)

interface EmailProps {
  to: string;
  name: string;
  question: string;
  response: string;
}

/**
 * Sends an email with the AI response to the user
 * @param props Object containing recipient email, name, question, and AI response
 * @returns A promise that resolves when the email is sent
 */
export const sendEmail = async (props: EmailProps): Promise<void> => {
  const { to, name, question, response } = props;
  
  // In a real implementation, this would call an email API
  console.log(`Sending email to ${to} (${name})`);
  console.log(`Question: ${question}`);
  console.log(`Response length: ${response.length} characters`);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For development purposes only
  console.log('Email sent successfully!');
  
  return;
};
