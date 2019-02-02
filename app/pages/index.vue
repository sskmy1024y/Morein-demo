<template>
  <div class="container">
    <div class="overlay" :style="`height:${mainHeight}px;`"></div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <move-furniture
          :furnitures="showFurniture"
          :homeData="homeData"
          :img_rate="img_rate"
          :moveable="true"
        />
      </el-col>
    </el-row>
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
        <p>部屋デザインを保存しました</p>
        <el-button type="info" plain @click="$refs.modal.close()">編集画面に戻る</el-button>
        <el-button type="primary" @click="pushAdmin">次へ進む</el-button>
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
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import MoveFurniture from "~/components/MoveFurniture";
import FurnitureList from "~/components/FurnitureList";
export default {
  data() {
    return {
      catalogs: [],
      category: [],
      furnitures: [],
      homeData: [],
      devmode: true,
      furniture_mode: "2D",
      mainHeight: 1000,
      img_rate: 1
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
      this.catalogs.some(catalog => {
        return catalog.id == id ? (catalog.display = !catalog.display) : false;
      });
    },
    saveDemo() {
      this.saveCatalogs(this.catalogs);
      this.$refs.modal.open();
    },
    pushAdmin() {
      this.$router.push("/admin");
    },
    ...mapMutations(["saveCatalogs"]),
    ...mapGetters([
      "loadCatalogs",
      "getFurnitures",
      "getCategories",
      "getHomeData"
    ])
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
  created() {
    this.catalogs = this.loadCatalogs();
    this.category = this.getCategories();
    this.furnitures = this.getFurnitures();
    this.homeData = this.getHomeData();
  },
  mounted() {
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

    this.mainHeight = $("main").height();
    this.img_rate = $("#floor-image").width() / this.homeData.floor.baseX;
    console.log(this.mainHeight);
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
  margin-bottom: 80px;
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
