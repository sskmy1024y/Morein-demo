<template>
  <el-col class="furniture-list" :span="12" :offset="0">
    <el-row :gutter="10" class="main-furniture" :class="{active: list.furnitures[0].moveable}">
      <el-col :span="1">
        <input type="checkbox" v-model="list.display" @click="$emit('changeDisplay',list.id)">
      </el-col>
      <el-col :span="6">
        <img :src="list.furnitures[0].image" alt class="furniture-image">
      </el-col>
      <el-col :span="12" :offset="1">
        <div class="title">{{list.furnitures[0].name}}</div>
        <p>
          <span>w:{{ list.furnitures[0].width }} h:{{ list.furnitures[0].height }} d:x</span>
        </p>
      </el-col>
    </el-row>
    <div class="more-furniture" v-if="moreLists.length > 0">
      <p class="morelabel">候補</p>
      <div v-for="furniture in moreLists" :key="furniture.id" class="more">
        <img
          :src="furniture.image"
          @click="$emit('selectFurniture', {list: list.id, furniture: furniture.id})"
          alt
        >
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: ["list"],
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
      height: 80px;
      font-size: 20px;
      line-height: 2em;
    }
    &.active {
      border: 2px double red;
      background-color: rgb(255, 179, 179);
    }
  }

  .more-furniture {
    .morelabel {
      float: left;
      margin: 5px 10px;
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
</style>

