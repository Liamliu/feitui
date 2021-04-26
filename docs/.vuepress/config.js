module.exports = {
    base: "/",
    title: "飞腿",
    description: "飞腿小程序页面编辑器使用文档",
    themeConfig: {
        lastUpdated: "Last Updated", // string | boolean
        nav: [
            { text: "首页", link: "/" },
            { text: "指南", link: "/guide/" },
            { text: "Config Schema", link: "/schema/" },
            {
                text: "后端演示",
                link: "https://demo.feitui.com/admin/index.html",
            },
            {
                text: "H5前端演示",
                link: "https://demo.feitui.com/h5/index.html",
            },
        ],
        sidebar: {
            "/guide/": "auto",
            "/schema/": "auto",
        },
    },
};
