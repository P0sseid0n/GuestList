<script setup lang="ts">
import { useGuest } from '@/store'


definePageMeta({
   middleware(to, from) {
      if (!to.params.id || typeof to.params.id !== 'string') return navigateTo('/')


      const guestStore = useGuest()
      const guest = guestStore.getById(to.params.id)

      if (!guest) return navigateTo('/')


      if (guest.stage != 1) return navigateTo('/' + guest.id)
   }
})

const confirmed = ref(false)

const route = useRoute()

const guestStore = useGuest()
const guest = guestStore.getById(route.params.id as string)!

function confirm() {
   guestStore.nextGuestStatus(guest.id)
   confirmed.value = true
}

</script>


<template>
   <div class="container">
      <h1>Olá {{ guest.name }}, você foi convidado para um evento</h1>
      <h5>Local</h5>
      <p style="width: 320px;"></p>
      <h5>Data</h5>
      <p style="width: 60px;"></p>
      <br />
      <h2 v-if="confirmed">Presença confirmada</h2>
      <ActionButton v-else :action="confirm">Confirmar presença</ActionButton>
   </div>
</template>


<style scoped>
.container {
   height: 100vh;
   padding-top: 64px;
   padding-bottom: 64px;
   text-align: center;
}

h1 {
   font-size: 28px;
   font-weight: 500;
   margin-bottom: 64px;
}

h2 {
   background: -webkit-linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
   background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-top: 96px;
}

h5 {
   font-size: 18px;
   font-weight: 500;
   margin-bottom: 8px;
}

p {
   display: inline-block;
   width: 160px;
   background-color: rgb(220, 220, 220);
   height: 20px;
   border-radius: 4px;
   margin-bottom: 32px;
}

.action-btn {
   margin-top: 96px;
   background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
   height: 36px;
   font-size: 18px !important;
}
</style>