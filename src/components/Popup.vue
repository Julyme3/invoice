<template>
  <div class="popup flex">
    <div class="popup-content">
      <p class="popup-text">
        Are you sure you want to exit? Your changes will not be saved!
      </p>
      <div class="actions flex">
        <button @click="closePopup" class="button btn-return">Return</button>
        <button @click="closeInvoice" class="button btn-close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from "@/stores/invoice";

const invoiceStore = useInvoiceStore();

const closePopup = () => {
  invoiceStore.togglePopupShown();
};

const closeInvoice = () => {
  invoiceStore.togglePopupShown();
  invoiceStore.toggleModalShown();
};
</script>

<style scoped lang="less">
.popup {
  z-index: 10;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  &-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: @dark-grey;
    color: @white;
  }

  &-text {
    text-align: center;
  }
}
.actions {
  justify-content: center;
  margin-top: 24px;
}
.btn {
  flex: 1;

  &-return {
    background-color: @light-blue;
  }
  &-close {
    background-color: @red;
  }
}
</style>
