<script setup lang="ts">
import { useGuest } from '@/store'
import { ref } from 'vue'

const router = useRouter()

const name = ref('')

const guestStore = useGuest()

function addGuest() {
   const guestId = guestStore.addGuest(name.value)
   name.value = ''

   router.replace(`/${guestId}`)
}

</script>

<template>
   <div>
      <div class="container">
         <h1>Adicionando convidado</h1>
         <input type="text" v-model="name" placeholder="Nome do convidado" />

         <ActionButton action="/" type="dark">Voltar</ActionButton>
         <br />
         <ActionButton :action="addGuest" type="primary">Adicionar</ActionButton>
      </div>
   </div>
</template>

<style scoped lang="scss">
.container {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   height: 100vh;

   h1 {
      margin-bottom: 32px;
   }

   input {
      width: 100%;
      max-width: 480px;

      padding: 12px 8px;
      margin-bottom: 32px;

      font-size: 18px;

      border-radius: 8px;
      border: 1px solid $border-color;
   }
}

.action-btn {
   font-size: 17px !important;
}
</style>