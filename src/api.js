export default {
  urls: {
    ALL_POSTS:
      "https://l6kdrw9p.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27post%27%5D+%7B%0A++title%2C+body%2C+publishedAt%2C+slug%7Bcurrent%7D%2C+author+-%3E%7Bname%7D%2C+tags%5B%5D-%3E%7Btitle%2C+colour%2C+textcolour%7D%0A%7D+%7C+order%28publishedAt+desc%29&perspective=published",
    POST_BY_SLUG:
      "https://l6kdrw9p.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27post%27+%26%26+slug+%3D%3D+%27REPLACE_WITH_SLUG%27%5D+%7B%0A++title%2C+publishedAt%2C+slug%7Bcurrent%7D%2C+author+-%3E%7Bname%7D%2C+tags%5B%5D-%3E%7Btitle%2C+colour%7D%0A%7D",
  },

  async getAllPosts() {
    const response = await fetch(this.urls.ALL_POSTS);
    const data = await response.json();
    return data.result;
  },

  async getPostBySlug(slug) {
    const response = await fetch(
      this.urls.POST_BY_SLUG.replace("REPLACE_WITH_SLUG", slug)
    );
    const data = await response.json();
    return data.result[0];
  },
};
