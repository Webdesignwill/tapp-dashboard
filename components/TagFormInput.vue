<template>
  <div class="form-group w-80" v-bind:class="{'error': error}">
    <label class="text-uppercase font-size-xxs d-flex align-items-center justify-content-between">
      <span>{{ title }} <small v-if="hasDependency()" class="ml-2 text-danger">This field is dependent on {{ dependency }}</small></span>
      <small v-if="timestamp">updated <strong>{{ timestamp }}</strong></small>
    </label>
    <div class="position-relative d-flex align-items-center position-relative">
      <ul v-if="autocomplete && isOpen" class="autocomplete list-unstyled">
        <li
          v-for="(result, index) in results"
          :key="index"
          v-on:mousedown="setResult(result)"
          class="autocomplete__item py-2 pl-3 font-size-xxs"
          :class="{ 'is-active': index === arrowCounter }"
        >
          {{ result }}
        </li>
      </ul>

      <input
        v-on:input="onChange"
        v-model="inputValue"
        v-on:blur="onBlur"
        v-on:keydown.down="onArrowDown"
        v-on:keydown.up="onArrowUp"
        v-on:keydown.enter="onEnter"
        :disabled="this.patching || hasDependency()"
        class="font-size-xxs"
        v-bind:class="{ disabled: this.patching, saved: this.saved }"
        type="text"
        placeholder="Not Set"
      />
      <span class="spinner-border spinner-border-sm updating-icon text-info" v-if="patching" role="status" aria-hidden="true"></span>
      <i role="status" aria-hidden="true" class="material-icons text-danger disabled-icon" v-if="hasDependency()">block</i>
    </div>
    <small v-if="error" class="text-danger">{{ this.errorMessage }}</small>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Vue from 'vue'
import debounce from 'debounce'

export default {

  props: ['title', 'value', 'prop', 'dependency', 'autocomplete'],

  data() {
    return {
      saved: false,
      inputValue: this.value,
      patching: false,
      error: false,
      errorMessage: '',
      timestamp: null,
      results: [],
      isOpen: false,
      arrowCounter: 0,
    }
  },

  mounted() {
    const unixTime = this.selectedProduct.tags[`${this.prop}_last_updated_at`]
    if(unixTime) {
      this.timestamp = moment.unix(unixTime).calendar()
    }
  },

  computed: {
    ...mapGetters({
      selectedProduct: 'product/selected',
    })
  },

  methods: {
    onChange() {

      if(!this.autocomplete) return

      if(!this.inputValue.length) {
        this.results = []
        this.isOpen = false
        return
      }

      this.isOpen = true

      this.$store.dispatch('tags/search', {
        value: this.inputValue,
        level: this.prop,
      })
        .then((response) => {
          this.results = [...new Set(response.data.results)]
        })
    },

    onBlur() {
      this.isOpen = false
    },

    setResult(result) {
      this.inputValue = result
      this.makeRequest()
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter -1
      }
    },

    onEnter() {
      if(this.results[this.arrowCounter]) {
        this.inputValue = this.results[this.arrowCounter]
      }

      this.arrowCounter = -1
      this.makeRequest()
    },

    hasDependency() {
      if(this.dependency) {
        return this.selectedProduct.tags[this.dependency] === undefined ? true : false
      }
    },

    makeRequest() {
      this.isOpen = false
      this.patching = true
      this.$store.dispatch('product/patch', {
        prop: this.prop,
        productId: this.selectedProduct.id,
        value: this.inputValue,
      })
        .then((res) => {
          this.patching = false
          this.error = false
          this.saved = true
          this.timestamp = moment.unix(res.data.last_updated_at).calendar()

          this.$store.commit('product/patch', {
            prop: res.data.name,
            value: res.data.value,
          })
        })
        .catch((error) => {
          this.patching = false
          this.error = true
          this.errorMessage = error.response.data.message
          this.inputValue = this.value
        })
    }
  }
}
</script>
