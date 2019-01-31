<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div id="canvas-pane" class="canvas-pane">
        <img src="~assets/img/zumen2.jpg" alt>
        <div
          v-for="furniture in furnitures"
          :key="furniture.id"
          class="furniture"
          :class="{active : furniture.moveable}"
          :style="`width:${furniture.width}px; height:${furniture.height}px; left:${paneX + furniture.x}px; top:${paneY + furniture.y}px; background-image: url('${furniture.texture}'); transform:rotate(${furniture.rotate}deg);`"
          @mousedown="mdown(furniture, $event)"
          @mousemove="mmove(furniture, $event)"
          @mouseup="mup(furniture, $event)"
          @click="printLocation(furniture)"
          @dblclick="mclick(furniture)"
        ></div>
      </div>
    </el-col>
  </el-row>
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
      paneY: 0
    };
  },
  props: ["furnitures"],
  methods: {
    printLocation(furniture) {
      console.log(furniture.name + " x:" + furniture.x + ", y:" + furniture.y);
    },
    mdown(furniture, event) {
      furniture.moveable = true;
    },
    mmove(furniture, event) {
      if (!furniture.moveable) return;

      let x = event.pageX - this.paneX - furniture.width / 2;
      let y = event.pageY - this.paneY - 70 - furniture.height / 2;

      if (x < 0) x = 0;
      if (y < 0) y = 0;

      furniture.x = x;
      furniture.y = y;
    },
    mup(furniture, event) {
      furniture.moveable = false;
    },
    mclick(furniture) {
      furniture.rotate += 90;
    }
  },
  mounted() {
    this.paneY = $("#canvas-pane").offset().top - 70;
    this.paneX = $("#canvas-pane").offset().left;
  },
  computed: {}
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


