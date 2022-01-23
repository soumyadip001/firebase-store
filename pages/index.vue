<template>
  <div class="sm:text-center lg:text-left">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      <span class="block xl:inline">Welcome to&nbsp;</span>
      <span class="block text-green-600 xl:inline">GINTAA</span>
    </h1>
    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
    </p>
    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
      <div class="rounded-md shadow">
        <NuxtLink
          to="/register"
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
        >Register</NuxtLink>
      </div>
      <div class="mt-3 sm:mt-0 sm:ml-3">
        <NuxtLink
          to="/login"
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
        >Login</NuxtLink>
      </div>
    </div>
    <div class="mt-8">
      <NuxtLink to="/profile-edit" class="p-4 bg-red-300">Guarded Route</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  layout: 'custom',
  setup() {
    const counter = ref(0)

    return {
      counter
    }
  }
})
</script>