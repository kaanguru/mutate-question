import { gql } from "apollo-boost";
export const ALL_BOOKS = gql`
  query books {
    books {
      id
      name
      year
    }
  }
`;
export const BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
      id
      name
      year
    }
  }
`;

