import { gql } from "@apollo/client"
import { request } from 'graphql-request';
const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPostsQuery=gql`
query MyQuery {
  postsConnection {
    edges {
      cursor
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
        featuredImage {
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

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
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
            featuredImage {
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
  `;

  const result = await request(graphqlApi, query);

  return result.postsConnection.edges;
};
export const getRecentPosts = async () => {
  const query = gql`
query GetPostDetails($last:Int!=3){
 posts(
  orderBy: createdAt_ASC
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
  const result = await request(graphqlApi, query);

  return result.posts;
}

export const getSimilarPosts = async (categories,slug) => {
  const query = gql`
  query GETPOSTDETAILS($slug:String!,$categories:[String!]){
      posts(
        where:{slug_not:$slug,AND:{categories_some:{slug_in:$categories}}},
        last:3
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
  const result = await request(graphqlApi, query,{slug,categories});

  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
  query getCategories{
    categories{
      name
      slug
    }
  }
  `
  const result = await request(graphqlApi, query);

  return result.categories;

}


export const getPostDetails = async (slug) => {
  const query = gql`
 query GetPostDetails($slug:String!){
  post(where:{slug:$slug}){
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
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content{
          raw
        }
  }
 }
`

const result= await request(graphqlApi,query,{slug})
return result.post;
}

export const SubmitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
  query GetComments($slug:String!){
  comments(where:{post:{slug:$slug}}){
    name
    createdAt
    comment
  }
  }
  `
  const result = await request(graphqlApi, query,{slug});

  return result.comments;

}
