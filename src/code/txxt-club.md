---
title: txxt.club
projectTags: ["Node.js", "Twilio", "WriteFreely", "Serverless"]
projectIndex: 6
description: An image and text microblog for friends to post to via SMS
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/txxt.png
thumbnailAlt: screenshot of txxt.club
codeLink: 'https://github.com/palomakop/txxt-bridge'
---

**Tools used:**
- [Twilio](https://twilio.com) serverless function running [Node.js](https://nodejs.org/en)
  - Twilio provides a phone number to receive incoming SMS, and an API endpoint for launching a function when a new message is received, as well as sending outgoing SMS messages
- [WriteFreely](https://writefreely.org/), an open-source blog platform with an API
  - The WriteFreely instance, hosted on my server, provides the front-end blog site, as well as an RSS feed and ActivityPub stream
- [ImgBB](https://api.imgbb.com/), an image hosting service with an API

**Highlights:**
- I wrote a bridge that takes incoming SMS text and image messages and posts them to the WriteFreely blog
- It also replies via SMS with the blog URL once the new post is created
- There is no authentication required to post, but you need to know the phone number, which is shared only by word of mouth
- Can accept messages with multiple attachments, and will include all image attachments in the blog post
- Text-only posts are also supported
- When the Twilio phone number is called, it plays an audio message with instructions for posting to the blog