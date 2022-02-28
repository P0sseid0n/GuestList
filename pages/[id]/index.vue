<script setup lang="ts">
import { useGuest } from '@/store'

definePageMeta({
   middleware: 'guest'
})


const route = useRoute()
const router = useRouter()

const guestStore = useGuest()
const guest = guestStore.getById(route.params.id as string)!

function deleteGuest() {
   guestStore.removeGuest(guest.id)
   router.replace('/')
}

</script>

<template>
   <div class="container">
      <div class="guest-view">
         <button id="delete-guest" @click="deleteGuest">
            <img src="@/assets/images/Delete.svg" alt="Ícone de lixeira" />
            Excluir
         </button>
         <NuxtLink id="back" to="/">
            <img src="@/assets/images/Back.svg" alt="Ícone de Seta" />
            Voltar
         </NuxtLink>
         <header>
            <h1>{{ guest.name }}</h1>
            <h4>{{ guest.id }}</h4>
         </header>
         <main>
            <div>
               <h5>Status</h5>
               <p>{{ guest.status }}</p>
            </div>
         </main>
         <footer>
            <ActionButton
               v-if="guest.stage !== 3"
               :action="guest.stage == 1 ? `/${guest.id}/invite` : `/${guest.id}/scan`"
               :class="['wrapper', 'stage' + guest.stage]"
            >
               <span v-if="guest.stage == 1" class="stage-generate">
                  <img src="@/assets/images/Guest.svg" alt="Ícone de Camera" />

                  <span>Gerar cartão do convidado</span>
               </span>
               <span v-else class="stage-scan">
                  <img src="@/assets/images/Scan.svg" alt="Ícone de Camera" />
                  <span>Escanear cartão do convidado</span>
               </span>
            </ActionButton>
         </footer>
      </div>
   </div>
</template>


<style scoped lang="scss">
.guest-view {
   background: $page-bg;
   border: 1px solid $border-color;
   border-radius: 16px;
   // overflow: hidden;

   position: relative;

   // position: absolute;
   // top: 50%;
   // left: 50%;

   // transform: translate(-50%, -50%);

   width: 100%;
   max-width: 768px;

   > *:not(button) {
      padding: 16px;
   }

   > button,
   > a {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;

      position: absolute;
      top: -56px;
      gap: 8px;

      border-radius: 8px;

      height: 36px;

      padding: 0 8px;

      color: white;
      font-weight: 500;
      font-size: 15px;
      text-decoration: none;

      cursor: pointer;

      &#back {
         left: 0;
         background: $dark-color;
         gap: 0;
         padding-left: 4px;

         img {
            height: 32px;
         }
      }

      &#delete-guest {
         right: 0;

         background: rgb(255, 75, 75);

         &:hover {
            background: #eb3737;
         }
      }
   }

   header {
      background-color: $table-header-bg;
      border-bottom: 1px solid $border-color;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
   }

   footer {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 48px;

      > a {
         padding: 8px 16px;

         > span {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            img {
               width: 28px;
            }

            span {
               font-size: 16px;
               letter-spacing: 1px;
            }
         }
      }
   }
}

.container {
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   gap: 16px;
}

.stage1 {
   background-image: linear-gradient(to right, #ff512f 0%, #f09819 100%);
}

.stage2 {
   background-image: linear-gradient(to right, #20cc59 0%, #00d4b8 90%);
}

/*

         .btn-grad {}
         .btn-grad {
            margin: 10px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }

          .btn-grad:hover {
            background-position: right center;
            color: #fff;
            text-decoration: none;
          }
         
*/
</style>

<style>
</style>