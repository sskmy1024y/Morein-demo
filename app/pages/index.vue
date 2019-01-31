<template>
  <div class="container">
    <div class="overlay" :style="`height:${mainHeight}px;`"></div>
    <move-furniture :furnitures="showFurniture"/>
    <br>

    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-switch
          style="float: right;"
          v-model="furniture_mode"
          active-text="3D view"
          inactive-text="2D view"
        ></el-switch>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="5" :offset="7">
        <el-button class="large-button" type="success">自分の家具を追加</el-button>
      </el-col>
      <el-col :span="5">
        <el-button class="large-button" type="primary" @click="saveDemo">保存する</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col class="furniture-lists" :span="12">
        <el-row :gutter="20">
          <furniture-list
            v-for="list in setLists"
            :key="list.id"
            :list="list"
            @selectFurniture="selectFurniture"
            @changeDisplay="changeDisplay"
          />
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <sweet-modal ref="modal" width="50%" icon="success">
      <div class="main">
        <p>保存しました</p>
        <el-button type="primary" @click="$refs.modal.close()" round>OK</el-button>
      </div>
    </sweet-modal>

    <div id="devtool" v-show="devmode">
      <p style="text-align:center;">開発者モード</p>
      <div id="devmessage"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import MoveFurniture from "~/components/MoveFurniture";
import FurnitureList from "~/components/FurnitureList";
export default {
  data() {
    return {
      catalogs: [
        {
          id: 1,
          category: 1,
          selected: null,
          display: true
        },
        {
          id: 2,
          category: 2,
          selected: null,
          display: true
        },
        {
          id: 3,
          category: 3,
          selected: null,
          display: true
        },
        {
          id: 4,
          category: 4,
          selected: null,
          display: true
        },
        {
          id: 5,
          category: 5,
          selected: null,
          display: true
        }
      ],
      category: [
        {
          id: 1,
          name: "bed"
        },
        {
          id: 2,
          name: "tv"
        },
        {
          id: 3,
          name: "desk"
        },
        {
          id: 4,
          name: "chair"
        },
        {
          id: 5,
          name: "refrigerator"
        }
      ],
      furnitures: [
        {
          id: 1001,
          name: "シングル用ウッドベッド",
          description: "シンプルなウッドベッドです。",
          width: 110,
          height: 200,
          x: 579,
          y: 184,
          rotate: 90,
          texture: require("@/assets/img/bed1.jpeg"),
          image: require("@/assets/img/bed1.jpeg"),
          moveable: false,
          category: 1
        },
        {
          id: 1011,
          name: "シングル用ウッドベッド2",
          description: "シンプルなウッドベッドです。",
          width: 100,
          height: 200,
          x: 584,
          y: 188,
          rotate: 90,
          texture: require("@/assets/img/bed2.jpeg"),
          image: require("@/assets/img/bed2.jpeg"),
          moveable: false,
          category: 1
        },
        {
          id: 1021,
          name: "ダブルベッド",
          width: 200,
          height: 160,
          x: 522,
          y: 209,
          rotate: 0,
          texture:
            "https://egood.fs-storage.jp/fs2cabinet/i_l/i_lex_f_d/i_lex_f_d-m-01-dl.jpg",
          image:
            "https://egood.fs-storage.jp/fs2cabinet/i_l/i_lex_f_d/i_lex_f_d-m-01-dl.jpg",
          moveable: false,
          category: 1
        },
        {
          id: 1003,
          name: "テレビ",
          width: 140,
          height: 40,
          x: 400,
          y: 36,
          rotate: 0,
          texture: require("@/assets/img/tv1.jpg"),
          image: require("@/assets/img/tv1.jpg"),
          moveable: false,
          category: 2
        },
        {
          id: 1013,
          name: "4Kテレビ",
          width: 140,
          height: 40,
          x: 393,
          y: 39,
          rotate: 0,
          texture: require("@/assets/img/tv2.jpg"),
          image: require("@/assets/img/tv2.jpg"),
          moveable: false,
          category: 2
        },
        {
          id: 1023,
          name: "カラーテレビ",
          width: 100,
          height: 70,
          x: 411,
          y: 36,
          rotate: 0,
          texture: require("@/assets/img/tv3.jpg"),
          image: require("@/assets/img/tv3.jpg"),
          moveable: false,
          category: 2
        },
        {
          id: 1004,
          name: "デスク",
          width: 160,
          height: 60,
          x: 573,
          y: 36,
          rotate: 0,
          texture:
            "https://images-na.ssl-images-amazon.com/images/I/71imPndfHSL._SL1500_.jpg",
          image:
            "https://images-na.ssl-images-amazon.com/images/I/71imPndfHSL._SL1500_.jpg",
          moveable: false,
          category: 3
        },
        {
          id: 1005,
          name: "チェア",
          width: 75,
          height: 70,
          x: 612,
          y: 66,
          rotate: 0,
          texture: require("@/assets/img/chair1.jpg"),
          image: require("@/assets/img/chair1.jpg"),
          moveable: false,
          category: 4
        },
        {
          id: 1006,
          name: "6ドア冷蔵庫",
          width: 70,
          height: 65,
          x: 296,
          y: 273,
          rotate: 0,
          texture: require("@/assets/img/refrigerator1.jpg"),
          image: require("@/assets/img/refrigerator1.jpg"),
          moveable: false,
          category: 5
        }
      ],
      devmode: true,
      furniture_mode: "2D",
      mainHeight: 1000
    };
  },
  components: {
    MoveFurniture,
    FurnitureList
  },
  methods: {
    selectFurniture({ list, furniture }) {
      this.catalogs.some(catalog => {
        return catalog.id == list ? (catalog.selected = furniture) : false;
      });
    },
    changeDisplay(id) {
      console.log(id);

      this.catalogs.some(catalog => {
        return catalog.id == id ? (catalog.display = !catalog.display) : false;
      });
    },
    saveDemo() {
      this.$refs.modal.open();
    }
  },
  computed: {
    setLists() {
      let catalogs = [];
      this.catalogs.forEach(catalog => {
        let _data = {
          furnitures: [],
          ...catalog
        };
        this.furnitures.forEach(furniture => {
          if (catalog.selected == furniture.id) {
            _data.furnitures.unshift(furniture);
          } else if (catalog.category == furniture.category) {
            _data.furnitures.push(furniture);
          }
        });
        if (!catalog.selected) catalog.selected = _data.furnitures[0].id;
        catalogs.push(_data);
      });
      return catalogs;
    },
    showFurniture() {
      let furnitures = [];
      this.catalogs.forEach(catalog => {
        this.furnitures.some(furniture => {
          return catalog.selected == furniture.id && catalog.display
            ? furnitures.push(furniture)
            : false;
        });
      });
      return furnitures;
    }
  },
  mounted() {
    this.mainHeight = $("main").height();
    console.log(this.mainHeight);

    if (this.devmode) {
      console["log"] = message => {
        let msg = "";
        if (typeof message === "object") {
          msg =
            "<details><summary>" +
            message +
            "</summary>" +
            JSON.stringify(message, undefined, 1) +
            "</details>";
        } else {
          msg = message;
        }
        $("#devmessage").append("<p>" + msg + "</p>");
        $("#devmessage").scrollTop(99999);
      };
    } else {
      console["log"] = function() {};
    }
  }
};
</script>

<style lang="scss" scope>
.overlay {
  width: 56%;
  margin-left: 21%;
  overflow: hidden;
  position: absolute;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(255, 243, 223, 0.6);
}

.large-button {
  width: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.furniture-lists {
  // overflow-x: scroll;
  // height: 40vh;
}

#devtool {
  position: fixed;
  top: 60px;
  right: 0;
  color: white;
  width: 300px;
  min-height: 50px;
  background: rgba(0, 0, 0, 0.5);
  #devmessage {
    height: 100%;
    max-height: 75vh;
    overflow-y: scroll;
  }
}
</style>
