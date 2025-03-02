---
title: Weekend 2
date: '2025-03-01'
---

- I finished going through {% extLink "this Vue.js tutorial" "" %}. The result was a directory of employees that you can do CRUD operations on. However, the data was just stored in variables, not a real database. Still, a cool demo and so far I like Vue a lot more than React (from the brief time I tried it out a while ago). I also like the idea of things being all inside of modular "components". The trick will be getting used to passing data between different components and levels/layers of the app.
  - Next steps:
    - Learn how to work with TypeScript in Vue (apparently it's 'zero config.' Does that mean you just put it in the script tag instead of JS and it gets handled automatically?)
    - Learn how to configure and use `pinia` for state management and `vue-router` for routing. Also, learn more about what state management and routing are :p
      - I think routing is what updates the URL based on the current "virtual page" of a single-page application
    - Look into Nuxt.js and how using it would differ from plain Vue
      - I noticed that, with the sample app I created from the tutorial, I can already "build" the app to the `dist` folder and then serve it as a static site. However, the page basically doesn't show *anything* with javascript disabled. I think using Nuxt would improve this
    - Figure out what my server setup will be, and decide how to approach the back end of my app
      - Python/Flask is still probably the most familiar option for back-end for me, but I can't host it on Netlify; maybe Heroku would be a good option
        - Heroku basic dyno + Heroku Postgres essential 0 + a pipeline with Git integration
      - Another option for a very basic backend is Val.town
      - Netlify could be a good option for just the front end, or Vercel or Nuxt Hub
      - At what point in the project will I need the back end to exist?
- Wrote out some notes to outline the initial features of the app and the functionality of the front and back end. I don't think I will include any auth at this point; for now I can just generate a unique, public share URL for each pull
- Shared the code for txxt.club, my mysterious SMS-powered group blog, to github ({% extLink "repo link" "https://github.com/palomakop/txxt-bridge" %})
- Added more things to my {% extLink "technical projects list" "https://github.com/palomakop/technical-projects-list" %} and added a readme to my {% extLink "github profile" "https://github.com/palomakop" %}
