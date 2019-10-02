import {
    mapActions
} from "vuex";

const longpress = {
    data() {
        return {
            timer: null,
            istrue: false,
            delay: 1000
        }
    },
    methods: {
        ...mapActions("Chat", ["getReplyBoxData", "setReplyBoxToggle"]),
        func(cid) {
            this.istrue = true;
            this.timer = setTimeout(() => {
                this.makeChange(cid);
            }, this.delay);
        },
        makeChange(cid) {
            if (this.timer)
                clearTimeout(this.timer);

            if (this.istrue) {
                this.getReplyBoxData({
                    cid: cid
                });
                this.setReplyBoxToggle({
                    toggle: true,
                    cid: cid
                });
            }
        },
        revert() {
            this.istrue = false;
        }
    }
}

export default longpress;