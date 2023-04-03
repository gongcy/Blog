module.exports = {
    title: 'gongcy',
    description: 'gongcy',
    base: '/Blog/',
    theme: 'vuepress-theme-reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'geeker\'s Blog',
                items: [
                    { text: 'Github', link: 'https://github.com/gongcy' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/gongchenyu' },
                    { text: '掘金', link: 'https://juejin.cn/user/1714893868773688/posts' },
                ]
            }
        ],
        subSidebar: 'auto',
        sidebar: [
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
                title: "基础学习",
                path: '/handbook/ConditionalTypes',
                collapsable: false, // 不折叠
                children: [
                    { title: "条件类型", path: "/handbook/ConditionalTypes" },
                    { title: "泛型", path: "/handbook/Generics" }
                ],
            }
        ]
    }
}