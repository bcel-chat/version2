<template>
  <div id="bubble-date">
    <div class="bubble-container date">
      <span class="line">
        <div class="line-inside"></div>
        <div class="date-box">{{mydate}}</div>
        <div class="line-inside"></div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {
      moment: this.$moment
    };
  },
  computed: {
    mydate() {
      let cw = this.moment(this.$props.msg).isSame(new Date(), "day");
      let week = "";
      if (cw) week = "dddd";
      else week = "DD/MM/YYYY";

      return this.moment(this.$props.msg).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: week,
        sameElse: "DD/MM/YYYY"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bubble-container.date {
  .line {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    padding: 10px 0px 0px;

    .date-box {
      font-size: 0.75rem;
      padding: 0.3rem 0.6rem;
      line-height: 100%;
    }

    .line-inside {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      align-items: stretch;
      height: 1px;
      opacity: 0.4;
      margin: 0 0.3rem;
      background-color: rgb(172, 172, 172);
    }
  }
}
</style>
