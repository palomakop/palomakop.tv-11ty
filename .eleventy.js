import { DateTime } from "luxon";
import path from "path";
import Image from "@11ty/eleventy-img";

export default function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addShortcode("extLink", function(linkText, url) {
    return `<a href="${url}" target="_blank" rel="noopener">${linkText}</a>`;
  });

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  eleventyConfig.addShortcode("image", async function (src, alt, width, classes) {
    let metadata = await Image(src, {
      widths: [width],
      formats: ["jpeg"],
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
  });

  eleventyConfig.addShortcode("imageUrl", async function (src, width) {
    let metadata = await Image(src, {
      widths: [width],
      formats: ["jpeg"],
      outputDir: "./_site/img/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w-${id}.${format}`;
      },
    });

    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return data.url;
  });

};
