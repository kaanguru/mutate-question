import { gql } from "apollo-boost";

export const CREATE_BOOK = gql`
  mutation($name: String!, $year: String) {
    createBook(input: { data: { name: $name, year: $year } }) {
      book {
        id
        name
        year
      }
    }
  }
`;