<template>
  <main class="home">
    <Header />
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<style scoped lang="less">
.home {
  color: @white;
  max-width: 850px;
  margin: 0 auto;
  padding: 40px 10px;

  @media @tablet-widths {
    padding-top: 72px;
  }
}
</style>
