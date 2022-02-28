<script setup lang="ts">
import { useGuest } from '../store'

const guestStore = useGuest()
</script>

<template>
   <button class="add-guest" @click="guestStore.addGuest()">
      <img src="@/assets/images/Add.svg" alt="DoneIcon" />
      Adicionar convidado
   </button>
</template>

<style scoped lang="scss">
.add-guest {
   background: $primary-color;
   color: #fff;
   font-size: 15px;
   padding: 6px 12px;
   border-radius: 5px;
   cursor: pointer;

   border: 0;
   text-decoration: none;

   display: inline-flex;
   align-items: center;
}
</style>