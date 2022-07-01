# 命令行

Windows 推荐使用

- [Windows Terminal](https://github.com/microsoft/terminal)
- [PowerShell](https://github.com/powershell/powershell)
- [starship](https://github.com/starship/starship)

## 使用 startship 美化 PowerShell

1. 安装 Windows Terminal 、PowerShell、starship 在上方链接中下载对应系统的安装包，或用对应命令安装即可
1. 设置 PowerShell 以使用 starship

   1. 通过 `$PROFILE` 命令，获取配置文件路径 ( 如果配置文件及其所在文件夹不存在，新建即可 )
   1. 将以下内容添加到 PowerShell 配置文件的末尾

      ```ps1
      Invoke-Expression (&starship init powershell)
      ```

如果对 starship 默认配置感到满意，就可以开始享用了！

有的字体缺少必须字符会导致乱码，可以安装一个喜欢的字体

1. 如 [Fira Code Nerd Font](https://www.nerdfonts.com/font-downloads) ，解压后，全选，右键安装即可
1. 配置字体

   - Windows Terminal

     1. 打开 Windows Terminal 设置
     1. 选择侧边栏、配置文件、默认值
     1. 选择内部其他设置、外观
     1. 字体选择要配置的字体
     1. 保存后重启 Windows Terminal 或打开新 Tab 即可

   - VS Code

     1. 选择左上角文件、首选项、设置
     1. 搜索 `terminal font`
     1. 在 `terminal.integrated.fontFamily` 中输入字体名称 ( 同 Windows Terminal 中选择的字体)
     1. 重启 VS Code

更多个性化配置，请查阅 [starship docs](https://starship.rs/)
