import ds from "@/helper/deepstream.js";
import { groupBy } from "lodash";
import store from "@/stores/store.js";

const contact = {
  namespaced: true,
  state: {
    contact: []
  },
  getters: {
    _contact(state) {
      return groupBy(state.contact, "alpha");
    }
  },
  mutations: {
    getContact(state, payload) {
      state.contact = payload;
    }
  },
  actions: {
    getContact({ commit }, payload) {
      ds.rpc.make("getContact", payload, (err, data) => {
        if (!err) commit("getContact", data);
        else console.log(err);
      });
    },
    contactSearch({ commit }, payload) {
      commit("getContact", payload);
    },
    setContact({ commit }, payload) {
      ds.rpc.make("setContact", payload, (err, data) => {
        store.commit("Room/roomCheck", data);
      });
    }
  }
};

export default contact;
