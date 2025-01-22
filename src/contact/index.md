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
  name="contact"
  method="POST"
  action="/contact/submitted"
  netlify-honeypot="email-address"
  netlify
  >
  <div style="display:none;">
    <label>
      Don't fill this out if you are a person:
      <input type="email" name="email-address">
    </label>
  </div>
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
    Subscribe to my <a href="/newsletter/">newsletter</a>?
    <input type="checkbox" name="mailing-list">
  </label>
  <button type="submit">Send</button>
</form>

Or email me:  
**paloma** *(at)* **palomakop** *(dot)* **tv**
