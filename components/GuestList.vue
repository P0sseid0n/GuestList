<script setup="props" lang="ts">

import { useGuest } from '../store'

const guestStore = useGuest()

</script>

<template>
   <!--  
   <table class="guestList">
      <thead>
         <tr>
            <th>
               <span @click="guestStore.orderBy('name')">
                  Nome
                  <span v-if="guestStore.query.orderBy.name == 'desc'">▲</span>
                  <span v-else>▼</span>
               </span>
            </th>
            <th>
               <span @click="guestStore.orderBy('status')">
                  Status
                  <span v-if="guestStore.query.orderBy.status == 'desc'">▲</span>
                  <span v-else>▼</span>
               </span>
            </th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="guest in guestStore.list">
            <a :href="'/' + guest.id">
               <td>{{ guest.name }}</td>
               <td>{{ guest.status }}</td>
            </a>
         </tr>
      </tbody>
   </table>
   -->

   <section class="guest-list">
      <header>
         <p>
            <span @click="guestStore.orderBy('name')">
               Nome
               <span v-if="guestStore.query.orderBy.name == 'desc'">▲</span>
               <span v-else-if="guestStore.query.orderBy.name == 'asc'">▼</span>
            </span>
         </p>
         <p>
            <span @click="guestStore.orderBy('status')">
               Status
               <span v-if="guestStore.query.orderBy.status == 'desc'">▲</span>
               <span v-else-if="guestStore.query.orderBy.status == 'asc'">▼</span>
            </span>
         </p>
      </header>
      <main>
         <NuxtLink :to="'/' + guest.id" v-for="guest in guestStore.list">
            <p>
               <span>{{ guest.name }}</span>
            </p>
            <p>
               <span>{{ guest.status }}</span>
            </p>
         </NuxtLink>
      </main>
   </section>
</template>



<style scoped lang="scss">
.guest-list {
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: auto;

   background-color: $page-bg;

   border-radius: 16px;
   border: 1px solid $border-color;

   overflow: hidden;

   p {
      width: 50%;
      margin: 0;
   }

   header {
      display: flex;
      padding: 16px 64px;
      background-color: $table-header-bg;
      border-bottom: 1px solid $border-color;

      span {
         font-weight: 600;
         font-size: 16px;
         cursor: pointer;
         user-select: none;
         line-height: 20px;
      }
   }

   main {
      max-height: 400px;
      overflow-y: auto;

      a {
         display: flex;
         justify-content: space-between;
         align-items: center;
         text-decoration: none;

         font-size: 18px;

         padding: 32px 64px;

         transition: background-color 0.3s;

         &:hover {
            background-color: rgba(0, 0, 0, 0.05);
         }

         // &:not(&:first-of-type) {
         //    margin-top: 24px;
         // }
      }
   }
}

/*
.guestList {
   width: 100%;
   // max-width: 1024px;

   // margin: 0 auto;

   border-collapse: separate;
   border-spacing: 0 24px;

   th {
      text-align: left;
      padding-left: 64px;

      > span {
         font-weight: 600;
         font-size: 16px;
         cursor: pointer;
         user-select: none;
      }
   }

   td {
      cursor: pointer;
      font-size: 18px;
      // box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
      background-color: rgb(240, 240, 240);

      padding: 24px 64px;
      margin-top: 32px;

      &:first-of-type {
         border-top-left-radius: 8px;
         border-bottom-left-radius: 8px;
      }
      &:last-of-type {
         border-top-right-radius: 8px;
         border-bottom-right-radius: 8px;
      }
   }
}
*/
</style>