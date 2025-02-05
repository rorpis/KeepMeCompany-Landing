import { trackPageView } from '../utils/analytics';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const scheduleFollowUpCall = async ({ phoneNumber, country }) => {
  try {
    if (!API_BASE_URL) {
      throw new Error('Backend URL not configured');
    }

    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = currentDate.toTimeString().slice(0, 5);

    const scheduledFor = [{
      date: dateStr,
      time: timeStr
    }];

    const response = await fetch(`${API_BASE_URL}/public_api/schedule_follow_up_call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        country,
        scheduledFor
      })
    });

    const data = await response.json();

    // Track the API call in analytics
    await trackPageView('/api/schedule-follow-up-call');

    // Handle rate limiting
    if (response.status === 429) {
      return {
        success: false,
        error: 'RATE_LIMIT',
        message: 'Maximum calls reached for this number'
      };
    }

    // Handle success
    if (data.success) {
      return {
        success: true,
        message: 'Call scheduled successfully'
      };
    }

    // Handle other errors
    return {
      success: false,
      error: 'API_ERROR',
      message: 'Service unavailable'
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Network error occurred'
    };
  }
}; 