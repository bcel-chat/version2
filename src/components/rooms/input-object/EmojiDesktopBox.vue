<template>
  <div id="emoji">
    <div class="header-tab">
      <template v-for="(tab, index) in tabs">
        <span
          :title="tab.title"
          :key="index"
          :class="['tab', indexDef == index ? 'active' : '']"
          @click="selectIcon(index)"
          role="button"
        >
          <i class="material-icons">{{tab.icon}}</i>
        </span>
      </template>
    </div>
    <div class="emoji-tab">
      <div class="example-box">
        <div class="sticker">
          <img
            data-v-5679474e
            :src="[`/chat/img/emojis/${sampleSticker.src}`]"
            alt
            srcset
            class="img-emoji"
          />
        </div>
        <div class="sticker-name">{{sampleSticker.name}}</div>
      </div>
      <div class="emoji-tab-inner">
        <template v-for="(emoji, index) in emojis">
          <div
            class="emoji"
            :title="emoji.name"
            :key="index"
            role="button"
            @mouseover="showSticker(emoji)"
            @click="send(emoji)"
          >
            <img class="img-emoji" :src="emoji.path" alt srcset />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      indexDef: 0,
      recently: [],
      sampleSticker: {
        name: "Happy",
        src: "001-happy.svg"
      },
      emojis: JSON.parse(localStorage.getItem("emojis")),
      tabs: [
        {
          title: "Emoji",
          icon: "sentiment_very_satisfied"
        }
      ]
    };
  },
  watch: {
    room() {
      //this.reloadData();
    }
  },
  mounted() {
    this.recently = JSON.parse(localStorage.getItem("recently"));
  },
  computed: {
    ...mapState("Room", ["userRoom", "room"]),
    ...mapState("Chat", ["roomType", "roomID"]),
    ...mapState("Group", ["participantId"]),
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("AppData", [
      "setSearchToggle",
      "setTabActive",
      "showNewChat"
    ]),
    ...mapActions("Chat", ["setMessage"]),
    ...mapActions("Room", ["setRoom", "setRoomActive"]),
    selectIcon(val) {
      this.indexDef = val;
    },
    showSticker(val) {
      this.sampleSticker = val;
    },
    send(val) {
      this.setMessage({
        msg: val.name,
        type: 5,
        chatwith: this.userRoom.uid,
        rtype: this.roomType,
        path: val.src
      });
      setTimeout(() => {
        this.reloadData();
      }, 100);
    },
    reloadData() {
      let id = Math.random()
        .toString(6)
        .substr(2, 4);

      ds.event.emit(`room/${this.userRoom.uid}`, this.roomID);
      ds.event.emit(`chatroom/${this.roomID}`, this.roomID);

      ds.record
        .getRecord(`message`)
        .set(`chatroom/${this.roomID}`, { rid: this.roomID, mid: id });

      this.setTabActive(0);
      // this.notify();
      this.clear();

      if (this.roomType == 2)
        this.participantId.forEach(e => {
          ds.event.emit(`room/${e.uid}`, this.roomID);
        });
    },
    clear() {
      setTimeout(() => {
        ds.event.emit(`scroller/${this.roomID}`, {
          rid: this.roomID,
          uid: this.myID,
          page: 2
        });
      }, 500);
      this.setSearchToggle(false);
      this.showNewChat(false);
      this.setRoomActive({
        status: true,
        rid: this.roomID
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#emoji {
  position: relative;
  width: 100%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.header-tab {
  position: relative;
  display: flex;
  width: 100%;
  height: 2.5rem;
  background-color: $info-color;
  .tab {
    display: flex;
    align-items: center;
    color: #9faabd;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  .active {
    color: $secondary-color;
    border-bottom: solid 2px $primary-color;
  }
}
.emoji-tab {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  overflow: hidden;
  padding: 0.3rem;
  background-color: white;
  border-radius: 0.2rem;

  .example-box {
    position: relative;
    flex: 0 0 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: solid 1px #c4cbd8;
    margin-right: 0.6rem;
    .sticker {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 6rem;
      margin: 2px;
      padding: 5px;
      transition: all 0.2s;

      .img-emoji {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .sticker-name {
      margin-top: 0.5rem;
      color: #5b6169;
    }
  }

  .emoji-tab-inner {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    .emoji {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      margin: 2px;
      padding: 5px;
      transition: all 0.2s;

      &:hover {
        background-color: #dae4f560;
        border-radius: 3px;
        box-shadow: inset 0px 0px 4px 1px rgba(32, 52, 65, 0.3);
      }

      &:active {
        background-color: #a1adc2c5;
      }

      .img-emoji {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>