<script setup lang="ts">
const props = defineProps<{
   type?: 'primary' | 'danger' | 'success' | 'dark'
   action: string | (() => unknown)
}>()

const btnClasses = { 'action-btn': true, [props.type || 'dark']: true }

</script>

<template>
   <NuxtLink v-if="typeof props.action == 'string'" :to="props.action" :class="btnClasses">
      <slot />
   </NuxtLink>
   <button v-else @click="props.action" :class="btnClasses">
      <slot />
   </button>
</template>

<style scoped lang="scss">
.action-btn {
   font-size: 15px;
   padding: 6px 12px;
   border-radius: 5px;
   cursor: pointer;

   border: 0;
   text-decoration: none;

   display: inline-flex;
   align-items: center;

   position: relative;
   overflow: hidden;
   letter-spacing: 1px;
   font-weight: 500;
}

::deep(span) {
   color: yellow !important;
}

::slotted(span) {
   color: red !important;
}

.primary {
   background: $primary-color;
   color: #fff;
}

.danger {
   background-color: $danger-color;
   color: #fff;
}

.success {
   background-color: $success-color;
   color: #fff;
}

.dark {
   background-color: $dark-color;
   color: #fff;
}
</style>

<style>
.action-btn * {
   color: inherit;
}
</style>