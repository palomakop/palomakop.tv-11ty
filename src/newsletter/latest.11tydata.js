export default {
  eleventyComputed: {
    thumbnail: (data) => data.buttondown?.image,
    publishDate: (data) => data.buttondown?.publish_date
  }
};
