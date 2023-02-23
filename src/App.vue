<template>
  <div class="app">
    <template v-if="!isMobile">
      <Navigation />
      <div class="app-content">
        <InvoiceModal />
        <RouterView />
      </div>
    </template>
    <div v-else class="app-mobile-msg">
      <h2>Sorry, this app is not supported on Mobile Devices</h2>
      <p>To use this app, please use a computer or Tablet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import Navigation from "@/components/Navigation.vue";
import InvoiceModal from "@/components/InvoiceModal.vue";
import { mobileWidth } from "@/constants";

const isMobile = ref(false);

onMounted(() => {
  // TODO add throttle
  window.addEventListener("resize", checkScreen);
});

const checkScreen = () => {
  const windowWindth = window.innerWidth;
  isMobile.value = windowWindth <= mobileWidth ? true : false;
};
</script>

<style lang="less">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: @blue;

  @media @tablet-widths {
    flex-direction: row;
  }
  &-content {
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
  &-mobile-msg {
    margin: auto;
    color: @white;
  }
}
</style>
