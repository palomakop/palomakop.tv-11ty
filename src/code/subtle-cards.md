---
title: Subtle Cards
projectTags: ["React", "TypeScript", "Flask", "Python"]
projectIndex: 1
description: A full-stack app for pulling virtual tarot cards
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/subtle_cards.png
mobileThumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/subtle_cards_mobile.png
thumbnailAlt: screenshot of Subtle Cards
codeLink: 'https://github.com/palomakop/tarot-gui'
demoLink: 'https://subtle.cards'
---

**Tools used:**
- The frontend is written in React/TypeScript. It uses [React Router](https://reactrouter.com/), [Vite](https://vite.dev/), and [Tailwind](https://tailwindcss.com/)
- The frontend builds & deploys via [Netlify](https://www.netlify.com/)
- The backend is a REST API written in Python with [Flask](https://flask.palletsprojects.com/en/stable/), and is deployed to [Heroku](https://www.heroku.com/)
- The database runs on [Supabase](https://supabase.com/)
- True random numbers for the card selection powered by the [Random.org](https://random.org) API
- Tarot card images processed with [Imagemagick](https://imagemagick.org/)

**Highlights:**
- Every tarot pull gets a unique URL that can be shared with others
- Light/dark themes controlled by device theme (with favicon variations)
- Dynamic emoji show current moon phase, and the moon phase at the time of each tarot pull
- Page transitions created with the new browser standard [View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions)
