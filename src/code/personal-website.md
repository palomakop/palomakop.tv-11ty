---
title: My Personal Website
projectTags: ["Eleventy", "JavaScript", "Node.js", "Netlify"]
projectIndex: 2
description: The site you are looking at now, a space to display my projects and blog posts
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/personal_website.png
mobileThumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/personal_website_mobile.png
thumbnailAlt: screenshot of personal website
codeLink: 'https://github.com/palomakop/palomakop.tv-11ty'
demoLink: '/'
---

**Tools used:**
- [Eleventy](https://11ty.dev) static site generator, running on [Node.js](https://nodejs.org/en)
- Automatic build & deploy via [Netlify](https://www.netlify.com/)

**Highlights:**
- Custom build configs written in JavaScript for shortcodes and other build-time goodies ([code](https://github.com/palomakop/palomakop.tv-11ty/blob/main/.eleventy.js))
- Custom video embeds via the [Vimeo Developer API](https://developer.vimeo.com/api/guides/start), with thumbnail images and a JavaScript-free fallback via the html5 `video` tag
- Custom music player written in JavaScript for embedding music albums ([demo](https://palomakop.tv/work/sleepwalks-tapes/), [code](https://github.com/palomakop/palomakop.tv-11ty/blob/main/src/js/musicplayer.js))
- Custom lightbox viewer for image galleries based on [PhotoSwipe](https://photoswipe.com/) ([demo: scroll down and click any image to open lightbox](/work/synthetic-forest/))
- Custom plugin to support iframe videos in lightbox ([demo: scroll down and click on thumbnails to open video player](/art/experiments-in-public/))
- Custom templates written in [Liquid](https://shopify.github.io/liquid/)
- Font subsetting with [Python FontTools](https://github.com/fonttools/fonttools) for improved site load performance
