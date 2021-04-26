class Store {

	constructor(state) {

		this.allState = state
		this.setPrefix = 'set'
		this.actions = {}
		this.mutations = {}

		// this.initActions()
		// this.initMutations()

	}

	initActions() {
		for (let stateName in this.allState) {

			stateName = stateName.replace(stateName[0], stateName[0].toUpperCase())
			let acctionName = this.setPrefix + stateName

			this.actions[acctionName] = ({
				commit,
				dispatch,
				getters,
				rootGetters,
				rootState,
				state
			}, res) => {
				commit(acctionName, res)
			}

		}
	}

	initMutations() {
		for (let stateName in this.allState) {

			stateName = stateName.replace(stateName[0], stateName[0].toUpperCase())
			let mutationName = this.setPrefix + stateName

			this.mutations[mutationName] = (state, res) => {
				stateName = stateName.replace(stateName[0], stateName[0].toLowerCase())
				state[stateName] = res
			}

		}

	}
}

export const createStore = (state) => {
	return new Store(state)
}
