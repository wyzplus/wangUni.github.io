module.exports = {
  title: "Universe's Blog",
  keywords: 'Universe blog',
  description: "Welcome to my universe",
  repo: 'https://github.com/WangUni/wangUni.github.io',
//   base: './',
  theme: 'reco',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        
    ],
  lastUpdated: 'Last Updated',
  themeConfig: {
    logo: '/img/portrait.jpg',
      type: 'blog',
      author: 'YuZhou',
      authorAvatar: '/img/portrait.jpg',
      modePicker: false,
      startYear: '2020',
      lastUpdated: 'Last Updated',
      nav: [
          { text: '首页', link: '/', icon: 'reco-home' },
          { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
      ],
      blogConfig: {
        category: {
          location: 2,     // 在导航栏菜单中所占的位置，默认2
          text: '分类' // 默认文案 “分类”
        },
        tag: {
          location: 3,     // 在导航栏菜单中所占的位置，默认3
          text: '标签'      // 默认文案 “标签”
        },
        socialLinks: [     // 信息栏展示社交信息
          { icon: 'reco-github', link: 'https://github.com/WangUni' }
        ]
      },
      valineConfig: {
        appId: 'dnY20G2hJaf1K4GSyzb5cb5c-gzGzoHsz',
          appKey: 'FoBlPtlb4Dttee9H480Te4J8',
          avatar: 'mp',
          placeholder: 'Please leave a message'
      },
      codeTheme: 'okaidia'
      
    },
}
