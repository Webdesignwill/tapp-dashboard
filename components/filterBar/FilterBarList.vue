<template>
  <div class="mb-4 pb-2">
    <p class="mb-2 pl-4 pr-3 d-flex flex-row justify-content-between">
      <span class="text-uppercase font-weight-bold">{{ collection.filter_title }}</span>
      <span class="font-size-xxs">({{ collection.available_filter_options.length }})</span>
    </p>
    <ul class="list-unstyled filter-bar__list" v-bind:class="{ expanded: expanded }">
      <template v-for="(option, index) in collection.available_filter_options">
        <filter-bar-list-item
          :filterTitleMeta="collection.filter_title_metadata"
          :option="option"
          :key="index"
        />
      </template>
    </ul>
    <p v-if="isOverFive()" v-on:click="toggleExpanded()" class="mb-0 pl-4 filter-bar__more">
      <span class="font-size-xxs font-weight-bold d-flex flex-row align-items-center" v-if="!expanded">
        More <i class="material-icons font-size-sm ml-2">add</i>
      </span>
      <span class="font-size-xxs font-weight-bold d-flex flex-row align-items-center" v-else>
        Less <i class="material-icons font-size-sm ml-2">remove</i>
      </span>
    </p>
  </div>
</template>

<script>

import FilterBarListItem from '~/components/filterBar/FilterBarListItem'

export default {
  props: ['collection'],

  components: {
    FilterBarListItem,
  },

  data() {
    return {
      expanded: false,
    }
  },

  methods: {
    isOverFive () {
      return this.collection.available_filter_options.length > 5
    },

    toggleExpanded () {
      this.expanded = !this.expanded
    }
  },
}
</script>
