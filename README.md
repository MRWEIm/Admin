# 运行项目
  以管理者身份运行命令提示符，进入项目文件夹路径后输入npm run dev即可在本地运行项目。在浏览器输入127.0.0.1可以查看网页。
  输入npm run build可以对项目进行编译，编译成功后会生成/dist文件夹，将整个文件夹复制在服务器中的/etc/nginx中（需要删除原来的/dist文件夹）即将网页部署在服务器中。
  在项目文件夹下的package.json中有多种指令。
  
# 项目资源
  /src目录下存放着前端的资源文件。其中/route文件夹内设置了页面的路由路径，/layout文件夹下包含三个布局文件，/pages文件夹下包含不同布局下的页面组件文件。

# /layout文件夹
  这个文件夹中关注AppLayout和AuthLayout两个文件，AuthLayout是系统的登陆界面，AppLayout是系统主要界面。如果想修改AppLayout侧栏可以在/src/components/sidebar/NavigationRoutes.ts里面修改。

# /pages文件夹
  这个文件夹中主要看/dash、/tab这两个文件夹。在这个文件夹中的其他文件夹是官网的示例可以参考。
  

