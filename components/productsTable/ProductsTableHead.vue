<template>
  <thead class="table-head">
    <tr>
      <th class="text-uppercase pl-5">
        brand
      </th>
      <th class="text-uppercase">
        <sort-by sortBy="description" />
      </th>
      <th class="text-uppercase">
        group
      </th>
      <th class="text-uppercase">
        volume
      </th>
      <th class="text-uppercase">
        category
      </th>
      <th class="text-uppercase">
        sub category
      </th>
      <th class="text-uppercase pr-5">
        type
      </th>
    </tr>
  </thead>
</template>

<script>
import SortBy from '~/components/SortBy'

export default {
  components: {
    SortBy,
  }
}
</script>
