<template>
  <div class="filter-bar d-flex flex-column pt-5">
    <div v-for="(collection, index) in available" :key="index">
      <filter-bar-list :collection="collection" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBarList from '~/components/filterBar/FilterBarList'

export default {
  components: {
    FilterBarList,
  },

  computed: {
    ...mapGetters({
      available: 'filter/available',
    })
  },
}
</script>
