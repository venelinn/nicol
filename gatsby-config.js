const path = require(`path`);
require('dotenv').config({ path: `./.env` });

module.exports = {
  siteMetadata: {
    title: `Nikol Tsvetkova • Photographer`,
    description: `Nikol Tsvetkova • Photographer`,
    siteUrl: 'https://tsvetkovaphotography.com', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
    author: 'Nikol Tsvetkova', // Author for RSS author segment and SEO schema
    authorJob: `Photographer`,
    copyright: 'Nikol Tsvetkova Photography',
    userTwitter: '@tsvetkovaphotography', // Change for Twitter Cards
    shortTitle: 'NTP', // Used for App manifest e.g. Mobile Home Screen
    shareImage: '/images/share.jpg', // Open Graph Default Share Image. 1200x1200 is recommended
    shareImageWidth: 1200, // Change to the width of your default share image
    shareImageHeight: 630, // Change to the height of your default share image
    siteLogo: `/images/favicons/android-chrome-512x512.png`, // Logo used for SEO, RSS, and App manifest
    blogPath: '/blog/',
    postsPerFirstPage: 7,
    postsPerPage: 6
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/styles')],
        },
        additionalData: `@import "${__dirname}/src/styles/global.scss";`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true
      }
    },
    {
      resolve: 'gatsby-plugin-feed-generator',
      options: {
        generator: `GatsbyJS`,
        rss: true, // Set to true to enable rss generation
        json: true, // Set to true to enable json feed generation
        siteQuery: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `,
        feeds: [
          {
            name: 'feedPost',
            query: `
            {
              allContentfulPost(sort: {publishDate: DESC}, limit: 1) {
                edges {
                  node {
                    title
                    id
                    slug
                    publishDate(formatString: "MMMM DD, YYYY")
                  }
                }
              }
            }
            `,
            normalize: ({ query: { site, allContentfulPost } }) => {
              return allContentfulPost.edges.map(edge => {
                return {
                  title: edge.node.title,
                  url: site.siteMetadata.siteUrl + site.siteMetadata.blogPath + edge.node.slug,
                  date: edge.node.publishDate,
                }
              })
            },
          },
          {
            name: 'feedPhoto',
            query: `
            {
              allContentfulPortfolio(sort: {createdAt: DESC}, limit: 1) {
                edges {
                  node {
                    title
                    id
                    slug
                    createdAt(formatString: "MMMM DD, YYYY")
                  }
                }
              }
            }
            `,
            normalize: ({ query: { site, allContentfulPortfolio } }) => {
              return allContentfulPortfolio.edges.map(edge => {
                return {
                  title: edge.node.title,
                  url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                  date: edge.node.createdAt,
                }
              })
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nikol Tsvetkova Photography`,
        short_name: `NTP`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        description: `Photographer`,
        display: `minimal-ui`,
        lang: `en-US`,
        icon: `${__dirname}/src/images/ntp-icon.png` // This path is relative to the root of the site.
      }
    },
    // {
    //   resolve: `gatsby-plugin-schema-snapshot`,
    //   options: {
    //     path: `./src/gatsby/schema/schema.gql`,
    //     update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline'
  ]
}
