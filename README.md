# 🐒 Tampermonkey 油猴脚本合集

**没什么好说的，外挂，纯纯的外挂**

**外挂，知道吧？就是那种用起来很爽的东西**

## 咋用？

## 咋开发？

你也想做外挂？赶紧来，简单的很

1. clone 本项目，用 `pnpm i` 安装依赖
2. 复制 `start-template` 文件夹，重命名为你的脚本名字
3. cd 到对应目录下，`pnpm dev` 启动开发
4. 改巴改巴，开发完成后，`pnpm build` 打包
5. 推送到 gitlab，完事了

**多说一嘴**

- `shared` 目录是公共的工具库，可以在你的脚本中直接引用，不用重复造轮子
- `start-template` 目录是脚本的模板，你可以直接复制，然后改名字，改内容，改版本号，改描述
- `dist` 目录得传到 gitlab，不然别人怎么用呢
- 发布新版本的时候，记得改 `package.json` 里的 `version` 字段

# 🐒 Tampermonkey Scripts Collection

No need to explain much, it's all about cheating, pure and simple cheating.
Cheating, you know? It's that kind of thing that feels great to use.

## How to Use?


## How to Develop?

Do you also want to cheat? Come and join us, it's simple!

1. Clone this project and install dependencies using `pnpm i`.
2. Copy the `start-template` folder and rename it to your script name.
3. Change directory to your script folder and run `pnpm dev` to start developing.
4. Edit and modify as you wish. When done, run `pnpm build` to build.
5. Push your changes to GitLab and you're done.

**A few more tips:**

- The `shared` folder contains shared utility libraries that can be directly used in your script without reinventing the wheel.
- The `start-template` folder is a script template that you can simply copy, rename, and customize.
- The `dist` folder needs to be uploaded to GitLab so that others can use it.
- When publishing a new version, remember to update the `version` field in `package.json`.
