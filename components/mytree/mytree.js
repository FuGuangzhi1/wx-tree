Component({
  properties: {
    model: Object,
    open: Boolean,
    isMultiple : Boolean,
    isActivateCheckbox: Boolean
  },

  data: {
    open: true,
    isBranch: false,
  },

  methods: {
    toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },

    tapItem: function (e) {
      var itemid = e.currentTarget.dataset.itemid;
      var value = e.currentTarget.dataset.value;
      this.triggerEvent('tapitem', { value: value, itemid: itemid }, { bubbles: true, composed: true });
    },
    selectBox: function (e) {
      const { model, isMultiple  } = this.data
      model.isActivateCheckbox = !model.isActivateCheckbox
      if (isMultiple ) {
        const { children } = model
        if (children.length) {
          for (let i = 0; i < children.length; i++) {
            children[i].isActivateCheckbox = !children[i].isActivateCheckbox
          }
        }
        model.children = children
      }
      // this.setData({
      //   model: model
      // })
      this.triggerEvent('selectBoxBase', { model }, { bubbles: true, composed: true });
    },
  },

  ready: function (e) {
    // console.log(this.data.model.children)
    this.setData({
      isBranch: Boolean(this.data.model?.children && this.data.model.children?.length),
    });
  }
})