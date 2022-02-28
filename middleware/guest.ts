import { useGuest } from '../store'

export default defineNuxtRouteMiddleware((to, from) => {
	if (!to.params.id || typeof to.params.id !== 'string') return navigateTo('/')

	const guestStore = useGuest()
	const guest = guestStore.getById(to.params.id)

	// if (!guest) return abortNavigation('Usuário não encontrado')
	if (!guest) return navigateTo('/')
})
