---
title: Scanlines.xyz
projectTags: ["Discourse", "Rails", "Ember.js", "Peertube"]
projectIndex: 3
description: An online community for people interested in DIY analog video circuits and art
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/scanlines.png
mobileThumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/scanlines_mobile.png
thumbnailAlt: screenshot of Scanlines.xyz
demoLink: 'https://scanlines.xyz'
---

**Tools used:**
- The web forum runs on [Discourse](https://www.discourse.org/), an open-source forum software with a Rails back-end and an Ember.js front-end
- We also administrate a [Peertube instance](https://joinpeertube.org/) to provide video hosting to the community

**Highlights:**
- I built a custom [Discourse theme component](https://github.com/cyberboy666/scanlines-technical-details/blob/master/embedded_chat_window_for_discourse.md) for a collapsible embedded chat widget. This became a proof-of-concept for an official plugin by Communiteq, a managed Discourse hosting service
- I also built a custom Discourse theme component for adding an embedded livestream video to the forum during live online events. It was initially a customized player based on [video.js](https://videojs.com/), but now uses Peertube. This was used in conjunction with the custom chat widget to provide a Twitch-like experience
- Previously, we also ran a streaming server that used [an RTMP module for Nginx](https://github.com/sergey-dryabzhinsky/nginx-rtmp-module) to serve an HLS livestream video; this has been deprecated as Peertube has built-in video streaming