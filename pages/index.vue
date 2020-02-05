<template>
  <main role="main" class="main-container d-flex align-items-center justify-content-center">

    <div v-if="error" class="h-100 d-flex align-items-center justify-content-center">
      <div class="text-center">
        <i class="material-icons text-danger font-size-xl">warning</i>
        <h3 class="text-muted mb-0 font-weight-light">Network Error</h3>
        <p class="mb-0 font-size-xxs">There was a problem receiving outlets from the server</p>
      </div>
    </div>

    <div v-else class="text-center">
      <i class="material-icons text-info font-size-xl">error_outline</i>
      <h3 class="text-muted mb-0 font-weight-light">Please select an outlet</h3>
      <p class="mb-0 font-size-xxs">Press tab then enter to select one</p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      error: 'outlets/error',
    })
  },
}
</script>
