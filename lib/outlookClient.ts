// Outlook MCP API wrapper
// This is a stub implementation for development

export interface Email {
  id: string
  subject: string
  sender: string
  body: string
  timestamp: string
  isRead: boolean
  importance: 'high' | 'medium' | 'low'
}

export const getInbox = async (): Promise<Email[]> => {
  // Mock data for development
  const mockEmails: Email[] = [
    {
      id: '1',
      subject: 'Project Update - Q4 Goals',
      sender: 'manager@company.com',
      body: 'Hi team, I wanted to share our Q4 objectives and key results. We need to focus on user engagement metrics and conversion rates. Please review the attached document and let me know your thoughts.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      importance: 'high'
    },
    {
      id: '2',
      subject: 'Meeting Reminder - Weekly Standup',
      sender: 'calendar@company.com',
      body: 'This is a reminder that our weekly team standup is scheduled for tomorrow at 9:00 AM. Please prepare your updates on current projects and any blockers you\'re facing.',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: true,
      importance: 'medium'
    },
    {
      id: '3',
      subject: 'New Feature Request from Client',
      sender: 'client@external.com',
      body: 'We\'ve been using your platform for the past month and have some feature requests that would greatly improve our workflow. Could you please review the attached specifications and let us know if these are feasible?',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: false,
      importance: 'high'
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return mockEmails
}

export const sendEmail = async (to: string, subject: string, body: string): Promise<boolean> => {
  // Mock send email functionality
  console.log('Sending email:', { to, subject, body })
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock success
  return true
} 