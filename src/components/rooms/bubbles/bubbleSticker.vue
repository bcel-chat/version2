<template>
  <div id="bubble" :class="[checkTime(index, msg.time) != null ? 'new' : '']" ref="bubble">
    <div
      :class="['bubble-container', msg.uid == myID ? 'out' : 'in']"
      @mouseover="mobileMode ? menu = false : menu = true"
      @mouseleave="menu = false"
      ref="touchMenu"
    >
      <div class="menu" v-if="menu">
        <div
          :class="['menu-inside', checkTime(index, msg.time) == null && !senderCheck(index, msg.uid) ? '' : 'option']"
        >
          <i
            class="material-icons"
            role="button"
            @click="setBubblePopup(true), setPopupData(msg)"
          >more_vert</i>
        </div>
      </div>
      <div class="bubble-box-inside">
        <div class="bubble-box">
          <div class="bb-profile-box">
            <div
              v-if="msg.uid != myID && checkTime(index, msg.read) != null || msg.uid != myID && senderCheck(index, msg.uid)"
              class="bb-avatar"
            >
              <div class="bb-avatar-inside">
                <img
                  :src="`${picURL}/${msg.uid}/icon/${msg.picture}`"
                  class="avatar"
                  v-if="msg.picture"
                />
                <img v-else src="@/assets/img/user.svg" class="avatar-default" alt srcset />
              </div>
            </div>
            <div
              v-if="checkTime(index, msg.time) != null || msg.uid != myID && senderCheck(index, msg.uid) || msg.uid == myID && senderCheck(index, msg.uid)"
              :class="['bb-name-time', msg.uid == myID ? 'out' : 'in']"
            >
              <span v-if="msg.uid == myID" :class="['read-msg',msg.read > 0 ? 'read' : 'unread']"></span>
              <span
                class="_time"
              >{{ msg.uid == myID ? '' : `${getFirstname(msg.displayname)},` }} {{moment(msg.time).format('h:mm A')}}</span>
            </div>
          </div>
        </div>
        <div
          :class="['msg-box', checkTime(index, msg.time) == null && !senderCheck(index, msg.uid) ? 'hide' : '', msg.uid == myID ? 'out' : 'in',]"
        >
          <div class="msg-inside-sticker" :title="msg.msg">
            <img data-v-5679474e :src="`/chat/img/emojis/${msg.path}`" alt srcset class="img-emoji" />
          </div>
          <!-- <div class="msg-inside-sticker" :title="msg.msg">
            <img data-v-5679474e :src="`/chat/img/emojis/cool.gif`" alt srcset class="img-emoji" />
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/helper/father.js";
import { mapState, mapActions } from "vuex";

export default {
  props: ["msg", "index"],
  data() {
    return {
      menu: false,
      moment: this.$moment,
      picURL: process.env.VUE_APP_PICTURE_PROFILE
    };
  },
  mounted() {
    if (this.mobileMode)
      this.$refs.bubble.addEventListener("contextmenu", e =>
        e.preventDefault()
      );

    if (this.$props.msg.uid != this.myID) {
      this.setReadMessage({
        uid: this.myID,
        cid: this.$props.msg.cid,
        chatwith: this.$props.msg.uid,
        rid: this.$props.msg.rid
      });
    }

    let timer;
    let touchStart = () => {
      timer = setTimeout(() => {
        this.setBubblePopup(true);
        this.setPopupData(this.msg);
      }, 250);
    };

    this.$refs.touchMenu.addEventListener(
      "touchstart",
      () => {
        touchStart();
      },
      false
    );

    this.$refs.touchMenu.addEventListener(
      "touchend",
      () => {
        if (timer) clearTimeout(timer);
      },
      false
    );

    this.$refs.touchMenu.addEventListener(
      "touchmove",
      () => {
        if (timer) clearTimeout(timer);
      },
      false
    );
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Chat", ["message", "roomType"])
  },
  methods: {
    ...mapActions("Chat", ["setReadMessage"]),
    ...mapActions("Context", ["setBubblePopup", "setPopupData"]),
    checkTime(index, mydate) {
      let i;
      if (index > 0) {
        if (
          this.moment(this.message[index - 1].time).format("h:mm A") ==
          this.moment(this.message[index].time).format("h:mm A")
        ) {
          i = null;
        } else {
          i = mydate;
        }
      } else {
        i = mydate;
      }

      return i;
    },
    senderCheck(index, uid) {
      let i;
      if (index > 0) {
        if (this.message[index - 1].uid == this.message[index].uid) i = false;
        else i = true;
      } else {
        i = uid;
      }
      return i;
    },
    getFirstname(name) {
      return name.split(" ")[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/bubbles/bubble.scss";
</style>
