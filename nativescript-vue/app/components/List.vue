<template>
  <Page>
    <GridLayout columns="*" rows="*,30" class="p-5">
      <Label v-if="$apollo.loading" text="loading ...  " textWrap="true" class="h2" row="0" col="0" />
      <GridLayout v-else rows="*" columns="*" row="0" col="0">
        <ListView for="book in books" row="0" col="0" >
          <v-template>
            <Label :text="book.name" :key="book.id" @tap="gotoDetail(book.id)" class="p-3 m-3" />
          </v-template>
        </ListView>
      </GridLayout>
      <Button text="Go To Add Book Page" @tap="gotoAddBook" row="1" col="0" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import AddBook from "./AddBook.vue";
import Details from "./Details.vue";
import { gql } from "apollo-boost";
import * as queries from "../graphql/queries";
export default {
  data() {
    return {
      books: [],
    };
  },
  apollo: {
    books: {
      // prefetch: true,
      query: queries.ALL_BOOKS,
      update({ books }) {
        return books;
      },
    },
  },
  methods: {
    gotoDetail(bookID) {
      console.log("books :>> ", this.books);
      this.$navigateTo(Details, {
        props: { bookID: bookID },
      });
    },
    gotoAddBook() {
      this.$navigateTo(AddBook);
    },
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #53ba82;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>
