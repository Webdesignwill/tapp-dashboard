<template>
  <div :class="`search-container d-flex align-items-center ${size}`">
    <input ref="search-input" type="text" class="form-control" :placeholder="placeholder" v-on:input="onChange" v-model="inputString" />
    <span class="spinner-border spinner-border-sm search-icon color-indigo-sherwin-williams" v-if="searching" role="status" aria-hidden="true"></span>
    <i class="material-icons search-icon color-indigo-sherwin-williams" v-else>search</i>
  </div>
</template>

<script>
import debounce from 'debounce'

export default {

  props: ['asset', 'placeholder', 'size', 'focus'],

  data() {
    return {
      inputString: '',
      searching: false,
    }
  },

  mounted() {
    if(this.focus) {
      this.$refs['search-input'].focus()
    }
  },

  methods: {
    onChange: debounce(function() {
      this.$store.commit(`${this.asset}/search`, this.inputString)
      this.searching = true
      this.$store.dispatch(`${this.asset}/fetch`)
        .then((response) => {
          this.$store.commit(`${this.asset}/update`, response.data)
          this.searching = false
        })
    }, 300),
  },
}
</script>
