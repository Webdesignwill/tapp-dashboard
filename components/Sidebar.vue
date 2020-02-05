<template>
  <div class="site-sidebar" v-bind:class="{ 'not-selected': !selected.id }" v-on:mouseenter="mouseEnterHandler" v-on:mouseleave="mouseLeaveHandler">

    <h2 class="text-uppercase site-sidebar__label mb-0">outlets</h2>

    <div class="site-sidebar__mask">
      <div class="pb-4 pt-5">
        <search-input asset="outlets" placeholder="Search Outlets" />
      </div>

      <div v-if="results.length">
        <p class="text-white text-uppercase pb-3 px-3 mb-0 font-size-xxs d-flex flex-row justify-content-between">
          <span>
            Showing <span class="font-weight-bold">{{ size }}</span> outlets out of <span class="font-weight-bold">{{ count }}</span>
          </span>
        </p>

        <ul class="list-unstyled outlet-list mb-0">
          <li class="outlet-card" v-on:click="setSelected(outlet)" v-for="(outlet, index) in results">
            <n-link :to="`/outlet/${outlet.id}`" class="outlet-card__link d-flex flex-row" :tab-index="index">
              <p class="outlet-card__name mb-0">{{ outlet.name }}</p>
            </n-link>
          </li>
        </ul>

        <div class="site-sidebar__tools d-flex p-3">
          <a href="#" v-on:click.prevent="prev" class="mr-auto site-sidebar__next-prev" v-if="isNotFirstPage()">< Previous</a>
          <a href="#" v-on:click.prevent="next" class="ml-auto site-sidebar__next-prev">Next ></a>
        </div>
      </div>
      <div class="text-center" v-else>
        <p class="mb-0 px-3 pt-3 text-white">
          There are no results to display for <span class="font-weight-bold">{{ search }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchInput from '~/components/SearchInput'

export default {

  created() {
    this.$store.dispatch('outlets/fetch')
      .then((response) => {
        this.$store.commit('outlets/update', response.data)
      })
      .catch((error) => {
        store.commit('outlets/error', true)
        throw error
      })
  },

  components: {
    SearchInput,
  },

  computed: {
    ...mapGetters({
      results: 'outlets/results',
      count: 'outlets/count',
      size: 'outlets/size',
      page: 'outlets/page',
      selected: 'outlets/selected',
      search: 'outlets/search',
      total_pages: 'outlets/total_pages',
    })
  },

  methods: {

    setSelected(outlet) {
      this.$store.commit('outlets/selected', outlet)
      this.$store.commit('filter/reset')
      this.$store.commit('products/reset')
    },

    isNotFirstPage() {
      return this.page !== 1
    },

    async fetchOutlets() {
      const { data } = await this.$store.dispatch('outlets/fetch')
      this.$store.commit('outlets/update', data)
    },

    mouseEnterHandler() {
      if(!this.selected.id) return
      document.querySelector('body').classList.add('active-sidebar')
    },

    mouseLeaveHandler() {
      if(!this.selected.id) return
      document.querySelector('body').classList.remove('active-sidebar')
    },

    next() {
      this.$store.commit('outlets/next')
      this.fetchOutlets()
    },

    prev() {
      this.$store.commit('outlets/prev')
      this.fetchOutlets()
    },
  }
}
</script>
