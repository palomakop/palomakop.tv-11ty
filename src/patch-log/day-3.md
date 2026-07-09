---
title: 'Day 3: Reaction Diffusion Orb'
date: '2026-07-08'
---

Here's my patch for Week of Patching day 3! This one combines a simple reaction diffusion system with an orb (clearly one of my favorite shapes).

{% autoplayVideoLoop "1208272388", "https://player.vimeo.com/progressive_redirect/playback/1208272388/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=96f5c74314a988c4af6da99c6c08582d9d347469ca67b81ee9cf01a7e886cb5b" %}

A screenshot of the patch:

{% photoGrid "vertical" %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/notes/patch-logs/reaction_diffusion_orb_patch.png", "Screenshot of touch designer patch", false, true %}
{% endphotoGrid %}

The top half is the reaction diffusion system and a bit of processing. It uses noise as a seed for a feedback loop, with a blur, sharpen[^1], and transform within the loop part of the chain. blur and sharpen are the minimum to get reaction diffusion system; the transform introduces a tiny bit of movement (scale up and rotation) to keep the pattern from settling into a static image.

At the end of that chain, I scaled the whole image to 50% width because that seemed to be the best for mapping it to the texture of the sphere.

After the sphere is rendered, I used an "edge" TOP to grab the outlines of the pattern. I liked the look of the pattern as a set of contours rather than solid black and white shapes. The blur and level are just there to tweak the texture and quality of the resulting imagery.

I realized while clipping the file afterwards that I was dropping a lot of frames. Makes sense, as I had the render section scaled way up so that I could antialias later by downscaling. Might have overdone it though. Also, the whole thing is sped up. I probably should have tweaked the resolution of both the 3D render and the texture generation for a more balanced approach. Oh well, apologies in advance if you open the patch file and it lags like hell:

📁 {% extLink "reaction_diffusion_orb.7.toe.zip", "https://s3.amazonaws.com/palomakop.tv/notes/patch-logs/reaction_diffusion_orb.7.toe.zip" %}

[^1]: Sharpen is not a built-in node type in Touch Designer, but it's available as one of the default image processing components.
