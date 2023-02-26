<template>
  <main class="home">
    <Header />
    <Invoice v-for="(invoice, i) in invoices" :key="i" :invoice="invoice" />
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
}
</style>
