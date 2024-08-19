// components/mytree-list/mytree-list.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapItem: function ({ detail }) {
      this.triggerEvent('tapItem', { detail }, { bubbles: true, composed: true });
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
      this.triggerEvent('selectBox', { model, line }, { bubbles: true, composed: true });
    }
  },
  ready: function () {
    const { model } = this.data
    const tree = new Tree(model.map(x => {
      return { ...x, children: [] }
    })).init(0)
    this.setData({ tree })
    // console.log(tree)
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
