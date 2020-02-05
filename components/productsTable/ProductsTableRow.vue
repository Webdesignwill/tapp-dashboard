<template>
  <tr v-bind:class="{ 'selected': isSelected(), 'loading': loading }" class="product-tags-table__row">
    <td colspan="7" class="p-0">
      <span class="spinner-border spinner-border-sm loading-icon text-info" v-if="loading" role="status" aria-hidden="true"></span>
      <a href="#" v-on:keydown.enter="openRow">
        <table class="w-100 nested">
          <tbody>
            <tr
              class="nested__row"
              v-on:click="openRow"
            >
              <td class="font-size-xxs pl-5">
                <span v-if="product.tags.brand">{{ product.tags.brand }}</span>
                <strong v-else class="not-set-warning">
                  Brand not set
                </strong>
              </td>
              <td class="font-size-xxs">
                <span v-if="product.description">{{ product.description }}</span>
                <strong v-else class="not-set-warning">
                  Description not set
                </strong>
              </td>
              <td class="font-size-xxs">
                <span v-if="product.tags.group">{{ product.tags.group }}</span>
                <strong v-else class="not-set-warning">
                  Group not set
                </strong>
              </td>
              <td class="font-size-xxs">
                <span v-if="product.tags.volume">{{ product.tags.volume }}</span>
                <strong v-else class="not-set-warning">
                  Volume not set
                </strong>
              </td>
              <td class="font-size-xxs">
                <span v-if="product.tags.category">{{ product.tags.category }}</span>
                <strong v-else class="not-set-warning">
                  Category not set
                </strong>
              </td>
              <td class="font-size-xxs">
                <span v-if="product.tags.subcategory">{{ product.tags.subcategory }}</span>
                <strong v-else class="not-set-warning">
                  Sub Category not set
                </strong>
              </td>
              <td class="font-size-xxs pr-5">
                <span v-if="product.tags.type">{{ product.tags.type }}</span>
                <strong v-else class="not-set-warning">
                  Type not set
                </strong>
              </td>
            </tr>
            <tr v-if="isSelected()">
              <td class="p-0 nested__form" colspan="7">
                <product-tags-form v-on:closeTableRow="closeRow" :productId="product.id" />
              </td>
            </tr>
          </tbody>
        </table>
      </a>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductTagsForm from '~/components/ProductTagsForm'

export default {
  props: ['product'],

  components: {
    ProductTagsForm,
  },

  computed: {
    ...mapGetters({
      selectedProduct: 'product/selected',
    })
  },

  data() {
    return {
      opened: false,
      loading: false,
    }
  },

  methods: {
    isSelected() {
      return this.selectedProduct.id === this.product.id
    },

    closeRow() {
      this.opened = false
      this.$store.commit('product/clear')
    },

    openRow(event) {
      event.preventDefault()

      if(this.loading) return

      this.opened = true
      this.loading = true

      this.$store.dispatch('product/fetch', this.product.id)
        .then((response) => {
          this.$store.commit('product/selected', response.data)
          this.loading = false
        })
        .catch((error) => {
          this.$store.commit('product/error', true)
          this.loading = false
          throw error
        })
    },
  },
}
</script>
