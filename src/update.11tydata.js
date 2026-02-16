export default {
  eleventyComputed: {
    title: (data) => data.update?.date ? `${data.update.date} Update` : "Update"
  }
};
