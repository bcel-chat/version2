<template>
  <div id="notify">
    <!-- <button @click="onClick">Add</button> -->
    <div class="content-box" v-if="false">
      <transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <template v-for="(item, index) in getContact">
          <div
            :key="index"
            :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
          >
            <div class="alpha-box" key="0">
              <div class="alpha">{{item[0].type.toUpperCase()}}</div>
            </div>
            <!-- End alpha-box -->
            <template v-for="it in item">
              <router-link
                :to="!moduleLink ? it.path : ''"
                :key="it.id"
                class="item-inbox"
                role="button"
                ref="itemInbox"
                @click.native="onChatClick({cnt: true, module: it.type})"
                style="animation-duration: .3s"
              >
                <div class="avatar-inbox-panel">
                  <div class="avatar-inbox">{{ it.name.substring(1, 0).toUpperCase() }}</div>
                </div>
                <!-- End avatar-inbox-panel -->
                <div class="inbox-detail">
                  <div class="name-time-box">
                    <div class="sender-name-box">{{ it.name }}</div>
                    <div class="close-box">
                      <i class="material-icons cl">close</i>
                    </div>
                  </div>
                  <div class="msg-box">
                    <div class="msg">{{ it.msg }}</div>
                    <div class="time-box">{{ it.date }}</div>
                  </div>
                </div>
                <!-- inbox-detail -->
              </router-link>
              <!-- End item-inbox -->
            </template>
          </div>
        </template>
      </transition-group>
    </div>
    <!-- End content-box -->
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState } from "vuex";
import { groupBy } from "lodash";
export default {
  data() {
    return {
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      }),
      items: [
        {
          id: "001",
          type: "Flexible Interest",
          name: "Thanos",
          msg: "I am Thanossssssssssssssssssssssssssssssssssssssssssss",
          date: "Today",
          unread: 5,
          path: "/flexible"
        },
        {
          id: "002",
          type: "User Config",
          name: "Groot",
          msg: "I am Groot",
          date: "Today",
          unread: 10,
          path: ""
        },
        {
          id: "003",
          type: "User Config",
          name: "Groot",
          msg: "I am Groot",
          date: "Today",
          unread: 10,
          path: ""
        }
      ]
    };
  },
  computed: {
    ...mapState("AppData", ["mobileMode", "moduleLink"]),
    getContact() {
      // let i = this.items.filter(item => {
      //   return (
      //     item.name.toLowerCase().indexOf(this.items[0].name.toLowerCase()) !==
      //     -1
      //   );
      // });
      return groupBy(this.items, "type");
    }
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "setModuleLink"]),
    onClick() {
      const value = {
        id: "003",
        name: "Spider-Man",
        msg: "Hi, I am Spider-Man",
        date: "Today",
        unread: 10
      };

      this.items.unshift(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Notification.scss";
</style>
