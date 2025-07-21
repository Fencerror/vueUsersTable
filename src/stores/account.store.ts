import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Account, Label, AccountType } from '../types/account';
import { v4 as uuidv4 } from 'uuid';

export const useAccountStore = defineStore('accounts', () => {

  const accounts = ref<Account[]>([]);


  const loadAccounts = () => {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      try { 
        accounts.value = JSON.parse(savedAccounts);
      } catch (e) {
        console.error("Failed to parse accounts:", e);
        accounts.value = []; 
      }
    }
  };


  const saveAccounts = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value));
  };

  const addAccount = () => {
    const newAccount: Account = {
      id: uuidv4(), 
      labels: [],
      type: 'Локальная', 
      login: '',
      password: '',
    };
    accounts.value.push(newAccount);
    saveAccounts();
  };

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id);
    saveAccounts();
  };

  const updateAccount = (updatedAccount: Account) => {
    const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id);
    if (index !== -1) {
      accounts.value[index] = updatedAccount;
      saveAccounts();
    }
  };

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccount,
    loadAccounts,
  };
});