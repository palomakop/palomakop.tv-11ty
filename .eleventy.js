module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("CNAME");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };

};
