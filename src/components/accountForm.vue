<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <button
        @click="accountStore.addAccount"
        class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Добавить учетную запись"
      >
        +
      </button>
    </div>

    <div class="flex items-center bg-blue-100 text-blue-800 p-3 rounded-md mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712L12 14.879l-2.121-2.122c-1.172-1.025-1.172-2.687 0-3.712z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
      </svg>
      <span>Рапапапапам папапам пам пам</span>
    </div>

    <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 font-semibold text-gray-600 mb-2 px-3">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div>
    </div>

    <div v-if="accountStore.accounts.length > 0">
      <AccountItem
        v-for="account in accountStore.accounts"
        :key="account.id"
        :account="account"
        @update="accountStore.updateAccount"
        @delete="accountStore.deleteAccount"
      />
    </div>
    <p v-else class="text-gray-500 text-center py-8">Добавьте учетные записи, нажав на кнопку "+".</p>
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

