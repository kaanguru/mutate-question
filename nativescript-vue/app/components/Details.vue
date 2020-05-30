<template>
  <Page>
    <GridLayout rows="*" columns="*" class="p-5">
      <Label v-if="$apollo.loading" text="loading ...  " textWrap="true" class="h2" row="0" col="0" />
      <StackLayout v-else>
        <Label :text="book.name" textWrap="true" row="0" col="0" class="h3" />
        <Label :text="book.year" textWrap="true" row="0" col="0" class="p-t-3" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import * as queries from "../graphql/queries";

export default {
  props: ["bookID"],
  apollo: {
    book: {
      query: queries.BOOK,
      variables() {
        return {
          id: this.bookID,
        };
      },
    },
  },
};
</script>

<style lang="sass" scoped></style>
