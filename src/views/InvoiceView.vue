<template>
  <div v-if="currentInvoice" class="invoice-view">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      Go Back
    </router-link>
    <!-- Header -->
    <div class="invoice-view-header flex">
      <div class="left flex">
        <span class="invoice-view-status">Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice" class="button invoice-view-edit">
          Edit
        </button>
        <button
          @click="deleteInvoice(currentInvoice.docId)"
          class="button invoice-view-delete"
        >
          Delete
        </button>
        <button
          @click="updateStatusToPaid(currentInvoice.docId)"
          v-if="currentInvoice.invoicePending"
          class="button invoice-view-paid"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="button invoice-view-pend"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-view-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column top-inner">
          <p class="invoice-view-trim">
            <span>#</span>{{ currentInvoice.docId }}
          </p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column top-inner">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4 class="invoice-view-h4">Invoice Date</h4>
          <p>
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="invoice-view-h4">Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p class="heading-title">Item Name</p>
            <p class="heading-item">QTY</p>
            <p class="heading-item">Price</p>
            <p class="heading-item">Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useInvoiceStore } from "@/stores/invoice";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const invoiceStore = useInvoiceStore();

const currentInvoice = computed(() => {
  return invoiceStore.getInvoiceById(route.params.id as string);
});

const toggleEditInvoice = () => {
  invoiceStore.toggleModalShown();
  invoiceStore.setEditingInvoice();
};

const deleteInvoice = async (docId: string) => {
  await invoiceStore.deleteInvoice(docId);
  await invoiceStore.fetchInvoices();
  router.push({ name: "Home" });
};

const updateStatusToPaid = (docId: string) => {
  invoiceStore.updateStatusToPaid(docId);
};
const updateStatusToPending = (docId: string) => {
  invoiceStore.updateStatusToPending(docId);
};
</script>

<style scoped lang="less">
.invoice-view {
  padding: 40px 10px;

  @media @tablet-widths {
    padding-top: 72px;
  }
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: @white;
    font-size: 12px;
  }
  &-header,
  &-details {
    background-color: @dark-blue;
    border-radius: 20px;
  }
  &-status {
    color: @white;
    margin-right: 4px;
  }
  &-trim {
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    .left {
      align-items: center;
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      .button {
        color: @white;
      }
    }
  }

  &-details {
    padding: 48px;
    margin-top: 24px;
    color: @white;
    .top {
      font-size: 16px;
      &-inner {
        flex: 1;
      }
      .right {
        align-items: flex-end;
      }
    }
    .middle {
      margin-top: 50px;
      gap: 16px;

      &-h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      .bill,
      .payment {
        flex: 1;
      }
      .bill {
        font-size: 16px;
      }
      .send-to {
        flex: 2;
      }
    }
    .bottom {
      margin-top: 50px;
      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: @grey;

        .heading {
          font-size: 12px;
          margin-bottom: 32px;
          &-title {
            flex: 3;
            text-align: left;
          }
          &-item {
            flex: 1;
            text-align: right;
          }
        }
        .item {
          margin-bottom: 32px;
          font-size: 13px;
          &:last-child {
            margin-bottom: 0;
          }
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }
      .total {
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;
        p {
          flex: 1;
          font-size: 12px;
        }
        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }

  &-pend {
    background-color: @dark-grey;
  }
  &-delete {
    background-color: @red;
  }
  &-paid {
    background-color: @light-blue;
  }
  &-edit {
    background-color: @grey;
  }
}
</style>
