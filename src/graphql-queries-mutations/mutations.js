import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation AddUserMutation($addUserInput: NewUserInput!) {
    addUser(input: $addUserInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBookMutation($removeBookBookId: ID!) {
    removeBook(bookId: $removeBookBookId) {
      bookCount
    }
  }
`;

export const SAVEBOOK = gql`
  mutation Mutation($saveBookInput: SaveBookInput!) {
    saveBook(input: $saveBookInput) {
      bookCount
      username
      savedBooks {
        bookId
      }
    }
  }
`;
