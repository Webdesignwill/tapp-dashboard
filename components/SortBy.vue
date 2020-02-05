<template>
  <div class="d-flex align-items-center sort-by" v-on:click="toggleSorting()">
    {{ this.sortBy }}
      <i class="material-icons" v-if="!order.length">arrow_drop_down</i>
      <i class="material-icons" v-if="order === 'desc'">arrow_drop_up</i>
      <i class="material-icons sort-by__remove ml-1" v-if="order === 'asc'">remove</i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  props: ['sortBy'],

  computed: {
    ...mapGetters({
      sort: 'products/sort',
      order: 'products/order',
    })
  },

  methods: {
    toggleSorting() {
      if(!this.order.length) {
        this.$store.commit('products/sort', this.sortBy)
        this.$store.commit('products/order', 'desc')
      } else if(this.order === 'desc') {
        this.$store.commit('products/sort', this.sortBy)
        this.$store.commit('products/order', 'asc')
      } else {
        this.$store.commit('products/sort', '')
        this.$store.commit('products/order', '')
      }

      this.$store.commit('filter/filtering', true)
      this.$store.dispatch('products/fetch')
        .then((response) => {
          this.$store.commit('products/update', response.data)
          this.$store.commit('filter/filtering', false)
          this.$store.commit('products/error', false)
        })
        .catch((error) => {
          this.$store.commit('filter/filtering', false)
          this.$store.commit('products/error', true)
          throw error
        })
    }
  }
}
</script>
