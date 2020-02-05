<template>
  <li
    class="d-flex flex-row justify-content-between align-items-center filter-bar__list-item pl-4 pr-2"
    v-on:click="toggleFilterParam(option.metadata)"
    v-bind:class="{selected: selected}"
  >
    <p class="mb-0 font-size-xxs text-uppercase">{{ option.name }}</p>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['option', 'filterTitleMeta'],

  data () {
    return {
      selected: false,
    }
  },

  computed: {
    ...mapGetters({
      selectedOutlet: 'outlets/selected',
    })
  },

  methods: {

    async filterProducts () {
      this.$store.commit('products/page', 1)
      this.$store.commit('filter/filtering', true)
      try {
        const { data } = await this.$store.dispatch('products/fetch', this.selectedOutlet.id)
        this.$store.commit('products/update', data)
      } catch (error) {
        this.$store.commit('products/error', true)
      }
      this.$store.commit('filter/filtering', false)
    },

    toggleFilterParam (metadata) {
      const {
        filterTitleMeta,
      } = this

      const commitAction = this.selected ?
        'filter/removeFilterParam' :
        'filter/addFilterParam'

      this.$store.commit(commitAction, {
        filterTitleMeta,
        metadata
      })

      this.$store.commit('filter/generateQuery')
      this.filterProducts()
      this.selected = !this.selected
    },
  },
}
</script>
