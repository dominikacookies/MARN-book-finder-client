import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        link
        image
      }
    }
  }
`;
