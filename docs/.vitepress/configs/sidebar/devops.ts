import { type DefaultTheme } from "vitepress"

export const devops: DefaultTheme.SidebarMulti = {
  "/devops/": [
    {
      text: "DevOps",
      collapsed: true,
      items: [
        { text: "AWS Ubuntu", link: "/devops/aws-ubuntu" },
        { text: "Docker 部署", link: "/devops/docker" },
        { text: "Nginx", link: "/devops/nginx" },
      ],
    },
    {
      text: "Linux",
      collapsed: true,
      items: [
        {
          text: "帮助命令",
          link: "/devops/linux/file-system/1-man",
        },
        {
          text: "目录与切换操作",
          link: "/devops/linux/file-system/2-dir-change",
        },
        {
          text: "用户相关",
          link: "/devops/linux/file-system/3-user",
        },
        {
          text: "stat",
          link: "/devops/linux/file-system/4-stat",
        },
        {
          text: "chmod / chown",
          link: "/devops/linux/file-system/5-chmod-chown",
        },
        {
          text: "ln",
          link: "/devops/linux/file-system/6-ln",
        },
        {
          text: "cat / less / head / tail",
          link: "/devops/linux/file-system/7-cat-less-head-tail",
        },
        {
          text: "pipe / redirection",
          link: "/devops/linux/file-system/8-pipe-redirection",
        },
        {
          text: "glob",
          link: "/devops/linux/file-system/9-glob",
        },
      ],
    },
  ],
}
