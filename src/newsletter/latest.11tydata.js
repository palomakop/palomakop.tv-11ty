export default {
  eleventyComputed: {
    thumbnail: (data) => data.buttondown?.image,
    publishDate: (data) => data.buttondown?.publish_date ? new Date(data.buttondown.publish_date) : new Date()
  }
};
