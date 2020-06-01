<template>
  <Page>
    <GridLayout rows="auto,auto,60" columns="*">
      <TextField hint="give a name" v-model="book.name" row="0" />
      <TextField hint="and a year" keyboardType="number" v-model="book.year" row="1" />
      <Button text="Add" @tap="addBook" row="2" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { apolloClient } from "../main";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import List from "./List.vue";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
  props: {
    userID: {
      type: Number,
    },
  },
  data() {
    return {
      book: {
        name: "",
        year: "",
      },
    };
  },
  methods: {
    addBook() {

      apolloClient
        .mutate({
          // Query
          mutation: mutations.CREATE_BOOK,
          // Parameters
          variables: {
            name: this.book.name,
            year: this.book.year,
            userID: 1,
          },
          update: (store, { data }) => {
            try {

              console.log("data of incoming book  ::::>> ", data.createBook.book);
              const bookQuery = {
                query: queries.ALL_MY_BOOKS,
                variables: {
                   userID: 1,
                }
              };
              const bookData: any = store.readQuery(bookQuery);
              console.log("bookData :>> ", bookData);
              bookData.books.push(data.createBook.book);
              store.writeQuery({ ...bookQuery, data: bookData });
            } catch (error) {
              console.error(error);
            }
          },
        })
        .then((data) => {
          // Result
          console.log("new data.data id  ::::: :>> ", data.data.createBook.book.id);
          this.$navigateTo(List);
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
  },
};
</script>

<style lang="sass" scoped></style>
