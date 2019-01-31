<template>
  <el-container>
    <el-header>
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
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<style lang="scss" scope>
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
main {
  background: linear-gradient(45deg, #1e81b6 10%, #85d8ce 90%);
}
</style>
