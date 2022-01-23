<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit your profile</h2>
      </div>
      <form method="post" class="mt-8 space-y-6" @submit.prevent="updateUser">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address">Email address</label>
            <input
              id="email-address" name="email" type="email" autocomplete="email" required readonly
              v-model="userData.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Email address" />
          </div>
          <div class="mt-2">
            <label for="name">name</label>
            <input
              id="name" name="name" type="text" autocomplete="current-name" required
              v-model="name"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="name" />
          </div>
          <div class="mt-2">
            <label for="photoUrl">Photo URL</label>
            <input
              id="photoUrl" name="photoUrl" type="text" autocomplete="current-photo-url" required
              v-model="photoUrl"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="photoUrl" />
          </div>
          <div class="mt-4" v-if="photoUrl">
            <img :src="photoUrl" alt="Profile Image" class="h-32" />
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Update Profile
          </button>
        </div>

        <div v-if="success" class="text-green-700 bg-green-300 p-4">
          {{ success }}
        </div>

        <div v-if="error" class="text-red-700 bg-red-300 p-4">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAuth, updateProfile } from "firebase/auth"

await useAuthMiddleware();

const userData = useUserCookie();
const name = ref('')
const photoUrl = ref('')
const success = ref('')
const error = ref('')

function updateUser () {
  if (!name.value) {
    error.value = 'Please enter a valid name'
    return
  }

  const auth = getAuth()
  updateProfile(auth.currentUser, {
    displayName: name.value,
    photoURL: photoUrl.value
  }).then((result: any) => {
    if (result.displayName) {
      success.value = 'Profile updated successfully!'
      photoUrl.value = result.photoUrl
    }
  }).catch(err => {
    error.value = 'Failed to update profile!'
  })
}

</script>

<script lang="ts">
export default {
  layout: 'custom'
}
</script>