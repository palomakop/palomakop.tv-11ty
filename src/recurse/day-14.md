---
title: Day 14
date: '2025-03-06'
---

- Fixed the `/get-pull/{id}` method to parse the json coming from the database properly and make the response formed the same as the call to `/create-pull`
- Added documentation in the readme and edited routes to be nicer:
  - <s>`/create-pull`</s> is now `/pull/new`
  - <s>`/get-pull/{id}`</s> is now `/pull/{id}`.
- Yay! I have a working POC of my Flask API and can start building the front-end for my tarot app. {% extLink "Github repo" "https://github.com/palomakop/tarot-flask" %}
- I was planning to build the front end with Vue.js, but for the sake of practicality I might use React, since it's more standard and will probably be more useful in job contexts. Or I might try writing it in both as an exercise in comparison (but probably start with React + Typescript + maybe Next).
