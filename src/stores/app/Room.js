import ds from "@/helper/deepstream.js";
import code from "@/helper/father.js";
import store from "@/stores/store";

const room = {
  namespaced: true,
  state: {
    isTyping: "",
    isOnline: "",
    room: "",
    chat: "",
    userRoomID: "",
    roomStatus: "",
    roomActive: {
      status: false,
      rid: null
    },
    userRoom: [],
    participantRoom: [], // used to show group name in room header
    countReadMsg: 0,
    roomBody: false,
    roomListData: "",
    participantInfo: []
  },
  mutations: {
    setIsTyping(state, payload) {
      state.isTyping = payload;
    },
    setIsOnline(state, payload) {
      state.isOnline = payload;
    },
    roomCheck(state, payload) {
      state.roomStatus = payload;
    },
    getRoom(state, payload) {
      state.room = payload;
    },
    setChat(state, payload) {
      state.chat = payload;
    },
    setUserRoomID(state, payload) {
      state.userRoomID = payload;
    },
    getUserRoom(state, payload) {
      state.userRoom = payload;
    },
    getParticipantRoom(state, payload) {
      state.participantRoom = payload;
    },
    setRoomActive(state, payload) {
      state.roomActive = payload;
    },
    getCountReadMsg(state, payload) {
      state.countReadMsg = payload;
    },
    setRoomBody(state, payload) {
      state.roomBody = payload;
    },
    setRoomListData(state, payload) {
      state.roomListData = payload;
    },
    getParticipantInfo(state, payload) {
      state.participantInfo = payload;
    }
  },
  actions: {
    setIsTyping({ commit }, payload) {
      commit("setIsTyping", payload);
    },
    setIsOnline({ commit }, payload) {
      commit("setIsOnline", payload);
    },
    roomCheck({ commit }, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      if (payload.rid)
        ds.rpc.make(
          "roomCheck",
          {
            id: uid,
            chatwith: payload.uid,
            rid: payload.rid,
            rtype: payload.rtype
          },
          (err, data) => {
            if (!err) {
              commit("roomCheck", data);
              store.dispatch("Contact/getContact", {
                id: uid,
                _page: 1,
                text: "",
                fn: ""
              });
            } else console.log(err);
          }
        );
      else commit("roomCheck", "");
    },
    getRoom({ commit }, payload) {
      ds.rpc.make("getRoom", payload, (err, data) => {
        if (!err) commit("getRoom", data);
        else console.log(err);
      });
    },
    setRoom(context, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      ds.rpc.make(
        "setRoom",
        {
          id: uid,
          chatwith: payload,
          rtype: 1
        },
        (err, data) => {
          if (!err) context.dispatch("getUserRoom", payload);
          else console.log(data);
        }
      );
    },
    setChat({ commit }, payload) {
      ds.rpc.make("setChat", payload, (err, data) => {
        if (!err) console.log(data);
        else console.log(data);
      });
    },
    setNewChat({ commit }, payload) {
      ds.rpc.make("setNewChat", payload, (err, data) => {
        if (!err) console.log(data);
        else console.log(data);
      });
    },
    getUserRoom({ commit }, payload) {
      ds.rpc.make("getUserRoom", payload, (err, data) => {
        if (!err) commit("getUserRoom", data[0]);
        else console.log(data);
      });
    },
    getParticipantRoom({ commit }, payload) {
      ds.rpc.make("getParticipantRoom", payload, (err, data) => {
        if (!err) commit("getParticipantRoom", data[0]);
        else console.log(data);
      });
    },
    setRoomActive({ commit }, payload) {
      commit("setRoomActive", payload);
    },
    getCountReadMsg({ commit }, payload) {
      ds.rpc.make("countReadMsg", payload, (err, data) => {
        if (!err) commit("getCountReadMsg", data);
        else console.log(data);
      });
    },
    setRoomBody({ commit }, payload) {
      commit("setRoomBody", payload);
    },
    setRoomListData({ commit }, payload) {
      commit("setRoomListData", payload);
    },
    updateGroupName({ dispatch, state }, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      ds.rpc.make("updateGroupName", payload, (err, data) => {
        if (!err) {
          dispatch("getParticipantRoom", {
            rid: state.participantRoom.rid,
            uid: state.userRoom.uid
          });
          dispatch("getUserRoom", {
            uid: state.userRoom.uid
          });
          dispatch("getRoom", {
            id: uid,
            _page: 1,
            text: "",
            fn: ""
          });
        } else console.log(data);
      });
    },
    getParticipantInfo({ commit, state }, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      ds.rpc.make(
        "getParticipantInfo",
        {
          rid: state.participantRoom.rid,
          uid: uid,
          text: payload.text,
          _page: payload._page
        },
        (err, data) => {
          if (!err) commit("getParticipantInfo", data);
        }
      );
    },
    addParticipant({ state }, payload) {
      payload.forEach(e => {
        ds.rpc.make(
          "addParticipant",
          {
            assigner: store.state.Identify.myID,
            uid: e.uid,
            rid: state.participantRoom.rid
          },
          (err, data) => {
            ds.event.emit(`room/${e.uid}`, state.participantRoom.rid);
          }
        );
      });
    },
    deleteParticipant({ dispatch, state }, payload) {
      ds.rpc.make(
        "deleteParticipant",
        {
          uid: store.state.Identify.myID,
          rid: state.participantRoom.rid
        },
        (err, data) => {
          if (!err) {
            dispatch("getRoom", {
              id: store.state.Identify.myID,
              _page: 1,
              text: "",
              fn: ""
            });

            store.dispatch("AppData/onChatClick", {
              cnt: false,
              module: ""
            });

            store.dispatch("AppData/showInfo", false);
          }
        }
      );
    }
  }
};

export default room;
