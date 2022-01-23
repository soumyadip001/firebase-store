export default function () {
    return useCookie<{ id: string, email: string }>('user') || null
}