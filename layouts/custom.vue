<template>
  <div class="flex flex-col w-full h-screen overflow-hidden bg-green-50">
    <header class="w-full h-16 bg-green-500">
      <the-header></the-header>
    </header>
    <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <slot />
    </main>
    <footer class="flex items-center justify-center w-full h-16 text-black">
      <p class="text-gray-700">
        My Nuxt App &copy; {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>
<script lang="ts">
import TheHeader from "~/components/TheHeader.vue"

export default {
  components: {
    TheHeader
  }
}
</script>