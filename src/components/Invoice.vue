<template>
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { id: invoice.docId } }"
  >
    <div class="invoice-left flex">
      <span class="invoice-text tracking-number">#{{ invoice.docId }}</span>
      <span class="invoice-text due-date">{{ invoice.paymentDueDate }}</span>
      <span class="invoice-text person">{{ invoice.clientName }}</span>
    </div>
    <div class="invoice-right flex">
      <span class="invoice-price">${{ invoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { IInvoice } from "@/types/invoice";

interface Props {
  invoice: IInvoice;
}

defineProps<Props>();
</script>

<style scoped lang="less">
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: @white;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: @dark-blue;
  align-items: center;

  &-text {
    font-size: 13px;
  }

  &-left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    .invoice-text {
      flex: 1;
    }
  }

  &-right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
  }

  &-price {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
  }
}

.tracking-number {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
}
</style>
