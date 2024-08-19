// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    model: Object,
    open: Boolean,
    isMultiple : Boolean,//是否多选
    isActivateCheckbox: Boolean//复选框
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,
    nowText: "请选择",
    openSelect: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectToggle: function () {
      var nowShow = this.data.selectShow;
      this.setData({
        selectShow: !nowShow
      })
    },

    toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          openSelect: !this.data.openSelect,
        })
      }
    },
    selectBoxBase: function ({ detail }) {
      const { model } = detail
      const { tree, isMultiple  } = this.data
      if (!isMultiple ) {
        //单选
        forTreeSingle(tree, model)
        function forTreeSingle(tree, model) {
          for (let i = 0; i < tree.length; i++) {
            if (tree[i].id == model.id) {
              tree[i] = model
            }
            else {
              tree[i].isActivateCheckbox = false
            }
            if (tree[i].children.length) {
              forTreeSingle(tree[i].children, model)
            }
          }
        }
      } else {
        //多选
        const isActivateCheckbox = model.isActivateCheckbox
        selectBox(model)
        function selectBox(model) {
          model.isActivateCheckbox = isActivateCheckbox
          if (model.children && model.children.length) {
            for (let i = 0; i < model.children.length; i++) {
              selectBox(model.children[i])
            }
          }
        }
        forTreeMultiple(tree, model)
        function forTreeMultiple(tree, model) {
          for (let i = 0; i < tree.length; i++) {
            if (tree[i].id == model.id) {
              tree[i] = model
            }
            if (tree[i].children.length) {
              forTreeMultiple(tree[i].children, model)
            }
          }
        }
      }
      this.setData({ tree })
      // console.log(tree)
      this.triggerEvent('selectBox', { model }, { bubbles: true, composed: true });
    },
    onOk() {
      const { tree } = this.data
      const line = []
      function treeToLine(tree, line) {
        for (let i = 0; i < tree.length; i++) {
          line.push(tree[i])
          if (tree[i]?.children && tree[i]?.children?.length) {
            treeToLine(tree[i].children, line)
          }
        }
      }
      treeToLine(tree, line)
      this.setData({
        selectShow: false,
        nowText: line.filter(x => x.isActivateCheckbox).map(x => x.title).join(',')
      })
      this.triggerEvent('onOk', { line }, { bubbles: true, composed: true });
    },
    tapItem: function (e) {
      var itemid = e.detail.itemid;
      var value = e.detail.value;
      this.triggerEvent('tapitem', { value: value, itemid: itemid }, { bubbles: true, composed: true });
      this.setData({
        selectShow: false,
        nowText: value
      })
    }
  },
  ready: function (e) {
    const { model } = this.data
    const tree = new Tree(model.map(x => {
      return { ...x, children: [] }
    })).init(0)
    this.setData({
      tree
    });
  }
})
function Tree(data) {
  this.tree = data || []; //数据
  this.groups = {}; //分组
}

Tree.prototype = {
  init: function (pid) {
    this.group();
    var data = this.getData(this.groups[pid]);
    return data;
  },
  group: function () {
    for (var i = 0; i < this.tree.length; i++) {
      if (this.groups[this.tree[i].parentId]) {
        this.groups[this.tree[i].parentId].push(this.tree[i]);
      } else {
        this.groups[this.tree[i].parentId] = [];
        this.groups[this.tree[i].parentId].push(this.tree[i]);
      }
    }
  },
  getData: function (info) {
    if (!info) return;

    var children = [];
    for (var i = 0; i < info.length; i++) {
      var item = info[i];
      const c = this.getData(this.groups[item.id])
      if (c)
        item.children = item['children'].concat(c);
      children.push(item);
    }

    return children;
  }
}
