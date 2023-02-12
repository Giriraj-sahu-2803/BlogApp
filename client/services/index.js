import { gql } from "@apollo/client"
const graphqlApi=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = gql`
query Assets {
  postsConnection {
    edges {
      node {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        fearuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  }
}
`

export const getRecentPosts = gql`
query GetPostDetails($createdAt_ASC:createdAt_ASC,last:$last){
 posts(
  orderBy: $createdAt_ASC
  last:$last
   ){
    title
    featuredImage{
      url
    }
    createdAt
    slug
   }
}
`
