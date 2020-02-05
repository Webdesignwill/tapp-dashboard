<template>
  <div class="application-wrapper">
    <sidebar />
    <nuxt />
  </div>
</template>

<script>
  import sidebar from '~/components/Sidebar';

  export default {
    components: {
      sidebar,
    },
  }
</script>
