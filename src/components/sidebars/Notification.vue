<template>
  <div id="notify">
    <!-- <button @click="onClick">Add</button> -->
    <div class="content-box">
      <transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <template v-for="(item, index) in _notification">
          <div
            :key="index"
            :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
          >
            <div class="alpha-box" key="0">
              <div class="alpha">{{item[0].module_name.toUpperCase()}}</div>
            </div>
            <!-- End alpha-box -->
            <transition-group enter-active-class="animated zoomIn">
              <template v-for="it in item">
                <router-link
                  :to="'/modules'+it.path"
                  :key="it.not_id"
                  :class="['item-inbox', it.active == 0 ? 'active' : '']"
                  role="button"
                  ref="itemInbox"
                  style="animation-duration: .3s"
                  @click.native="toActive({not_id: it.not_id, username: it.reciever, isActive: 1, module: it.module_name})"
                >
                  <div class="avatar-inbox-panel">
                    <div class="avatar-inbox">{{ it.module_name.substring(1, 0).toUpperCase() }}</div>
                  </div>
                  <!-- End avatar-inbox-panel -->
                  <div class="inbox-detail">
                    <div class="name-time-box">
                      <div class="sender-name-box">{{ it.title }}</div>
                      <!-- <div class="close-box" @click.stop="">
                      <i class="material-icons cl">close</i>
                      </div>-->
                    </div>
                    <div class="msg-box">
                      <div class="msg" :title="it.body">{{it.body}}</div>
                      <div class="time-box">
                        <span class="time">{{checkTime(it.time)}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- inbox-detail -->
                </router-link>
                <!-- End item-inbox -->
              </template>
            </transition-group>
          </div>
        </template>
      </transition-group>
    </div>
    <!-- End content-box -->
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState, mapGetters } from "vuex";
import { groupBy } from "lodash";
export default {
  data() {
    return {
      moment: this.$moment,
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
    ...mapState("Notification", ["notification"]),
    ...mapGetters("Notification", ["_notification"]),
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
    ...mapActions("Notification", ["isActive"]),
    onClick() {
      const value = {
        id: "003",
        name: "Spider-Man",
        msg: "Hi, I am Spider-Man",
        date: "Today",
        unread: 10
      };

      this.items.unshift(value);
    },
    checkTime(mydate) {
      const cw = this.moment(mydate).isSame(new Date(), "week");
      let week = "";
      if (cw) week = "dddd";
      else week = "DD/MM/YYYY";

      return this.moment(mydate).calendar(null, {
        sameDay: "h:mm A",
        lastDay: "[Yesterday]",
        lastWeek: week,
        sameElse: "DD/MM/YYYY"
      });
    },
    toActive(val) {
      this.onChatClick({ cnt: true, module: val.module });
      this.isActive(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Notification.scss";
</style>
