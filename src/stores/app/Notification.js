import ds from "@/helper/deepstream.js"

const notification = {
    namespaced: true,
    state: {
        notification: null
    },
    mutations: {
        setNotification(state, payload) {
            state.notification = payload
        }
    },
    actions: {
        setNotification({
            commit
        }, payload) {
            ds.rpc.make("setNotification", payload, (err, data) => {
                if (!err)
                    console.log(data);
            })
        },
        isActive({
            commit
        }, payload) {
            ds.rpc.make("isActive", payload, (err, data) => {
                if (!err)
                    console.log(data);
            })
        }
    }
}

export default notification