const identify = {
    namespaced: true,
    state: {
        myID: null
    },
    mutations: {
        setMyID(state, payload) {
            state.myID = payload
        }
    },
    actions: {
        setMyID({
            commit
        }, payload) {
            commit("setMyID", payload)
        }
    }
}

export default identify;