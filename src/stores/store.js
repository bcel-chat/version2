import Vue from 'vue'
import Vuex from 'vuex'
import AppData from './app/AppData'
import Group from './app/Group'
import Auth from './app/Authenticate'
import Settings from './app/Settings'
import Menu from './app/Menu'
import Contact from './app/Contact'
import Room from './app/Room'
import Chat from './app/Chat'
import Notification from './app/Notification'
import Identify from './app/Identify'
import Context from './app/Context'
import flexible_interest_module from './modules/flexible'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AppData,
    Group,
    Auth,
    Settings,
    Menu,
    Contact,
    Room,
    Chat,
    Notification,
    Identify,
    Context,
    flexible_interest_module
  }
})