---
title: 'Day 4: Pseudo Rutt Etra'
date: '2026-07-09'
---

After feeling like I had gotten the hang of TouchDesigner more, I got excited and started having some ideas of things I wanted to try (instead of the other way around, noodling around and letting the results be determined by whatever ended up happening). I ran into the same situation I have in the past, which is that TouchDesigner is a very difficult program to learn this way. It seems that most people learn by seeing a lot of examples of how other people have implemented things, before they begin to build from scratch more. Well, as someone who often tries to build things from scratch — partly because I have Ideas of things to try based on my experience with other systems, and I don't see any examples of how to do them — I find this frustrating.

I really wanted to find a way to map brightness to depth, so I tried making a few things on my own using the "grid" SOP and some of the new POP operators, and *almost* got things to a point of being cool, but then I dragged something into something else that froze things and had to kill the app... only after which I realized I hadn't saved. This happened several times.

So I set my ego aside and searched for some tutorials that might at least get at parts of what I wanted to do, such as converting an image to a grid in 3D space, etc. I ended up finding {% extLink "this Pseudo Rutt Etra tutorial video", "https://www.youtube.com/watch?v=X1jTD5uSz6w" %} by a person called "lateness," which I liked because it is actually pretty straightforward, unlike some others on similar topics. And they explained at least some of what they were doing, and I was able to replicate the results (at least until I diverged at the end of the chain to add my own color scheme). Here is a video of the output:

{% autoplayVideoLoop "1208617709", "https://player.vimeo.com/progressive_redirect/playback/1208617709/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=b655c53796431a0dd7d1d72d514d032ca456fe566326e049d2663d0ef5b884bb" %}

And a screenshot of the patch:

{% photoGrid "vertical" %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/notes/patch-logs/pseudo_rutt_etra_patch.png", "Screenshot of touch designer patch", false, true %}
{% endphotoGrid %}

The main patch is driven by a grid, with its x and y units set by a "constant" CHOP, allowing you to change the numbers later and have it propagate to both a "grid" SOP (3D shape) and a texture which is scaled to have 1 pixel per grid unit. At this point, a bunch of stuff happens that I would not have known how to do, such as converting both the shape and the image to CHOPs (channel operators), splitting apart the X, Y, and Z coordinate sets, adding the pixel values as a Z offset, and then converting back to a shape.

Since it's now 10pm, the result of this tutorial will have to be my patching entry for today. I had to work today, but I have the rest of the days of Week of Patching off, so hopefully I will have more time to make some things from scratch soon using what I've learned!

In lieu of sharing the patch file, I suggest building it yourself from {% extLink "lateness's video", "https://www.youtube.com/watch?v=X1jTD5uSz6w" %}. I want to watch their other two videos soon also, they both look interesting, and useful for my goals.
