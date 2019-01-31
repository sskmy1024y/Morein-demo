<template>
  <div class="container">
    <div class="overlay"></div>
    <move-furniture :furnitures="showFurniture"/>
    <br>
    <el-row :gutter="20">
      <el-col :span="5" :offset="7">
        <el-button class="large-button" type="success">自分の家具を追加</el-button>
      </el-col>
      <el-col :span="5">
        <el-button class="large-button" type="primary" @click="saveDemo">保存する</el-button>
      </el-col>
    </el-row>
    <br>
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
  </div>
</template>

<script>
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
        }
      ],
      category: [
        {
          id: 1,
          name: "bed",
          display: true
        },
        {
          id: 2,
          name: "tv",
          display: true
        },
        {
          id: 3,
          name: "desk",
          display: true
        },
        {
          id: 4,
          name: "chair",
          display: true
        }
      ],
      furnitures: [
        {
          id: 1001,
          name: "ベッド",
          width: 160,
          height: 280,
          x: 582,
          y: 149,
          rotate: 90,
          texture:
            "http://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNWVZFc0V2N3dVUjRtZlZNRnVSVC9PVGw0Ym82eHV1Rm1ac1ZJK2VjQ1NkUEpLbDZxZnFBMGFWbmxwMnd6eDF2cGU4ZXpPRXNKUjliczhxekZpZXhZUVp1YWt0ZmQyb05obnBEN2NoTUxTaUtFNmRzV29hL3RpMDJDUCtJZU1RRnhaQlBMOXVRN3d5dUxxbkZSTzJwLzVOdnFLOVY2MzRGRFJ4eE5KdmgzVE9rdz09?square=0",
          image:
            "http://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNWVZFc0V2N3dVUjRtZlZNRnVSVC9PVGw0Ym82eHV1Rm1ac1ZJK2VjQ1NkUEpLbDZxZnFBMGFWbmxwMnd6eDF2cGU4ZXpPRXNKUjliczhxekZpZXhZUVp1YWt0ZmQyb05obnBEN2NoTUxTaUtFNmRzV29hL3RpMDJDUCtJZU1RRnhaQlBMOXVRN3d5dUxxbkZSTzJwLzVOdnFLOVY2MzRGRFJ4eE5KdmgzVE9rdz09?square=0",
          moveable: false,
          category: 1
        },
        {
          id: 1002,
          name: "ベッド2",
          width: 280,
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
          id: 1011,
          name: "ベッド3",
          width: 280,
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
          x: 466,
          y: 40,
          rotate: 0,
          texture:
            "http://www.jp-aiwa.com/wp-content/uploads/2018/01/p_tv-32h10.png",
          image:
            "http://www.jp-aiwa.com/wp-content/uploads/2018/01/p_tv-32h10.png",
          moveable: false,
          category: 2
        },
        {
          id: 1013,
          name: "テレビ",
          width: 140,
          height: 40,
          x: 466,
          y: 40,
          rotate: 0,
          texture:
            "http://www.jp-aiwa.com/wp-content/uploads/2018/01/p_tv-32h10.png",
          image:
            "http://www.jp-aiwa.com/wp-content/uploads/2018/01/p_tv-32h10.png",
          moveable: false,
          category: 2
        },
        {
          id: 1004,
          name: "デスク",
          width: 160,
          height: 60,
          x: 636,
          y: 40,
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
          x: 678,
          y: 67,
          rotate: 0,
          texture:
            "https://www.nitori-net.jp/wcsstore/ec/Static/category/Chair/ctg200X200/WorkChair.jpg",
          image:
            "https://www.nitori-net.jp/wcsstore/ec/Static/category/Chair/ctg200X200/WorkChair.jpg",
          moveable: false,
          category: 4
        }
      ]
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
  }
};
</script>

<style lang="scss" scope>
body {
  overflow: hidden;
}

.overlay {
  width: 56%;
  height: 90vh;
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
  overflow-x: scroll;
  height: 40vh;
}
</style>
