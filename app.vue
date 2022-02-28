<template>
   <div>
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>

<style lang="scss">
* {
   font-family: "Rubik", sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: $text-color;
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

html,
body {
   background-color: #f0f1f2;
   height: 100vh;
}

#app {
   height: 100vh;
}

.container {
   width: 100%;
   height: 100%;
   max-width: 1024px;
   margin: 0 auto;
   padding: 0 4%;
}
</style>