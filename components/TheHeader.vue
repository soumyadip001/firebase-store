<template>
  <nav class="flex justify-between items-center w-full h-full text-center text-black px-3">
    <div class="logo">
      <NuxtLink to="/">
        <img src="assets/images/gintaa-logo.svg" alt="Gintaa Logo" />
      </NuxtLink>
    </div>
    <div class="location-box ml-4">Location</div>
    <div class="search-bar flex-1-0-0 flex items-center justify-center">
      <select name="" id="" class="text-gray-800 dark:text-gray-800 h-8 border-0 hover:outline-none w-16">
        <option value="1">All</option>
        <option value="Animals & Pet Supplies">Animals & Pet Supplies</option>
        <option value="Apparel & Accessories">Apparel & Accessories</option>
        <option value="Arts & Entertainment">Arts & Entertainment</option>
      </select>
      <input type="text" class="text-gray-800 dark:text-gray-800 w-8/12 h-8 border-0 hover:outline-none" />
    </div>
    <div class="get-started" v-if="user">
      <NuxtLink
        class="text-green-50"
        to="/profile"
      >Profile</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink
        class="text-green-50"
        to="/login"
      >Login / Sign up</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const user = useUserCookie()
</script>