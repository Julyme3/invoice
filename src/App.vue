<template>
  <div class="app">
    <template v-if="!isMobile">
      <Navigation />
      <div class="app-content">
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

const isMobile = ref(false);

onMounted(() => {
  // TODO add throttle
  window.addEventListener("resize", checkScreen);
});

const checkScreen = () => {
  const windowWindth = window.innerWidth;
  isMobile.value = windowWindth <= 750 ? true : false;
};
</script>

<style lang="less">
//breakpoints
@tablet-widths: ~"(min-width: 900px)";

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #141625;

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
    color: #fff;
  }
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}

// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
