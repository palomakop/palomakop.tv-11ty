import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchWithRetry(url, apiKey, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });

      if (!response.ok) {
        console.error(`[Buttondown] API error (attempt ${i + 1}/${maxRetries}): ${response.status} ${response.statusText}`);
        throw new Error(`Buttondown API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error('[Buttondown] All retry attempts failed:', error);
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

async function fetchButtondown() {
  const apiKey = process.env.BUTTONDOWN_KEY;

  if (!apiKey) {
    console.error('Error: BUTTONDOWN_KEY environment variable is not set');
    process.exit(1);
  }

  try {
    console.log('Fetching Buttondown newsletter data...');
    const emails = [];
    let url = 'https://api.buttondown.com/v1/emails';

    while (url) {
      const data = await fetchWithRetry(url, apiKey);

      if (!data.results) break;
      emails.push(...data.results);
      url = data.next || null;

      if (url) {
        console.log(`Fetched ${emails.length} emails, continuing...`);
      }
    }

    const sorted = emails.sort((a, b) =>
      new Date(b.publish_date) - new Date(a.publish_date)
    );

    const outputPath = join(__dirname, '..', 'src', '_data', 'buttondown.json');
    writeFileSync(outputPath, JSON.stringify(sorted, null, 2));

    console.log(`✓ Successfully fetched ${sorted.length} newsletters and saved to src/_data/buttondown.json`);
  } catch (error) {
    console.error('Error fetching Buttondown data:', error);
    process.exit(1);
  }
}

fetchButtondown();
