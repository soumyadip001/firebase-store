<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="assets/images/gintaa-logo.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up with GINTAA
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/login" class="font-medium text-green-600 hover:text-green-500">
              Already registered! Sign in here
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="registerUser">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="full-name">Full Name</label>
            <input
              id="full-name" name="name" type="name" autocomplete="name" required
              v-model="userName"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Enter Full Name" />
          </div>
          <div class="mt-2">
            <label for="email-address">Email address</label>
            <input
              id="email-address" name="email" type="email" autocomplete="off" required
              v-model="userEmail"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Email address" />
          </div>
          <div class="mt-2">
            <label for="password">Password</label>
            <input
              id="password" name="password" type="password" autocomplete="off" required
              v-model="userPassword"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-green-600 hover:text-green-500">
              Forgot your password?
            </a>
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
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default defineComponent ({
  layout: 'custom',
  setup(props) {

    const userName = ref('')
    const userEmail = ref('')
    const userPassword = ref('')

    const userCookie = useCookie<{ id: string, email: string }>('user')
    userCookie.value = null

    function registerUser () : void {
      if (userName.value && userEmail.value && userPassword.value) {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            console.log(user)
            userCookie.value = { id: user.uid, email: user.email }
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorCode, errorMessage)
          });
      }
    }

    return {
      userName,
      userEmail,
      userPassword,
      registerUser
    }
  }
})
</script>
