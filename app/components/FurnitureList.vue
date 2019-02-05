<template>
  <el-col class="furniture-list" :span="12" :offset="0">
    <el-row
      :gutter="10"
      class="main-furniture"
      :class="{active: list.furnitures[0].moveable, myfurniture: !list.furnitures[0].isBuy}"
    >
      <el-col :span="1">
        <input type="checkbox" v-model="list.display" @click="$emit('changeDisplay',list.id)">
      </el-col>
      <el-col :span="7" style="height:1px;">
        <div
          :class="{ribbon: !list.furnitures[0].isBuy, 'ribbon-top-right':!list.furnitures[0].isBuy}"
        >
          <span v-show="!list.furnitures[0].isBuy">持込家具</span>
          <img :src="list.furnitures[0].image" alt class="furniture-image">
        </div>
      </el-col>
      <el-col :span="12" :offset="1">
        <div class="title">{{list.furnitures[0].name}}</div>

        <p
          v-show="(list.furnitures[0].price)"
        >価格:&nbsp;&yen;{{ toLocaleString(list.furnitures[0].price) }}</p>
        <p>サイズ:&nbsp;w:{{ list.furnitures[0].width }} h:{{ list.furnitures[0].height }} d:x</p>
      </el-col>
    </el-row>
    <div class="more-furniture" v-if="moreLists.length > 0">
      <div v-for="furniture in moreLists" :key="furniture.id" class="more">
        <img
          :src="furniture.image"
          @click="$emit('selectFurniture', {list: list.id, furniture: furniture.id})"
          alt
        >
      </div>
      <a href="#" class="morelabel">もっと見る</a>
    </div>
  </el-col>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    toLocaleString(num) {
      return typeof num == "number" ? num.toLocaleString() : num;
    }
  },
  computed: {
    moreLists() {
      let lists = [];
      this.list.furnitures.forEach((furniture, index) => {
        if (index > 0) lists.push(furniture);
      });
      return lists;
    }
  }
};
</script>


<style lang="scss" scoped>
.furniture-list {
  height: 240px;
  margin-bottom: 10px;
  // overflow: none;
  .main-furniture {
    margin: 10px;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 5px;
    height: 124px;
    .furniture-image {
      margin-top: 2px;
      width: 120px;
      max-height: 118px;
    }
    .title {
      height: 60px;
      font-size: 20px;
      line-height: 2em;
    }
    p {
      width: 100%;
      line-height: 1.5em;
      border-bottom: 0.5px solid #ddd;
    }
    &.active {
      border: 2px double red;
      background-color: rgb(255, 179, 179) !important;
    }
    &.myfurniture {
      background-color: #aaa;
    }
  }

  .more-furniture {
    .morelabel {
      float: left;
      margin: 5px 10px;
      color: #6594e0; /*文字色*/
      border-bottom: dashed 2px #6594e0;
      text-decoration: none;
      &:hover {
        font-weight: bold;
        border-bottom: solid 2px #6594e0 !important;
      }
    }
    .more {
      border: 1px solid #aaa;
      width: 100px;
      height: 100px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:after {
      clear: both;
    }
  }
}

.ribbon {
  width: 120px;
  height: 120px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 2px solid #2980b9;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 200px;
  padding: 5px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  font: 700 18px/1 "Lato", sans-serif;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}

.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -10px;
  top: 17px;
  transform: rotate(45deg);
}
</style>

