//index.js

import { data } from "../../utils/util"

//获取应用实例
const app = getApp()

Page({
  data: {
    selectArray: []
  },
  onLoad() {
    this.setData({ selectArray: data })
  },
  tapItem: function ({ detail }) {
    console.log(detail)
  },
  selectBox: function ({ detail }) {
    console.log(detail)
  },
  onOk({ detail }){
    console.log(detail)
  }
})
