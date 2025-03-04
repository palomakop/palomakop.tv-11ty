---
title: Day 12
date: '2025-03-04'
---

- Created a JSON file containing data about all of the 78 tarot cards in the Rider-Waite-Smith deck.
- Applied a threshold to the tarot card images with {% extLink "imagemagick" "https://imagemagick.org/" %}, so they are all black-and-white, and uploaded them to an s3 bucket.
- Joined the Impossible Day Kickoff call, and heard about what everyone is building today. I'm just continuing on this tarot app, since it already feels like a good challenge of my abilities.
- Continued building my Flask API, and set up testing in Postman.
- Continued to try to set up a database and write to it, without much progress; I was able to connect to a postgreSQL database from the Flask app on both my local machine (dev enviroment), and the heroku dyno (prod), but the process of setting up schema and creating tables was complex, and I didn't want to have to do it all twice.
- Got too annoyed by the Postgres thing, so I decided to try using {% extLink "supabase" "https://supabase.com" %} and connect to it from both environments. (I can always create a new supabase project if I want a separate dev DB later.) They have a handy {% extLink "python library" "https://supabase.com/docs/reference/python/introduction" %} that looks way easier to use than `psycopg2` which I tried earlier. You can just push a dict to add data. So that seems promising, but it's time for me to wrap up so I'll continue tomorrow.
  - I created a new table that stores most of the data for a tarot card pull inside a row with type JSONb, which will hopefully keep things simple and flexible.
