<template>
  <table
    v-if="results.length"
    class="mb-4 table product-tabs-table position-relative"
  >
    <products-table-head />

    <div v-if="filtering" class="pt-5 mt-5 text-center position-absolute table__filter-label">
      <div class="spinner-border text-info mb-3" role="status"></div>
      <h3 class="text-muted mb-0 font-weight-light">Applying Filters</h3>
    </div>

    <tbody v-else>
      <products-table-row
        v-for="(product, index) in results"
        :product="product"
        :key="index"
      />
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsTableRow from '~/components/productsTable/ProductsTableRow'
import ProductsTableHead from '~/components/productsTable/ProductsTableHead'

export default {

  components: {
    ProductsTableRow,
    ProductsTableHead,
  },

  computed: {
    ...mapGetters({
      filtering: 'filter/filtering',
      results: 'products/results',
    })
  },
}
</script>
