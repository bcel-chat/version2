import ds from "@/helper/deepstream"
import store from "../store"
import axios from "axios"
import code from "@/helper/father.js"

import {
    groupBy
} from 'lodash'

const group = {
    namespaced: true,
    state: {
        participantAdded: [],
        participant: [],
        participantId: [], // to show in room header for a group and reload when sent a msg to a group
        roomID: [], // used for create a group
        groupPictures: "",
        adminStatus: false
    },
    getters: {
        _participant(state) {
            return groupBy(state.participant, "alpha");
        },
        _participantId(state) {
            return `${state.participantId.length > state.participantId.length ? state.participantId.length : 0} participants`
        },
        _selected(state) {
            return `${state.participantAdded.length} of ${store.state.Contact.contact.length} selected`
        }
    },
    mutations: {
        getParticipant(state, payload) {
            state.participant = payload
        },
        getParticipantId(state, payload) {
            state.participantId = payload
        },
        getParticipantAdded(state, payload) {
            state.participantAdded = payload
        },
        setGroup(state, payload) {
            state.roomID = payload
        },
        groupPicture(state, payload) {
            state.groupPictures = payload
        },
        getAdminStatus(state, payload) {
            state.adminStatus = payload
        },
        getRoomID(state, payload) {
            state.roomID = payload
        }
    },
    actions: {
        getRoomID({
            commit
        }, payload) {
            commit("getRoomID", payload)
        },
        getAdminStatus({
            commit
        }, payload) {
            commit("getAdminStatus", payload)
        },
        getParticipant({
            commit
        }, payload) {
            ds.rpc.make("getParticipant", payload, (err, data) => {
                if (!err)
                    commit("getParticipant", data)
                else
                    console.log(err);
            })
        },
        getParticipantId({
            commit
        }, payload) {
            ds.rpc.make("getParticipantId", payload, (err, data) => {
                if (!err)
                    commit("getParticipantId", data)
                else
                    console.log(err);
            })
        },
        getParticipantAdded({
            commit
        }, payload) {
            ds.rpc.make("getParticipant", payload, (err, data) => {
                if (!err)
                    commit("getParticipantAdded", data)
                else
                    console.log(err);
            })
        },
        setGroup({
            commit,
            dispatch
        }, payload) {
            ds.rpc.make("setGroup", payload, (err, data) => {
                if (!err) {
                    commit("setGroup", data)
                    dispatch("getParticipant", {
                        rid: data,
                        uid: payload.uid,
                        _page: 1,
                        text: "",
                        fn: ""
                    });
                } else
                    console.log(err);
            })
        },
        setParticipant({
            dispatch
        }, payload) {
            ds.rpc.make("setParticipant", payload, (err, data) => {
                if (!err && data) {
                    dispatch("getParticipant", {
                        rid: payload.rid,
                        uid: payload.assigner,
                        _page: 1,
                        text: "",
                        fn: ""
                    })
                    dispatch("getParticipantAdded", {
                        rid: payload.rid,
                        uid: payload.assigner,
                        _page: 2,
                        text: "",
                        fn: ""
                    })
                }
            })
        },
        groupPicture({
            commit
        }, payload) {
            commit("groupPicture", payload)
        },
        deleteGroup({
            commit,
            state
        }, payload) {
            ds.rpc.make("deleteGroup", {
                rid: state.roomID
            }, (err, data) => {
                commit("setGroup", [])
                commit("getParticipantAdded", [])
                store.dispatch("AppData/showAddParticipant", false)
            })
        },
        async setGroupPicture({
            state,
            commit
        }, payload) {
            let formData = new FormData();
            formData.append("file", payload);
            formData.append("uid", state.roomID);
            formData.append("rid", state.roomID);
            formData.append("_page", 2);
            let uid = code.from(localStorage.getItem("roger"));

            axios.post(
                `${process.env.VUE_APP_ACCESS_API}/profilepicture`,
                formData
            ).then(() => {
                store.dispatch("Room/getParticipantRoom", {
                    rid: state.roomID,
                    uid: uid
                })
                store.dispatch("Room/getRoom", {
                    id: uid,
                    _page: 1,
                    text: "",
                    fn: ""
                });
            })
        },
        async setGroupPictureInfo({
            state,
            commit
        }, payload) {
            let formData = new FormData();
            formData.append("file", payload);
            formData.append("uid", state.roomID);
            formData.append("rid", state.roomID);
            formData.append("_page", 2);
            let uid = code.from(localStorage.getItem("roger"));

            axios.post(
                `${process.env.VUE_APP_ACCESS_API}/profilepicture`,
                formData
            ).then(() => {
                store.dispatch("Room/getParticipantRoom", {
                    rid: state.roomID,
                    uid: uid
                })
                commit("getRoomID", [])
            })
        },
    }
}

export default group