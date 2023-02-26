<template>
  <main class="home">
    <Header />
    <template v-if="invoices.length">
      <Invoice v-for="(invoice, i) in invoices" :key="i" :invoice="invoice" />
    </template>
    <div v-else class="home-empty flex flex-column">
      <img class="home-img" src="../assets/illustration-empty.svg" alt="" />
      <h3 class="home-title">There is nothing here</h3>
      <p class="home-text">
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Invoice from "@/components/Invoice.vue";

import { useInvoiceStore } from "@/stores/invoice";
const invoiceStore = useInvoiceStore();
const invoices = invoiceStore.invoicesData;
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

  &-empty {
    margin-top: 160px;
    align-items: center;
  }

  &-img {
    width: 214px;
    height: 200px;
  }
  &-title {
    font-size: 20px;
    margin-top: 40px;
  }
  &-text {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}
</style>
