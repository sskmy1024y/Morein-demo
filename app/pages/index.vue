<template>
  <div class="container">
    <move-furniture/>
    <br>
    <el-row :gutter="20">
      <el-col :span="5" :offset="7">
        <el-button class="large-button" type="success">自分の家具を追加</el-button>
      </el-col>
      <el-col :span="5">
        <el-button class="large-button" type="primary">保存する</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :xs="7" :sm="7" :md="4" :lg="2" :xl="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :xs="5" :sm="5" :md="8" :lg="10" :xl="12">
        <el-row :gutter="20">
          <furniture-list/>
        </el-row>
      </el-col>
      <el-col :xs="7" :sm="7" :md="4" :lg="2" :xl="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MoveFurniture from "~/components/MoveFurniture";
import FurnitureList from "~/components/FurnitureList";
export default {
  components: {
    MoveFurniture,
    FurnitureList
  }
};
</script>

<style lang="scss">
.large-button {
  width: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

