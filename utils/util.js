const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const data = [
  {
    "id": "1004",
    "title": "菜单管理",
    "parentId": "1001",
    "url": "/SystemManagement/MenuList.aspx",
    "sort": 1.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1015",
    "title": "公用资料",
    "parentId": "1014",
    "url": "/BaseData/BasicDataList.aspx",
    "sort": 1.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1017",
    "title": "安全隐患登记",
    "parentId": "1016",
    "url": "/HiddenDangerManagement/HiddenDangerList.aspx",
    "sort": 1.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1003",
    "title": "安全管理架构",
    "parentId": "1001",
    "url": "/SystemManagement/StructureList.aspx",
    "sort": 2.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1005",
    "title": "访问分组",
    "parentId": "1001",
    "url": "/SystemManagement/AccessGroupList.aspx",
    "sort": 2.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1002",
    "title": "用户管理",
    "parentId": "1001",
    "url": "/SystemManagement/UserList.aspx",
    "sort": 4.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1011",
    "title": "安全员管理",
    "parentId": "1001",
    "url": "/SystemManagement/SafetyOfficerList.aspx",
    "sort": 5.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1016",
    "title": "安全隐患管理",
    "parentId": "0",
    "url": "",
    "sort": 9.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1012",
    "title": "文件管理",
    "parentId": "0",
    "url": "",
    "sort": 10.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1013",
    "title": "文件分组",
    "parentId": "1012",
    "url": "/FileManagement/FileGroupList.aspx",
    "sort": 10.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1014",
    "title": "基础资料",
    "parentId": "0",
    "url": "",
    "sort": 20.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  },
  {
    "id": "1001",
    "title": "系统管理",
    "parentId": "0",
    "url": "",
    "sort": 99.0,
    "checkArr": [
      {
        "type": "0",
        "checked": "0"
      }
    ]
  }
]
module.exports = {
  formatTime: formatTime, data
}