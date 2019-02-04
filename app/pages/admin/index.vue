<template>
  <div class="container">
    <div class="overlay" :style="`height:${mainHeight}px;`"></div>
    <el-row style="padding-top:20px;" :gutter="20">
      <el-col :span="11" :offset="7">
        <el-form label-width="160px" label-position="left">
          <el-form-item label="顧客名">
            <el-col :span="11">
              <el-input v-model="userData.name" disabled/>
            </el-col>
            <el-col :span="11">様</el-col>
          </el-form-item>
          <el-form-item label="入居先住所">
            <el-col :span="16">
              <el-input v-model="homeData.address" disabled/>
            </el-col>
          </el-form-item>
          <el-form-item label="集荷日">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="userData.pickup_date"
                style="width: 100%;"
                disabled
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="集荷内容">
            <el-col :span="24">
              <el-collapse accordion @change="setNextHeight">
                <el-collapse-item title="集荷家具一覧" name="1">
                  <el-table :data="pickup_list" stripe height="250" style="width: 100%">
                    <el-table-column prop="name" label="種別" width="180"></el-table-column>
                    <el-table-column prop="piece" label="個数" width="180"></el-table-column>
                    <el-table-column prop="details" label="備考"></el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-form-item>
          <el-form-item label="入居日">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="userData.movein_date"
                style="width: 100%;"
                disabled
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="フロアデザイン">
            <el-col :span="24">
              <move-furniture
                :furnitures="showFurniture"
                :homeData="homeData"
                :img_rate="img_rate"
                :moveable="false"
                :leftmargin="20"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="備考">
            <el-col :span="24">
              <el-input type="textarea" :rows="3" v-model="userData.description"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <br>
    <el-row :gutter="20">
      <el-col :span="11" :offset="7">
        <!-- <el-button type="primary">確認完了</el-button>
        <el-button>Cancel</el-button>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import MoveFurniture from "~/components/MoveFurniture";
export default {
  layout: "admin",
  data() {
    return {
      catalogs: [],
      category: [],
      furnitures: [],
      homeData: {},
      userData: {},
      devmode: true,
      furniture_mode: "2D",
      nextHeight: 1000,
      mainHeight: 1000,
      img_rate: 1,
      pickup_list: [
        {
          name: "エアコン",
          piece: 1,
          details: "取り付け可能確認済み"
        },
        {
          name: "食器",
          piece: 30,
          details: "戸棚へ"
        },
        {
          name: "電子レンジ",
          piece: 1,
          details: "台所へ配置"
        }
      ]
    };
  },
  components: {
    MoveFurniture
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
      this.saveFurnitures(this.catalogs);
      this.$refs.modal.open();
    },
    setNextHeight() {
      this.mainHeight = this.nextHeight;
      this.nextHeight = $("main").height();
    },
    ...mapMutations(["saveFurnitures"]),
    ...mapGetters([
      "loadCatalogs",
      "getFurnitures",
      "getCategories",
      "getHomeData",
      "getUserData"
    ])
  },
  computed: {
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
    },
    myFurnitures() {
      let furnitures = [];
      this.furnitures.some(furniture => {
        return !furniture.isBuy ? furnitures.push(furniture) : false;
      });
      return furnitures;
    }
  },
  created() {
    this.catalogs = this.loadCatalogs();
    this.category = this.getCategories();
    this.furnitures = this.getFurnitures();
    this.homeData = this.getHomeData();
    this.userData = this.getUserData();
  },
  mounted() {
    this.mainHeight = $("main").height();
    this.img_rate = $("#floor-image").width() / this.homeData.floor.baseX;
    this.myFurnitures.forEach(furniture => {
      this.pickup_list.push({
        price: 1,
        ...furniture
      });
    });
  }
};
</script>

<style lang="scss">
body {
  overflow: scroll !important;
}
</style>


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

.el-input.is-disabled .el-input__inner {
  color: black;
}
.el-collapse-item__header {
  padding-left: 10px;
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
