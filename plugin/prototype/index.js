/**
 * 全局挂截
 */

import Vue from 'vue'
import * as prototypes from "./prototype"

import { getApiUrl } from '@/utils/help.js';
import zmEnv from '@/zm-env';

Object.keys(prototypes).forEach(key => {
    Vue.prototype['$' + key] = prototypes[key]
});

Vue.prototype.$version = process.env.VUE_APP_VERSION
Vue.prototype.$baseUrl = process.env.VUE_APP_API

Vue.prototype.$ossUrl = getApiUrl(zmEnv.env) + '/index/upOss'
