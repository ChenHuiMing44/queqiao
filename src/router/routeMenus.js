
// icon 必须要 四种形式 svg  -->  font --> text ---> name 的是一个
const menus = [
  {
    path: '',
    name: '首页',
    layout: 'Layout',
    icon: { font: 'icon-shezhi' },
    redirect: 'dashboard',
    key: 'Key1',
    children: [
      {
        path: 'dashboard',
        key: 'HomeDashboard',
        name: '首页',
        icon: { svg: '', font: '', text: '' },
        title: '首页'
      }
    ]
  },
  {
    layout: 'Layout',
    key: 'Key2',
    name: '模块1',
    path: 'test',
    icon: { svg: '', font: 'icon-shezhi', text: '' },
    children: [
      {
        path: 'theme',
        key: 'TestTheme',
        name: '页面1',
        icon: { svg: '', font: '', text: '' },
        title: '页面1'
      },
      {
        path: 'theme-hidden',
        key: 'TestThemeHidden',
        hidden: true,
        name: '隐藏页面',
        icon: { svg: '', font: '', text: '' },
        title: '页面1'
      },
      {
        path: 'theme-page',
        key: 'TestThemePage',
        name: '页面11',
        title: '页面11',
        icon: { svg: '', font: '', text: 'P' }
        // redirect: ''
        // hidden: boolean
      }
    ]
  },
  {
    layout: 'Layout',
    name: '模块2',
    key: 'Key3',
    path: 'test2',
    icon: { svg: '', font: 'icon-shanchu1', text: '' },
    children: [{
      path: 'test1-page',
      key: 'Test1Test1Page',
      name: '页面22',
      title: '页面22',
      icon: { svg: '', font: '', text: '觉' }
    }]
  },
  {
    layout: 'Layout',
    name: '资源组',
    key: 'Source',
    path: 'source',
    icon: { svg: '', font: 'icon-shanchu1', text: '' },
    children: [{
      path: 'shared',
      key: 'SourceShared',
      name: '共享模块',
      title: '共享模块',
      icon: { svg: '', font: '', text: '享' }
    }, {
      path: 'sourceList',
      key: 'SourceList',
      name: '资源数组',
      title: '资源数组',
      icon: { svg: '', font: '', text: '资' }
    }, {
      path: 'sourceDetail',
      key: 'SourceDetail',
      hidden: true,
      name: '资源详情',
      title: '资源详情'
    }
    ]
  }
]

export default menus
