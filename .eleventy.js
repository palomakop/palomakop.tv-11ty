import path from "path";
import Image from "@11ty/eleventy-img";
import prettier from "prettier";
import pluginRss from "@11ty/eleventy-plugin-rss";

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

function makeExtLink(linkText, url) {
  return `<a href="${url}" target="_blank" rel="noopener" class="external-link">${linkText}</a>`;
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
    style: `aspect-ratio:${data.width}/${data.height}`
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

export default function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/dflip");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addPlugin(pluginRss);

  // REMOVE CERTAIN TAGS FOR RSS
  eleventyConfig.addNunjucksFilter("rssSanitize", function(content) {
    content = content.replace(/<script>.*<\/script>/g, "");
    content = content.replace(/<\/?photo-grid.*>/g, "");
    content = content.replace(/<video class="html-video-fallback".*<\/video>/g, "");
    return content;
  })

  // TO UTC STRING
  eleventyConfig.addFilter("addTimeToIsoDate", async function (date) {
    date = date + "T09:00:00Z";
    return date;
  });

  // EXTERNAL LINK
  eleventyConfig.addShortcode("extLink", function(linkText, url) {
    return makeExtLink(linkText, url);
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
  eleventyConfig.addPairedShortcode("photoGrid", function(content, type) {
    let id = makeId(10);
    return `<photo-grid class="${type} ${id}">${content}</photo-grid><script>var ${id} = new SimpleLightbox({elements: '.${id} a'});</script>`;
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
    return `<a href="${await makeImageUrl(src, 2000)}" ${caption} ${fullWidthClass}>${await makeImage(src, description, widthInPixels)}</a>`;
  });

  // VIDEO EMBED
  eleventyConfig.addShortcode("video", async function(vimeoId, videoFileUrl, duration, watchLinksJson) {
    let oEmbed = await fetch(`https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F${vimeoId}&width=1440`).then((response) => response.json());

    let thumbnailUrl = [oEmbed.thumbnail_url.split("-d_")[0], "-d_1440.jpg"].join("");
    let height = oEmbed.height

    let watchLinksHtml = "";
    if (watchLinksJson && watchLinksJson.length > 0) {
      watchLinksHtml = ` | Watch on: `
      let watchLinks = JSON.parse(watchLinksJson);
      let links = []
      for (var serviceName in watchLinks){
        var url = watchLinks[serviceName];
        links.push(makeExtLink(serviceName, url));
      }
      watchLinksHtml += links.join(" | ");
    }
    let aspectPaddingPercent = height / 1440 * 100;
    return `<div class="video-container"><div class="video-iframe-container" style="padding-top:${aspectPaddingPercent}%;"><iframe src="https://player.vimeo.com/video/${vimeoId}?dnt=1&title=0&byline=0&portrait=0" width="1440" height="${height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><video class="html-video-fallback" width="1440" height="${height}" controls="controls" preload="metadata" poster="${thumbnailUrl}" style="aspect-ratio: 1440/${height}"><source src="${videoFileUrl}" type="video/mp4" /><b>Your browser does not support the video tag. Here is a direct link to the <a href="${videoFileUrl}">MP4 file</a>.</b></video><div class="video-caption">${duration}${watchLinksHtml}</div></div>`;
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

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    if (content.startsWith("<!DOCTYPE HTML>")) {
      const parser = "html"
      return prettier.format(content, { parser });
    } else {
      return content;
    }
  });

};
