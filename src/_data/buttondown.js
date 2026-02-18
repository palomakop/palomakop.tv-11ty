export default async function() {
  const apiKey = process.env.BUTTONDOWN_KEY;

  if (!apiKey) {
    console.warn('BUTTONDOWN_KEY environment variable is not set');
    return [];
  }

  try {
    const emails = [];
    let url = 'https://api.buttondown.com/v1/emails';

    while (url) {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Buttondown API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.results) break;
      emails.push(...data.results);
      url = data.next || null;
    }

    return emails.sort((a, b) =>
      new Date(b.publish_date) - new Date(a.publish_date)
    );
  } catch (error) {
    console.error('Error fetching Buttondown data:', error);
    return [];
  }
}
