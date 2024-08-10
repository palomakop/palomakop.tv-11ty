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
  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return data.url;
}

export default function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("CNAME");

  // EXTERNAL LINK
  eleventyConfig.addShortcode("extLink", function(linkText, url) {
    return `<a href="${url}" target="_blank" rel="noopener">${linkText}</a>`;
  });

  // IMAGE <img> TAG
  eleventyConfig.addShortcode("image", async function (src, alt, width, classes) {
    makeImage(src, alt, width, classes);
  });

  // IMAGE - URL ONLY
  eleventyConfig.addShortcode("imageUrl", async function (src, width) {
    makeImageUrl(src, width);
  });

  // LIGHTBOX / PHOTO GRID SHORTCODES
  // types: vertical, two-column, three-column, tarot
  eleventyConfig.addPairedShortcode("photoGrid", function(content, type, name) {
    let id = makeId(10);
    return `<photo-grid class="${type} ${id}">${content}</photo-grid>
    <script>var ${id} = new SimpleLightbox({elements: '.${id} a'});</script>`;
  });

  eleventyConfig.addShortcode("photoGridItem", async function(src, description, showCaption, isFullWidth) {
    let widthInPixels;
    if (isFullWidth){
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
