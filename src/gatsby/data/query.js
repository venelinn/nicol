module.exports.data = {
  pages: `{
    allContentfulPage {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
  portfolios: `{
    allContentfulPortfolio(filter: { node_locale: { eq: "en-CA" } }) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
  posts: `{
    allContentfulPost(filter: { node_locale: { eq: "en-CA" } }) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`,
}
