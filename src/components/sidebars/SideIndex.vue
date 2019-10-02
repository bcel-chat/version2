<template>
  <div id="side-index">
    <div :class="['side-container', mobileMode ? 'mobile' : 'desktop']">
      <div class="header">
        <div class="header-box">
          <div class="avatar-box" role="button" @click="showSideBar(true)">
            <img
              class="avatar"
              v-if="profile.picture"
              :src="`${picURL+profile.picture}`"
              alt
              draggable="false"
            />
            <img class="avatar-default" v-else src="@/assets/img/user.svg" />
          </div>
          <!-- End avatar-box -->
          <div class="user-detail-box">
            <div class="name-box" role="button" @click="showSideBar(true)">
              <span>{{ profile.name }}</span>
            </div>
            <div class="status-box" role="button" @click="showSideBar(true)">
              <span>{{ profile.about }}</span>
            </div>
          </div>
          <!-- End user-detail-box -->
          <div class="control-box">
            <div class="button-box">
              <div class="ico-box" role="button" @click="search(true)" title="Search">
                <i class="material-icons">search</i>
              </div>
            </div>
            <!-- End button-box -->
            <div class="button-box">
              <div class="ico-box" role="button" @click="showNewChat(true)" title="New chat">
                <i class="material-icons">chat</i>
              </div>
            </div>
            <!-- End button-box -->
          </div>
          <!-- End control-box -->
        </div>
        <!-- End header-box -->
        <transition
          tag="span"
          class="icbox"
          name="bounce-edit"
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <div class="search-box" v-if="searchToggle" :style="styling.all">
            <div class="header-box">
              <div class="search-icon-box" role="button" @click="search(false)">
                <i class="material-icons">arrow_back</i>
              </div>
              <!-- End search-icon-box -->
              <div class="search-input-box">
                <input
                  type="text"
                  ref="search"
                  placeholder="Search"
                  autofocus
                  v-model="Search"
                  class="search"
                />
              </div>
              <!-- End search-input-box -->
              <div class="search-icon-box" v-if="txtSearch" @click="clearSearch" role="button">
                <i class="material-icons">clear</i>
              </div>
              <!-- End search-icon-box -->
            </div>
            <!-- End header-box -->
          </div>
          <!-- End search-box -->
        </transition>
      </div>
      <!-- End header -->
      <transition-group tag="div" class="content" :name="tabAnimate">
        <Room v-if="tabActive == 0" :key="1" :style="tabStyle"></Room>
        <Contact v-else-if="tabActive == 1" :key="2" :style="tabStyle"></Contact>
        <Extension v-else-if="tabActive == 2" :key="3" :style="tabStyle"></Extension>
        <Notification v-else-if="tabActive == 3" :key="4" :style="tabStyle"></Notification>
      </transition-group>
      <div class="tab">
        <div class="tab-box">
          <template v-for="(item, index) in items">
            <div
              @click="activeTab(index)"
              role="button"
              :class="['tab-items', tabActive == index ? 'tab-active' : '']"
              :key="index"
            >
              <div class="item" role="button">
                <i class="material-icons">{{item.icon}}</i>
                <span role="button">{{item.name}}</span>
              </div>
              <!-- End items -->
            </div>
            <!-- End tab-items -->
          </template>
        </div>
        <!-- End tab-box -->
      </div>
      <!-- End tab -->
    </div>
    <!-- End side-container -->
  </div>
</template>

<script>
import Room from "@/components/sidebars/Room.vue";
import Contact from "@/components/sidebars/Contact.vue";
import Extension from "@/components/sidebars/Extension.vue";
import Notification from "@/components/sidebars/Notification.vue";
import { mapState, mapActions } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  components: {
    Room,
    Contact,
    Extension,
    Notification
  },
  data() {
    return {
      styling: {
        all: {
          animationDuration: ".2s"
        }
      },
      items: [
        {
          name: "Chat",
          icon: "chat_bubble"
        },
        {
          name: "Contact",
          icon: "contact_mail"
        },
        {
          name: "Modules",
          icon: "extension"
        },
        {
          name: "Notification",
          icon: "notification_important"
        }
      ],
      tabStyle: "animation-duration: 2s",
      tabAnimate: "",
      searchBox: false,
      Search: "",
      lollipop: false,
      lollipopStyle: "",
      imageValid: true
    };
  },
  watch: {
    Search(val) {
      this.setTxtSearch(val);
    }
  },
  beforeMount() {
    this.getRoom({
      id: this.myID,
      _page: 1,
      text: "",
      fn: ""
    });
    this.getContact({
      id: this.myID,
      _page: 1,
      text: "",
      fn: ""
    });
    ds.event.subscribe(`room/${this.myID}`, val => {
      this.getRoomContact(this.myID);
    });
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", [
      "mobileMode",
      "txtSearch",
      "searchToggle",
      "tabActive"
    ]),
    ...mapState("Settings", ["profile"]),
    ...mapState("Contact", ["contact"]),
    picURL() {
      return process.env.VUE_APP_PICTURE_PROFILE + this.myID + "/";
    }
  },
  methods: {
    ...mapActions("AppData", [
      "showSideBar",
      "showNewChat",
      "setTxtSearch",
      "setSearchToggle",
      "setTabActive"
    ]),
    ...mapActions("Contact", ["getContact"]),
    ...mapActions("Room", ["getRoom"]),
    onItemClick(e) {
      this.$emit("itemClicked", e);
    },
    activeTab(index) {
      if (index > this.tabActive) {
        this.tabAnimate = "slide-in-right";
      } else if (index < this.tabActive) {
        this.tabAnimate = "slide-in-left";
      }

      this.setTabActive(index);
    },
    search(e) {
      this.setSearchToggle(e);
      this.$nextTick(() => {
        this.clearSearch();
      });
    },
    clearSearch() {
      this.Search = "";
      if (this.searchBox) this.$refs.search.focus();
    },
    getRoomContact(id) {
      this.getRoom({
        id: id,
        _page: 1,
        text: "",
        fn: ""
      });
      this.getContact({
        id: id,
        _page: 1,
        text: "",
        fn: ""
      });
    },
    imgValid() {
      this.imageValid = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/SideIndex.scss";
.slide-in-right-enter-active,
.slide-in-left-enter-active {
  transition: all 0.2s ease;
}

.slide-in-right-leave-active,
.slide-in-left-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-in-right-enter,
.slide-in-right-leave-to {
  transform: translateX(300px);
  opacity: 0;
}

.slide-in-left-enter,
.slide-in-left-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}
</style>
