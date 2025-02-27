---
title: Day 9
date: '2025-02-27'
---

- Started making a page on The Lab to display a 3D mandelbulb model from yesterday's Houdini session (haven't published it yet but I got a {% extLink "three.js" "https://threejs.org/" %} demo working!)
- Solicited advice on what tech stack to use for my tarot app, and received a lot of feedback. I have some ideas for how to move forward, but I need to do a bit more research to decide my next steps.
  - I'm interested in using Vue(/Nuxt.js?) to build the UI. {% extLink "Better auth" "https://www.better-auth.com/" %} looks like a helpful auth plugin, and {% extLink "Nuxt Hub" "https://hub.nuxt.com/" %} could be a good hosting option as it also provides a database. There are also {% extLink "Supabase" "" %} and {% extLink "Neon" "" %} for database options with auth included. (Shout out to Timothy for these resources!)
  - For the back end, I'm thinking of using Python & Flask, since I've used them before. Not totally sure yet.
  - It might make sense to build in a Docker container to help manage dependencies.
  - Other interesting toolkits that people suggested, which I'd like to explore in the future, include:
    - Golang could be a full stack solution, with embedded SQLite. This is how {% extLink "Vore (minimal rss reader)" "https://git.j3s.sh/vore" %} was made. (The code for Vore also includes a functioning auth system.)
    - Python/Flask can also work without a separate toolkit for the front end. This is how {% extLink "izzzi (minimal social diary)" "https://izzzzi.net" %} was built.
    - Svelte(kit) has some very cool built-in progressive enhancement features that are super interesting, I'd like to explore this at some point as well.
    - Ruby on Rails is still a viable and robust option if I ever want to explore it.
    - {% extLink "HTMX" "https://htmx.org/" %} looks like something cool, though I'm not sure exactly what it is.
    - I have heard that Elixir and Phoenix are great options for back-end stuff, if I ever want to branch out from Python.
- Started making a list of my {% extLink "techical projects" "https://github.com/palomakop/technical-projects-list" %} to share with potential employers
- Had a nice coffee chat with Shannon and talked about React and other web frameworks, and fun experimental projects (I enjoyed seeing {% extLink "this project" "https://shacon.github.io/thought-bubbles/" %} that she made with Matter.js)
- Went to presentations and saw:
  - An arduino-powered robot that constantly points an arrow in the direction of the International Space Station
  - A walkthrough of making a contribution to Typst (and other open source projects)
  - An AI powered screen reader that can also interact with webpages
  - Tokenization and how it works in language models
  - A {% extLink "sonification app" "https://streamscapes.vercel.app/" %}
  - A p5.js game with icebergs that play Conway's game of life
  - How to make things beautiful in the terminal
  - A light bulb you can control by screaming

#### To-do:

- Finish the mandelbulb three.js page and publish it to The Lab
- Start building the tarot app
- Publish some code on Github from past projects that I have not published
