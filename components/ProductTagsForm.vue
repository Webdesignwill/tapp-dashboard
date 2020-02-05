<template>
  <div>
    <div class="pl-5 mb-4 pt-3 pb-3 pr-5 d-flex justify-content-between product-tags-meta align-items-center">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column mr-5 pr-5">
          <p class="mb-0 font-size-xxs text-uppercase">product id</p>
          <p class="mb-0 font-size-xxs">
            <span class="font-weight-bold">{{ product.id }}</span>
          </p>
        </div>

        <div class="d-flex flex-column mr-5 pr-5">
          <p class="mb-0 font-size-xxs text-uppercase">unit price</p>
          <p class="mb-0 font-size-xxs">
            <span class="font-weight-bold">{{ product.unit_price }}</span>
          </p>
        </div>

        <div class="d-flex flex-column">
          <p class="mb-0 font-size-xxs text-uppercase">tagging status</p>
          <p class="mb-0 font-size-xxs">
            <span class="font-weight-bold">{{ product.tagging_status }}</span>
          </p>
        </div>
      </div>

      <button tabindex="-1" v-on:click="closeTableRow" type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <form class="d-flex flex-row pl-5 pb-4">
      <div class="d-flex flex-column w-40">
        <tag-form-input prop="group" title="group" autocomplete="true" :value="product.tags.group" />
        <tag-form-input prop="category" title="category" autocomplete="true" :value="product.tags.category" />
        <tag-form-input prop="subcategory" title="sub category" autocomplete="true" :value="product.tags.subcategory" />
        <tag-form-input prop="container" title="container" :value="product.tags.container" />
        <tag-form-input prop="volume" title="volume" :value="product.tags.volume" />
      </div>

      <div class="d-flex flex-column w-40">
        <tag-form-input prop="brand" title="brand" autocomplete="true" :value="product.tags.brand" />
        <tag-form-input prop="sku" title="sku" autocomplete="true" :value="product.tags.sku" dependency="brand"/>
        <tag-form-input prop="type" title="type" autocomplete="true" :value="product.tags.type" />
        <tag-form-input prop="serving_type" title="serving type" :value="product.tags.serving_type" />
        <tag-form-input prop="alcohol_percentage" title="alcohol percentage" :value="product.tags.alcohol_percentage" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagFormInput from '~/components/TagFormInput'

export default {

  props: ['productId'],

  components: {
    TagFormInput,
  },

  computed: {
    ...mapGetters({
      product: 'product/selected',
    })
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyPress)
  },

  destroyed() {
    window.removeEventListener('keydown', this.handleKeyPress)
  },

  methods: {

    handleKeyPress(event) {
      if(event.code === 'Escape') {
        event.preventDefault()
        this.$emit('closeTableRow')
      }
    },

    closeTableRow: function(event) {
      this.$emit('closeTableRow')
    }
  }
}
</script>
