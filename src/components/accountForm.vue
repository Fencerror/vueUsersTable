<template>
  <div class="container mx-auto p-4 lg:p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Учетные записи</h1>
<button
  @click="accountStore.addAccount"
  class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-normal leading-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110"
  aria-label="Добавить учетную запись"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
</svg>
</button>

    </div>

    <div class="flex items-center bg-blue-50 text-blue-800 p-4 rounded-lg mb-8 border border-blue-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель `;`</span>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 font-semibold text-gray-600 p-4 bg-gray-50 border-b border-gray-200 text-sm">
        <div>МЕТКИ</div>
        <div>ТИП ЗАПИСИ</div>
        <div>ЛОГИН</div>
        <div>ПАРОЛЬ</div>
        <div></div>
      </div>

      <div v-if="accountStore.accounts.length > 0" class="divide-y divide-gray-200">
        <AccountItem
          v-for="account in accountStore.accounts"
          :key="account.id"
          :account="account"
          @update="accountStore.updateAccount"
          @delete="accountStore.deleteAccount"
        />
      </div>
      <p v-else class="text-gray-500 text-center py-12">Добавьте учетные записи, нажав на кнопку "+".</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccountStore } from '../stores/account.store';
import AccountItem from './AccountItem.vue';

const accountStore = useAccountStore();

onMounted(() => {
  accountStore.loadAccounts();
});
</script>