---
layout: noteItem
title: Colophon
customStyle: >
  :root {
    --main-bg-color:#e4ddc9;
    --main-bg-gradient:radial-gradient(#ebe8d5, #d9eacf, #f1e3be);
  }
tags: notes
description: About this website
notecardStyle: 'background-image:radial-gradient(#ebe8d5, #d9eacf, #f1e3be);'
---

This website was built with {% extLink "11ty", "https://www.11ty.dev/" %} and is hosted on Netlify. I began working on this version of the site in June 2024. The previous version, which I began in 2022, was built with plain HTML and CSS, with a tiny bit of optional JavaScript. This version uses much of the same code, but thanks to 11ty and the power of *static site generation*, it's much easier to update and maintain.

Before the plain HTML version, I built and hosted my site on {% extLink "Cargo", "https://cargo.site/" %} starting in about 2015. I finally moved away from that platform to take full control and ownership over my presence on the web, and never looked back. It has taken a *lot* of effort to build from scratch, but it has also been an extremely fun, rewarding, and educational process. I enjoyed it so much that I have since begun teaching HTML/CSS workshops to help others experience the same struggles and joy.

I got a lot of help, inspiration, and reference material from many folks along the way. Most especially, personal websites and wikis from others in {% extLink "merveilles", "https://merveilles.town/about" %}, {% extLink "xxiivv webring", "https://webring.xxiivv.com/" %}, and adjacent communities, and the ideas of permacomputing, digital gardens, and the *small web* which they have instilled in me. (Visit my [links page](/links) to find more of my friends and inspirations.)

This site is an ongoing project as I continue to update and expand it. My goal is to make it as accessible and pleasant to explore as possible, regardless of visitors' hardware or software environments. Feel free to [get in touch](/contact) with any feedback.

## Website Editing Tools

After a few years of editing my website entirely in a code editor, in early 2026, I created a suite of little GUI tools for tasks I do often, such as creating image galleries, editing frontmatter (page metadata), and generating video embed shortcodes. I built them with dependency-free vanilla JavaScript and host them at {% extLink "tools.palomakop.tv", "https://tools.palomakop.tv" %}, also with Netlify, from this {% extLink "repo", "https://github.com/palomakop/website-tools" %}.

To make it easier to reuse color palettes, I set up 11ty to output an index of all current color styles used on my site at [colors.json](/colors.json), which updates automatically whenever my site is built, and gets ingested by my {% extLink "colors tool", "https://tools.palomakop.tv/colors" %}. I can then pin them and use them in custom page styles in my frontmatter editor.

It was fun to create these tools for myself, and they have already made editing my website more pleasant (without adding the overhead of a real CMS). As a video artist, I follow in a tradition of tool-making as a creative endeavor, and I think that creating your own tools is a very powerful practice in any medium.

## Font

Type is set in *Roboto Mono*.

### License

All content and code found on this site is published under the {% extLink "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License", "https://creativecommons.org/licenses/by-nc-sa/4.0/" %}, unless otherwise noted. In short, this means you are free to adapt, remix, and re-distribute my stuff for non-commercial purposes, as long as you include attribution. Source code for the 11ty build can be found in the {% extLink "Github Repo", "https://github.com/palomakop/palomakop.tv-11ty" %}.

<img src="https://s3.amazonaws.com/palomakop.tv/graphics/happy_mac.png" style="width:100px;aspect-ratio:.78125;margin-top:3rem;" class="pixel-art centered">

<img-caption><b>Happy Macintosh says:</b> Have you watered your Digital Garden today?</img-caption>
