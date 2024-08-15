---
title: Video Topography
workTags: ["sculpture"]
workYear: "2019"
description: A sculpture made with layers of laser-etched glass
lightbox: true
customStyle: >
  :root {
    --main-bg-color:#c9e9ed;
    --main-bg-gradient:radial-gradient(#ddd9d9, #c9e9ed);
  }
thumbnail: https://s3.amazonaws.com/palomakop.tv/works/video-topography/video_topography_2_3000px.jpg
thumbnailAlt: abstract glass sculpture with three-dimensional glowing lines floating inside a prism
---

## *{{title}}*, {{workYear}}

{% comment %}
- list of photoGrid possible types:
  - vertical, two-column, three-column, tarot
  - (tarot is a vertical single-column of images with transparency)
- photoGridItem last 2 args: showCaption, isFullWidth
  - (note: all items in a vertical photo grid should be full width)
{% endcomment %}
{% photoGrid "vertical" %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/works/video-topography/video_topography_1_3000px.jpg", "Video Topography sculpture - front view; it looks a bit like an empty glowing fish tank with floating patterns of lines inside", false, true %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/works/video-topography/video_topography_2_3000px.jpg", "Close-up view of the etched lines in glass", false, true %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/works/video-topography/video_topography_3_3000px.jpg", "Side view of the slices of glass that were joined together to create the piece", false, true %}
{% photoGridItem "https://s3.amazonaws.com/palomakop.tv/works/video-topography/video_topography_4_3000px.jpg", "View from farther away, the sculpture casts light on the wall behind it", false, true %}
{% endphotoGrid %}

A sculpture piece made from layers of laser-etched glass. The shape etched into each layer is generated from a single frame of video feedback taken from a short video sequence. The light source is a small 7” LCD backlight.
