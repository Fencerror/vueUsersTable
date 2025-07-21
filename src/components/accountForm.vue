<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <button
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
      <span>рапапапапам папапам пам пам</span>
    </div>

    <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 font-semibold text-gray-600 mb-2 px-3">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div> </div>

    <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 items-center py-2 border-b border-gray-200">
      <BaseInput placeholder="Пример метки" />
      <BaseSelect :options="[{label: 'Локальная', value: 'Локальная'}, {label: 'LDAP', value: 'LDAP'}]" modelValue="Локальная" />
      <BaseInput placeholder="Пример логина" />
      <BaseInput type="password" placeholder="Пример пароля" />
      <button class="text-gray-400 hover:text-red-500 justify-self-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.176H8.927a2.25 2.25 0 01-2.244-2.176L4.24 6.456m18.04-3.212l-3.21-.803A.75.75 0 0018.75 3H5.25a.75.75 0 00-.745.501l-3.21.803m20.5 0a48.711 48.711 0 00-6.21 0m-2.22 0a48.711 48.711 0 00-6.21 0" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './baseInput.vue';
import BaseSelect from './baseSelect.vue';
</script>

<style scoped>

</style>