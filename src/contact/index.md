---
layout: default
title: Contact
customStyle: >
  :root {
    --main-bg-color:#d9f0e0;
    --main-bg-gradient:radial-gradient(#f1dbdb, #e2ded7, #daf7e3);
  }
---

## Contact

<form
  action="https://api.web3forms.com/submit"
  method="POST"
  >
  <input type="hidden" name="access_key" value="47f55eaf-d8a8-4806-930c-3daf52ca0a47">
  <input type="hidden" name="subject" value="submission from contact form on palomakop.tv">
  <label>
    Your email:
    <input type="email" name="email" required>
  </label>
  <label>
    Your name:
    <input type="text" name="name" required>
  </label>
  <label>
    Your message:
    <textarea name="message" required></textarea>
  </label>
  <label>
    Subscribe to my newsletter?
    <input type="checkbox" name="mailing-list">
  </label>
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;" aria-hidden="true">
    <div class="h-captcha" data-captcha="true" data-theme="dark"></div>
  <input type="hidden" name="redirect" value="https://palomakop.tv/contact/submitted">
  <button type="submit">Send</button>
</form>

<script src="https://web3forms.com/client/script.js" async defer></script>
