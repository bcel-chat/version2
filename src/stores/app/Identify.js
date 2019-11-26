import code from "@/helper/father.js";

const identify = {
  namespaced: true,
  state: {
    myID: null
  },
  mutations: {
    setMyID(state, payload) {
      state.myID = payload;
    }
  },
  getters: {
    getRole() {
      console.log(code.from(localStorage.getItem("your_name")));

      return code.from(localStorage.getItem("your_name"));
    }
  },
  actions: {
    setMyID({ commit }, payload) {
      commit("setMyID", payload);
    }
  }
};

export default identify;
