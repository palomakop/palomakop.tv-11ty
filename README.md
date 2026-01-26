# My personal website, built with Eleventy

This repo houses the source files for my website, which is built with the [11ty](https://11ty.dev) static site generator. I didn't use a starter template, but I adapted code from the older [plain html version of my site](https://github.com/palomakop/palomakop.github.io). The site is hosted on Netlify and automatically rebuilds when I commit to this repo.

Visit the site here: [palomakop.tv](https://palomakop.tv)

**Highlights:**
- Custom build configs written in JavaScript for shortcodes and other build-time goodies ([code](https://github.com/palomakop/palomakop.tv-11ty/blob/main/.eleventy.js))
- Custom video embeds via the [Vimeo Developer API](https://developer.vimeo.com/api/guides/start) allow me to get thumbnail images and provide a JavaScript-free fallback via the html5 `video` tag
- A custom music player written in JavaScript for embedding music albums ([demo](https://palomakop.tv/work/sleepwalks-tapes/), [code](https://github.com/palomakop/palomakop.tv-11ty/blob/main/src/js/musicplayer.js))
- A custom lightbox viewer in JavaScript for image galleries based on [Simple Lightbox](https://github.com/dbrekalo/simpleLightbox) ([demo - scroll down and click any image to open lightbox](https://palomakop.tv/work/synthetic-forest/))
- Custom templates written in [Liquid](https://shopify.github.io/liquid/)
- Font subsetting with [Python FontTools](https://github.com/fonttools/fonttools) for improved site load performance
- All site code was written from scratch (no starter templates were used)

```html
<!--
╔═╗╔═╗╦  ╔═╗╔╦╗╔═╗╦╔═╔═╗╔═╗╔╦╗╦  ╦
╠═╝╠═╣║  ║ ║║║║╠═╣╠╩╗║ ║╠═╝ ║ ╚╗╔╝
╩  ╩ ╩╩═╝╚═╝╩ ╩╩ ╩╩ ╩╚═╝╩o  ╩  ╚╝

♦ built with 11ty by paloma kop, 2024-present ♦

╔══════════════════════════════════════════╗
║ This website and its contents are        ║
║ released under a Creative Commons        ║
║ Attribution-NonCommercial-ShareAlike     ║
║ 4.0 International License.               ║
╚══════════════════════════════════════════╝
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
https://creativecommons.org/licenses/by-nc-sa/4.0/
-->
```
