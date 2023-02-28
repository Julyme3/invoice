<template>
  <div class="header">
    <div class="left">
      <h1 class="title">Invoices</h1>
      <span>There are {{ amount }} total invoices</span>
    </div>
    <div class="right">
      <div class="filter" @click="toggleFilterMenu">
        <span class="filter-title">Filter by status</span>
        <ul v-show="isFilterShown" class="filter-menu">
          <li class="filter-item">
            <label class="filter-label">
              <input
                class="filter-input"
                v-model="localFilter"
                type="radio"
                value="invoiceDraft"
              />Draft
            </label>
          </li>
          <li class="filter-item">
            <label class="filter-label">
              <input
                class="filter-input"
                v-model="localFilter"
                type="radio"
                value="invoicePending"
              />Pending
            </label>
          </li>
          <li class="filter-item">
            <label class="filter-label">
              <input
                class="filter-input"
                v-model="localFilter"
                type="radio"
                value="invoicePaid"
              />Paid
            </label>
          </li>
          <li class="filter-item">
            <label class="filter-label">
              <input
                class="filter-input"
                v-model="localFilter"
                type="radio"
                value=""
              />Clear filter
            </label>
          </li>
        </ul>
      </div>
      <button @click="createInvoice" class="button btn">New invoice</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  amount: number;
}>();
const emit = defineEmits(["update:modelValue", "openInvoiceModal"]);

const localFilter = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const isFilterShown = ref(false);
const toggleFilterMenu = () => {
  isFilterShown.value = !isFilterShown.value;
};
const createInvoice = () => {
  emit("openInvoiceModal");
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  margin-bottom: 65px;
}

.filter {
  position: relative;
  margin-right: 40px;
  cursor: pointer;

  &-input {
    display: none;
  }

  &-label {
    display: block;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    padding: 10px 20px;
  }

  &-menu {
    position: absolute;
    width: 120px;
    top: 25px;
    background-color: @dark-blue;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &-item {
    font-size: 12px;

    &:hover {
      color: @dark-blue;
      background-color: @white;
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
  color: @white;
  background-color: @light-blue;
}
</style>
