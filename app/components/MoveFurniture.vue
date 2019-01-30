<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div id="canvas-pane" class="canvas-pane">
        <div
          v-for="furniture in furnitures"
          :key="furniture.id"
          class="furniture"
          :class="{active : furniture.moveable}"
          :style="`width:${furniture.width}px; height:${furniture.height}px; left:${paneX + furniture.x}px; top:${paneY + furniture.y}px; background-image: url('${furniture.texture}'); transform:rotate(${furniture.rotate}deg);`"
          @mousedown="mdown(furniture, $event)"
          @mousemove="mmove(furniture, $event)"
          @mouseup="mup(furniture, $event)"
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
      paneY: 0,
      furnitures: [
        {
          name: "ベッド",
          width: 100,
          height: 120,
          x: 43,
          y: 21,
          rotate: -90,
          texture:
            "http://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNWVZFc0V2N3dVUjRtZlZNRnVSVC9PVGw0Ym82eHV1Rm1ac1ZJK2VjQ1NkUEpLbDZxZnFBMGFWbmxwMnd6eDF2cGU4ZXpPRXNKUjliczhxekZpZXhZUVp1YWt0ZmQyb05obnBEN2NoTUxTaUtFNmRzV29hL3RpMDJDUCtJZU1RRnhaQlBMOXVRN3d5dUxxbkZSTzJwLzVOdnFLOVY2MzRGRFJ4eE5KdmgzVE9rdz09?square=0",
          moveable: false
        }
      ]
    };
  },
  methods: {
    mdown(furniture, event) {
      furniture.moveable = true;
    },
    mmove(furniture, event) {
      if (!furniture.moveable) return;
      let x = event.pageX - furniture.width / 2 - this.paneX;
      let y = event.pageY - furniture.height / 2 - this.paneY;
      // if (this.paneX > x) x = this.paneX;
      // if (this.paneY < y) y = this.paneY;
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
    this.paneY = $("#canvas-pane").offset().top;
    this.paneX = $("#canvas-pane").offset().left;
  },
  computed: {}
};
</script>


<style lang="scss">
.canvas-pane {
  width: 100%;
  height: 400px;
  background-image: url("~assets/img/zumen.jpg");
  background-repeat: no-repeat;
  background-size: auto 100%;
}
.furniture {
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  &.active {
    cursor: pointer !important;
  }
}
</style>


