<template>
  <div class="--card-header">
    <div class="card-back">
      <slot/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.--card-header{
  margin-top: -24px;
  margin-left: 16px;
  margin-right: 16px;
  z-index: 2;
  position: relative;
  .card-back{
    border-radius: 8px;
    background-image: linear-gradient(15deg, var(--el-color-primary-light-2), var(--el-color-primary-light-4));
    padding: 24px 16px 16px ;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px var(--el-color-primary-light-4);
  }
}
</style>
