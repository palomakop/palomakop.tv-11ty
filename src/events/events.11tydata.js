import { isEventArchived } from '../_utils/eventArchive.js';

export default {
  eleventyComputed: {
    archived: (data) => isEventArchived(data)
  }
};
