import { getApiUrl } from '@/utils/help.js';
import zmEnv from '@/zm-env';
import Vue from 'vue'
Vue.prototype.$baseUrl = getApiUrl(zmEnv)