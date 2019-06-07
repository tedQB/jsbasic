module.exports = {
    port: "3000",
    dest: "docs",
    ga: "UA-85414008-1",
    base: "/",
    markdown: {
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "frontend",
            description: "前端知识框架"
        }
    },
    head: [["link", { rel: "icon", href: `/favicon.ico` }]],
    themeConfig: {
        repo: "tedQB/frontend",
        docsRepo: "tedQB/frontend",
        editLinks: true,
        sidebarDepth: 2,
        locales: {
            "/": {
                label: "简体中文",
                selectText: "选择语言",
                editLinkText: "在 GitHub 上编辑此页",
                lastUpdated: "上次更新",
                nav: [
                    {
                        text: "指南",
                        link: "/guide/"
                    },
                    {
                        text: "配置",
                        link: "/config/"
                    },
                    {
                        text: "选择语言",
                        items: [
                            {
                                text: "简体中文",
                                link: "/"
                            }
                        ]
                    },
                    {
                        text: "生态",
                        items: [
                            {
                                text: "Kisso 单点登录",
                                link: "https://gitee.com/baomidou/kisso"
                            },
                            {
                                text: "Lock4j 分布式锁",
                                link: "https://gitee.com/baomidou/lock4j-spring-boot-starter"
                            },
                            {
                                text: "Dynamic Datasource 动态数据源",
                                link:
                                    "https://github.com/baomidou/dynamic-datasource-spring-boot-starter"
                            }
                        ]
                    },
                    {
                        text: "更新日志",
                        link:
                            "https://github.com/baomidou/mybatis-plus/blob/3.0/CHANGELOG.md"
                    },
                    {
                        text: "2.0 文档",
                        link: "https://baomidou.gitee.io/mybatis-plus-doc/#/"
                    }
                ],
                sidebar: {
                    "/guide/": genGuideSidebar(),
                    "/config/": genConfigSidebar()
                }
            }
        }
    }
};

function genGuideSidebar() {
    return [
        {
            title: "前端基础",
            collapsable: false,
            children: ["", "async", 'state','theory']
        },
        {
            title: "核心功能",
            collapsable: false,
            children: ["generator", "crud-interface", "wrapper", "page", "sequence"]
        },
        {
            title: "插件扩展",
            collapsable: false,
            children: [
                "hot-loading",
                "logic-delete",
                "enum",
                "auto-fill-metainfo",
                "sql-injector",
                "execution-analysis-plugin",
                "performance-analysis-plugin",
                "optimistic-locker-plugin",
                "dynamic-datasource",
                "tenant",
                "mybatisx-idea-plugin"
            ]
        },
        {
            title: "FAQ",
            collapsable: false,
            children: ["faq"]
        }
    ]
}

function genConfigSidebar() {
    return [
        {
            title: "配置",
            collapsable: false,
            children: ["", "generator-config"]
        }
    ]
}