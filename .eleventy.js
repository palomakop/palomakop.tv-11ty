import { DateTime } from "luxon";

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
      outputDir: "./_site/img/"
		});

		let imageAttributes = {
			alt,
			loading: "lazy",
			decoding: "async",
		};

    if (classes) {
      imageAttributes.class = classes;
    }

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});

};
