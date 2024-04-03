<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpense from './components/IncomeExpense.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

const transactions = ref([])

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

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpense />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>