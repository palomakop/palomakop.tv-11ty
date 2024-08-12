import path from "path";
import Image from "@11ty/eleventy-img";
import prettier from "prettier";

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
  });
  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
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
  });
  let data = metadata[Object.keys(metadata)[0]][0]
  return data.url;
}

export default function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("CNAME");

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
  eleventyConfig.addPairedShortcode("photoGrid", function(content, type, name) {
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

    return `<div class="video-container"><div class="video-iframe-container" style="padding-top:${aspectPaddingPercent}%;"><iframe src="https://player.vimeo.com/video/${vimeoId}?dnt=1&title=0&byline=0&portrait=0" width="1440" height="${height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><video class="html-video-fallback" width="1440" height="${height}" controls="controls" preload="metadata" poster="${thumbnailUrl}" style="aspect-ratio: 1440/${height}"><source src="${videoFileUrl}" type="video/mp4" /><b>Your browser does not support the video tag. Here is a direct links to the <a href="${videoFileUrl}">MP4 file</a>.</b></video><div class="video-caption">${duration}${watchLinksHtml}</div></div>`;
  });

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });

      default:
        return content;
    }
  });

};
