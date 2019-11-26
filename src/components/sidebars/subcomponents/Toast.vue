<template>
  <div id="toast">
    <div class="t-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#toast {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 2rem;
  width: 100%;
  height: auto;
  z-index: 1000;
}

.t-body {
  position: relative;
  padding: 0.6rem 1rem;
  border-radius: 1.5rem;
  color: white;
  background-color: $primary-color;
  box-shadow: 0 0.1rem 0.5rem -0.05rem rgba(216, 13, 13, 0.6);
}
</style>