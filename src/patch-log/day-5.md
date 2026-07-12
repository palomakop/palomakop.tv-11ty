---
title: 'Day 5: Variations'
date: '2026-07-11'
---

I'm a little behind on posting these, but I'm not behind on patching! It's just taking me a little bit longer to translate my patching activities into documentation and posts. Sometimes I get lost in noodling around. Which I think is a good thing.

So for this post, I have four different videos that are all variations of patches I made already, to varying degrees. For that reason, I haven't included patch screenshots or files. But I'll explain what I changed for each one. Note: the first three are all inspired by hardware I used to create my [Signal Culture Series](/art/signal-culture-series), so check those out to compare similar effects created with hardware.

#### Pseudo Rutt Etra v2

The first one is a variation on the *Pseudo Rutt Etra*. I'm a little more comfortable calling this my own work, because while vestiges of the tutorial version remain, I've figured out how to do some things that I like to do with hardware scan processing.

The main change here was to actually be able to apply the brightness of the source image to the lines. In order to achieve that, I had to switch the "MAT" (3D material) from "lines" to one that supports a color map. I chose a "constant" MAT, and applied the color map of the source texture to it. Since the lines formed by this MAT were much thinner and dimmer, I also had to use some image processing steps to boost them (mainly "blur" and "levels"). I also added a bloom to simulate the effect of a phosphorescent screen. I hope you will forgive me that affectation!

Also, I masked the image with a circle. Since the lines have the color of the input now, that allows the edges to drop away into darkness. Like many signals you can input into this kind of system, it benefits from a little blurring before it gets scan processed. Here is the result:

{% autoplayVideoLoop "1209167896", "https://player.vimeo.com/progressive_redirect/playback/1209167896/rendition/2160p/file.mp4%20%282160p%29.mp4?loc=external&signature=fb63f1854b137a81d195403e9dead9aa0bae63352687adddc7e4ab421b8c68bc" %}

#### Wobbulator

After I felt reasonably successful in replicating some of my favorite techniques in scan processing, I realized I could emulate a Wobbulator (a kind of modified CRT) with the same technique. I kept a bit of the brightness displacement enabled, and I also added "pattern" CHOPs (oscillators) and LFOs to modulate the position of the scanlines in an additional way. It took some fiddling to get the oscillators to sync nicely with the "scan rate," but I figured it out. Here is the result of that:

{% autoplayVideoLoop "1209167898", "https://player.vimeo.com/progressive_redirect/playback/1209167898/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=31b557ede5a7abd86be0f3f0376e3018cbb3df6ea50700f2069ac58bbb1ffd17" %}

I still haven't figured out how to emulate the "S-curve" modulation mode of the real Wobbulator I used. I might need to do some matrix multiplication? Will think more on this.

#### Ribbons

This is my final scan-processing (a.k.a. Rutt Etra[^1]) inspired patch. Another technique I experimented with at Signal Culture was manipulating a blank video signal to create warped, abstract forms. I used more "patterns" to modulate not just the Z, but also the X and Y positions. One of these is being modulated by a simple sine wave; the other is a combination of sine and cosine to create a curl:

{% autoplayVideoLoop "1209167897", "https://player.vimeo.com/progressive_redirect/playback/1209167897/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=fa7abec827f2f810022e13b534bd58d86560b90264fccf5dcc3029801621f97b" %}

#### Colors Fading

This is a variation on the *Colors Panning* patch from Day 1. I changed the modulation on the noise from X to Z, so the colors appear to fade in and out, instead of moving horizontally. I like this version a little bit better. I especially like the vibrancy of the colors and the spectral effect that sometimes emerges:

{% autoplayVideoLoop "1209167899", "https://player.vimeo.com/progressive_redirect/playback/1209167899/rendition/720p/file.mp4%20%28720p%29.mp4?loc=external&signature=282685b3bad495f3346fecea5957b98b7c4652570ce35cafe4b701d9d1851ef8" %}

That's all I'm prepared to share right now, but I have some more patches in the works that I will try to document soon and add to this log.

[^1]: Fun fact: Rutt and Etra were not the only ones to develop a scan-processing device, but their names became synonymous with the effect. Similar devices included the Scanimate (used in commercial motion design for television) and the Raster Scan by Dave Jones (which is what I used at Signal Culture).