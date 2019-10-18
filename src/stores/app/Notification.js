import ds from "@/helper/deepstream.js";
import {
    groupBy
} from "lodash";

const notification = {
    namespaced: true,
    state: {
        notification: [],
        notificationCount: 0,
    },
    mutations: {
        getNotification(state, payload) {
            state.notification = payload;
        },
        getNotificationCount(state, payload) {
            state.notificationCount = payload;
        },
        addNotification(state, payload) {
            state.notification.push(payload);
        }
    },
    getters: {
        _notification(state) {
            return groupBy(state.notification, "module_name");
        }
    },
    actions: {
        getNotification({
            commit
        }, payload) {
            ds.rpc.make(
                "getNotification", {
                    username: payload
                },
                (err, data) => {
                    if (!err) commit("getNotification", data);
                }
            );
        },
        setNotification({
            commit
        }, payload) {
            commit("addNotification", payload);
        },
        getNotificationCount({
            commit
        }, payload) {
            ds.rpc.make(
                "getNotificationCount", {
                    username: payload
                },
                (err, data) => {
                    if (!err) commit("getNotificationCount", data);
                }
            );
        },
        isActive({
            commit,
            dispatch
        }, payload) {
            ds.rpc.make("isActive", payload, (err, data) => {
                if (!err) {
                    commit("getNotification", data)
                    dispatch("getNotificationCount", payload.username)
                };
            });
        }
    }
};

export default notification;