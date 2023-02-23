<template>
  <div class="header">
    <div class="left">
      <h1 class="title">Invoices</h1>
      <span>There are 4 total invoices</span>
    </div>
    <div class="right">
      <div class="filter" @click="toggleFilterMenu">
        <span class="filter-title">Filter by status</span>
        <ul v-show="isFilterShown" class="filter-menu">
          <li class="filter-item">Draft</li>
          <li class="filter-item">Pending</li>
          <li class="filter-item">Paid</li>
          <li class="filter-item">Clear filter</li>
        </ul>
      </div>
      <button @click="createInvoice" class="btn">New invoice</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isFilterShown = ref(false);
const toggleFilterMenu = () => {
  isFilterShown.value = !isFilterShown.value;
};
const createInvoice = () => {};
</script>

<style scoped lang="less">
//breakpoints
@tablet-widths: ~"(min-width: 900px)";

.header {
  display: flex;
  margin-bottom: 65px;
}

.filter {
  position: relative;
  margin-right: 40px;
  cursor: pointer;

  &-menu {
    position: absolute;
    width: 120px;
    top: 25px;
    background-color: #1e2139;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &-item {
    font-size: 12px;
    padding: 10px 20px;

    &:hover {
      color: #1e2139;
      background-color: #fff;
    }
  }
}

.left,
.right {
  flex: 1;
}

.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 40px;
  background-color: #7c5dfa;
}
</style>
