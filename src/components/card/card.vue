<template>
  <div class="--card">
    <slot name="header"></slot>
    <div class="card-body">
      <slot/>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.--card {
  background-color: var(--el-color-white);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  box-sizing: border-box;
  margin: 24px 0 8px;
  .card-body{
    padding: 24px 0 12px;
    flex: 1 1 auto;
  }
}
</style>
