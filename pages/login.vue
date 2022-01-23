<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="assets/images/gintaa-logo.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <NuxtLink to="/register" class="font-medium text-green-600 hover:text-green-500">
                    start your 14-day free trial
                </NuxtLink>
            </p>
        </div>
        <form class="mt-8 space-y-6" method="POST" @submit.prevent="loginUser">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input
                    id="email-address" name="email" type="email" autocomplete="email" required
                    v-model="userEmail"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password" name="password" type="password" autocomplete="current-password" required
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
        <div v-if="firebaseError" class="text-red-700 bg-red-300 p-4">
            {{ firebaseError }}
        </div>
        </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default defineComponent ({
    layout: 'custom',
    setup(props) {
        const router = useRouter()
        const userCookie = useCookie<{ id: string, email: string }>('user')

        const userEmail = ref('')
        const userPassword = ref('')
        const firebaseError = ref(null)
        userCookie.value = null

        function loginUser () {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
              .then((userCredential) => {
                const user = userCredential.user;
                userCookie.value = { id: user.uid, email: user.email }
                if (user) {
                  router.push({ name: 'profile' })
                }
              })
              .catch(err => {
                console.error(err)
                firebaseError.value = err
              })
        }

        return {
            userEmail,
            userPassword,
            firebaseError,
            loginUser
        }
    }
})
</script>