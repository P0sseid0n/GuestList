<script setup lang="ts">
import { useGuest } from '@/store'

const guestStore = useGuest()

useMeta({
   title: 'Lista de convidados',
})
</script>


<template>
   <div id="app">
      <div class="container">
         <SearchInput />
         <div id="button-right">
            <ActionButton type="primary" action="/add-guest">
               <img src="@/assets/images/Add.svg" alt="DoneIcon" />
               Adicionar convidado
            </ActionButton>
         </div>
         <!-- <button @click="guestStore.removeGuest">Remover</button> -->
         <GuestList />
      </div>
      <!-- <NuxtWelcome /> -->
   </div>
</template>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap");

#button-right {
   width: 100%;
   margin-bottom: 16px;
   display: flex;
   justify-content: flex-end;
}
</style>