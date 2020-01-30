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
          v-if="display(index)"
        >
          <i class="material-icons">{{tab.icon}}</i>
        </span>
      </template>
    </div>
    <div class="emoji-tab">
      <div class="emoji-tab-inner">
        <template v-for="(emoji, index) in emojis">
          <div
            class="emoji"
            :title="index"
            :key="index"
            role="button"
            @click="send(emoji.name, index)"
          >
            <img class="img-emoji" :src="emoji.name" alt srcset />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { replace, indexOf, find } from "lodash";
export default {
  data() {
    return {
      indexDef: 0,
      recently: "",
      emojis: [],
      tabs: [
        {
          title: "Recent",
          icon: "access_time"
        },
        {
          title: "Emoji",
          icon: "sentiment_very_satisfied"
        }
      ]
    };
  },
  beforeMount() {
    if (!localStorage.getItem("recently")) {
      localStorage.setItem("recently", JSON.stringify(""));
    } else {
      this.emojis = JSON.parse(localStorage.getItem("recently"));
    }

    this.recently = JSON.parse(localStorage.getItem("recently"));
    if (!this.recently)
      this.emojis = JSON.parse(localStorage.getItem("emojis"));
  },
  methods: {
    selectIcon(val) {
      this.indexDef = val;
      if (val == 0) this.emojis = JSON.parse(localStorage.getItem("recently"));
      else this.emojis = JSON.parse(localStorage.getItem("emojis"));
    },
    send(name, index) {
      if (this.indexDef == 1) this.indexDef = 1;
      else this.indexDef = 0;

      if (JSON.parse(localStorage.getItem("recently")) == "") {
        this.recently = [];
        this.recently.push({ index: index, name: name });
        localStorage.setItem("recently", JSON.stringify(this.recently));
      } else {
        let arr2 = JSON.parse(localStorage.getItem("recently"));
        // this.recently.splice({ index: index, name: name }, 1);

        this.recently.push({ index: index, name: name });

        var res = this.recently.map(
          obj => arr2.find(o => o.index === obj.index) || obj
        );

        console.log(res);

        localStorage.setItem("recently", JSON.stringify(res));
      }
    },
    display(index) {
      if (index == 0)
        if (!this.recently) return false;
        else return true;
      else return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#emoji {
  position: relative;
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.header-tab {
  position: relative;
  display: flex;
  width: 100%;
  height: 2.5rem;
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
  width: 100%;
  overflow: auto;
  padding: 0.3rem;
  .emoji-tab-inner {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .emoji {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      margin: 6px;
      transition: all 0.2s;

      &:active {
        background-color: $primary-color;
      }

      @media screen and (min-width: 760px) {
        &:hover {
          background-color: $info-color;
        }
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