import allState from './state'
import {createStore} from '@/plugin/store/base/index'

const store = createStore(allState)
store.initActions()

export default store.actions
