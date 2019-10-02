import AccoutIcon from "vue-material-design-icons/Account.vue"
import LockIcon from "vue-material-design-icons/Lock.vue"

export default {
    install(Vue) {
        Vue.component("lock-icon", LockIcon)
        Vue.component("account-icon", AccoutIcon)
    }
}