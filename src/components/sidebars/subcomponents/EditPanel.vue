<template>
  <div id="edit-panel">
    <div class="dismise" @click="floating"></div>
    <div class="edit-box">
      <div class="_title-box">
        <span>{{ title }}</span>
      </div>
      <div class="_control edit-able">
        <div :class="['input-box', focused ? 'input-border' : '']">
          <div
            class="input"
            ref="input"
            id="input"
            v-text="text"
            @keypress="prevent"
            @input="prevent"
            @focus="_focus"
            @blur="focused = false"
            contenteditable="true"
          ></div>
          <!-- End input -->
          <div class="ico-box">
            <span>{{counter}}</span>
          </div>
        </div>
        <!-- End input-box -->
      </div>
      <!-- End _control edit-able -->
      <div class="submit-box">
        <button role="button" @click="floating(0)">CANCEL</button>
        <button role="button" @click="floating(1)">SAVE</button>
      </div>
    </div>
    <!-- End edit-box -->
  </div>
  <!-- End edit-panel -->
</template>

<script>
export default {
  props: ["title", "text", "page"],
  data() {
    return {
      focused: false,
      textMax: 25,
      input: "",
      counter: 0
    };
  },
  mounted() {
    this.counter = this.textMax - this.text.length;
    setTimeout(() => {
      this._focus();
    }, 100);
  },
  methods: {
    floating(val) {
      if (val == 1) {
        this.$emit("save", {
          data: this.$refs.input.innerText,
          page: this.page
        });
      }
      this.$emit("floating", false);
    },
    prevent() {
      let value = this.$refs.input.innerText;
      this.counter = this.textMax - value.length;

      if (value.length >= this.textMax) event.preventDefault();
      if (event.keyCode != 8) event.preventDefault();
      if (event.keyCode == 13) event.preventDefault();
    },
    _focus() {
      this.focused = true;
      this.$refs.input.focus();
      let cell = this.$refs.input;
      let range;
      let selection;
      if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(cell);
        range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(cell);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
};
</script>

<style lane="scss" scoped>
#edit-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dismise {
  position: relative;
  flex: 1 1 auto;
}

.edit-box {
  position: relative;
  flex: 0 0 2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 1.4rem;
}

.input-border {
  border-bottom: solid 0.1rem rgb(228, 38, 38);
}

.edit-box .edit-able {
  margin-top: 2rem;
  flex: 0 0 2rem;
}

.edit-box .edit-able .input-box {
  height: 1.6rem;
}

.edit-box .edit-able .input-border {
  border-bottom: solid 0.1rem rgb(228, 38, 38);
}

.edit-box .edit-able .ico-box {
  font-size: 1rem;
  color: #6b6b6b;
}

.edit-box > ._title-box {
  flex: 0 0 1rem;
}

._control {
  flex: 1 1 auto;
}

.input-box {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1rem;
  height: 90%;
}

.edit-able .input-box {
  border-bottom: solid 0.08rem rgb(163, 163, 163);
}

.input {
  flex: 1 1 auto;
  outline: none;
  overflow-y: hidden;
  white-space: nowrap;
  display: inline;
}

.input::selection {
  background: rgb(238, 138, 138);
}

.icbox {
  position: relative;
  padding: 0.5rem 0;
  height: 100%;
  width: 2rem;
  box-sizing: border-box;
}

.ico-box {
  position: absolute;
  font-size: 0.8rem;
  color: #eb5050;
  right: 0;
}

.submit-box {
  flex: 0 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.6rem;
  margin-bottom: 0.18rem;
}

.edit-box > ._title-box > span {
  font-size: 1rem;
  font-weight: 600;
}

.submit-box > button {
  color: rgb(228, 38, 38);
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
}
</style>
