<template>
  <header class="header">
    <div class="logo">
      <img
        class="logo-img"
        src="@/assets/file-invoice-dollar-solid.png"
        alt="Logo Invoice"
      />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
//breakpoints
@tablet-widths: ~"(min-width: 900px)";

.header {
  display: flex;
  flex-direction: row;
  background-color: #1e2139;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    padding: 24px;

    .logo-img {
      width: auto;
      height: 30px;
    }
  }
}
</style>
