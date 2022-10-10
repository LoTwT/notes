import { type DefaultTheme } from "vitepress"

export const devops: DefaultTheme.SidebarMulti = {
  "/devops/": [
    {
      text: "DevOps",
      collapsible: true,
      items: [
        { text: "AWS Ubuntu", link: "/devops/aws-ubuntu" },
        { text: "Docker 部署", link: "/devops/docker" },
        { text: "Nginx", link: "/devops/nginx" },
      ],
    },
    {
      text: "Linux",
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: "帮助命令",
          link: "/devops/linux/file-system/man",
        },
        {
          text: "目录与切换操作",
          link: "/devops/linux/file-system/dir-change",
        },
        {
          text: "用户相关",
          link: "/devops/linux/file-system/user",
        },
        {
          text: "stat",
          link: "/devops/linux/file-system/stat",
        },
        {
          text: "chmod / chown",
          link: "/devops/linux/file-system/chmod-chown",
        },
      ],
    },
  ],
}
