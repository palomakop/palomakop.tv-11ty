---
title: Day 22
date: '2025-03-18'
---

- Today I worked on the tarot app! I learned a lot about things like "state" and "effect" and what does or doesn't trigger a re-render in React. It was a bit frustrating at times but I feel like I got to where I needed to in the end. Here is what I did:
  - Added functionality in the tarot front end to call to the back end, then navigate to the new page for the tarot pull that just got created.
  - Made a loading state that changes what shows up on screen before redirecting the user when the API response is completed and at least 3 seconds has elapsed. I will make use of this later to display an animation of cards being pulled.
  - Added CORS config to the backend to add allow-origin headers for the domains where my front end will exist.
- Meanwhile, I also applied to 1 job and attended the Presentations: Deep Dives call.
- I also made time today to meditate and go for a walk. I was reading about how giving your mind time to wander can help with problem-solving (and lots of other things). I also saw Emily mention taking a walk in her list of advice for folks who might be feeling stuck. Plus, it was a really nice day outside!

#### To-do:
- Work on the `/pull/{id}` page.
  - I want to pass the api response data from the `/pull/new` page so that I don't have to call to the API again if it's not necessary. So if the data is provided by the "state" setting in the `navigate` call, it will use that; if not, it should call to the API to get the data. {% extLink "This example" "https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component/#answer-70010073" %} shows how you can pass in state when using `navigate`.
  - Once that's done the fun part begins: actually displaying the card pull data in a pleasing manner!
