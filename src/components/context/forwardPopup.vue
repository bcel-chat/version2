<template>
  <div id="forward-popup">
    <div class="container">
      <transition name="bounce">
        <div class="panel" v-if="startUp">
          <div class="header">
            <div class="header-inside">
              <div class="h-item">
                <div class="close">
                  <i class="material-icons" role="button" @click="setForwardPopup(false)">close</i>
                </div>
                <div class="done" role="button" @click="setForwardPopup(false)">Done</div>
              </div>
              <div class="h-item">
                <div class="title">Forward Message</div>
              </div>
            </div>
          </div>
          <div class="message-box">
            <forward-panel :msg="forwardBoxData"></forward-panel>
          </div>
          <div class="search-box">
            <div class="search-inside">
              <div class="s-item">
                <div
                  placeholder="Search"
                  ref="search"
                  @input="search"
                  class="search"
                  contenteditable="true"
                  @keydown="prevent"
                ></div>
              </div>
              <div class="s-clear" v-if="searchText">
                <span class="clear">
                  <i class="material-icons" role="button" @click="clearSearch">close</i>
                </span>
              </div>
            </div>
          </div>
          <div class="contact-box">
            <Contact></Contact>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Contact from "./forwardContact.vue";
import ForwardPanel from "./forwardMessageBox.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    ForwardPanel,
    Contact
  },
  data() {
    return {
      searchText: "",
      startUp: false
    };
  },
  beforeMount() {
    this.getForwardBoxData(this.popupData);
    this.getContact({
      id: this.myID,
      _page: 1,
      text: "",
      fn: ""
    });
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 100);
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("Context", ["popupData", "forwardBoxData"])
  },
  methods: {
    ...mapActions("Chat", ["getReplyBoxData"]),
    ...mapActions("Context", [
      "setForwardPopup",
      "setTxtSearch",
      "getContact",
      "getForwardBoxData"
    ]),
    search(e) {
      this.searchText = e.target.innerText;
      this.setTxtSearch(e.target.innerText);
    },
    clearSearch() {
      this.$refs.search.innerText = "";
      this.searchText = "";
      this.$refs.search.focus();
    },
    prevent(e) {
      if (e.keyCode === 13) e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/context/forwardPopup.scss";

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>