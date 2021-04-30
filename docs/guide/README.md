# 指南
飞腿小程序页面在线编辑器是基于[uniCloud admin 框架](https://uniapp.dcloud.io/uniCloud/admin)开发的一个插件，通过后台在线托拉拽，生成前端所需要展示的界面数据，实现前端的动态页面布局和装修，实时生效。

## 它是如何工作的?
模块：飞腿编辑器中的模块是用于构建内容交互的抽象单元。把它们组合到一起成为页面。
数据格式：当保存时、界面上的模块会序列化成JSON格式的数据，小程序端渲染时会解析这些JSON数据，形成界面上组件。现有的模块无法满足需求的情况下，可以方便的扩展开发出自己的业务模块。

H5端使用VUE动态组件的机制加载这些模块，由于小程序不支持动态组件，小程序采用模板判断的方式加载，得益于uni-app的条件编译，针对不同的平台做不同的处理。

## 快速上手
由于飞腿是采用[uniCloud admin 框架](https://uniapp.dcloud.io/uniCloud/admin)开发的一个插件，并且使用了[uni_modules插件规范](https://uniapp.dcloud.io/uni_modules), 安装和升级它就非常简单。

### 安装
1. 使用`HBuilderX 3.1.0+`，因为要使用到`uni_modules`
2. 使用已有`uniCloud-admin`项目或新建项目：`打开HBuilderX` -> `文件` -> `新建` -> `项目` -> `uni-app` 选择 `uniCloud admin`模板，键入一个名字，确定
3. 在插件市场打开本插件页面，在右侧点击`使用 HBuilderX 导入插件`，选择 `uniCloud admin` 项目点击确定
4. 等待下载安装完毕。由于本插件依赖一些第三方插件，下载完成后会显示合并插件页面，自行选择即可
5. 找到`/uni_modules/feitui-editor/uniCloud/database`，`db_init.json` 右键上传部署
6. 在工程的 `pages.json` 文件 `pages` 节点 增加插件的 `FeituiEditor` 页面配置
`pages.json`

```json
"easycom": {
        "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
},
{
	"pages": [
        {
            "path": "uni_modules/feitui-media/pages/MediaList",
            "style": {
                "navigationBarTitleText": "媒体库"
            }
        },
		{
            "path": "uni_modules/feitui-editor/pages/index",
            "style": {
                "navigationBarTitleText": "页面管理"
            }

        },
	]
}
```
7. 由于插件依赖的第三方组件，安装本插件时会安装这些依赖，如果没有装上，建议右键`/uni_modules/feitui-editor`安装一下第三方依赖，否则可能会出现一些问题
8. 因为后台UI使用了[Element UI](https://element.eleme.cn/#/zh-CN)和[uView](https://uviewui.com/), 需要在终端下执行npm来安装它们。
```sh
npm install uview-ui element-ui vuedraggable -S
```
9. 如果您的项目是由HBuilder X创建的，相信已经安装scss插件，如果没有，请在HX菜单的 工具->插件安装中找到"scss/sass编译"插件进行安装， 如不生效，重启HX即可
10.  在工程的 `main.js` 文件中，增加插件的配置
`main.js`

```js
import editorPlugin from '@/uni_modules/feitui-editor/js_sdk/plugin';
import mediaPlugin from '@/uni_modules/feitui-media/js_sdk/media';
import '@/uni_modules/feitui-media/js_sdk/media.css'

Vue.use(editorPlugin, store);
Vue.use(mediaPlugin);
```
11. 在项目根目录的uni.scss中引入此文件。
```js
/* uni.scss */
@import 'uview-ui/theme.scss';
```
12. 运行项目到`Chrome`
13. 运行起来uniCloud admin，菜单管理模块会自动读取插件文件中的菜单配置，生成【待添加菜单】，点击`添加选中的菜单`，然后激活即可

## 开发扩展模块
> 模块的组成
以演示的自定义模块为例，目录结构如下：可参考 [自定义飞腿扩展模块演示](https://ext.dcloud.net.cn/plugin?id=4865)
```sh
uni_modules
├── blocks
│   └── ext
│       ├── config.json
│       ├── index.js
│       └── view.vue
├── changelog.md
├── package.json
└── readme.md
```
主要由3个文件组成： `config.json`, `index.js` 和 `view.vue`
### config.json
config.json 的作用是定义组件所需要配置的参数，JSON格式采用了 [JSON Schema](https://json-schema.org/) 并做了一些扩展。[查看 Config Schema 详细说明](/schema/)

### view.vue
该文件是模块的展示文件，可采用vue方式编写此文件，最终将呈现在编辑器和前端。

通过接受属性 formData 来获取编辑器上保存的模块配置数据，进行对应的交互显示

```js
props: {
    formData: {
        type: Object,
        default: () => {},
    },
}
```

### index.js
该文件是模块的入口导出文件，通常内容如下:
```js
import config from './config.json';
const view = () => import('./view.vue');

const FtExt = {
    view,
    config
};

export default FtExt;
```

> 注: 自定义模块需要在配置文件 `uni_modules/feitui-editor/config.js` 中以插件的方式加入进来：如：

```js
import {
    version
} from './package.json'
import defaultBlocks from '@/uni_modules/feitui-blocks/index.js';
// 自定义扩展模块演示
import FeituiExt from '@/uni_modules/feitui-blocks-ext/blocks/ext/index.js';

/**
 * 编辑器的配置文件
 */
export default {
    version,
    /**
     * 内置模块
     */
    defaultBlocks,
    /**
     * 自定义的模块
     */
    extBlocks: [FeituiExt]
};
```

> 不建议在内置模块里新增扩展模块，因为内置模块会经常更新升级，通过uni_modules可以方便的更新模块功能，以避免和自行开发的模块冲突。


> 同时，单独以uni_modules插件的方式开发扩展模块，也可发布到DCloud的插件市场上，供其他人使用。


## 前端小程序(H5)
前端小程序可以直接使用DCloud插件市场上的[飞腿前端小程序模板](https://ext.dcloud.net.cn/plugin?id=4879), 也可根据自己的需求，自行拓展，并支持局部组件的方式调用模块，具体使用可参看项目模板。

## 更新计划
+ <el-checkbox :value="false">底部TabBar模块实现</el-checkbox> 
+ <el-checkbox :value="false">模板库</el-checkbox> 
+ <el-checkbox :value="false">可嵌套的容器模块</el-checkbox> 
+ <el-checkbox :value="false">媒体库增加分类功能</el-checkbox> 
+ <el-checkbox :value="false">增加富文本模块</el-checkbox> 
