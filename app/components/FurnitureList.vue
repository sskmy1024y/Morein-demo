<template>
  <el-col :span="12">
    <el-row :gutter="10" class="main-furniture">
      <el-col :span="6">
        <img
          src="https://egood.fs-storage.jp/fs2cabinet/i_l/i_lex_f_d/i_lex_f_d-m-01-dl.jpg"
          alt
          class="furniture-image"
        >
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="title">ベッド</div>
        <p>
          <span>h:x w:x d:x</span>
        </p>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.main-furniture {
  border: 1px solid gray;
  .title {
    height: 80px;
  }
}

.furniture-image {
  width: 120px;
  max-height: 120px;
}
</style>

