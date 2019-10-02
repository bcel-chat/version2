<template>
  <div id="bubble" :class="[checkTime(index, msg.time) != null ? 'new' : '']">
    <div
      :class="['bubble-container', msg.uid == myID ? 'out' : 'in']"
      @mouseover="menu = true"
      @mouseleave="menu = false"
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
                <img :src="`${picURL}/${msg.uid}/${msg.picture}`" class="avatar" v-if="msg.picture" />
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
              >{{ msg.uid == myID ? '' : `${msg.displayname},` }} {{moment(msg.time).format('h:mm A')}}</span>
            </div>
          </div>
        </div>
        <div
          :class="['msg-box', checkTime(index, msg.time) == null && !senderCheck(index, msg.uid) ? 'hide' : '', msg.uid == myID ? 'out' : 'in',]"
          @mousedown="func(msg.cid)"
          @mouseup="revert"
        >
          <div class="reply-box">
            <div class="reply-side">
              <div class="inside" v-if="mentionData">
                <div class="title-name">
                  <span>{{ mentionData.uid == myID ? 'You' : mentionData.displayname}}</span>
                </div>
                <div class="title-msg">
                  <span>{{mentionData.msg}}</span>
                </div>
              </div>
            </div>
            <div class="msg-inside">
              <span class="msg">{{ msg.msg }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/helper/father.js";
import { mapState, mapActions } from "vuex";
import LongPress from "@/mixins/LongPress.js";
import ds from "@/helper/deepstream";

export default {
  mixins: [LongPress],
  props: ["msg", "index"],
  data() {
    return {
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      menu: false,
      moment: this.$moment,
      mentionData: null
    };
  },
  beforeMount() {
    this.getMention(this.$props.msg);
    if (this.$props.msg.uid != this.myID) {
      this.setReadMessage({ uid: this.myID, cid: this.$props.msg.cid });
    }
  },
  computed: {
    ...mapState("Chat", ["message"]),
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("Chat", ["setReadMessage"]),
    ...mapActions("Context", ["setBubblePopup", "setPopupData"]),
    getMention(item) {
      ds.rpc.make(
        "getMention",
        {
          cid: item.cid,
          uid: item.uid,
          rid: item.rid
        },
        (err, data) => {
          if (!err) this.mentionData = data[0];
        }
      );
    },
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/bubbles/bubbleMention.scss";
</style>
