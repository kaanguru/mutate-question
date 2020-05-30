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
import App from "./App.vue";
export default {
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
      console.log("this.book.name :>> ", this.book.name);
      console.log("this.book.year :>> ", this.book.year);
      apolloClient
        .mutate({
          // Query
          mutation: mutations.CREATE_BOOK,
          // Parameters
          variables: {
            name: this.book.name,
            year: this.book.year,
          },
          update: (store, { data }) => {
            console.log("store  ::::>> ", store);
            console.log("data   ::::>> ", data.createBook.book);
            const bookQuery = {
              query: queries.ALL_BOOKS,
            };
            const bookData = store.readQuery(bookQuery);
            console.log('bookData :>> ', bookData);
            // bookData.push(createBook);
            store.writeQuery({ ...bookQuery, data: bookData })
          },
        })
        .then((data) => {
          // Result
          console.log("new data.data id  ::::: :>> ", data.data.createBook.book.id);
          this.$navigateTo(App);
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
