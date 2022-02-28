import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import faker from '@faker-js/faker'
import _ from 'lodash'

faker.locale = 'pt_BR'

interface IGuest {
	id: ReturnType<typeof uuid>
	name: string
	status: 'Convidando' | 'Aguardando' | 'Chegou'
	stage: 1 | 2 | 3
}

type IOrder = 'asc' | 'desc' | null

export const useGuest = defineStore('Guest', {
	state: () => ({
		all: [
			{
				name: 'John Doe',
				id: uuid(),
				status: 'Aguardando',
				stage: 2,
			},
		] as IGuest[],
		query: {
			name: null as string | null,
			orderBy: {
				name: 'asc' as IOrder,
				status: null as IOrder,
			},
		},
	}),
	actions: {
		searchName(name: string) {
			this.query.name = name.trim() === '' ? null : name.trim()
		},

		orderBy(query: 'name' | 'status') {
			const currentOrder = this.query.orderBy[query]

			if (currentOrder === 'desc') this.query.orderBy[query] = 'asc'
			else if (currentOrder === 'asc') this.query.orderBy[query] = null
			else this.query.orderBy[query] = 'desc'
		},

		addGuest(name?: string) {
			if (!name) name = faker.name.firstName() + ' ' + faker.name.lastName()

			const id = uuid()

			this.all.push({
				name,
				id,
				status: 'Convidando',
				stage: 1,
			})

			return id
		},

		removeGuest(guestId?: IGuest['id']) {
			if (guestId) this.all = this.all.filter(guest => guest.id !== guestId)
			else this.all.pop()
		},

		nextGuestStatus(guestId: IGuest['id']) {
			const guest = this.all.find(g => g.id === guestId)

			if (!guest) return

			if (guest.status === 'Chegou' || guest.stage == 3) return

			if (guest.status === 'Convidando') guest.status = 'Aguardando'
			else if (guest.status === 'Aguardando') guest.status = 'Chegou'

			guest.stage++
		},
	},
	getters: {
		list(state) {
			// let filtered = _.orderBy(state.all, ['status', 'name'], [state.query.orderBy.status, state.query.orderBy.name])
			let filtered = [...state.all]

			const orders: [string[], ('asc' | 'desc')[]] = [[], []]

			Object.keys(state.query.orderBy).forEach(key => {
				const keyName = key as keyof typeof state.query.orderBy

				const order = state.query.orderBy[keyName]
				if (order) {
					orders[0].push(key)
					orders[1].push(order)
				}
			})

			filtered = _.orderBy([...filtered], orders[0], orders[1])

			if (state.query.name) {
				filtered = filtered.filter(guest => guest.name.toLowerCase().includes(state.query.name!.toLowerCase()))
			}

			return filtered
		},

		getById(state) {
			return (id: ReturnType<typeof uuid>) => state.all.find(guest => guest.id === id)
		},
	},
})
