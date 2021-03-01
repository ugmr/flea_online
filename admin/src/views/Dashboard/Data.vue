<template>
  <div class="data">

  </div>
</template>

<script>
export default {
  name: "Data",
  mounted() {
    this.$store.commit("CHANGE_TITLE", "数据报表");
  }
}
</script>

<style lang="scss" scoped>

</style>