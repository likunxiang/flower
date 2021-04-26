import allState from './state'
import {createStore} from '@/plugin/store/base/index'

const store = createStore(allState)
store.initMutations()
// console.log(store)
export default store.mutations
