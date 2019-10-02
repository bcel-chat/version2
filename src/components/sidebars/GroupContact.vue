<template>
  <div id="contact">
    <div class="content-box">
      <transition-group
        :name="_participant ? 'flip-list' : ''"
        tag="div"
        :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
      >
        <template v-for="(item, index) in _participant">
          <div class="list-group" :key="index">
            <div class="alpha-box">
              <div class="alpha" :style="{color: colors}">{{item[0].alpha}}</div>
            </div>
            <!-- End alpha-box -->
            <template v-for="it in item">
              <div
                :key="it.uid"
                class="item-inbox"
                role="button"
                ref="itemInbox"
                @click="addParticipant(it.uid)"
              >
                <div class="avatar-inbox-panel">
                  <div class="avatar-inbox">
                    <img v-if="it.picture" :src="`${picURL+it.uid}/${it.picture}`" class="avatar" />
                    <img v-else src="@/assets/img/user.svg" class="avatar-default" />
                  </div>
                </div>
                <!-- End avatar-inbox-panel -->
                <div class="inbox-detail">
                  <div class="name-time-box">
                    <div class="sender-name-box">
                      {{ it.displayname }} |
                      <i>@{{ it.wlc_id }}</i>
                    </div>
                  </div>
                  <div class="msg-box">
                    <div class="msg">{{ it.desc }}</div>
                  </div>
                </div>
                <!-- inbox-detail -->
              </div>
              <!-- End item-inbox -->
            </template>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState, mapGetters } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      })
    };
  },
  watch: {
    txtSearch(val) {
      let fn = val.substring(1, 0);
      if (fn == "@")
        this.getParticipant({
          rid: this.roomID,
          uid: this.myID,
          _page: 3,
          text: val.substring(1, 5),
          fn: "@"
        });
      else
        this.getParticipant({
          rid: this.roomID,
          uid: this.myID,
          _page: 3,
          text: val,
          fn: ""
        });

      if (!val || val == "@")
        this.getParticipant({
          rid: this.roomID,
          uid: this.myID,
          _page: 1,
          text: "",
          fn: ""
        });
    }
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "txtSearch"]),
    ...mapGetters("Group", ["_participant"]),
    ...mapState("Group", ["participant", "participantAdded", "roomID"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick"]),
    ...mapActions("Group", ["getParticipant", "setParticipant"]),
    addParticipant(uid) {
      this.setParticipant({
        rid: this.roomID,
        uid: uid,
        assigner: this.myID,
        _page: 1
      });
      const list = ds.record.getList(`participant${this.myID}`);
      ds.record.getRecord("group").set(["type", "group"]);
      list.addEntry(uid);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Contact.scss";
.flip-list-move {
  transition: transform 1s;
}
</style>
