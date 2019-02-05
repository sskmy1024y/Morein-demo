<template>
  <div id="canvas-pane" class="canvas-pane">
    <img id="floor-image" :src="homeData.floor.image" alt>
    <div
      v-for="furniture in furnitures"
      :key="furniture.id"
      class="furniture"
      :class="{active : furniture.moveable}"
      :style="`width:${furniture.width * img_rate}px; height:${furniture.height * img_rate}px; left:${paneX + furniture.x * img_rate}px; top:${paneY + furniture.y * img_rate}px; background-image: url('${furniture.texture}'); transform:rotate(${furniture.rotate}deg);`"
      @mousedown="mdown(furniture, $event)"
      @mousemove="mmove(furniture, $event)"
      @mouseup="mup(furniture, $event)"
      @click="printLocation(furniture)"
      @dblclick="mclick(furniture)"
    ></div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  head() {
    return {
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
        }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto"
        }
      ]
    };
  },
  data() {
    return {
      paneX: 0,
      paneY: 0,

      movefixmode: false
    };
  },
  props: ["furnitures", "homeData", "img_rate", "moveable", "leftmargin"],
  methods: {
    printLocation(furniture) {
      console.log(furniture.name + " x:" + furniture.x + ", y:" + furniture.y);
    },
    mdown(furniture, event) {
      if (!this.moveable) return;
      furniture.moveable = true;
    },
    mmove(furniture, event) {
      if (!furniture.moveable || !this.moveable) return;

      let x =
        (event.pageX - this.paneX - (furniture.width * this.img_rate) / 2) /
        this.img_rate;
      let y =
        (event.pageY -
          $("#canvas-pane").offset().top -
          (furniture.height * this.img_rate) / 2) /
        this.img_rate;

      if (x < 0) x = 0;
      if (y < 0) y = 0;

      furniture.x = x;
      furniture.y = y;
    },
    mup(furniture, event) {
      if (!this.moveable) return;
      furniture.moveable = false;
    },
    mclick(furniture) {
      if (!this.moveable) return;
      furniture.rotate += 90;
    }
  },
  mounted() {
    // this.paneY = $("#canvas-pane").offset().top;
    this.paneY = 30;
    this.paneX = this.leftmargin
      ? this.leftmargin
      : $("#canvas-pane").offset().left;

    // トップで固定
    if (this.movefixmode) {
      let pane = $("#canvas-pane"),
        offset = pane.offset(),
        width = pane.outerWidth();
      const obj = $(
        `<div id="temp_obj" style="width:${width}px; height:${pane.outerHeight() +
          60}px; position:relative;" />`
      );
      $(window).scroll(() => {
        if ($(window).scrollTop() > offset.top - 10) {
          pane.after(obj);
          pane.css("width", width + "px");
          pane.addClass("fixed");
        } else {
          $("#temp_obj") ? $("#temp_obj").remove() : false;
          pane.removeClass("fixed");
        }
      });
    }
  }
};
</script>


<style lang="scss">
.canvas-pane {
  width: 100%;
  min-height: 400px;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  // background-image: url("~assets/img/zumen2.jpg");
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: auto 100%;
  z-index: 99;
  img {
    width: 100%;
  }
  &.fixed {
    position: fixed;
    top: 0;
    padding-left: 10px;

    z-index: 10000;
    .furniture {
      position: fixed !important;
      margin-left: 10px;
    }
  }
}
.furniture {
  position: absolute;
  border: 1px solid #666;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 100;
  &.active {
    border: 2px double red;
    cursor: pointer !important;
  }
}
</style>


