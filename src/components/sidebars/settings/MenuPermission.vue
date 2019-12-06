<template>
  <div id="menu-permission">
    <div class="header-box">
      <div class="back-button" role="button">
        <transition enter-active-class="animated zoomIn">
          <i
            class="material-icons"
            v-if="startUp"
            key="1"
            @click="setMenuPermission(false)"
            >{{ mobileMode ? "arrow_downward" : "close" }}</i
          >
        </transition>
      </div>
      <!-- End back-button -->
      <span class="title">Menu Permission</span>
    </div>

    <div class="_container">
      <transition enter-active-class="animated fadeInUp">
        <div class="_content" v-if="startUp">
          <div class="personal-panel">
            <div class="search-box">
              <input type="text" placeholder="Search" v-model="search" />
              <i
                class="material-icons"
                role="button"
                v-if="search"
                @click="clear"
                >close</i
              >
            </div>
            <transition
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutLeft"
            >
              <div class="detail" v-if="sResult">
                <div class="d-inside">
                  <span class="detail-label">ID:</span>
                  {{ sResult.wlc_id }}
                </div>
                <div class="d-inside">
                  <span class="detail-label">User Name:</span>
                  {{ sResult.uname }}
                </div>
                <div class="d-inside">
                  <span class="detail-label">Employee Name:</span>
                  {{ sResult.fullname }}
                </div>
              </div>
            </transition>
          </div>
          <template v-for="(item, index) in menuItems">
            <div class="control-panel" :key="index">
              <label class="label-box" role="button" :for="`chk-${item.id}`">{{
                `${++index}. ${item.title}`
              }}</label>
              <div class="checkbox" v-if="sResult">
                <input
                  :id="`chk-${item.id}`"
                  type="checkbox"
                  :checked="item.user"
                  @change="save(item, $event)"
                />
                <label :for="`chk-${item.id}`" class="chk-label"></label>
              </div>
            </div>
          </template>
        </div>
      </transition>
    </div>
    <!-- <div id="footer" role="button">save</div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import code from "@/helper/father.js";
export default {
  data() {
    return {
      startUp: false,
      search: "",
      items: [
        { id: 1, name: "Flexible Interest", user: 81 },
        { id: 2, name: "Product Search", user: "" }
      ]
    };
  },
  watch: {
    search(val) {
      this.searchUser({ text: val });
    }
  },
  mounted() {
    this.getMenuItem({
      user: "",
      text: "",
      _page: 1
    });
    setTimeout(() => {
      this.startUp = true;
    }, 500);
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Settings", ["sResult", "menuItems"])
  },
  methods: {
    ...mapActions("AppData", ["setMenuPermission"]),
    ...mapActions("Settings", ["searchUser", "getMenuItem", "menuPermission"]),
    clear() {
      this.search = "";
    },
    save(val, $event) {
      if ($event.target.checked)
        this.menuPermission({ mid: val.id, uid: this.sResult.uid, page: 1 });
      else this.menuPermission({ mid: val.id, uid: this.sResult.uid, page: 2 });
    }
  },
  beforeDestroy() {
    this.searchUser({ text: "" });
  }
};
</script>

<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/scss/sidebars/settings/MenuPermission.scss";
</style>
