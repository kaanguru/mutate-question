import { gql } from "apollo-boost";

export const CREATE_BOOK = gql`
mutation ($name: String!, $year: String, $userID: ID!) {
  createBook(input: {data: {name: $name, year: $year, user: $userID}}) {
    book {
      id
      name
      year
      user {
        id
        username
      }
    }
  }
}
`;