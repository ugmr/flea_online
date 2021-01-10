<template>
  <div class="login">
    <canvas ref="cvsRef"></canvas>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    const cvs = this.$refs.cvsRef;
    console.log(cvs);
  }
};
</script>
