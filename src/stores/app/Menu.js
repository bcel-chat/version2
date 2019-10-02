import ds from "@/helper/deepstream.js"
const menu = {
    namespaced: true,
    state: {
        menuItems: null
    },
    mutations: {
        getMenuItem(state, payload) {
            state.menuItems = payload
        }
    },
    actions: {
        getMenuItem({
            commit
        }, payload) {
            ds.rpc.make('getMenuItem', {
                user: payload
            }, (err, data) => {
                if (!err) commit('getMenuItem', data)
            })
        }
    }
}

export default menu;