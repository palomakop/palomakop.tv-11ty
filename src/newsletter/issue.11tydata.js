export default {
  eleventyComputed: {
    title: (data) => data.issue?.subject ? `${data.issue.subject}` : "Newsletter",
    thumbnail: (data) => data.issue?.image,
    publishDate: (data) => data.issue?.publish_date
  }
};
