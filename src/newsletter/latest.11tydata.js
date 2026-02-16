export default {
  eleventyComputed: {
    thumbnail: (data) => data.buttondown?.[0]?.image,
    publishDate: (data) => data.buttondown?.[0]?.publish_date
  }
};
