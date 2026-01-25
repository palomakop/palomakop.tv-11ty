/*!
  * PhotoSwipe video plugin
  * Modified by PK to support iframe videos as well as the <video> tag
  */

const defaultOptions = {
  videoAttributes: { controls: '', playsinline: '', preload: 'auto' },
  autoplay: true,

  // prevent drag/swipe gesture over the bottom part of video
  // set to 0 to disable
  preventDragOffset: 40
};

/**
 * Check if slide has video content
 *
 * @param {Slide|Content} content Slide or Content object
 * @returns Boolean
 */
function isVideoContent(content) {
  return (content && content.data && content.data.type === 'video');
}

/**
 * Check if slide has iframe content
 *
 * @param {Slide|Content} content Slide or Content object
 * @returns Boolean
 */
function isIframeContent(content) {
  return (content && content.data && content.data.type === 'iframe');
}

class VideoContentSetup {
  constructor(lightbox, options) {
    this.options = options;

    this.initLightboxEvents(lightbox);
    lightbox.on('init', () => {
      this.initPswpEvents(lightbox.pswp);
    });
  }

  initLightboxEvents(lightbox) {
    lightbox.on('contentLoad', this.onContentLoad.bind(this));
    lightbox.on('contentDestroy', this.onContentDestroy.bind(this));
    lightbox.on('contentActivate', this.onContentActivate.bind(this));
    lightbox.on('contentDeactivate', this.onContentDeactivate.bind(this));
    lightbox.on('contentAppend', this.onContentAppend.bind(this));
    lightbox.on('contentResize', this.onContentResize.bind(this));

    lightbox.addFilter('isKeepingPlaceholder', this.isKeepingPlaceholder.bind(this));
    lightbox.addFilter('isContentZoomable', this.isContentZoomable.bind(this));
    lightbox.addFilter('useContentPlaceholder', this.useContentPlaceholder.bind(this));

    lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
      if (itemData.type === 'video' && linkEl) {
        if (linkEl.dataset.pswpVideoSources) {
          itemData.videoSources = JSON.parse(pswpVideoSources);
        } else if (linkEl.dataset.pswpVideoSrc) {
          itemData.videoSrc = linkEl.dataset.pswpVideoSrc;
        } else {
          itemData.videoSrc = linkEl.href;
        }
      } else if (itemData.type === 'iframe' && linkEl) {
        if (linkEl.dataset.pswpIframeSrc) {
          itemData.iframeSrc = linkEl.dataset.pswpIframeSrc;
        } else {
          itemData.iframeSrc = linkEl.href;
        }
      }

      // Allow custom placeholder image via data-pswp-msrc
      if (linkEl && linkEl.dataset.pswpMsrc) {
        itemData.msrc = linkEl.dataset.pswpMsrc;
      }

      return itemData;
    });
  }

  initPswpEvents(pswp) {
    // Add CSS class based on content type for styling (e.g., showing arrows on mobile)
    pswp.on('change', () => {
      const currContent = pswp.currSlide.content;
      pswp.element.classList.remove('pswp--video', 'pswp--iframe');
      if (isVideoContent(currContent)) {
        pswp.element.classList.add('pswp--video');
      } else if (isIframeContent(currContent)) {
        pswp.element.classList.add('pswp--iframe');
      }
    });

    // Prevent dragging when pointer is over iframe (entire area) or bottom part of video
    pswp.on('pointerDown', (e) => {
      const slide = pswp.currSlide;
      const origEvent = e.originalEvent;

      if (origEvent.type === 'pointerdown') {
        if (isIframeContent(slide)) {
          // For iframes, prevent drag over entire content area
          e.preventDefault();
        } else if (isVideoContent(slide) && this.options.preventDragOffset) {
          // For videos, only prevent drag in bottom area (controls)
          const videoHeight = Math.ceil(slide.height * slide.currZoomLevel);
          const verticalEnding = videoHeight + slide.bounds.center.y;
          const pointerYPos = origEvent.pageY - pswp.offset.y;
          if (pointerYPos > verticalEnding - this.options.preventDragOffset
              && pointerYPos < verticalEnding) {
            e.preventDefault();
          }
        }
      }
    });

    // do not append video/iframe on nearby slides
    pswp.on('appendHeavy', (e) => {
      if ((isVideoContent(e.slide) || isIframeContent(e.slide)) && !e.slide.isActive) {
        e.preventDefault();
      }
    });

    pswp.on('close', () => {
      const currContent = pswp.currSlide.content;
      if (isVideoContent(currContent) || isIframeContent(currContent)) {
        // Switch from zoom to fade closing transition,
        // as zoom transition is choppy for videos/iframes
        if (!pswp.options.showHideAnimationType
          || pswp.options.showHideAnimationType === 'zoom') {
          pswp.options.showHideAnimationType = 'fade';
        }

        // pause video when closing (iframes don't need pause)
        if (isVideoContent(currContent)) {
          this.pauseVideo(currContent);
        }
      }
    });
  }

  onContentDestroy({ content }) {
    if (isVideoContent(content) || isIframeContent(content)) {
      if (content._videoPosterImg) {
        content._videoPosterImg.onload =  content._videoPosterImg.onerror = null;
        content._videoPosterImg = null;
      }
    }
  }

  onContentResize(e) {
    if (isVideoContent(e.content) || isIframeContent(e.content)) {
      e.preventDefault();

      const width = e.width;
      const height = e.height;
      const content = e.content;

      if (content.element) {
        content.element.style.width = width + 'px';
        content.element.style.height = height + 'px';
      }

      if (content.slide && content.slide.placeholder) {
        // override placeholder size, so it more accurately matches the video/iframe
        const placeholderElStyle = content.slide.placeholder.element.style;
        placeholderElStyle.transform = 'none';
        placeholderElStyle.width = width + 'px';
        placeholderElStyle.height = height + 'px';
      }
    }
  }


  isKeepingPlaceholder(isZoomable, content) {
    if (isVideoContent(content) || isIframeContent(content)) {
      return false;
    }
    return isZoomable;
  }

  isContentZoomable(isZoomable, content) {
    if (isVideoContent(content) || isIframeContent(content)) {
      return false;
    }
    return isZoomable;
  }

  onContentActivate({ content }) {
    if (isVideoContent(content) && this.options.autoplay) {
      // Autoplay videos
      this.playVideo(content);
    } else if (isIframeContent(content)) {
      // Recreate iframe if it was removed
      if (!content.element && content.data.iframeSrc && content.slide) {
        content.state = 'loading';
        content.type = 'iframe';

        content.element = document.createElement('iframe');
        content.element.setAttribute('allowfullscreen', '');
        content.element.setAttribute('allow', 'fullscreen; picture-in-picture');
        content.element.setAttribute('frameborder', '0');
        content.element.setAttribute('loading', 'lazy');
        content.element.src = content.data.iframeSrc;

        content.element.style.position = 'absolute';
        content.element.style.left = 0;
        content.element.style.top = 0;
        content.element.style.width = '100%';
        content.element.style.height = '100%';

        // Append directly to the slide's zoom wrap
        const holderElement = content.slide.holderElement;
        if (holderElement) {
          const zoomWrap = holderElement.querySelector('.pswp__zoom-wrap');
          if (zoomWrap) {
            zoomWrap.appendChild(content.element);
          }
        }

        // Mark as loaded and trigger resize
        content.state = 'loaded';
        content.isAttached = true;
        content.slide.updateContentSize(true);
      }
    }
  }

  onContentDeactivate({ content }) {
    if (isVideoContent(content)) {
      // Pause videos
      this.pauseVideo(content);
    } else if (isIframeContent(content) && content.element) {
      // Remove iframe from DOM to stop playback
      content.element.remove();
      content.element = null;
    }
  }

  onContentAppend(e) {
    if (isVideoContent(e.content) || isIframeContent(e.content)) {
      e.preventDefault();
      e.content.isAttached = true;
      e.content.appendImage();
    }
  }

  onContentLoad(e) {
    const content = e.content;

    if (!isVideoContent(e.content) && !isIframeContent(e.content)) {
      return;
    }

    // stop default content load
    e.preventDefault();

    if (content.element) {
      return;
    }

    content.state = 'loading';

    if (isIframeContent(e.content)) {
      // Create iframe element
      content.type = 'iframe';
      content.element = document.createElement('iframe');

      content.element.setAttribute('allowfullscreen', '');
      content.element.setAttribute('allow', 'fullscreen; picture-in-picture');
      content.element.setAttribute('frameborder', '0');
      content.element.setAttribute('loading', 'lazy');

      if (content.data.iframeSrc) {
        content.element.src = content.data.iframeSrc;
      }

      this.preloadVideoPoster(content, content.data.msrc);

      content.element.style.position = 'absolute';
      content.element.style.left = 0;
      content.element.style.top = 0;
      content.element.style.width = '100%';
      content.element.style.height = '100%';
    } else {
      // Create video element
      content.type = 'video';
      content.element = document.createElement('video');

      if (this.options.videoAttributes) {
        for(let key in this.options.videoAttributes) {
          content.element.setAttribute(key, this.options.videoAttributes[key] || '');
        }
      }

      content.element.setAttribute('poster', content.data.msrc);

      this.preloadVideoPoster(content, content.data.msrc);

      content.element.style.position = 'absolute';
      content.element.style.left = 0;
      content.element.style.top = 0;

      if (content.data.videoSources) {
        content.data.videoSources.forEach((source) => {
          let sourceEl = document.createElement('source');
          sourceEl.src = source.src;
          sourceEl.type = source.type;
          content.element.appendChild(sourceEl);
        });
      } else if (content.data.videoSrc) {
        // Force video preload
        // https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail/
        // this.element.src = this.data.videoSrc + '#t=0.001';
        content.element.src = content.data.videoSrc;
      }
    }
  }

  preloadVideoPoster(content, src) {
    if (!content._videoPosterImg && src) {
      content._videoPosterImg = new Image();
      content._videoPosterImg.src = src;
      if (content._videoPosterImg.complete) {
        content.onLoaded();
      } else {
        content._videoPosterImg.onload =  content._videoPosterImg.onerror = () => {
          content.onLoaded();
        };
      }
    }
  }


  playVideo(content) {
    if (content.element) {
      content.element.play();
    }
  }

  pauseVideo(content) {
    if (content.element) {
      content.element.pause();
    }
  }

  useContentPlaceholder(usePlaceholder, content) {
    if (isVideoContent(content) || isIframeContent(content)) {
      return true;
    }
    return usePlaceholder;
  }

}

class PhotoSwipeVideoPlugin {
  constructor(lightbox, options) {
    new VideoContentSetup(lightbox, {
      ...defaultOptions,
      ...options
    });
  }
}

export { PhotoSwipeVideoPlugin as default };
