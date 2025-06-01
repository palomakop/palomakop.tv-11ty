---
title: Journal
projectTags: ["Python", "Flask", "Debian", "Self-hosting"]
projectIndex: 4
description: A minimal, single-user journaling web app
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/journal.png
mobileThumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/journal_mobile.png
thumbnailAlt: screenshot of journal website
codeLink: 'https://github.com/palomakop/journal'
demoLink: 'https://journal.palomakop.tv'
---

**Tools used:**
- [Flask](https://flask.palletsprojects.com/en/stable/) (Python) handles both the UI and back-end
- Served with [Nginx](https://nginx.org/) and [Gunicorn](https://gunicorn.org/) on a [Raspberry Pi](https://www.raspberrypi.com/) in my house running [Debian](https://www.debian.org/)
- [Jinja](https://jinja.palletsprojects.com/en/stable/) template engine
- [SQLite](https://www.sqlite.org/) database

**Highlights:**
- Simple, clean interface works equally well on desktop and mobile
- There can only be one post per day; if you want to write more, just edit today's post
- Posts can be private or public
- Full-text RSS feed for public posts
- Posts can have images (with alt text)
- Images are optimized for performance but can be viewed full-res via lightbox viewer
- Follows [HTML Journal](https://journal.miso.town/) specification