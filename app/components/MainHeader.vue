<template>
  <div>
    <div class="title">more.in</div>
    <div class="button">
      <el-button icon="el-icon-arrow-right" circle type="primary"></el-button>
    </div>
    <div class="stepbar">
      <el-steps :active="2" finish-status="success" simple style="margin-top: 5px">
        <el-step title="お部屋探し"></el-step>
        <el-step title="家具選び"></el-step>
        <el-step title="レイアウト"></el-step>
        <el-step title="情報入力"></el-step>
        <el-step title="契約完了"></el-step>
      </el-steps>
    </div>
    <div class="button">
      <el-button icon="el-icon-arrow-left" circle></el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  background: rgb(255, 243, 223);
  border-bottom: 1px solid #fff;

  .title {
    color: rgb(24, 197, 151);
    font-size: 50px;
    font-weight: 700;
    margin-top: 0px;
    margin-left: 20px;
    width: 20%;
    float: left;
  }
  .button {
    float: right;
    margin: 10px;
  }
  .stepbar {
    float: right;
    width: 60%;
    .el-steps--simple {
      border: 2px solid #85d8ce;
      border-radius: 2px;
    }
  }
}
</style>

