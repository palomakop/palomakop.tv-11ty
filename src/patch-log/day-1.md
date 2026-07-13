---
title: 'Day 1: Colors Panning'
date: '2026-07-06'
---

I plan to use this [Week of Patching](/week-of-patching) to explore making visual (and possibly audio-visual) patches in TouchDesigner[^1]. Unfortunately, I didn't have as much time as I would have liked to work on this today. This is kind of like my "hello, world" patch for doing some kind of video synthesis in TouchDesigner. First, here's a video of the resulting output:

{% autoplayVideoLoop "1207571732", "https://player.vimeo.com/progressive_redirect/playback/1207571732/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=0a9b63ff895d1bcea746522a2b39d1b21e139b35a8cbe2e80310145a0d18b101" %}

A screenshot of the patch (click to zoom):

{% photoGrid "vertical" %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/notes/patch-logs/colors_panning_patch.png", "Screenshot of touch designer patch", false, true %}
{% endphotoGrid %}

And an explanation of what's happening:

- I used four different "noise" CHOPs[^2] with different seeds to generate four different one-dimensional arrays of randomized wiggles.

- I animated the "translate X" parameter to make them animated.

- I then used the "CHOP to" texture operator[^3] to convert them to video streams, and "transform" TOPs to stretch them from 1D to 2D "noise fields".

- I used a "reorder" TOP to take the first three noise fields and map them to red, green, and blue of the resulting video image.

- I took the fourth noise field, which was rotated 90º, and used it to "displace" the color image from the other three, adding undulating horizontal wiggles to the otherwise vertical bands of color.

- I used a "math" TOP to decrease the overall brightness, which also made the colors look more appealing to my eyes.

- I took a "constant" TOP, generating a black video image, and composited it with the main video feed, to give it a solid background. (The only reason the other TOP is feeding *into* the "constant" was to quickly make it automatically have the same resolution.)

- A "movie file out" TOP serves as the method for recording output.

As I went through the process of creating the patch, exporting the video file, taking screenshots, and writing this post, I observed that the actual patching was only about 25% of the total time that went into making this post. Since it's my first post, I will probably be able to do the rest a little more quickly, and I'm on semi-vacation so I should have more time for actual TouchDesigner noodling and troubleshooting. But I think this is actually a good microcosmic example of how making art works: if you want to document and share your process and make it legible to others in some way, it often requires a significant time commitment. But at the same time, it also helps *me* learn by having to explain what I'm doing, and it could be of benefit to future me as well.

Anyway, when I have more time on the patching side of things, I hope to figure out how to send the noise CHOP outputs to my eurorack audio interface so that I can make a sound component that follows the same modulation source as the colors. But at first glance, I wasn't able to figure out how to do multichannel output yet. (I didn't even know how to record to a video file until just now!)

If anyone wants to play around with the patch, you can download the TouchDesigner file below. (It should work with the free version since it's set to a small resolution.)

📁 {% extLink "colors_panning.5.toe.zip", "https://s3.amazonaws.com/palomakop.tv/notes/patch-logs/colors_panning.5.toe.zip" %}

[^1]: {% extLink "TouchDesigner", "https://derivative.ca/" %} is a node-based software for creating interactive media systems, including image processing and generation, 3D modeling, and some audio and data processing, mostly geared towards live and realtime applications

[^2]: CHOP is short for Channel Operator, which is basically how TouchDesigner refers to processing nodes related to audio, or anything that resembles an audio stream (like an LFO)

[^3]: Texture Operator, a.k.a. TOP, is basically how TouchDesigner refers to processing nodes related to video streams