<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification';

import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

const transactions = ref([])
const toast = useToast();

onMounted(async () => {
  try {
    const { data } = await axios.get('https://26434691557145f7.mokky.dev/transactions')
    transactions.value = data
  } catch (error) {
    console.error(error)
  }
})

// Get Total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)
})
// Get Income
const income = computed(() => {
  return transactions.value.
    filter(transaction => transaction.amount > 0).
    reduce((acc, transaction) => acc + transaction.amount, 0)
})
// Get Expense
const expenses = computed(() => {
  return transactions.value.
    filter(transaction => transaction.amount < 0).
    reduce((acc, transaction) => acc + transaction.amount, 0)
})

const onTransactionSubmited = async (transactionData) => {
  try {
    const { data } = await axios.post('https://26434691557145f7.mokky.dev/transactions', transactionData)
    transactions.value = [...transactions.value, data]
    toast.success('Transaction added successfully')
  } catch (error) {
    console.log(error)
  }
}

const deleteTransaction = async (id) => {
  try {
    await axios.delete(`https://26434691557145f7.mokky.dev/transactions/${id}`)
    transactions.value = transactions.value.filter(transaction => transaction.id !== id)
    toast.success('Transaction deleted successfully')
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpense :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transaction-delete="deleteTransaction" />
    <AddTransaction @transaction-submited="onTransactionSubmited" />
  </div>
</template>