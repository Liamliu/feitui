## Config Schema
Config Schema 格式采用了 [JSON Schema](https://json-schema.org/) 并做了一些扩展。 配置文件如下：
```json
{
    "id": "FtExt",
    "name": "自定义模块",
    "description": "自定义模块演示",
    "icon": "el-icon-grape",
    "category": "自定义",
    "type": "object",
    "properties": {
        "demo": {
            "type": "string",
            "title": "演示",
            "default": "演示"
        },
        "num": {
            "type": "number",
            "title": "数字",
            "default": 1
        },
        "position": {
        	"title": "显示位置",
        	"type": "string",
        	"default": "left",
        	"oneOf": [{
        			"title": "居左显示",
        			"const": "left"
        		},
        		{
        			"title": "居中显示",
        			"const": "center"
        		}
        	]
        }
    }
}
```

### 字段说明
特殊自动说明
| 字段名称 | 字段说明 |
| ------ | ------ |
| id | 模块的唯一标识 |
| name | 模块的名称, 将显示在`模块选择面板` |
| description | 模块的描述，将显示在`模块配置面板`|
| icon | 模块的图标，将显示在`模块选择面板`和`模块配置面板`。icon 可以使用Element UI自带的icon样式，也可以使用自定义的方式，需自行导入`iconfont.css`文件 |
|category|模块的分类，在模块选择面板上按照分类自动划分组|


### 支持的字段类型
|类型|说明|
| ------ | ------ |
|string|字符串|
|number|数值|
|boolean|true, false|
|array|数组|
|object|对象|

### 内置的 format
对于常用的属性配置，内置了一些 format 来实现，比如：颜色选择器, 取值保存为`#000000`这样的字符串， 可这样使用 format
#### color 颜色选择器
```json
"color": {
    "title": "标题颜色",
    "type": "string",
    "default": "#FF0000",
    "format": "color"
}
```
> 上面的代码将在模块配置面板上显示 如下:

标题颜色

<el-color-picker value="#FF0000" size="mini"></el-color-picker>

#### radio 单选框

```json
"position": {
    "title": "显示位置",
    "type": "string",
    "default": "left",
    "format": "radio",
    "oneOf": [{
            "title": "居左显示",
            "const": "left"
        },
        {
            "title": "居中显示",
            "const": "center"
        }
    ]
}
```
> 显示如下:

显示位置
<el-radio value="left" label="left">居左显示</el-radio>
<el-radio value="" label="center">备选项</el-radio>

radio 可选 `"ui:style": "group"`
```json
"titleSize": {
    "title": "标题大小",
    "type": "string",
    "default": "16px",
    "format": "radio",
    "ui:style": "group",
    "oneOf": [{
            "title": "大号",
            "const": "16px"
        },
        {
            "title": "中号",
            "const": "14px"
        },
        {
            "title": "小号",
            "const": "12px"
        }
    ]
}
```

> 显示如下:


![format-radio-group](/img/format-radio-group.jpg)

#### slider 滑块

```json
"width": {
    "title": "宽度",
    "type": "number",
    "minimum": 50,
    "maximum": 375,
    "default": 120,
    "format": "slider"
}
```
> 显示如下:


<el-slider :value="50"></el-slider>

### 支持自定义 widget

自定义Widget通过配置 ui:widget 字段

```json
"imgUrl": {
    "title": "图片链接地址",
    "type": "string",
    "default": "https://c.feitui.com/demo/editor/banner1.jpg",
    "ui:widget": "FeituiPhotoPicker",
    "ui:options": {
        "width": "180px",
        "height": "80px"
    }
}
```

### 支持自定义 field
`ui:field`

自定义field通过配置 ui-schema ui:field 字段，可以配置在任意需要自定义field的schema节点

```json
"linkTo": {
    "title": "跳转到",
    "type": "object",
    "ui:field": "FeituiLinkToField",
    "properties": {
        "linkType": {
            "title": "链接类型",
            "type": "string",
            "default": "inner",
            "oneOf": [{
                    "title": "内部页面",
                    "const": "inner"
                },
                {
                    "title": "外部页面",
                    "const": "external"
                }
            ]
        },
        "pageId": {
            "title": "内部页面ID",
            "description": "内部页面使用",
            "type": "string",
            "default": "new-page"
        },
        "path": {
            "title": "页面路径",
            "description": "外部页面使用",
            "type": "string",
            "default": "/pages/index/index"
        },
        "param": {
            "title": "链接参数",
            "type": "string",
            "default": "id=xx"
        }
    }
}
```

> 显示如下:
![field](/img/field.jpg)


### 模块选择面板
![模块选择面板](/img/blocks-panel.jpg)

### 模块配置面板
![模块配置面板](/img/blocks-config.jpg)