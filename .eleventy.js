import path from "path";
import Image from "@11ty/eleventy-img";
import prettier from "prettier";
import pluginRss from "@11ty/eleventy-plugin-rss";
const postcss = await import('postcss');

function makeId(length) {
  let result = 'id';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function makeExtLink(linkText, url, optionalClass) {
  let classString = "external-link";
  if (optionalClass) {
    classString = classString + " " + optionalClass;
  }
  return `<a href="${url}" target="_blank" rel="noopener" class="${classString}">${linkText}</a>`;
}

async function makeImage(src, alt, width, classes) {
  let metadata = await Image(src, {
    widths: [width],
    formats: ["auto"],
    outputDir: "./_site/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w-${id}.${format}`;
    },
    sharpOptions: {
      animated: true,
    },
  });
  let data = metadata[Object.keys(metadata)[0]][0];
  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
    style: `aspect-ratio:${data.width}/${data.height};max-width:100%;height:auto;`
  };
  if (classes) {
    imageAttributes.class = classes;
  }
  return Image.generateHTML(metadata, imageAttributes);
}

async function makeImageUrl(src, width) {
  let metadata = await Image(src, {
    widths: [width],
    formats: ["auto"],
    outputDir: "./_site/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w-${id}.${format}`;
    },
    sharpOptions: {
      animated: true,
    },
  });
  let data = metadata[Object.keys(metadata)[0]][0];
  return data.url;
}

async function makeImageWithMetadata(src, width) {
  let metadata = await Image(src, {
    widths: [width],
    formats: ["auto"],
    outputDir: "./_site/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w-${id}.${format}`;
    },
    sharpOptions: {
      animated: true,
    },
  });
  let data = metadata[Object.keys(metadata)[0]][0];
  return {
    url: data.url,
    width: data.width,
    height: data.height
  };
}

async function fetchVimeoOEmbed(vimeoId, width = 500) {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(`https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F${vimeoId}&width=${width}`);
      const text = await response.text();
      if (text.startsWith('<')) {
        console.error(`[Vimeo ${vimeoId}] Got HTML response (attempt ${i + 1}/3):`, text.substring(0, 500));
        throw new Error('Got HTML instead of JSON');
      }
      return JSON.parse(text);
    } catch (error) {
      if (i === 2) throw error; // Last attempt, rethrow
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

export default function(eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/dflip");
  eleventyConfig.addPassthroughCopy("./src/_redirects");
  eleventyConfig.addPassthroughCopy("./src/_headers");
  eleventyConfig.addPassthroughCopy("./src/button.gif");

  eleventyConfig.addPlugin(pluginRss);

  // REMOVE CERTAIN TAGS FOR RSS
  eleventyConfig.addNunjucksFilter("rssSanitize", function(content) {
    content = content.replace(/<script>.*<\/script>/g, "");
    content = content.replace(/<\/?photo-grid.*>/g, "");
    content = content.replace(/<video class="html-video-fallback".*<\/video>/g, "");
    // content = content.replace(/<div class="video-iframe-container" style="padding-top:.*%;">/g, "");
    // content = content.replace(/<\/iframe><\/div>/g, "</iframe>");
    // content = content.replace(/<div class="video-iframe-container.*<\/iframe><\/div>/g, "");
    return content;
  })

  // TO UTC STRING
  eleventyConfig.addFilter("addTimeToIsoDate", async function (date) {
    date = date + "T09:00:00Z";
    return date;
  });

  // EXTERNAL LINK
  eleventyConfig.addShortcode("extLink", function(linkText, url, optionalClass) {
    return makeExtLink(linkText, url, optionalClass);
  });

  // IMAGE <img> TAG
  eleventyConfig.addShortcode("image", async function (src, alt, width, classes) {
    return makeImage(src, alt, width, classes);
  });

  // IMAGE - URL ONLY
  eleventyConfig.addShortcode("imageUrl", async function (src, width) {
    return makeImageUrl(src, width);
  });

  // LIGHTBOX / PHOTO GRID SHORTCODES
  // types: vertical, two-column, three-column, tarot
  eleventyConfig.addPairedShortcode("photoGrid", function(content, type, bgColor) {
    let id = makeId(10);
    let bgColorArg = bgColor ? `, '${bgColor}'` : '';
    return `<photo-grid class="${type}" id="${id}">${content}</photo-grid><script type="module">window.initPhotoSwipe('#${id}'${bgColorArg});</script>`;
  });

  eleventyConfig.addShortcode("photoGridItem", async function(src, description, showCaption, isFullWidth) {
    let widthInPixels;
    if (isFullWidth) {
      widthInPixels = 1440;
    } else {
      widthInPixels = 720;
    }
    let caption = "";
    if (showCaption) {
      caption = `title="${description}"`;
    }
    let fullWidthClass = "";
    if (isFullWidth) {
      fullWidthClass = `class="full-width"`;
    }
    // Get full-size image metadata for PhotoSwipe
    let fullSizeImage = await makeImageWithMetadata(src, 2000);
    return `<a href="${fullSizeImage.url}" data-pswp-width="${fullSizeImage.width}" data-pswp-height="${fullSizeImage.height}" ${caption} ${fullWidthClass}>${await makeImage(src, description, widthInPixels)}</a>`;
  });

  eleventyConfig.addShortcode("photoGridVimeo", async function(vimeoId, isFullWidth) {

    let oEmbed = await fetchVimeoOEmbed(vimeoId);

    let description = `Still from the video: ${oEmbed.title}`

    let thumbnailUrl = oEmbed.thumbnail_url.split("-d_")[0] + "-d_1440.jpg";

    // Get aspect ratio from oEmbed and scale up 4x for better display
    let width = oEmbed.width * 4;
    let height = oEmbed.height * 4;

    let widthInPixels;
    if (isFullWidth) {
      widthInPixels = 1440;
    } else {
      widthInPixels = 720;
    }

    let fullWidthClass = "";
    if (isFullWidth) {
      fullWidthClass = `class="full-width"`;
    }

    let iframeUrl = `https://player.vimeo.com/video/${vimeoId}?dnt=1&title=1&byline=0&portrait=0`;

    return `<a href="${iframeUrl}" data-pswp-type="iframe" data-pswp-width="${width}" data-pswp-height="${height}" ${fullWidthClass}>${await makeImage(thumbnailUrl, description, widthInPixels)}</a>`;
  });

  // VIDEO EMBED
  eleventyConfig.addShortcode("video", async function(vimeoId, videoFileUrl, watchLinksJson) {
    let oEmbed = await fetchVimeoOEmbed(vimeoId);

    let thumbnailUrl = oEmbed.thumbnail_url.split("-d_")[0] + "-d_1440.jpg";
    // let thumbnailWithPlayButton = oEmbed.thumbnail_url_with_play_button.replace(/-d_[0-9]*x[0-9]*/g, "-d_720");
    let height = oEmbed.height;

    let title = "0";

    if (this.page.url.includes("/blog/")) {
        title = "1";
    }

    // set and format duration string
    let seconds = oEmbed.duration
    let duration = "";
    if (seconds > 3600) {
      duration = new Date(seconds * 1000).toISOString().substring(11, 19);
    } else {
      duration = new Date(seconds * 1000).toISOString().substring(14, 19);
    }
    duration = duration.replace(/^0/, '');

    let watchLinksHtml = "";
    if (watchLinksJson && watchLinksJson.length > 0) {
      watchLinksHtml = ` | Watch on: `
      let watchLinks = JSON.parse(watchLinksJson);
      let links = []
      for (var serviceName in watchLinks){
        var url = watchLinks[serviceName];
        links.push(makeExtLink(serviceName, url));
      }
      watchLinksHtml += links.join(" ");
    }
    let aspectPaddingPercent = height / 500 * 100;
    return `<div class="video-container"><div class="video-iframe-container" style="position:relative;overflow:hidden;max-height:max(90vh, 200px);width:auto;aspect-ratio:500/${height};margin-left:auto;margin-right:auto;"><iframe src="https://player.vimeo.com/video/${vimeoId}?dnt=1&title=${title}&byline=0&portrait=0" width="500" height="${height}" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;" loading="lazy"></iframe></div><video class="html-video-fallback" width="500" height="${height}" controls="controls" preload="metadata" playsinline poster="${thumbnailUrl}" style="aspect-ratio: 500/${height};max-height:max(90vh, 200px);height:auto;width:auto;max-width:100%;"><source src="${videoFileUrl}" type="video/mp4"><b>This browser does not support the video tag. Here is a direct link to the <a href="${videoFileUrl}">MP4 file</a>.</b></video><p class="video-caption">${duration}${watchLinksHtml}</p></div>`;
  });

  // VIDEO EMBED WITH AUTOPLAY
  eleventyConfig.addShortcode("autoplayVideoLoop", async function(vimeoId, videoFileUrl) {
    let oEmbed = await fetchVimeoOEmbed(vimeoId);

    let thumbnailUrl = [oEmbed.thumbnail_url.split("-d_")[0], "-d_1440.jpg"].join("");
    let thumbnailWithPlayButton = oEmbed.thumbnail_url_with_play_button.replace(/-d_[0-9]*x[0-9]*/g, "-d_720");
    let height = oEmbed.height;

    let aspectPaddingPercent = height / 500 * 100;
    return `<div class="video-container"><div class="video-iframe-container" style="position:relative;overflow:hidden;max-height:max(90vh, 200px);width:auto;aspect-ratio:500/${height};margin-left:auto;margin-right:auto;"><iframe src="https://player.vimeo.com/video/${vimeoId}?dnt=1&background=true&pip=false" width="500" height="${height}" frameborder="0" allow="" style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;" loading="lazy"></iframe></div><video class="html-video-fallback" width="500" height="${height}" autoplay muted disablePictureInPicture preload="metadata" playsinline poster="${thumbnailUrl}" style="aspect-ratio: 500/${height};max-height:max(90vh, 200px);height:auto;width:auto;max-width:100%;"><source src="${videoFileUrl}" type="video/mp4"><b>This browser does not support the video tag. Here is a direct link to the <a href="${videoFileUrl}">MP4 file</a>.</b></video></div>`;
  });

  // MUSIC PLAYER
  eleventyConfig.addPairedShortcode("musicPlayer", async function(content, albumTitle, albumArtUrl, releaseDate, bcUrl) {
    let id = makeId(10);
    let bcLink = makeExtLink("Listen on Bandcamp", bcUrl);
    let albumArt = await makeImage(albumArtUrl, "", 960, "album-art");
    return `<music-player id="${id}"><div class="player-wrap"><div class="album-art-container">${albumArt}<div class="button"><svg viewBox="0 0 14 14"><path d="M0,0 L0,14 L11,7 L0,0 Z"/></svg></div></div><div class="player-container"><div class="info"><h3>${albumTitle}</h3><p class="title ellipsis"></p><div class="timer"><div class="current">0:00:00</div><div class="slash">/</div><div class="duration">0:00:00</div><div class="action">&nbsp;</div></div></div><div class="player"><audio preload></audio><div class="playpause"><div class="play"><svg viewBox="0 0 14 14"><path d="M0,0 L0,14 L11,7 L0,0 Z"/></svg></div><div class="pause"><svg viewBox="0 0 14 14"><path d="M0,14 L4,14 L4,0 L0,0 L0,14 L0,14 Z M8,0 L8,14 L12,14 L12,0 L8,0 L8,0 Z"/></svg></div></div><div class="scrubber"><input type="range" min="0" max="100" step=".1" value="0" class="seek"></div><div class="prev"><svg viewBox="0 0 12 12"><path d="M3.5,6 L12,12 L12,0 L3.5,6 Z M0,0 L0,12 L2,12 L2,0 L0,0 L0,0 Z"/></svg></div><div class="next"><svg viewBox="0 0 12 12"><path d="M0,12 L8.5,6 L0,0 L0,12 L0,12 Z M10,0 L10,12 L12,12 L12,0 L10,0 L10,0 Z"/></svg></div></div><div class="fallback-message"><p>Web player requires javascript; click track name to open mp3 file.</p></div><div class="playlist-wrap"><ol>${content}</ol><div class="player-caption"><span>Released ${releaseDate}</span><span>${bcLink}</span></div></div></div></div></music-player><script>var ${id} = new MusicPlayer(document, "${id}");</script>`;
  });

  eleventyConfig.addShortcode("musicPlayerTrack", function(name, url) {
    return `<li><a href="${url}">${name}</a></li>`;
  });

  eleventyConfig.addCollection("frontmatterColors", function(collectionApi) {
    const results = {};
    const seen = new Set();
    
    collectionApi.getAll().forEach(item => {
      if (item.data.customStyle) {
        const root = postcss.default.parse(item.data.customStyle);
        
        root.walkRules(rule => {
          // Only process :root selector
          if (rule.selector.trim() === ':root') {
            rule.walkDecls(decl => {
              const value = decl.value.trim();
              let type = null;
              
              // Check if it's a gradient
              if (value.match(/gradient\(/)) {
                if (value.match(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/)) {
                  type = 'gradient';
                }
              }
              // Check if it's a plain hex color (3 or 6 digits, no alpha)
              else if (value.match(/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/)) {
                type = 'color';
              }
              
              if (type && !seen.has(value)) {
                seen.add(value);
                
                const filename = (item.inputPath || item.url)  .replace('./src/', '').replace(/\.(md|liquid)$/, '').replace(/\/index$/, '');
                const property = decl.prop;
                
                // Initialize file object if it doesn't exist
                if (!results[filename]) {
                  results[filename] = {};
                }
                
                results[filename][property] = { type, value };
              }
            });
          }
        });
      }
    });
    
    return results;
  });

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    if (content.startsWith("<!DOCTYPE HTML>")) {
      const parser = "html"
      return prettier.format(content, { parser });
    } else {
      return content;
    }
  });

};
