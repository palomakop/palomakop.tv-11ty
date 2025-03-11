---
title: Day 16
date: '2025-03-10'
---

- Joined the Monday Meditation call, arrived late but luckily still got to participate in the discussion and led a short meditation.
- Paired with Elliot, who helped me understand what React is actually doing and why. I now feel more confident about how to go about building the rest of it. I also helped him whiteboard out ideas for how to handle what happens when a websocket connection is lost on a multiplayer web-based game he's building.
- Had a chat with Lucas and showed him how {% extLink "Eleventy" "https://11ty.dev" %} works and how I use it to make websites. He said it might work well for his site which he currently builds from markdown files with PanDoc.
- Helped Kate (who helped me understand PostgreSQL last week!) solder something because I was working in the room with the soldering iron when she came in.
- Sent out an issue of my email newsletter.
- Made a cute favicon for the tarot app.
- Added view transitions to my tarot app UI pages using the new {% extLink "View Transition API" "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API" %} (as suggested by the React Router docs). This doesn't work in Firefox but it is a nice progressive enhancement where it does work (and I don't mind waiting for them to {% extLink "implement it" "https://bugzilla.mozilla.org/show_bug.cgi?id=1909173" %} instead of messing around with that react-transition-group package which turned out to be outdated and overcomplicated).
- Implemented new routes `/pull/new` and `/pull/:id` which are both children of the `/pull` route. Right now they just have placeholder content but I was able to grab the value of the dynamic segment `:id` and display it dynamically on the page. It was {% extLink "oddly satisfying" "https://merveilles.town/@palomakop/114140847584173131" %}.
  - I also made the `/pull` index route redirect to `/` (the homepage) since there was nothing there without a child route.

#### To-do:
- Create a form on `/pull/new` that {% extLink "submits a post request" "https://merveilles.town/@palomakop/114140847584173131" %} to the back end.
- Make `/pull/:id` display the tarot pull with that ID based on data fetched from the back end.
