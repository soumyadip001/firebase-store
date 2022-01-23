<template>
  <div>
    <h2 class="text-center font-bold mb-8">Welcome to your profile</h2>
    <h6>User Id: {{ userId }}</h6>
    <h6 v-if="user">Email: {{ user?.email }} </h6>
    <h6 v-if="user">Email Verified: {{ user?.emailVerified }}</h6>
    <hr class="mt-4 mb-4">
    <h2 class="text-center font-bold mb-8">This is from cookies</h2>
    <h6 v-if="userCookie">User Id: {{ userCookie.id }}</h6>
    <h6 v-if="userCookie">Email: {{ userCookie.email }} </h6>

    <button
      class="mt-8 py-2 px-4 border border-red-900 bg-red-300 text-red-900"
      @click="logoutUser"
    >Sign Out</button>

    <NuxtLink
      to="/profile-edit"
      class="mt-8 ml-4 py-2 px-4 border border-green-900 bg-green-300 text-green-900"
    >Edit Profile</NuxtLink>

    <div v-if="firebaseError" class="text-red-700 bg-red-300 p-4">
      {{ firebaseError }}
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

export default defineComponent ({
  layout: 'custom',
  setup (props) {
    const router = useRouter()
    const auth = getAuth()
    const userCookie = useCookie<{ id: string, email: string }>('user')

    let user = ref(null)
    let userId = ref('')
    let firebaseError = ref('')

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        console.log('logged in firebaseUser:', firebaseUser)
        console.log(uid)

        user.value = firebaseUser
        userId.value = uid
      }
    })

    function logoutUser () {
      signOut(auth).then(() => {
        userCookie.value = null
        router.replace('/')
      }).catch((err) => {
        firebaseError.value = err
      })
    }

    return {
      user,
      userId,
      userCookie,
      firebaseError,
      logoutUser
    }
  }
})
</script>
