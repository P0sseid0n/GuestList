<script setup lang="ts">

import { useGuest } from '../store'
import { ref } from 'vue'

const guestStore = useGuest()

const searchValue = ref('')

function clearSearch(e: MouseEvent) {
   const style = getComputedStyle(e.target as HTMLImageElement)
   if (style.opacity == '0') return

   guestStore.searchName('')
   searchValue.value = ''
}

</script>

<template>
   <div class="guest-search">
      <input
         type="text"
         placeholder="Digite o nome do convidado..."
         @input="guestStore.searchName(searchValue)"
         v-model="searchValue"
      />

      <img
         src="@/assets/images/Clear.svg"
         alt="Limpar busca"
         class="guest-search__clear"
         @click="clearSearch"
      />

      <img src="@/assets/images/Search.svg" alt="Ícone de busca" class="guest-search__search-icon" />
   </div>
</template>

<style scoped lang="scss">
.guest-search {
   width: 100%;
   background-color: #fff;
   border-radius: 8px;
   border: 1px solid $border-color;
   display: flex;
   flex-direction: row-reverse;

   max-width: 768px;
   margin: 0 auto;
   margin-bottom: 64px;

   position: relative;
   top: 32px;

   input {
      height: 100%;
      width: 100%;
      padding: 16px 0;
      background: transparent;
      border: 0;
      outline: none;

      font-size: 18px;

      &::placeholder {
         color: rgba($text-color, 0.4);
      }

      &:focus {
         & ~ .guest-search__search-icon {
            opacity: 0.8;
         }

         & ~ .guest-search__clear {
            opacity: 0.4;

            &:hover {
               opacity: 0.8 !important;
               cursor: pointer;
            }
         }
      }
   }

   img {
      transition: opacity 0.25s;
      width: 32px;
   }

   .guest-search__clear {
      opacity: 0;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
   }

   .guest-search__search-icon {
      margin: 0 12px;
      opacity: 0.4;
   }
}
</style>