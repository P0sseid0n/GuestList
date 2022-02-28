<script setup lang="ts">
import { onMounted } from 'vue'

import { useGuest } from '@/store'


definePageMeta({
   middleware(to, from) {
      if (!to.params.id || typeof to.params.id !== 'string') return navigateTo('/')


      const guestStore = useGuest()
      const guest = guestStore.getById(to.params.id)

      if (!guest) return navigateTo('/')

      if (guest.stage != 2) return navigateTo('/' + guest.id)
   }
})

const router = useRouter()
const route = useRoute()
const guestStore = useGuest()
const scanning = ref(false)
const videoError = ref('')


async function allowVideo() {

   try {
      scanning.value = true
      const stream = await navigator.mediaDevices.getUserMedia({
         video: {
            width: { max: 560, ideal: 560 }, facingMode: "user"
         }
      })
      const video = document.querySelector('#video-block > video') as HTMLVideoElement
      video.srcObject = stream
   } catch (error) {
      videoError.value = 'Não foi possível acessar a câmera'
      scanning.value = false
      console.error(error)
   }
}

function scanButton() {
   guestStore.nextGuestStatus(route.params.id as string)

   router.replace('/')
}

onMounted(() => {
   allowVideo()
})


</script>


<template>
   <div class="container">
      <div id="video-block">
         <video autoplay v-if="scanning"></video>
         <span v-else>
            <p v-if="videoError !== ''">{{ videoError }}</p>
            <img src="@/assets/images/Camera.svg" alt="Ícone de camera" />
            <ActionButton :action="allowVideo">Permitir camera</ActionButton>
         </span>
      </div>
      <ActionButton :action="scanButton" class="scan">Escanear</ActionButton>
      <ActionButton :action="() => router.replace('/' + route.params.id)" class="back">Voltar</ActionButton>
   </div>
</template>


<style scoped lang="scss">
.container {
   height: 100vh;
   padding-top: 64px;
   padding-bottom: 64px;
   text-align: center;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   > .action-btn.scan {
      margin-top: 96px;
      background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
      height: 36px;
      font-size: 18px !important;
   }

   > .action-btn.back {
      margin-top: 16px;
      font-size: 16px !important;
   }
}

#video-block {
   width: 100%;
   max-width: 560px;
   background-color: rgb(220, 220, 220);
   aspect-ratio: 16/9;

   span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      img {
         width: 30%;
         opacity: 0.65;
      }
   }
}

video {
   width: 100%;
   height: 100%;
}
</style>