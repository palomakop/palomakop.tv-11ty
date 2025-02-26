---
title: Day 7
date: '2025-02-25'
---

- Back to remote as I'm home in New Haven.
- Had a very interesting chat with Tim that went from generative SVGs, to our personal websites, to broader topics like image processing techniques, to each of our respective meandering career paths. They were a professional photo retoucher and shared some {% extLink "techniques" "https://www.kolemontross.com/contact" %} that they used in that industry, which basically involved tracing and recreating an entire photo from scratch in hyperrealistic detail. We made plans to jam on making {% extLink "mandelbulbs" "https://en.wikipedia.org/wiki/Mandelbulb" %} in {% extLink "Houdini" "https://www.sidefx.com/products/houdini/" %} during the Creative Coding session tomorrow.
  - {% extLink "Example for mandelbulbs in Houdini" "https://www.steambeanblog.com/blog/mandelbulb-fractals-in-houdini" %}
- Discovered and fixed a minor bug in {% extLink "The Lab" "https://lab.palomakop.tv" %} where the footer was blocking the link to view code on the second sketch on the {% extLink "shaders page" "https://lab.palomakop.tv/shaders" %}
- Looked at the code for the {% extLink "GLSLcanvas" "https://github.com/patriciogonzalezvivo/glslCanvas" %} library to see how hard it might be to add touch detection in addition to mouse detection. Made a {% extLink "fork" "https://github.com/palomakop/glslCanvas" %}.
- Paired with Colleen to make a {% extLink "little sketch of underwater bubbles" "https://editor.p5js.org/doubleobelisk/sketches/zpmbA-ceQ" %} in {% extLink "p5.js" "https://p5js.org/" %}. Colleen had not used p5 before so she drove.
- After a run to the grocery store on my bike, I added a few things to the p5.js sketch, including a way for bubbles to be removed from the array of objects once they float off screen, and a gradient background. I also embedded the sketch in a new page on the lab: {% extLink "lab.palomakop.tv/p5" "https://lab.palomakop.tv/p5" %}
  - I tried out the sketch, both on The Lab and on the p5.js website, on my iPhone, and I noticed that touch events were not registering properly when the sketch was embedded as an iframe. Apparently this is a known issue with Safari. I added a link to view the sketch as a fullscreen page, and a note to ios users to use it. Developing for both mouse and touch screen events is tricky, as I already noted above with the GLSLcanvas library. It kind of bothers me that my current embedding method isn't fully cross compatible, but I have to choose my battles here.


#### To-do:

- Add more stuff to The Lab and do more pairing tomorrow
