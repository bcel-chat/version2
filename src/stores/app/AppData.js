import store from "../store";
import router from "../../routers/router.js";

const AppData = {
  namespaced: true,
  state: {
    tabActive: 0,
    chatClick: false,
    sidebar: false,
    info: false,
    addParticipantPanel: false,
    newChat: false,
    mobileMode: true,
    addParticipant: false,
    GroupSubject: false,
    roomArrow: false,
    openCrop: false,
    openCropInfo: false,
    filePanel: false,
    moduleLink: "",
    searchToggle: false,
    imageViewer: false,
    txtSearch: ''
  },
  mutations: {
    setTabActive(state, payload) {
      state.tabActive = payload
    },
    onChatClick(state, payload) {
      if (!payload.module) {
        state.moduleLink = "";
        router.replace("/");
      } else {
        state.moduleLink = payload.module;
      }

      state.chatClick = payload.cnt;
    },
    roomArrow(state, payload) {
      state.roomArrow = payload;
    },
    deviceCheck(state, payload) {
      state.mobileMode = payload;
    },
    showSideBar(state, payload) {
      state.sidebar = payload;
    },
    showAddParticipant(state, payload) {
      state.addParticipant = payload;
      if (state.newChat) state.newChat = false;
      else state.newChat = true;
    },
    showInfo(state, payload) {
      state.info = payload;
    },
    showAddParticipantPanel(state, payload) {
      state.addParticipantPanel = payload;
    },
    showNewChat(state, payload) {
      state.newChat = payload;
    },
    showGroupSubject(state, payload) {
      state.GroupSubject = payload;
      if (state.addParticipant) state.addParticipant = false;
      else state.addParticipant = true;
    },
    groupCreated(state, payload) {
      state.GroupSubject = payload;
    },
    showCrop(state, payload) {
      if (payload.page == 1)
        state.openCrop = payload.show;
      else if (payload.page == 2)
        state.openCropInfo = payload.show
      else {
        state.openCrop = false
        state.openCropInfo = false
      }
    },
    showFilePanel(state, payload) {
      state.filePanel = payload;
    },
    setModuleLink(state, payload) {
      if (!payload) router.replace("/");

      state.moduleLink = payload;
    },
    setTxtSearch(state, payload) {
      state.txtSearch = payload
    },
    setSearchToggle(state, payload) {
      state.searchToggle = payload
    },
    setImageViewer(state, payload) {
      state.imageViewer = payload
    }
  },
  actions: {
    setTabActive({
      commit
    }, payload) {
      commit("setTabActive", payload)
    },
    onChatClick({
      commit
    }, payload) {
      commit("onChatClick", payload);
    },
    deviceCheck({
      commit
    }, payload) {
      commit("deviceCheck", payload);
    },
    showSideBar({
      commit
    }, payload) {
      commit("showSideBar", payload);
    },
    showAddParticipant({
      commit
    }, payload) {
      commit("showAddParticipant", payload);
    },
    showInfo({
      commit
    }, payload) {
      commit("showInfo", payload);
    },
    showAddParticipantPanel({
      commit
    }, payload) {
      commit("showAddParticipantPanel", payload);
    },
    showNewChat({
      commit
    }, payload) {
      commit("showNewChat", payload);
    },
    showGroupSubject({
      commit
    }, payload) {
      commit("showGroupSubject", payload);
    },
    groupCreated({
      commit
    }, payload) {
      commit("groupCreated", payload);
    },
    roomArrow({
      commit
    }, payload) {
      commit("roomArrow", payload);
    },
    showCrop({
      commit
    }, payload) {
      commit("showCrop", payload);
    },
    showFilePanel({
      commit
    }, payload) {
      commit("showFilePanel", payload);
    },
    setModuleLink({
      commit
    }, payload) {
      commit("setModuleLink", payload);
    },
    setTxtSearch({
      commit
    }, payload) {
      commit("setTxtSearch", payload);
    },
    setSearchToggle({
      commit
    }, payload) {
      commit("setSearchToggle", payload)
    },
    setImageViewer({
      commit
    }, payload) {
      commit("setImageViewer", payload)
    },
  }
};

export default AppData;