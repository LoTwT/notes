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
      ],
    },
  ],
}
