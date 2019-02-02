import Vue from 'vue'
import Vuex from 'vuex'

export default() => new Vuex.Store({
  state: () => ({
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
      },
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
    home_data: {
      id: 1001,
      postid: "1920914",
      address: "東京都八王子市片倉町１４０４−１", 
      floor: {
        image: require('@/assets/img/zumen2.jpg'),
        baseX: 788,
        baseY: 365
      }
    },
    user_data: {
      name: "さとう れおな",
      movein_date: '2019/02/05',
      pickup_date: '2019/02/04',
      description: ""
    }
  }),
  mutations: {
    saveCatalogs (state, catalogs) {
      state.catalogs = catalogs
    } 
  },
  actions: {
    
  },
  getters: {
    loadCatalogs (state) {
      return state.catalogs
    },
    getFurnitures (state) {
      return state.furnitures
    },
    getCategories (state) {
      return state.category
    },
    getHomeData (state) {
      return state.home_data
    },
    getUserData (state) {
      return state.user_data
    }
  }
})