import dotenv from 'dotenv';

dotenv.config();

export default async function() {
  const apiKey = process.env.BUTTONDOWN_KEY;

  if (!apiKey) {
    console.warn('BUTTONDOWN_KEY environment variable is not set');
    return null;
  }

  try {
    const response = await fetch('https://api.buttondown.com/v1/emails', {
      headers: {
        'Authorization': `Token ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Buttondown API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn('No emails found in Buttondown');
      return null;
    }

    // Find the email with the most recent creation_date
    const mostRecent = data.results.reduce((latest, current) => {
      return new Date(current.creation_date) > new Date(latest.creation_date) ? current : latest;
    });

    return mostRecent;
  } catch (error) {
    console.error('Error fetching Buttondown data:', error);
    return null;
  }
}
