<template>
  <component class="svg-container" :is="icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: String,
});

const icon = defineAsyncComponent(() => import(`@/assets/${props.name}.svg`));
</script>

<style scoped lang="less">
.svg-container {
  display: inline-flex;
  cursor: pointer;
}
</style>
