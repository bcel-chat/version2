import ds from "@/helper/deepstream";
import store from "../store";
const context = {
  namespaced: true,
  state: {
    bubblePopup: false,
    forwartPopup: false,
    popupData: null,
    txtSearch: "",
    contact: [],
    msgBox: "",
    forwardBoxData: "",
    toEdit: false,
    confirm: false,
    roomArrow: "",
    dropBox: false,
    setAdmin: "",
    otpBox: false,
    stickerBox: {
      status: false,
      name: "",
      src: ""
    }
  },
  mutations: {
    setStickerBox(state, payload) {
      state.stickerBox = payload;
    },
    setOtpBox(state, payload) {
      state.otpBox = payload;
    },
    setDropBox(state, payload) {
      state.dropBox = payload;
    },
    setBubblePopup(state, payload) {
      state.bubblePopup = payload;
    },
    setForwardPopup(state, payload) {
      state.forwartPopup = payload;
    },
    setPopupData(state, payload) {
      state.popupData = payload;
    },
    setTxtSearch(state, payload) {
      state.txtSearch = payload;
    },
    getContact(state, payload) {
      state.contact = payload;
    },
    setMsgBox(state, payload) {
      state.msgBox = payload;
    },
    getForwardBoxData(state, payload) {
      state.forwardBoxData = payload;
    },
    setToEdit(state, payload) {
      state.toEdit = payload;
    },
    setConfirm(state, payload) {
      state.confirm = payload;
    },
    setRoomArrow(state, payload) {
      state.roomArrow = payload;
    },
    setAdmin(state, payload) {
      state.setAdmin = payload;
    }
  },
  actions: {
    setStickerBox({ commit }, payload) {
      commit("setStickerBox", payload);
    },
    setOtpBox({ commit }, payload) {
      commit("setOtpBox", payload);
    },
    setAdmin({ commit }, payload) {
      ds.rpc.make("setGroupAdmin", payload, (err, data) => {
        store.dispatch("Room/getParticipantInfo", "");
      });
    },
    setDropBox({ commit }, payload) {
      commit("setDropBox", payload);
    },
    setRoomArrow({ commit }, payload) {
      commit("setRoomArrow", payload);
    },
    setBubblePopup({ commit }, payload) {
      commit("setBubblePopup", payload);
    },
    setForwardPopup({ commit }, payload) {
      commit("setForwardPopup", payload);
    },
    setPopupData({ commit }, payload) {
      commit("setPopupData", payload);
    },
    setTxtSearch({ commit }, payload) {
      commit("setTxtSearch", payload);
    },
    getContact({ commit }, payload) {
      ds.rpc.make("getForwardContact", payload, (err, data) => {
        if (!err) commit("getContact", data);
        else console.log(err);
      });
    },
    contactSearch({ commit }, payload) {
      commit("getContact", payload);
    },
    setContact({ commit }, payload) {
      ds.rpc.make("setContact", payload, (err, data) => {
        store.dispatch("Room/roomCheck", payload.chatwith);
      });
    },
    setMsgBox({ commit }, payload) {
      commit("setMsgBox", payload);
    },
    setToEdit({ commit }, payload) {
      commit("setToEdit", payload);
    },
    setConfirm({ commit }, payload) {
      commit("setConfirm", payload);
    },
    getForwardBoxData({ commit }, payload) {
      ds.rpc.make("getReplyBoxData", payload, (err, data) => {
        if (!err) {
          commit("getForwardBoxData", data[0]);
        }
      });
    },
    editMessage({ commit }, payload) {
      ds.rpc.make("editMessage", payload, (err, data) => {
        commit("setToEdit", false);
      });
    },
    deleteMessage({ state }, payload) {
      ds.rpc.make(
        "deleteMessage",
        {
          cid: state.popupData.cid,
          rid: state.popupData.rid
        },
        (err, data) => {
          if (!err) {
            setTimeout(() => {
              store.dispatch("Room/getRoom", {
                id: store.state.Identify.myID,
                _page: 1,
                text: "",
                fn: ""
              });
              ds.event.emit(
                `chatroom/${state.popupData.rid}`,
                state.popupData.rid
              );
            }, 100);
          }
        }
      );
    }
  }
};

export default context;
