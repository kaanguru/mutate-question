import { gql } from "apollo-boost";

export const ALL_MY_BOOKS = gql`
  query allMyBooks($userID: ID!) {
    books(where: { user:  $userID  }) {
      id
      name
      year
      user {
        id
        username
      }
    }
  }
`;
export const BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
      id
      name
      year
      user {
        id
        username
      }
    }
  }
`;
