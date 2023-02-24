<template>
  <div ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <h2 class="modal-title">New Invoice</h2>

      <!-- Bill From -->
      <div class="bill-from flex flex-column">
        <h4 class="bill-title">Bill From</h4>
        <div class="input-wrap flex flex-column">
          <label class="label" for="billerStreetAddress">Street Address</label>
          <input
            class="input"
            required
            type="text"
            id="billerStreetAddress"
            v-model="stateForm.billerStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="billerCity">City</label>
            <input
              class="input"
              required
              type="text"
              id="billerCity"
              v-model="stateForm.billerCity"
            />
          </div>
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="billerZipCode">Zip Code</label>
            <input
              class="input"
              required
              type="text"
              id="billerZipCode"
              v-model="stateForm.billerZipCode"
            />
          </div>
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="billerCountry">Country</label>
            <input
              class="input"
              required
              type="text"
              id="billerCountry"
              v-model="stateForm.billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4 class="bill-title">Bill To</h4>
        <div class="input-wrap flex flex-column flex-item">
          <label class="label" for="clientName">Client's Name</label>
          <input
            class="input"
            required
            type="text"
            id="clientName"
            v-model="stateForm.clientName"
          />
        </div>
        <div class="input-wrap flex flex-column flex-item">
          <label class="label" for="clientEmail">Client's Email</label>
          <input
            class="input"
            required
            type="text"
            id="clientEmail"
            v-model="stateForm.clientEmail"
          />
        </div>
        <div class="input-wrap flex flex-column flex-item">
          <label class="label" for="clientStreetAddress">Street Address</label>
          <input
            class="input"
            required
            type="text"
            id="clientStreetAddress"
            v-model="stateForm.clientStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input-wrap flex flex-column">
            <label class="label" for="clientCity">City</label>
            <input
              class="input"
              required
              type="text"
              id="clientCity"
              v-model="stateForm.clientCity"
            />
          </div>
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="clientZipCode">Zip Code</label>
            <input
              class="input"
              required
              type="text"
              id="clientZipCode"
              v-model="stateForm.clientZipCode"
            />
          </div>
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="clientCountry">Country</label>
            <input
              class="input"
              required
              type="text"
              id="clientCountry"
              v-model="stateForm.clientCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input-wrap flex flex-column flex-item">
            <label class="label" for="invoiceDate">Invoice Date</label>
            <input
              class="input"
              disabled
              type="text"
              id="invoiceDate"
              v-model="stateForm.invoiceDate"
            />
          </div>
          <div class="flex flex-column flex-item">
            <label class="label" for="paymentDueDate">Payment Due</label>
            <input
              class="input"
              disabled
              type="text"
              id="paymentDueDate"
              v-model="stateForm.paymentDueDate"
            />
          </div>
        </div>
        <div class="input-wrap flex flex-column">
          <label class="label" for="paymentTerms">Payment Terms</label>
          <select
            class="select"
            required
            type="text"
            id="paymentTerms"
            v-model="stateForm.paymentTerms"
          >
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input-wrap flex flex-column">
          <label class="label" for="productDescription"
            >Product Description</label
          >
          <input
            class="input"
            required
            type="text"
            id="productDescription"
            v-model="stateForm.productDescription"
          />
        </div>
        <div class="work-items">
          <h3 class="item-title">Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr
              class="table-items flex"
              v-for="(item, index) in stateForm.invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <input class="input" type="text" v-model="item.itemName" />
              </td>
              <td class="qty">
                <input class="input" type="text" v-model="item.qty" />
              </td>
              <td class="price">
                <input class="input" type="text" v-model="item.price" />
              </td>
              <td class="total flex">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <SvgIcon
                class="delete-icon"
                @click="deleteInvoiceItem(item.id)"
                name="icon-delete"
              />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">Add New Item</div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="save-left">
          <button type="button" @click="closeInvoice" class="button btn-cancel">
            Cancel
          </button>
        </div>
        <div class="save-right flex">
          <button type="submit" @click="saveDraft" class="button btn-save">
            Save Draft
          </button>
          <button
            type="submit"
            @click="publishInvoice"
            class="button btn-create"
          >
            Create Invoice
          </button>
          <!--          <button type="sumbit" class="button btn-upd">Update Invoice</button>-->
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import { v4 as uuid4 } from "uuid";
import db from "@/firebase/init";
import { collection, addDoc } from "firebase/firestore";
import { useInvoiceStore } from "@/stores/invoice";
import SvgIcon from "@/components/SvgIcon.vue";

const invoiceStore = useInvoiceStore();

// TODO replace to types.ts
interface Invoice {
  billerStreetAddress: null;
  billerCity: null;
  billerZipCode: null;
  billerCountry: null;
  clientName: null;
  clientEmail: null;
  clientStreetAddress: null;
  clientCity: null;
  clientZipCode: null;
  clientCountry: null;
  invoiceDateUnix: number;
  invoiceDate: null | string;
  paymentTerms: string;
  paymentDueDateUnix: number;
  paymentDueDate: string;
  productDescription: null;
  invoicePending: boolean;
  invoiceDraft: boolean;
  invoiceItemList: LineItem[];
}
//
// TODO replace to types.ts
interface LineItem {
  id: string;
  itemName: string;
  qty: string;
  price: number;
  total: number;
}

const stateForm: Invoice = reactive({
  billerStreetAddress: null,
  billerCity: null,
  billerZipCode: null,
  billerCountry: null,
  clientName: null,
  clientEmail: null,
  clientStreetAddress: null,
  clientCity: null,
  clientZipCode: null,
  clientCountry: null,
  invoiceDateUnix: 0,
  invoiceDate: null,
  paymentTerms: "30",
  paymentDueDateUnix: 0,
  paymentDueDate: "",
  productDescription: null,
  invoicePending: false,
  invoiceDraft: false,
  invoiceItemList: [],
});

// replace to utils for date formatting
stateForm.invoiceDateUnix = Date.now();
stateForm.invoiceDate = new Date(stateForm.invoiceDateUnix).toLocaleDateString(
  "en-us",
  { year: "numeric", month: "short", day: "numeric" }
);

watch(
  () => stateForm.paymentTerms,
  () => {
    const futureDate = new Date();
    stateForm.paymentDueDateUnix = futureDate.setDate(
      futureDate.getDate() + parseInt(stateForm.paymentTerms)
    );
    stateForm.paymentDueDate = new Date(
      stateForm.paymentDueDateUnix
    ).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
  { immediate: true }
);
//

const inVoiceTotal = computed(() => {
  return stateForm.invoiceItemList.reduce((acc, curr) => {
    return (acc += curr.total);
  }, 0);
});

const uploadInvoice = async () => {
  if (!stateForm.invoiceItemList.length) {
    alert("Please ensure you filled out work items!");
    return;
  }

  // TODO: add interface for db API
  await addDoc(collection(db, "invoices"), {
    invoiceId: uuid4(),
    billerStreetAddress: stateForm.billerStreetAddress,
    billerCity: stateForm.billerCity,
    billerZipCode: stateForm.billerZipCode,
    billerCountry: stateForm.billerCountry,
    clientName: stateForm.clientName,
    clientEmail: stateForm.clientEmail,
    clientStreetAddress: stateForm.clientStreetAddress,
    clientCity: stateForm.clientCity,
    clientZipCode: stateForm.clientZipCode,
    clientCountry: stateForm.clientCountry,
    invoiceDate: stateForm.invoiceDate,
    invoiceDateUnix: stateForm.invoiceDateUnix,
    paymentTerms: stateForm.paymentTerms,
    paymentDueDate: stateForm.paymentDueDate,
    paymentDueDateUnix: stateForm.paymentDueDateUnix,
    productDescription: stateForm.productDescription,
    invoiceItemList: stateForm.invoiceItemList,
    invoiceTotal: inVoiceTotal.value,
    invoicePending: stateForm.invoicePending,
    invoiceDraft: stateForm.invoiceDraft,
    invoicePaid: null,
  });

  invoiceStore.toggleModalShown();
};
const submitForm = () => {
  uploadInvoice();
};
const publishInvoice = () => {
  stateForm.invoicePending = true;
};
const saveDraft = () => {
  stateForm.invoiceDraft = true;
};

const closeInvoice = () => {
  invoiceStore.toggleModalShown();
};

const addNewInvoiceItem = () => {
  stateForm.invoiceItemList.push({
    id: uuid4(),
    itemName: "",
    qty: "",
    price: 0,
    total: 0,
  });
};
const deleteInvoiceItem = (id: string) => {
  stateForm.invoiceItemList = stateForm.invoiceItemList.filter(
    (item) => item.id !== id
  );
};
</script>

<style scoped lang="less">
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  color: @white;
  z-index: 1;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media @tablet-widths {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    box-sizing: border-box;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: @blue;
    color: @white;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

.modal-title {
  margin-bottom: 48px;
  color: @white;
}

.item-title {
  margin-bottom: 16px;
  font-size: 18px;
  color: @grey;
}

.bill-title {
  color: @light-blue;
  font-size: 12px;
  margin-bottom: 24px;
}

// Bill To / Bill From
.bill-to,
.bill-from {
  margin-bottom: 48px;

  .location-details {
    gap: 16px;

    .flex-item {
      flex: 1;
    }
  }
}

// Invoice Work
.invoice-work {
  .payment {
    gap: 24px;

    .flex-item {
      flex: 1;
    }
  }
}

.work-items {
  .item-list {
    width: 100%;
    // Item Table Styling
    .table-heading,
    .table-items {
      gap: 16px;
      font-size: 12px;

      .item-name {
        flex-basis: 50%;
      }

      .qty {
        flex-basis: 10%;
      }

      .price {
        flex-basis: 20%;
      }

      .total {
        flex-basis: 20%;
        align-self: center;
      }
    }

    .table-heading {
      margin-bottom: 16px;

      th {
        text-align: left;
      }
    }

    .table-items {
      position: relative;
      margin-bottom: 24px;
    }
  }

  .button {
    color: @white;
    background-color: @dark-grey;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.delete-icon {
  position: absolute;
  top: 15px;
  right: 0;
  width: 12px;
  height: 16px;
}

.btn-upd {
  background-color: @dark-grey;
}

.btn-create {
  background-color: @light-blue;
}

.btn-save,
.btn-cancel {
  background-color: @red;
}

.save {
  margin-top: 60px;

  &-left {
    flex: 1;
  }

  &-right {
    flex: 1;
    justify-content: flex-end;
  }
}

.input-wrap {
  margin-bottom: 24px;
}

.label {
  font-size: 12px;
  margin-bottom: 6px;
}

.input,
.select {
  width: 100%;
  background-color: @dark-blue;
  color: @white;
  border-radius: 4px;
  padding: 12px 4px;
  border: none;
}
</style>
