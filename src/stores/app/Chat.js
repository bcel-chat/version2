import ds from "@/helper/deepstream.js";
import code from "@/helper/father.js";
import store from "@/stores/store.js";
import axios from "axios";

const chat = {
  namespaced: true,
  state: {
    roomID: null,
    message: null,
    roomType: 0,
    replyID: 0,
    replyBoxToggle: false,
    replyBoxData: null,
    fileBoxData: [],
    fileBoxToggle: false,
    filePage: 0,
    scroller: null,
    pictureStatus: {
      display: true,
      success: ""
    },
    reload: null
  },
  mutations: {
    doReload(state, payload) {
      state.reload = payload;
    },
    setPictureStatus(state, payload) {
      state.pictureStatus = payload;
    },
    getMessage(state, payload) {
      state.message = [];
      for (var i = 0; i < payload.length; i++)
        state.message.unshift(payload[i]);
    },
    moreMessage(state, payload) {
      for (var i = 0; i < payload.length; i++)
        state.message.unshift(payload[i]);
    },
    reloadMessage(state, payload) {
      state.message = payload;
    },
    setRoomID(state, payload) {
      state.roomID = payload;
      store.dispatch("Room/setRoomActive", {
        status: true,
        rid: payload
      });
    },
    setRoomType(state, payload) {
      state.roomType = payload;

      state.fileBoxData = [];
      state.fileBoxToggle = false;
    },
    setReplyBoxToggle(state, payload) {
      state.replyBoxToggle = payload.toggle;
      state.replyID = payload.cid;
    },
    getReplyBoxData(state, payload) {
      state.replyBoxData = payload;
    },
    getPicture(state, payload) {
      state.fileBoxData.push(payload);
      state.filePage = payload.page;
      state.fileBoxToggle = true;
    },
    getFile(state, payload) {
      state.fileBoxData = [];

      for (let i = 0; i < payload.file.length; i++) {
        state.fileBoxData.push(payload.file[i]);
      }
      state.filePage = payload.page;
      state.fileBoxToggle = true;
    },
    getFileDropBox(state, payload) {
      state.fileBoxData.push(payload);
      state.fileBoxToggle = true;
    },
    addFile(state, payload) {
      state.fileBoxData.push(payload[0]);
    },
    removeFile(state, payload) {
      for (let i = 0; i < state.fileBoxData.length; i++) {
        if (state.fileBoxData[i] == payload) {
          state.fileBoxData.splice(i, 1);
          if (state.fileBoxData.length == 0) state.fileBoxToggle = false;
        }
      }
    },
    setFileBoxToggle(state, payload) {
      state.fileBoxToggle = payload;
      if (!payload) state.fileBoxData = [];
    },
    setScroller(state, payload) {
      state.scroller = payload;
    }
  },
  actions: {
    addMessage({ commit }, payload) {
      commit("addMessage", payload);
    },
    setPictureStatus({ commit }, payload) {
      commit("setPictureStatus", payload);
    },
    clearMessage({ commit }, payload) {
      commit("getMessage", [{}]);
    },
    getMessage({ commit }, payload) {
      const uid = code.from(localStorage.getItem("roger"));
      if (payload)
        ds.rpc.make(
          "getMessage",
          {
            uid: uid,
            rid: payload.rid,
            limit: payload.limit
          },
          (err, data) => {
            if (!err && data.length > 0) {
              commit("setRoomID", data[0].rid);
              commit("getMessage", data);
              commit("doReload", { uid: uid, rid: data[0].rid });
            } else {
              commit("getMessage", null);
            }
          }
        );
      else commit("getMessage", null);
    },
    async sendMessage(context, payload) {
      try {
        const res = await axios.post(
          process.env.VUE_APP_ACCESS_API + "/sendmessage",
          payload,
          {
            headers: store.getters.getToken
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    moreMessage({ commit }, payload) {
      const uid = code.from(localStorage.getItem("roger"));
      if (payload)
        ds.rpc.make(
          "getMessage",
          {
            uid: uid,
            rid: payload.rid,
            limit: payload.limit
          },
          (err, data) => {
            if (!err && data.length > 0) {
              commit("getMessage", data);
            } else {
              commit("getMessage", null);
            }
          }
        );
      else commit("getMessage", null);
    },
    async sendMessage(context, payload) {
      try {
        const res = await axios.post(
          process.env.VUE_APP_ACCESS_API + "/sendmessage",
          payload,
          {
            headers: store.getters.getToken
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    setMessage(context, payload) {
      const uid = code.from(localStorage.getItem("roger"));
      let rid = null;
      if (context.state.roomID == null || context.state.roomID == undefined) {
        rid = 0;
      } else rid = context.state.roomID;

      ds.rpc.make(
        "setMessage",
        {
          uid: uid,
          rid: rid,
          msg: payload.msg,
          type: payload.type,
          chatwith: payload.chatwith,
          rtype: payload.rtype,
          replyid: context.state.replyID,
          path: payload.path
        },
        (err, data) => {
          if (!err) {
            if (rid == 0) {
              context.dispatch("getMessage", data);
              ds.event.subscribe(`chatroom/${data}`, res => {
                context.dispatch("getMessage", data);
              });
              ds.record
                .getRecord(`chat`)
                .subscribe(`typing/${data}`, data => {}, true);
            }

            store.dispatch("Room/getRoom", {
              id: uid,
              _page: 1,
              text: "",
              fn: ""
            });
            store.dispatch("Contact/getContact", {
              id: uid,
              _page: 1,
              text: "",
              fn: ""
            });
          } else console.log(err);
        }
      );
    },
    async uploadFile(context, payload) {
      const uid = code.from(localStorage.getItem("roger"));
      let rid = null;
      if (context.state.roomID == null || context.state.roomID == undefined) {
        rid = 0;
      } else rid = context.state.roomID;

      let result = null;

      let formData = new FormData();
      context.state.fileBoxData.forEach(element => {
        formData.append("file", element);
      });
      formData.append("uid", uid);
      formData.append("rid", rid);
      formData.append("msg", payload.msg);
      formData.append("type", payload.type);
      formData.append("chatwith", payload.chatwith);
      formData.append("rtype", payload.rtype);
      formData.append("replyid", context.state.replyID);

      result = await axios.post(
        `${process.env.VUE_APP_ACCESS_API}/upload`,
        formData
      );

      if (result.data.status) {
        if (rid == 0) {
          context.dispatch("getMessage", result.data.rid);
          ds.event.subscribe(`chatroom/${result.data.rid}`, res => {
            context.dispatch("getMessage", result.data.rid);
          });
          ds.record
            .getRecord(`chat`)
            .subscribe(`typing/${result.data.rid}`, data => {}, true);
        }

        context.dispatch("setPictureStatus", {
          display: false,
          success: result.data.rid
        });

        store.dispatch("Room/getRoom", {
          id: uid,
          _page: 1,
          text: "",
          fn: ""
        });
        store.dispatch("Contact/getContact", {
          id: uid,
          _page: 1,
          text: "",
          fn: ""
        });
      }
    },
    setMessageCreateGroup({ commit }, payload) {
      ds.rpc.make("setMessageCreateGroup", payload, (err, data) => {
        store.dispatch("Room/getRoom", {
          id: payload.uid,
          _page: 1,
          text: "",
          fn: ""
        });
      });
    },
    setRoomID({ commit }, payload) {
      commit("setRoomID", payload);
    },
    setRoomType({ commit }, payload) {
      commit("setRoomType", payload);
    },
    setReplyBoxToggle({ commit }, payload) {
      commit("setReplyBoxToggle", payload);
      if (!payload.toggle) {
        commit("getReplyBoxData", []);
      }
    },
    getReplyBoxData({ commit }, payload) {
      ds.rpc.make("getReplyBoxData", payload, (err, data) => {
        if (!err) {
          commit("getReplyBoxData", data[0]);
        }
      });
    },
    setReadMessage(context, payload) {
      ds.rpc.make("setReadMessage", payload, (err, data) => {
        if (!err) {
          setTimeout(() => {
            store.dispatch("Room/getRoom", {
              id: payload.uid,
              _page: 1,
              text: "",
              fn: ""
            });
            // ds.event.emit(`chatroom/${payload.rid}`, payload.rid);
          }, 100);
        }
      });
    },
    getPicture({ commit }, payload) {
      commit("getPicture", payload);
    },
    getFile({ commit }, payload) {
      commit("getFile", payload);
    },
    getFileDropBox({ commit }, payload) {
      commit("getFileDropBox", payload);
    },
    addFile({ commit }, payload) {
      commit("addFile", payload);
    },
    removeFile({ commit }, payload) {
      commit("removeFile", payload);
    },
    setFileBoxToggle({ commit }, payload) {
      commit("setFileBoxToggle", payload);
    },
    setScroller({ commit }, payload) {
      commit("setScroller", payload);
    },
    reloadMessage({ commit }, payload) {
      ds.rpc.make("reloadMessage", payload, (err, data) => {
        commit("reloadMessage", data);
      });
    },
    async downloadFile({}, payload) {
      const res = await axios.get(
        process.env.VUE_APP_ACCESS_API + "/download",
        payload
      );

      if (res.data) return res.data;
    }
  }
};

export default chat;
