<template>
  <main role="main" class="main-container">

    <div v-if="loading" class="h-100 d-flex align-items-center justify-content-center">
      <div class="text-center">
        <div class="spinner-border text-info mb-3" role="status"></div>
        <h3 class="text-muted mb-0 font-weight-light">Loading Products</h3>
        <p class="mb-0 font-size-xxs">Loading the products for <span class="font-weight-bold text-info">{{ selected.name }}</span></p>
      </div>
    </div>

    <div v-else class="h-100">
      <div v-if="error" class="h-100 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <i class="material-icons text-danger font-size-xl">warning</i>
          <h3 class="text-muted mb-0 font-weight-light">Network Error</h3>
          <p class="mb-0 font-size-xxs">There was a problem receiving data from the server</p>
        </div>
      </div>

      <div v-else class="h-100">
        <div class="d-flex flex-row position-relative">
          <filter-bar v-if="available.length" />
          <div class="flex-1 d-flex flex-column">

            <div class="information">
              <p class="mb-0 font-size-xxs color-white d-flex align-items-center">
                <i class="material-icons color-white mr-2">keyboard</i>
                Press <span class="font-weight-bold mx-1">TAB &amp; SHIFT TAB</span> to navigate rows, <span class="font-weight-bold mx-1">ENTER</span> to select and <span class="font-weight-bold mx-1">ESCAPE</span> to close
              </p>
            </div>

            <div class="pt-5 pl-5 pb-5 bg-color-indigo-sherwin-williams">
              <p class="mb-1 font-size-xxs color-white">Outlet ID: <span class="font-weight-bold">{{ selected.id }}</span></p>
              <h3 class="mb-0 color-white">{{ selected.name }}</h3>
            </div>
            <div class="bg-color-indigo-sherwin-williams px-5">
              <search-input :focus="true" size="large" asset="products" placeholder="Search by Brand" />
            </div>

            <div class="d-flex justify-content-between py-3 px-5 bg-color-indigo-sherwin-williams">
              <p class="text-uppercase mb-0 font-size-xxs d-flex flex-row justify-content-between align-items-center">
                <span class="color-white">
                  Page <span class="font-weight-bold">{{ page }}</span> | Showing <span class="font-weight-bold">{{ limit }}</span> products out of <span class="font-weight-bold">{{ count }}</span>
                </span>
              </p>
              <div class="d-flex flex-row align-items-center color-white">
                <p class="mr-1 text-uppercase mb-0 font-size-xxs">Show</p>
                <button v-on:click="selectAmountHandler(amount)" tabindex="-1" :key="index" :disabled="limit == amount" v-for="(amount, index) in resultAmounts" class="ml-1 btn btn-outline-light btn-sm">{{ amount }}</button>
              </div>
            </div>

            <products-table />

            <div v-if="!results.length" class="pl-5 pt-3 position-relative">
              <p>There are no products listed for the outlet <span class="font-weight-bold text-info">{{ selected.name }}</span></p>
            </div>

            <div v-if="!filtering && results.length" class="pagination w-100 d-flex align-items-center justify-content-center">
              <small v-if="!lowerLimitReached" v-on:click="decreasePagination()" class="d-flex flex-row align-items-center mr-2 pagination__btn-next-prev mb-0">
                <i class="material-icons mr-1">keyboard_arrow_left</i> pages {{ paginationFrom - paginationListLimit }} to {{ paginationTo - paginationListLimit }}
              </small>
              <button
                :disabled="isDisabled(pageNumber)"
                :key="pageNumber"
                v-on:click="selectPaginationHandler(pageNumber)"
                v-for="pageNumber in paginationList"
                class="mr-1 btn pagination__btn btn-outline-dark btn-sm">
                  {{ pageNumber }}
                </button>
                <small v-if="!higherLimitReached" v-on:click="increasePagination()" class="d-flex flex-row align-items-center ml-2 pagination__btn-next-prev mb-0">
                  pages {{ paginationFrom + paginationListLimit }} to {{ paginationTo + paginationListLimit }} <i class="material-icons ml-1">keyboard_arrow_right</i>
                </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FilterBar from '~/components/filterBar/FilterBar'
import ProductsTable from '~/components/productsTable/ProductsTable'
import SearchInput from '~/components/SearchInput'

export default {

  components: {
    FilterBar,
    SearchInput,
    ProductsTable,
  },

  data() {
    return {
      lowerLimitReached: true,
      higherLimitReached: false,
      paginationList: [],
      paginationListLimit: 10,
      paginationFrom: 1,
      paginationTo: 10,
      resultAmounts: ['10', '20', '30', '40', '50']
    }
  },

  async fetch ({ store, params }) {
    store.commit('products/loading', true)
    try {
      const { data } = await store.dispatch('products/fetch', params.outletId)
      store.commit('products/update', data)
      if(data.results.length) {
        store.commit('outlets/selected', data.results[0].venue)
      }
      store.commit('products/error', false)
    } catch (error) {
      store.commit('products/error', true)
    }

    try {
      const { data } = await store.dispatch('filter/fetch', params.outletId)
      store.commit('filter/update', data)
    } catch (error) {
      store.commit('filter/error', true)
    }
    store.commit('products/loading', false)
  },

  mounted() {
    for(let i = 1; i<this.totalPages; i++) {
      this.paginationList.push(i)
      if(i === this.paginationListLimit) return
    }
  },

  computed: {
    ...mapGetters({
      error: 'products/error',
      limit: 'products/limit',
      page: 'products/page',
      totalPages: 'products/totalPages',
      results: 'products/results',
      count: 'products/count',
      loading: 'products/loading',
      selected: 'outlets/selected',
      available: 'filter/available',
      filtering: 'filter/filtering',
    })
  },

  methods: {
    increasePagination() {
      this.paginationList = []
      this.paginationFrom = this.paginationFrom += this.paginationListLimit
      this.paginationTo = this.paginationTo += this.paginationListLimit

      for(let listItem = this.paginationFrom; listItem <= this.paginationTo; listItem ++) {
        this.paginationList.push(listItem)
        this.lowerLimitReached = false
        if(listItem == this.totalPages) {
          return this.higherLimitReached = true
        }
      }
    },

    decreasePagination() {
      this.paginationList = []
      this.higherLimitReached = false
      this.paginationFrom = this.paginationFrom -= this.paginationListLimit
      this.paginationTo = this.paginationTo -= this.paginationListLimit

      if(this.paginationFrom == 1) {
        this.lowerLimitReached = true
      }

      for(let listItem = this.paginationFrom; listItem <= this.paginationTo; listItem ++) {
        this.paginationList.push(listItem)
      }
    },

    filterProducts() {
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
    },

    isDisabled(pageNumber) {
      return this.page == pageNumber ? true : false
    },

    selectAmountHandler(amount) {
      this.$store.commit('products/limit', amount)
      this.filterProducts()
    },

    selectPaginationHandler(page) {
      this.$store.commit('products/page', page)
      this.filterProducts()
      window.scrollTo(0,0)
    }
  }
}
</script>
