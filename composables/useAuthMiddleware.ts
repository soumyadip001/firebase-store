// import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const AUTH_MIDDLEWARE_GUEST_REDIRECT = '/';

export const AUTH_MIDDLEWARE_AUTH_REDIRECT = '/login';

export const useAuthMiddleware = async(guest = false) => {
    const app = useNuxtApp()
    // const auth = getAuth()
    const user = ref(null)
    const userCookie = useCookie<{ id: string, email: string }>('user')
    user.value = userCookie.value

    console.log(userCookie.value)

    // const router = useRouter()
    // const user = useAuthUser(); // Or however you would like to get authenticated user.


    const redirect = async(path: string) => {
        if (!!app.ssrContext) {
            app.ssrContext.res.writeHead(302, {
                Location: path,
            });

            return app.ssrContext.res.end();
        }

        return await useRouter().push(path);
    };

    if (guest && !!user.value) {
        return redirect(AUTH_MIDDLEWARE_GUEST_REDIRECT);
    } else if (!guest && !user.value) {
        return redirect(AUTH_MIDDLEWARE_AUTH_REDIRECT);
    }
};