# 服务

## 云服务器

云服务器又叫云主机或云计算服务器，简称 ECS ，是指简单高效、安全可靠、处理能力可弹性伸缩的计算服务。其管理方式比物理服务器更简单更高效，用户无需提前购买硬件就能迅速创建或释放任意多台云服务器。

云服务器可帮助开发者快速构建更稳定、更安全的应用，降低开发与运维的整体难度与整体成本。

云服务器的出现简化了整个前端工程化的流程，让开发者可以专注于核心业务的创新，以更小的成本接触前端开发外的更多领域。

### 选购

阿里云 > 腾讯云 > 华为云 > 其他

### 操作

工具准备，CMD 工具 ( 命令行工具 ) 和 FTP 工具 ( 文件传输工具 ) 。

Windows 选择 Cmder 和 FinalShell 。

我当前使用的是 VS Code SSH 和 WinSCP

```bash
# 登录服务器
# root 实例用户名
# aaa.bbb.ccc.ddd 实例公有 IP
ssh root@aaa.bbb.ccc.ddd

# 查看系统信息
lsb_release -a

# 断开实例
exit

# 连接服务器次数过多，可能需要如下操作
# 删除实例公有 IP 在 known_hosts 中的记录
ssh-keygen -R aaa.bbb.ccc.ddd

# 重命名主机名
hostname # 查看主机名
vim /etc/hostname # 修改主机名
shutdown -r now # 重启实例让新主机名生效
```

### 管理

`yum` 是在 Fedora 、RedHat 、CentOS 中的 Shell 软件包管理器。它基于 RPM 包管理，可从指定的服务器自动安装 RPM 包，可自动处理依赖性关系并一次性地安装所有依赖的软件包。

常用命令：

| 命令                  | 功能     |
| --------------------- | -------- |
| `yum install <pkg>`   | 安装     |
| `yum remove <pkg>`    | 卸载     |
| `yum upgrade <pkg>`   | 升级     |
| `yum downgrade <pkg>` | 降级     |
| `yum search <pkg>`    | 搜索     |
| `yum reinstall <pkg>` | 重装     |
| `yum list <pkg>`      | 罗列     |
| `yum info <pkg>`      | 信息     |
| `yum clean <pkg>`     | 清理缓存 |
