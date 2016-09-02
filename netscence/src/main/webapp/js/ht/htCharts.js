function blue() {

var theme = {
    // 全图默认背景
    backgroundColor: '#FFFFFF',
    // 默认柱体颜色
    color: [
        '#103667','#1b4f93','#426eb4','#7388c1',
        '#94aad6'
    ],

    // 图表标题
    title: {
        // 各个item之间的间隔，单位px，默认为10
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal',
            // 图例文字颜色
            color: '#103667'
        },
        subtextStyle: {
            color: '#e3e3e3'          // 副标题文字颜色
        }
    },
    // 工具箱
    toolbox: {
        color : ['#103667','#103667','#103667','#103667'],
        feature : {
            mark: {
                lineStyle: {
                    width: 1,
                    color: '#103667',
                    type: 'dashed'
                }
            }
        }
    },

    // 提示框
    tooltip: {
        //R：红色值  G：绿色值 B：蓝色值 A：透明度,取值0~1之间
        backgroundColor: 'rgba(121,121,121,0.6)',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 属性lineStyle控制线条样式 type取值dashed、solid
                color: '#103667',
                type: 'dashed'
            },
            //crossStyle设置十字准星指示器
            crossStyle: {
                color: '#103667'
            }
        }
    },

    // 网格
    grid: {
        borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: '#C0C0C0'
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#103667'
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#000000'
            }
        },
        axisTick: {            // 坐标轴小标记
            interval: 'auto',
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#103667',
                width: 1
            }
        }

    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#103667'
            }
        }

    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};function red() {

var theme = {
    // 全图默认背景
    backgroundColor: '#FFFFFF',
    // 默认色板
    color: [
        '#8b0016','#b2001f','#df0029','#ee7c6b','#f6b297'
    ],

    // 图表标题
    title: {
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal',
            color: '#8b0016'
        }
    },
    // 工具箱
    toolbox: {
        color : ['#8b0016','#8b0016','#8b0016','#8b0016'],
        feature : {
            mark: {
                lineStyle: {
                    width: 1,
                    color: '#8b0016',
                    type: 'dashed'
                }
            }
        }
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(121,121,121,0.6)',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 属性lineStyle控制线条样式 type取值dashed、solid
                color: '#8b0016',
                type: 'dashed'
            },
            //crossStyle设置十字准星指示器
            crossStyle: {
                color: '#8b0016'
            }
        }
    },
    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#8b0016'
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#000000'
            }
        },
        axisTick: {            // 坐标轴小标记
            interval: 'auto',
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#8b0016',
                width: 1
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#8b0016'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
            }
        }
    },


    
    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};function dark() {

var theme = {
    // 全图默认背景
    backgroundColor: '#1b1b1b',

    // 默认色板
    color: [
        '#2059a6','#3b2786','#5e0c7b','#a3007d','#de0029',
        '#df3588','#ec8810','#f1b000','#f9f402','#5bbd2c'
    ],

    // 图表标题
    title: {
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal',
            color: '#fff'          // 主标题文字颜色
        }
    },

    // 图例
    legend: {
        textStyle: {
            color: '#ccc'          // 图例文字颜色
        }
    },

    // 值域
    dataRange: {
        itemWidth: 15,
        color: ['#FFF808','#21BCF9'],
        textStyle: {
            color: '#ccc'          // 值域文字颜色
        }
    },

    toolbox: {
        color : ['#fff', '#fff', '#fff', '#fff'],
        effectiveColor : '#FE8463',
        disableColor: '#666',
        itemGap: 8
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(250,250,250,0.8)',     // 提示背景颜色，默认为透明度为0.7的黑色
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 直线指示器样式设置
                color: '#aaa'
            },
            crossStyle: {
                color: '#aaa'
            },
            shadowStyle : {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        },
        textStyle: {
            color: '#333'
        }
    },
    // 网格
    grid: {
        borderWidth: 0,
        borderColor:" #aaaaaa"
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            show: false
        },
        axisTick: {            // 坐标轴小标记
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#ccc'
            }
        },
        splitLine: {           // 分隔线
            show: false
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            show: false
        },
        axisTick: {            // 坐标轴小标记
            show: false
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#ccc'
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#aaa'],
                type: 'dashed'
            }
        },
        splitArea: {           // 分隔区域
            show: false
        }
    },



    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};function green() {

var theme = {
    // 全图默认背景
    backgroundColor: '#f7f7f7',
    // 默认色板
    color: [
        '#277300','#489620','#85c75f','#afd788', '#c8e2b1'
    ],

    // 图表标题
    title: {
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal',
            color: '#277300'
        }
    },
    // 工具箱
    toolbox: {
        color : ['#277300','#277300','#277300','#277300']
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(121,121,121,0.6)',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 直线指示器样式设置
                color: '#277300',
                type: 'dashed'
            },
            crossStyle: {
                color: '#277300'
            },
            shadowStyle : {                     // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },

    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#277300'
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#000000'
            }
        },
        axisTick: {            // 坐标轴小标记
            interval: 'auto',
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#277300',
                width: 1
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#277300'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};function shine() {

var theme = {
    // 默认色板
    color: [
        '#2059a6','#3b2786','#5e0c7b','#a3007d','#de0029',
        '#df3588','#ec8810','#f1b000','#f9f402','#5bbd2c'
    ],

    // 图表标题
    title: {
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal'
        }
    },

    
    // 值域
    dataRange: {
        itemWidth: 15,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
        color:['#1790cf','#a2d4e6']
    },

    // 工具箱
    toolbox: {
        color : ['#06467c','#00613c','#872d2f','#c47630'],
        itemGap: 8
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#dedede',            // 数据背景颜色
        fillerColor: 'rgba(154,217,247,0.2)',   // 填充颜色
        handleColor: '#005eaa'     // 手柄颜色
    },
    
    grid: {
        borderWidth: 0
    },
    
    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            show: false
        },
        axisTick: {            // 坐标轴小标记
            show: false
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            show: false
        },
        axisTick: {            // 坐标轴小标记
            show: false
        },
        splitArea: {           // 分隔区域
            show: true,       // 默认不显示，属性show控制显示与否
            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
            }
        }
    },
    
       textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};function split() {

    var theme = {
        // 全图默认背景
        backgroundColor: '#f7f7f7',
        // 默认色板
        color: [
            '#006db9','#6ec3c9','#ff0000','#eb8c1a',
            '#ffe412','#5bbd2b','#a4ec51','#925c9e','#c587d3'
        ],

        // 图表标题
        title: {
            itemGap: 5,
            textStyle: {
                fontWeight: 'normal',
                color: '#006db9'
            }
        },

        // 工具箱
        toolbox: {
            color : ['#006db9','#006db9','#006db9','#006db9'],
            effectiveColor : '#ff4500',
            itemGap: 8
        },

        // 提示框
        tooltip: {
            backgroundColor: 'rgba(121,121,121,0.6)',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle : {          // 直线指示器样式设置
                    color: '#006db9',
                    type: 'dashed'
                },
                crossStyle: {
                    color: '#006db9'
                }
            }
        },

        grid: {
            borderColor: '#aaaaaa'
        },

        // 类目轴
        categoryAxis: {
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#006db9'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#000000'
                }
            },
            axisTick: {            // 坐标轴小标记
                interval: 'auto',
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#006db9',
                    width: 1
                }
            }
        },

        // 数值型坐标轴默认参数
        valueAxis: {
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#006db9'
                }
            },
            splitArea : {
                show : true,
                areaStyle : {
                    color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
                }
            }
        },
        // 柱形图默认参数
        bar: {
            itemStyle: {
                normal: {
                    barBorderRadius: 5
                },
                emphasis: {
                    barBorderRadius: 5
                }
            }
        },
        textStyle: {
            fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
        }
    }

    return theme;
}
;function gray() {

var theme = {
    // 全图默认背景
    backgroundColor: '#fafafa',
    // 默认色板
    color: [
       '#898989', '#9f9b9b','#b6b1b1','#c8c6c6','#d8d8d8'
    ],

    // 图表标题
    title: {
        itemGap: 5,
        textStyle: {
            fontWeight: 'normal',
            color: '#898989'
        }
    },

    // 工具箱
    toolbox: {
        color : ['#898989','#898989','#898989','#898989']
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(121,121,121,0.6)',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 直线指示器样式设置
                color: '#898989',
                type: 'dashed'
            },
            crossStyle: {
                color: '#898989'
            }
        }
    },

    grid: {
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#898989'
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#000000'
            }
        },
        axisTick: {            // 坐标轴小标记
            interval: 'auto',
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#898989',
                width: 1
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#898989'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
            }
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}

    return theme;
};
'use strict';
function config (){
    var _config = {
        //画布
        canvas:{
            width:700,
            height:600,
            margins : {top: 10, left:60, right: 80, bottom: 30},
            bgColor:"#fff"
        },
        animation:{dur:1000},
        // 默认色板
        color: [
            '#1790cf','#1bb2d8','#99d2dd','#88b0bb',
            '#1c7099','#038cc4','#75abd0','#afd6dd'
        ],
        emphasisColor: [
            'red','green','black','yellow','gray','blue','dark','white'
        ],
        // 图表标题
        title: {
            text: '',
            link: null,              // 超链接跳转
            target: null,            // 仅支持self | blank
            subtext: '',
            sublink: null,           // 超链接跳转
            subtarget: null,         // 仅支持self | blank
            x: 'left',                 // 水平安放位置，默认为左对齐，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            textAlign: null,            // 水平对齐方式，默认根据x设置自动调整
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 标题边框颜色
            borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 5,               // 主副标题纵向间隔，单位px，默认为10，
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'          // 主标题文字颜色
            },
            subtextStyle: {
                fontSize: 12,
                color: '#aaa'          // 副标题文字颜色
            }
        },

        // 图例
        legend: {
            show: true,
            orient : 'horizontal', //布局方式，默认为垂直布局，可选为：'horizontal' ¦ 'vertical'
            x : "center",          // 水平安放位置，默认为全图左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
            y:'top',               // 垂直安放位置，默认为全图底部，可选为： 'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
            data:[],
            rx:5,                  //设置菱角的弧度（做成圆角矩形使用），如果设置长方形宽度和长度相同就标识为一个圆
            ry:5,
            opacity:1,             //图例的透明度

            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#D3D3D3',       // 图例边框颜色
            borderWidth: 2,               // 图例边框线宽，单位px，默认为0（无边框）
            borderOpacity:1,              //图例边框的透明度
            padding: 5,                   // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
            itemGap: 30,                  // 各个item之间的间隔，单位px，默认为10;横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 24,                // 图例图形宽度
            itemHeight: 18,               // 图例图形高度
            textStyle: {
                color: '#333',            // 图例文字颜色
                font_size:14 ,            //图例文字大小
                font_family:"sans-serif",
                align:"right",            //图例文本位置 ，right,left ,top,bottom
                space:5                   //图例文本距离图例的距离

            },
            selectedMode: true,        // 选择模式，默认开启图例开关
            selected: null             // 配置默认选中状态，可配合LEGEND.SELECTED事件做动态数据载入
        },

        // 值域
        dataRange: {
            show: true,
            orient: 'vertical',        // 布局方式，默认为垂直布局，可选为：'horizontal' ¦ 'vertical'
            x: 'left',                 // 水平安放位置，默认为全图左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
            y: 'bottom',               // 垂直安放位置，默认为全图底部，可选为： 'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 值域边框颜色
            borderWidth: 0,            // 值域边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 值域内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
            // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
            itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
            min: null,              // 最小值
            max: null,              // 最大值
            precision: 0,              // 小数精度，默认为0，无小数点
            splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
            calculable: false,         // 是否值域漫游，启用后无视splitNumber，线性渐变
            hoverLink: true,
            realtime: true,
            color:['#006edd','#e0ffff'],//颜色
            formatter: null,
            text:null,           // 文本，默认为数值文本
            textStyle: {
                color: '#333'          // 值域文字颜色
            }
        },

        toolbox: {
            show: false,
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
            // 'horizontal' ¦ 'vertical'
            x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            color: ['#1e90ff','#22bb22','#4b0082','#d2691e'],
            disableColor: '#ddd',
            effectiveColor: 'red',
            backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
            borderColor: '#ccc',       // 工具箱边框颜色
            borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
            // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemSize: 16,             // 工具箱图形宽度
            showTitle: true,
            textStyle: {},
            feature: {
                mark: {
                    show: false,
                    title: {
                        mark: '辅助线开关',
                        markUndo: '删除辅助线',
                        markClear: '清空辅助线'
                    },
                    lineStyle: {
                        width: 1,
                        color: '#1e90ff',
                        type: 'dashed'
                    }
                },
                dataZoom: {
                    show: false,
                    title: {
                        dataZoom: '区域缩放',
                        dataZoomReset: '区域缩放后退'
                    }
                },
                dataView: {
                    show: false,
                    title: '数据视图',
                    readOnly: false,
                    lang: ['数据视图', '关闭', '刷新']
                },
                magicType: {
                    show: false,
                    title: {
                        line: '折线图切换',
                        bar: '柱形图切换',
                        stack: '堆积',
                        tiled: '平铺',
                        force: '力导向布局图切换',
                        chord: '和弦图切换',
                        pie: '饼图切换',
                        funnel: '漏斗图切换'
                    },
                    option: {
                        line: {},
                        bar: {},
                        stack: {},
                        tiled: {},
                        force: {},
                        chord: {},
                        pie: {},
                        funnel: {}
                    },
                    type: [] // 'line', 'bar', 'stack', 'tiled', 'force', 'chord', 'pie', 'funnel'
                },
                restore: {
                    show: false,
                    title: '还原'
                },
                saveAsImage: {
                    show: false,
                    title: '保存为图片',
                    type: 'png',
                    lang: ['点击保存']
                }
            }
        },

        // 提示框
        tooltip: {
            show: true,
            showContent: true,         // tooltip主体内容
            trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
            position : null,
            formatter: null,            // 内容格式器：{string}（Template） ¦ {Function}
            islandFormatter: '{a} <br/>{b} : {c}',  // 数据孤岛内容格式器，非标准参数
            showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 100,            // 隐藏延迟，单位ms
            transitionDuration: 0.4,   // 动画变换时间，单位s
            backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
            borderColor: '#333',       // 提示边框颜色
            borderRadius: 4,           // 提示边框圆角，单位px，默认为4
            borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            axisPointer: {             // 坐标轴指示器，坐标轴触发有效
                type: 'line',          // 默认为直线，可选为：'line' | 'shadow' | 'cross'
                lineStyle: {           // 直线指示器样式设置
                    color: '#48b',
                    width: 2,
                    type: 'solid'
                },
                crossStyle: {
                    color: '#1e90ff',
                    width: 1,
                    type: 'dashed'
                },
                shadowStyle: {                      // 阴影指示器样式设置
                    color: 'rgba(150,150,150,0.3)', // 阴影颜色
                    width: 'auto',                  // 阴影大小
                    type: 'default'
                }
            },
            textStyle: {
                color: '#fff'
            }
        },

        // 区域缩放控制器
        dataZoom: {
            show: false,
            selectedStart: 0,         // 默认为0
            selectedEnd: 100,         // 默认为全部 100%
            realtime: true,           //true:拖动时实时调用回调函数，false:当鼠标松开时调用回调函数
            interval:100,             //拖动时调用客户提供的回调函数 最小间隔时间
            zoomLock: false,          //是否锁定选择区域大小

            orient: 'horizontal',     // 布局方式，默认为垂直布局，可选为：'horizontal' ¦ 'vertical'
            x: null,                  // 水平安放位置，默认为全图左对齐，可选为：'center' ¦ 'left' ¦ 'right'¦ {number}（x坐标，单位px）
            y: null,                  // 垂直安放位置，默认为全图底部，可选为： 'top' ¦ 'bottom' ¦ 'center'¦ {number}（y坐标，单位px）
            width: null,              // 指定宽度，横向布局时默认为根据画布宽度计算
            height: null,             // 指定高度，纵向布局时默认为根据画布高度计算
            backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
            fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
            handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色 
        },

        // 网格
        grid: {
            x: 80,
            y: 60,
            x2: 80,
            y2: 60,
            width: null,
            height: null,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            borderColor: '#ccc'
        },

        // 类目轴
        categoryAxis: {
            show: true,
            position: 'bottom',    // 位置
            boundaryGap: true,     // 类目起始和结束两端空白策略
            grid:{
                show:true

            },
            axisName:{   //  坐标轴名称
                text:'',
                show: false,      // 默认不显示
                location : 'end', // 坐标轴名字位置，支持'start' | 'end'
                textStyle:{
                    color: '#333'
                }
            },

            axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                onZero: true,
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#48b',
                    width: 2,
                    type: 'solid'
                }
            },
            axisTick: {            // 坐标轴小标记
                show: true,        // 属性show控制显示与否，默认显示
                interval: 'auto',
                inside: false,    // 控制小标记是否在grid里
                onGap: null,
                length :5,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#333',
                    width: 1
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                align:'bottom',   // X轴刻度标识位置可以设置top，bottom，X轴刻度标识默认为bottom
                // Y轴刻度标识位置可以设置left，right；Y轴刻度标识默认为left
                interval: 'auto',
                rotate: 0,
                margin:  8,
                clickable: false,
                formatter: null,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                onGap: null,
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                }
            },
            splitArea: {           // 分隔区域
                show: false,       // 默认不显示，属性show控制显示与否
                // onGap: null,
                areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                    color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                }
            }
        },
        // 数值型坐标轴默认参数
        valueAxis: {
            show: true,
            isLinear:true,
            position: 'left',      // 位置
            boundaryGap: [0, 0],   // 数值起始和结束两端空白策略
            min: 0,             // 最小值
            max: 1,             // 最大值
            onZero:true,    //值轴起始点是否从0开始。默认从0开始
            scale: false,          // 脱离0值比例，放大聚焦到最终_min，_max区间
            splitNumber: null,     // 分割段数
            formatter: '{value}', //值轴文字与单位组合
            grid:{
                show:true
            },
            axisName:{   //  坐标轴名称
                text:'',
                show: false,      // 默认不显示
                location : 'end', // 坐标轴名字位置，支持'start' | 'end'
                textStyle:{
                    color: '#333'
                }
            },

            axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                onZero: true,
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#48b',
                    width: 2,
                    type: 'solid'
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false,       // 属性show控制显示与否，默认不显示
                inside: false,     // 控制小标记是否在grid里
                length :5,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#333',
                    width: 1
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                align:'left',		// X轴刻度标识位置可以设置top，bottom，X轴刻度标识默认为bottom
                // Y轴刻度标识位置可以设置left，right；Y轴刻度标识默认为left
                rotate: 0,
                margin: 8,
                clickable: false,
                formatter: null,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                }
            },
            splitArea: {           // 分隔区域
                show: false,       // 默认不显示，属性show控制显示与否
                areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                    color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                }
            }
        },
        //时间轴
        timeAxis:{
            show: true,
            position: 'bottom',      // 位置
            startTime:2010-1-1,      //开始时间
            endTime: 2010-12-1,       //结束时间
            grid:{
                show:true
            },
            axisName:{   //  坐标轴名称
                text:'',
                show: false,      // 默认不显示
                location : 'end', // 坐标轴名字位置，支持'start' | 'end'
                textStyle:{
                    color: '#333'
                }
            },

            axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                onZero: true,
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#48b',
                    width: 2,
                    type: 'solid'
                }
            },
            axisTick: {            // 坐标轴小标记
                show: false,       // 属性show控制显示与否，默认不显示
                inside: false,     // 控制小标记是否在grid里
                length :5,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#333',
                    width: 1
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                align:'left',		// X轴刻度标识位置可以设置top，bottom，X轴刻度标识默认为bottom
                // Y轴刻度标识位置可以设置left，right；Y轴刻度标识默认为left
                rotate: 0,
                margin: 8,
                clickable: false,
                formatter: null,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                }
            },
            splitArea: {           // 分隔区域
                show: false,       // 默认不显示，属性show控制显示与否
                areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                    color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                }
            }

        },

        timeline: {
            show: true,
            type: 'time',  // 模式是时间类型，支持 number
            notMerge: false,
            realtime: true,
            x: 80,
            y: null,
            x2: 80,
            y2: 0,
            width: null,
            height: 50,
            backgroundColor: 'rgba(0,0,0,0)',   // 时间轴背景颜色
            borderColor: '#ccc',               // 时间轴边框颜色
            borderWidth: 0,                    // 时间轴边框线宽，单位px，默认为0（无边框）
            padding: 5,                        // 时间轴内边距，单位px，默认各方向内边距为5，
            controlPosition: 'left',           // 'right' | 'none'
            autoPlay: false,
            loop: true,
            playInterval: 2000,                // 播放时间间隔，单位ms
            lineStyle: {
                width: 1,
                color: '#666',
                type: 'dashed'
            },
            label: {                            // 文本标签
                show: true,
                interval: 'auto',
                rotate: 0,
                formatter: null,
                textStyle: {                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#333'
                }
            },
            checkpointStyle: {
                symbol: 'auto',
                symbolSize: 'auto',
                color: 'auto',
                borderColor: 'auto',
                borderWidth: 'auto',
                label: {                            // 文本标签
                    show: false,
                    textStyle: {                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: 'auto'
                    }
                }
            },
            controlStyle: {
                normal: { color: '#333'},
                emphasis: { color: '#1e90ff'}
            },
            symbol: 'emptyDiamond',
            symbolSize: 4,
            currentIndex: 0,
            data: null
        },

        roamController: {
            show: true,
            x: 'left',                // 水平安放位置，默认为全图左对齐，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            width: 80,
            height: 120,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',       // 图例边框颜色
            borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            handleColor: '#6495ed',
            fillerColor: '#fff',
            step: 15,                  // 移动幅度
            mapTypeControl: null
        },

        // 柱形图默认参数
        bar: {
            name:'',                  //名称
            stack:null,
            cover:null,
            opacity:0.9,            //柱体透明度
            barGap:0.3,             // 柱间距离，默认为柱子宽度的30%
            barCategoryGap: 0.2,    // 类目间柱形距离，默认为坐标轴步长的20%

            xAxisIndex: 0,          //该参数暂时不处理   *********
            yAxisIndex: 0,          //该参数暂时不处理   *********
            clickable: true,        //该参数暂时不处理   *********
            barMinHeight: 0,        //该参数暂时不处理   *********
            barWidth: null,        // 该参数暂时不处理   *********
            itemStyle: {
                normal: {
                    color: null,
                    barBorderColor: '#fff', // 柱条边线
                    barBorderRadius: 0,     // 柱条边线圆角，单位px，默认为0
                    barBorderWidth: 0,      // 柱条边线线宽，单位px，默认为1
                    label: {
                        show: false,
                        formatter: '',      // 文本格式化
                        position: 'top', // 文本位置,柱状图默认top，条形图right
                        //'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: {color:'red'}     // 默认使用全局文本样式
                    }
                },
                emphasis: {
                    color: null,
                    barBorderColor: '#fff',  // 柱条边线
                    barBorderRadius: 0,      // 柱条边线圆角，单位px，默认为0
                    barBorderWidth: 0,       // 柱条边线线宽，单位px，默认为1
                    label: {
                        show: false,
                        formatter: '',      // 文本格式化
                        position: 'top', // 文本位置,柱状图默认top，条形图right
                                         //'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: {color:'red'}     // 默认使用全局文本样式
                    }
                }
            }
        },

        // 折线图默认参数
        line: {
            name:'',                  //名称
            stack:null,
            isArea:false,            //是否是面积图
            isSmooth : false,        // 是否平滑
            symbol: null,            // 拐点图形类型，非标准参数

            xAxisIndex: 0,         //该参数暂时不处理   *********
            yAxisIndex: 0,         //该参数暂时不处理   *********
            clickable: true,       //该参数暂时不处理   *********
            showAllSymbol: false,    // 该参数暂时不处理 *******

            itemStyle: {
                normal: {
                    color: null,
                    label: {
                        show: false,
                        formatter: '',     // 文本格式化
                        position: 'top',   //横向布局默认top，纵向布局right
                        //'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: null   // 默认使用全局文本样式
                    },
                    lineStyle: {
                        width: 2,
                        type: 'solid',
                        shadowColor: 'rgba(0,0,0,0)', //默认透明
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    },
                    areaStyle:{
                        opacity:0.5
                    },
                    symbolStyle:{
                        width:2,
                        symbolSize: 3,           // 拐点图形大小
                        symbolRotate : null    // 拐点图形旋转控制

                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: false,
                        formatter: '',      // 文本格式化
                        position: 'top',    //横向布局默认top，纵向布局right
                                            //'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: null     // 默认使用全局文本样式
                    },
                    lineStyle: {
                        width: 2,
                        type: 'solid',
                        shadowColor: 'rgba(0,0,0,0)', //默认透明
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    },
                    areaStyle:{
                        opacity:0.5
                    },
                    symbolStyle:{
                        width:2,
                        symbolSize: 3,           // 拐点图形大小
                        symbolRotate : null     // 拐点图形旋转控制
                    }
                }
            }
        },

        // K线图默认参数
        k: {
            clickable: true,
            legendHoverLink: false,
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: null,          // 默认自适应
            barMaxWidth: null,       // 默认自适应
            itemStyle: {
                normal: {
                    color: '#fff',       // 阳线填充颜色
                    color0: '#00aa11',    // 阴线填充颜色
                    lineStyle: {
                        width: 1,
                        color: '#ff3200',   // 阳线边框颜色
                        color0: '#00aa11' // 阴线边框颜色
                    }
                },
                emphasis: {
                    color: null,
                    color0: null
                }
            }
        },

        // 散点图默认参数
        scatter: {
            clickable: true,
            legendHoverLink: true,
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: null,    // 图形类型，非标准参数
            symbolSize: 4,       // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            symbolRotate: null,  // 图形旋转控制
            large: false,        // 大规模散点图
            largeThreshold: 2000,// 大规模阀值，large为true且数据量>largeThreshold才启用大规模模式
            itemStyle: {
                normal: {
                    color: null,
                    label: {
                        show: false,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter: function(a, b, c) {
                            if (typeof c[2] != 'undefined') {
                                return c[2];
                            }
                            else {
                                return c[0] + ' , ' + c[1];
                            }
                        },
                        position: "默认自使用，水平布局为'top'，垂直布局为'right'",
                        //           'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: false,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter: function(a, b, c) {
                            if (typeof c[2] != 'undefined') {
                                return c[2];
                            }
                            else {
                                return c[0] + ' , ' + c[1];
                            }
                        },
                        position: "默认自使用，水平布局为'top'，垂直布局为'right'",
                        //           'inside'|'left'|'right'|'top'|'bottom'
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                }
            }
        },

        // 雷达图默认参数
        radar: {
            center : ['50%', '50%'],    // 默认全局居中
            radius : '30%',
            startAngle : 90,
            splitNumber : 5,
            symbol: 'circle',        //拐点图形类型,'none'为没有拐点
            isArea:false,            //是否是面积图
            axis:[],                 //雷达图坐标
            clickable: true,         // 该参数暂时不处理   *********
            itemStyle: {
                normal: {
                    color: null,
                    label: {
                        show: false
                    },
                    lineStyle: {
                        width: 2,
                        type: 'solid'
                    },
                    areaStyle:{
                        opacity:0.5
                    },
                    symbolStyle:{
                        width:2,
                        symbolSize: 3,           // 拐点图形大小
                        symbolRotate : null     // 拐点图形旋转控制
                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: false
                    },
                    lineStyle: {
                        width: 3,
                        type: 'solid'
                    },
                    areaStyle:{
                        opacity:0.9
                    },
                    symbolStyle:{
                        width:3,
                        symbolSize: 4,           // 拐点图形大小
                        symbolRotate : null     // 拐点图形旋转控制
                    }
                }
            },

            axisStyle:{
                axisName : {
                    show: true,
                    formatter: null,
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333'
                    }
                },
                axisLine: {            // 坐标轴线
                    show: true,        // 默认显示，属性show控制显示与否
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#ccc',
                        width: 1,
                        type: 'solid'
                    }
                },
                axislabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    show: false,
                    formatter: null,
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333'
                    }
                },
                splitLine: {
                    show: true,
                    isStriped:true,     //是否隔行填充
                    lineStyle: {
                        width: 1,
                        color: '#ccc'
                    },
                    areaStyle: {
                        color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                    }
                }
            }
        },


        // 饼图默认参数
        pie: {
            center: ['50%', '50%'],     // 默认全局居中
            radius: ['0', '28%'],
            clockWise: true,            // 默认顺时针
            startAngle: 8,             // 起始角度
            transDate : 2000,           //平移时间
            //minAngle: 0,                    // 最小角度改为0
            //endAngle : 2 * Math.PI,         //结束角度
            selectedOffset: 10,             // 选中是扇区偏移量
            selectedMode:'single',         // 选择模式，默认关闭，可选 single，multiple false
            roseType:null,     // 南丁格尔玫瑰图模式，null 'radius'（半径） | 'area'（面积）
            roseRadius :50,    //玫瑰图用数据占面积比
            clickTime :  500,   //点击扇形，移动的时间
            itemStyle: {
                normal: {
                    color:null,
                    //borderColor: '#fff',
                    //borderWidth: 1,
                    opacity : 0,
                    circleFill : "none",   //外层圆圈填充颜色为 none 不填充
                    circlestoke :"gray",  //外层圆圈线的颜色为灰色
                    circlestokewidth :1,   //外层圆圈线的粗细
                    label: {
                        show: true,  //是否显示文字label  默认true显示，false  不显示
                        position: 'outer',//显示文字label的位置，默认outer为在饼图外边，inner为饼图各扇形上
                        formatter: '标签文本格式器，同Tooltip.formatter，不支持回调',
                        textStyle: {
                            font_size:"22pt",           //图例文字大小
                            font_family:"Microsoft YaHei",//字体
                            font_weight:"600",      //文字加粗
                            innerLabelFill:"black" //文字在各个扇形上时，文字颜色为黑色
                        }
                    },
                    labelLine: {
                        show: true,//是否显示指示线  默认true显示，false不显示
                        inflexiolen: 50,//从扇形开始指示线的长度
                        endinflexiolen : 50,//指示线转折点到结束的长度
                        fontlen : 50,//指示线转折点到文字的长度
                        lineFill : "none",//指示线填充色
                        lineStyle: {
                            color: null,
                            width: 2,
                            type: 'solid'
                        }
                    }
                },
                emphasis: {
                    color: null,
                    //borderColor: 'rgba(0,0,0,0)',
                    //borderWidth: 1,
                    opacity : 0.5,
                    label: {
                        show: false,
                        position: 'outer',
                        formatter: '标签文本格式器，同Tooltip.formatter，不支持回调',
                        textStyle: null
                    },
                    labelLine: {
                        show: false,
                        length: 20,
                        lineStyle: {
                            color: null,
                            width: 1,
                            type: 'solid'
                        }
                    }
                }
            }
        },

        map: {
            mapType: 'china',
            mapLocation: {
                x : 'center',
                y : 'center',
                width: null,    // 自适应
                height:null   // 自适应
            },
            mapValueCalculation: 'sum',    // 数值合并方式，默认加和，可选为：'sum' | 'average'
            mapValuePrecision: 0,         // 地图数值计算结果小数精度
            showLegendSymbol: true,       // 显示图例颜色标识（系列标识的小圆点），存在legend时生效
            selectedMode: false,           // 选择模式，默认关闭，可选single，multiple
            hoverable: true,
            clickable: true,
            roam: false,               // 是否开启缩放及漫游模式
            scaleLimit: null,
            itemStyle: {
                normal: {
                    color: null,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    areaStyle: {
                        color: '#ccc'
                    },
                    label: {
                        show: false,
                        textStyle: {
                            color: 'rgb(139,69,19)'
                        }
                    }
                },
                emphasis: {                 // 也是选中样式
                    color: null,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    areaStyle: {
                        color: 'rgba(255,215,0,0.8)'
                    },
                    label: {
                        show: false,
                        textStyle: {
                            color: 'rgb(100,0,0)'
                        }
                    }
                }
            }
        },

        force: {
            // 布局中心
            center: ['50%', '50%'],

            // 布局大小
            size: '100%',

            // 防止节点和节点，节点和边之间的重叠
            preventOverlap: false,

            // 布局冷却因子，值越小结束时间越短，值越大时间越长但是结果也越收敛
            coolDown: 0.99,

            // 数据映射到圆的半径的最小值和最大值
            minRadius: 10,
            maxRadius: 20,

            // 是否根据屏幕比例拉伸
            ratioScaling: false,

            // 在 500+ 顶点的图上建议设置 large 为 true, 会使用 Barnes-Hut simulation
            // 同时开启 useWorker 并且把 steps 值调大
            // 关于Barnes-Hut simulation: http://en.wikipedia.org/wiki/Barnes–Hut_simulation
            large: false,

            // 是否在浏览器支持 worker 的时候使用 web worker
            useWorker: false,
            // 每一帧 force 迭代的次数，仅在启用webworker的情况下有用
            steps: 1,

            // 布局缩放因子，并不完全精确, 效果跟布局大小类似
            scaling: 1.0,

            // 向心力因子，越大向心力越大（ 所有顶点会往 center 的位置收拢 )
            gravity: 1,

            symbol: 'circle',
            // symbolSize 为 0 的话使用映射到minRadius-maxRadius后的值
            symbolSize: 0,

            linkSymbol: null,
            linkSymbolSize: [10, 15],
            draggable: true,
            clickable: true,

            roam: false,

            // 分类里如果有样式会覆盖节点默认样式
            categories: [{
                // itemStyle
                // symbol
                // symbolSize
                // name
            }],
            itemStyle: {
                normal: {
                    color: null,
                    label: {
                        show: false,
                        position: 'inside',
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    nodeStyle : {
                        brushType : 'both',
                        color : '#f08c2e',
                        strokeColor : '#5182ab',
                        lineWidth: 1
                    },
                    linkStyle: {
                        color: '#5182ab',
                        width: 1,
                        type: 'line'
                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: false,
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    nodeStyle: {},
                    linkStyle: {
                        opacity: 0
                    }
                }
            }
            // nodes: [{
            //     name: 'xxx',
            //     value: 1,
            //     itemStyle: {},
            //     initial: [0, 0],
            //     fixX: false,
            //     fixY: false,
            //     ignore: false,
            //     symbol: 'circle',
            //     symbolSize: 0
            // }]
            // links: [{
            //      source: 1,
            //      target: 2,
            //      weight: 1,
            //      itemStyle: {}
            // }, {
            //      source: 'xxx',
            //      target: 'ooo'
            // }]
        },

        chord: {
            clickable: true,
            radius: ['65%', '75%'],
            center: ['50%', '50%'],
            padding: 2,
            sort: 'none',       // can be 'none', 'ascending', 'descending'
            sortSub: 'none', // can be 'none', 'ascending', 'descending'
            startAngle: 90,
            clockWise: true,
            ribbonType: true,
            showScale: false,
            showScaleText: false,

            // 分类里如果有样式会覆盖节点默认样式
            arcs: [
                {
                    name:"",
                    itemStyle:{
                        borderWidth: 1,
                        borderColor: '#999',
                        opacity: 0.5}

                }],

            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#000',
                    label: {
                        show: true,
                        rotate: false,
                        distance: 5,
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    chordStyle: {
                        borderWidth: 1,
                        borderColor: '#999',
                        opacity: 0.5
                    }
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#000',
                    chordStyle: {
                        borderWidth: 1,
                        borderColor: '#999'
                    }
                }
            },
            // Source data matrix
            /**
             *         target
             *    -1--2--3--4--5-
             *  1| x  x  x  x  x
             *  2| x  x  x  x  x
             *  3| x  x  x  x  x  source
             *  4| x  x  x  x  x
             *  5| x  x  x  x  x
             *
             *  Relation ship from source to target
             *  https://github.com/mbostock/d3/wiki/Chord-Layout#wiki-chord
             *
             *  Row based
             */
            matrix: []

        },

        gauge: {
            center: ['50%', '50%'],    // 默认全局居中
            radius: '40%',
            startAngle: -45,
            endAngle: 225,
            min: 0,                     // 最小值
            max: 100,                   // 最大值
            precision: 0,               // 小数精度，默认为0，无小数点
            color:[{percent:0.2,color:'#228b22'},{percent:0.6,color:'#48b'},{percent:0.2,color:'#ff4500'}],
            shadowColor : '#fff', //默认透明
            shadowBlur: 10,
            axisArc: {             // 坐标轴弧线
                show: true,        // 默认显示，属性show控制显示与否
                width:30
            },
            axisTick: {            // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                tickNumber: 10,    // 分割段数，默认为10
                length :30,        // 属性length控制线长
                width:2,
                color:null
            },
            subTick: {             // 坐标轴小标记
                show: true,        // 属性show控制显示与否，默认不显示
                tickNumber: 5,     // 每份split细分多少段
                length :8,         // 属性length控制线长
                width:1,
                color:null
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                formatter: null,
                color:null
            },
            pointer: {
                show: true,
                length: '80%',
                width: 8,
                color: null
            },
            title: {
                show: true,
                text: null,
                offsetCenter: [0, '-40%'],       // x, y，单位px
                color: '#333',
                fontSize: 15
            },
            detail: {
                show: true,
                offsetCenter: [0, '40%'],       // x, y，单位px
                formatter: null,
                color: '#333',
                fontSize: 15
            }

        },

        funnel: {
            clickable: true,
            legendHoverLink: true,
            x: 80,
            y: 60,
            x2: 80,
            y2: 60,
            width: null,
            height: null,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending', // 'ascending', 'descending'
            gap: 0,
            funnelAlign: 'center',
            itemStyle: {
                normal: {
                    color: null,
                    borderColor: '#fff',
                    borderWidth: 1,
                    label: {
                        show: true,
                        position: 'outer',
                        formatter: null,     // 标签文本格式器，同Tooltip.formatter，不支持回调
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        lineStyle: {
                            color: null,
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                emphasis: {
                    color: null,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                }
            }
        },

        eventRiver: {
            clickable: true,
            legendHoverLink: true,
            itemStyle: {
                normal: {
                    color: null,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    label: {
                        show: true,
                        position: 'inside',     // 可选为'left'|'right'|'top'|'bottom'
                        formatter: '{b}',
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                },
                emphasis: {
                    color: null,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    label: {
                        show: true
                    }
                }
            }
        },

        island: {
            r: 15,
            calculateStep: 0.1  // 滚轮可计算步长 0.1 = 10%
        },

        markPoint: {
            clickable: true,
            symbol: 'pin',         // 标注类型
            symbolSize: 10,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            symbolRotate : null,// 标注旋转控制
            large: false,
            effect: {
                show: false,
                loop: true,
                period: 15,             // 运动周期，无单位，值越大越慢
                scaleSize: 2,         // 放大倍数，以markPoint点size为基准
                color: null,
                shadowColor: null,
                shadowBlur: 0          // 炫光模糊
            },
            itemStyle: {
                normal: {
                    color: null,
                    borderColor: null,     // 标注边线颜色，优先于color
                    borderWidth: 2,            // 标注边线线宽，单位px，默认为1
                    label: {
                        show: true,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter: null,
                        position: 'inside', // 可选为'left'|'right'|'top'|'bottom'
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: true,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter: null,
                        position: 'inside',  // 'left'|'right'|'top'|'bottom'
                        textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
                    }
                }
            }
        },

        markLine: {
            clickable: true,
            // 标线起始和结束的symbol介绍类型，如果都一样，可以直接传string
            symbol: ['circle', 'arrow'],
            // 标线起始和结束的symbol大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            symbolSize: [2, 4],
            // 标线起始和结束的symbol旋转控制
            symbolRotate: null,
            smooth: false,
            large: false,
            effect: {
                show: false,
                loop: true,
                period: 15,             // 运动周期，无单位，值越大越慢
                scaleSize: 2,           // 放大倍数，以markLine线lineWidth为基准
                color: null,
                shadowColor: null,
                shadowBlur: 'lineWidth*2'      // 炫光模糊，默认等于scaleSize计算所得
            },
            itemStyle: {
                normal: {
                    color: null,           // 标线主色，线色，symbol主色
                    borderColor: null,     // 标线symbol边框颜色，优先于color
                    borderWidth: 1.5,          // 标线symbol边框线宽，单位px，默认为2
                    label: {
                        show: true,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter: null,
                        // 可选为 'start'|'end'|'left'|'right'|'top'|'bottom'
                        position: 'end',
                        textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    lineStyle: {
                        color: null, // 主色，线色，优先级高于borderColor和color
                        width: null, // 优先于borderWidth
                        type: 'dashed',
                        shadowColor : 'rgba(0,0,0,0)', //默认透明
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                },
                emphasis: {
                    color: null,
                    label: {
                        show: false,
                        // 标签文本格式器，同Tooltip.formatter，不支持回调
                        formatter : null,
                        position: 'inside', // 'left'|'right'|'top'|'bottom'
                        textStyle: null    // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    lineStyle : {}
                }
            }
        },

        // 主题，主题
        textStyle: {
            decoration: 'none',
            fontFamily: 'Arial, Verdana, sans-serif',
            fontFamily2: '微软雅黑',    // IE8- 字体模糊并且，不支持不同字体混排，额外指定一份
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal'
        },

        EVENT: {
            // -------全局通用
            REFRESH: 'refresh',
            RESTORE: 'restore',
            RESIZE: 'resize',
            CLICK: 'click',
            DBLCLICK: 'dblclick',
            HOVER: 'hover',
            MOUSEOUT: 'mouseout',
            //MOUSEWHEEL: 'mousewheel',
            // -------业务交互逻辑
            DATA_CHANGED: 'dataChanged',
            DATA_ZOOM: 'dataZoom',
            DATA_RANGE: 'dataRange',
            DATA_RANGE_HOVERLINK: 'dataRangeHoverLink',
            LEGEND_SELECTED: 'legendSelected',
            LEGEND_HOVERLINK: 'legendHoverLink',
            LEGEND_OUTLINK:'legendOutLink',
            MAP_SELECTED: 'mapSelected',
            PIE_SELECTED: 'pieSelected',
            MAGIC_TYPE_CHANGED: 'magicTypeChanged',
            DATA_VIEW_CHANGED: 'dataViewChanged',
            TIMELINE_CHANGED: 'timelineChanged',
            MAP_ROAM: 'mapRoam',
            FORCE_LAYOUT_END: 'forceLayoutEnd',
            // -------内部通信
            TOOLTIP_HOVER: 'tooltipHover',
            TOOLTIP_IN_GRID: 'tooltipInGrid',
            TOOLTIP_OUT_GRID: 'tooltipOutGrid',
            ROAMCONTROLLER: 'roamController'
        },
        // 图表类型
        CHART_TYPE_LINE: 'line',
        CHART_TYPE_BAR: 'bar',
        CHART_TYPE_SCATTER: 'scatter',
        CHART_TYPE_PIE: 'pie',
        CHART_TYPE_RADAR: 'radar',
        CHART_TYPE_MAP: 'map',
        CHART_TYPE_FORCE: 'force',
        CHART_TYPE_CHORD: 'chord',
        CHAR_TYPE_TREE:'tree',
        CHAR_TYPE_GAUGE:'gauge'
    };


    return _config;
};function utils (){
    var _utils = {};

    // 用于处理merge时无法遍历Date等对象的问题
    var BUILTIN_OBJECT = {
        '[object Function]': 1,
        '[object RegExp]': 1,
        '[object Date]': 1,
        '[object Error]': 1,
        '[object CanvasGradient]': 1
    };

    function mergeItem (target, source, key, overwrite) {
        if (source.hasOwnProperty(key)) {
            if (target[key] && typeof target[key] == 'object' && !BUILTIN_OBJECT[ Object.prototype.toString.call(target[key]) ]) {
                // 如果需要递归覆盖，就递归调用merge
                _utils.merge(target[key],source[key], overwrite);
            }else if (overwrite || !(key in target)) {
                if(typeof source[key] == 'object' && !BUILTIN_OBJECT[ Object.prototype.toString.call(source[key]) ]){
                    target[key] = _utils.cloneObject(source[key]);
                }
                else{
                    // 目标对象中没有此属性
                    target[key] = source[key];
                }
            }
        }
    }

    /**
     * 合并源对象的属性到目标对象
     * modify from Tangram
     * @param {*} target 目标对象
     * @param {*} source 源对象
     * @param {boolean} overwrite 是否覆盖
     */
     _utils.merge = function (target, source, overwrite) {
         var _overwrite = overwrite;
         if(typeof(_overwrite)!=="boolean"){
             _overwrite = true;
         }
        for (var i in source) {
            mergeItem(target, source, i, _overwrite);
        }

        return target;
    };

    /**
     * 深度克隆
     * @param source  需要被clone的对象
     * @returns {}  返回clone后的新对象
     */
     _utils.cloneObject = function (source){
         var target;
         if(typeof source == "object"){
             if(source === null){
                 target = null;
             }else{
                 if(source instanceof Array){
                     target = [];
                     for(var i = 0, len = source.length; i < len; i++){
                         target.push(_utils.cloneObject(source[i]));
                     }
                 }else{
                     target = {};
                     for(var k in source){
                         target[k] =  _utils.cloneObject(source[k]);
                     }
                 }
             }
         }else{
             target = source;
         }
         return target;
     };

    return _utils;
};// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations

// Public - contructs a new tooltip
//
// Returns a tip
d3.tip = function() {
  var direction = d3_tip_direction,
      offset    = d3_tip_offset,
      html      = d3_tip_html,
      node      = initNode(),
      svg       = null,
      point     = null,
      target    = null

  function tip(vis) {
    svg = getSVGNode(vis)
    point = svg.createSVGPoint()
    document.body.appendChild(node)
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function() {
    var args = Array.prototype.slice.call(arguments)
    if(args[args.length - 1] instanceof SVGElement) target = args.pop()

    var content = html.apply(this, args),
        poffset = offset.apply(this, args),
        dir     = direction.apply(this, args),
        nodel   = d3.select(node), i = 0,
        coords

    nodel.html(content)
      .style({ opacity: 1, 'pointer-events': 'all' })

    while(i--) nodel.classed(directions[i], false)
    coords = direction_callbacks.get(dir).apply(this)
    nodel.classed(dir, true).style({
      top: (coords.top +  poffset[0]) + 'px',
      left: (coords.left + poffset[1]) + 'px'
    })

    return tip
  }

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function() {
    nodel = d3.select(node)
    nodel.style({ opacity: 0, 'pointer-events': 'none' })
    return tip
  }

  // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  tip.attr = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).attr(n)
    } else {
      var args =  Array.prototype.slice.call(arguments)
      d3.selection.prototype.attr.apply(d3.select(node), args)
    }

    return tip
  }

  // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  tip.style = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).style(n)
    } else {
      var args =  Array.prototype.slice.call(arguments)
      d3.selection.prototype.style.apply(d3.select(node), args)
    }

    return tip
  }

  // Public: Set or get the direction of the tooltip
  //
  // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
  //     sw(southwest), ne(northeast) or se(southeast)
  //
  // Returns tip or direction
  tip.direction = function(v) {
    if (!arguments.length) return direction
    direction = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function(v) {
    if (!arguments.length) return offset
    offset = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function(v) {
    if (!arguments.length) return html
    html = v == null ? v : d3.functor(v)

    return tip
  }

  function d3_tip_direction() { return 'n' }
  function d3_tip_offset() { return [0, 0] }
  function d3_tip_html() { return ' ' }

  var direction_callbacks = d3.map({
    n:  direction_n,
    s:  direction_s,
    e:  direction_e,
    w:  direction_w,
    nw: direction_nw,
    ne: direction_ne,
    sw: direction_sw,
    se: direction_se
  }),

  directions = direction_callbacks.keys()

  function direction_n() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.n.y - node.offsetHeight,
      left: bbox.n.x - node.offsetWidth / 2
    }
  }

  function direction_s() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.s.y,
      left: bbox.s.x - node.offsetWidth / 2
    }
  }

  function direction_e() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.e.y - node.offsetHeight / 2,
      left: bbox.e.x
    }
  }

  function direction_w() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.w.y - node.offsetHeight / 2,
      left: bbox.w.x - node.offsetWidth
    }
  }

  function direction_nw() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.nw.y - node.offsetHeight,
      left: bbox.nw.x - node.offsetWidth
    }
  }

  function direction_ne() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.ne.y - node.offsetHeight,
      left: bbox.ne.x
    }
  }

  function direction_sw() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.sw.y,
      left: bbox.sw.x - node.offsetWidth
    }
  }

  function direction_se() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.se.y,
      left: bbox.e.x
    }
  }

  function initNode() {
    var node = d3.select(document.createElement('div'))
    node.style({
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box'
    })

    return node.node()
  }

  function getSVGNode(el) {
    el = el.node()
    if(el.tagName.toLowerCase() == 'svg')
      return el

    return el.ownerSVGElement
  }

  // Private - gets the screen coordinates of a shape
  //
  // Given a shape on the screen, will return an SVGPoint for the directions
  // n(north), s(south), e(east), w(west), ne(northeast), se(southeast), nw(northwest),
  // sw(southwest).
  //
  //    +-+-+
  //    |   |
  //    +   +
  //    |   |
  //    +-+-+
  //
  // Returns an Object {n, s, e, w, nw, sw, ne, se}
  function getScreenBBox() {
    var targetel   = target || d3.event.target,
        bbox       = {},
        matrix     = targetel.getScreenCTM(),
        tbbox      = targetel.getBBox(),
        width      = tbbox.width,
        height     = tbbox.height,
        x          = tbbox.x,
        y          = tbbox.y,
        scrollTop  = document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft


    point.x = x + scrollLeft
    point.y = y + scrollTop
    bbox.nw = point.matrixTransform(matrix)
    point.x += width
    bbox.ne = point.matrixTransform(matrix)
    point.y += height
    bbox.se = point.matrixTransform(matrix)
    point.x -= width
    bbox.sw = point.matrixTransform(matrix)
    point.y -= height / 2
    bbox.w  = point.matrixTransform(matrix)
    point.x += width
    bbox.e = point.matrixTransform(matrix)
    point.x -= width / 2
    point.y -= height / 2
    bbox.n = point.matrixTransform(matrix)
    point.y += height
    bbox.s = point.matrixTransform(matrix)

    return bbox
  }

  return tip
};
;"use strict";

/**
 * 实现画图例的方法，需要图例本身的data，即图例所要描述的信息，
 * @param svg  画布
 * @param config  配置信息
 * @param data data为画图例的数组 格式[{name:"图例1"，color"blue",type:"bar", symbol:"", symbolStyle:""}]
 *                    name：图例的名字，color:颜色，type:类型，symbol:符号图例，symbolStyle：样式
 * @returns {{_legend}}
 */
function legend(svg, opt, data) {
    var _legend = {};
    var _config=opt;
    var _utils = utils();
    var _gWidthArray = [],//存放每个legendG的宽  用于计算平移
        _gHeightArray = [],//高的数组 用于计算平移
        _allHeightArray = [],//存放每组图例g的高度 ；用于计算gobalG的平移
        _allWidthArray = []; //存放每组图例g的宽度；用于计算gobalG的平移
    var _rowWidth; //记录正行的宽度
    var _gWidth, _gHeight;//记录每个legend g容器的宽，高

    _legend.render = function () {
        var gGlobal = svg.append("g").attr("class", "gGlobal");

        if (_config.legend.show)   //设置图例是否显示
        {
            gGlobal.attr("visibility", "visible");
        } else {
            gGlobal.attr("visibility", "hidden");
        }
        var  newData= filterData(data); //校对以后的数组

        if (newData !== undefined && newData !== null && newData.length > 0) {
;
            var textWidth, //文本的宽
                textHeight, //文本的高
                legWidth, //图例的宽
                legHeight,//图例的高
                classes = "", //图例指向的class名
                textWidthArray=[],//存放图例文字的宽度 用于平移计算
                textHeightArray=[]; //存放图例文字的高度
            var g = gGlobal.selectAll(".legendG").data(newData).enter().append("g").attr("class", "legendG");// //定义一个g存放rect，及text
            g.each(function (d, i) {
                if (d !== null) {
                    legWidth = _config.legend.itemWidth;
                    legHeight = _config.legend.itemHeight;
                    if (d.type === _config.CHART_TYPE_BAR)//画直方图图例
                    {
                        classes = ".rect";
                        d3.select(this).append("rect").
                            attr("class", "rect" + i)
                            .attr("width", legWidth)//矩形的宽
                            .attr("height", legHeight)//矩形的高
                            .attr("rx", _config.legend.rx)  // 设置菱角的弧度（做成圆角矩形使用），如果设置长方形宽度和长度相同就标识为一个圆
                            .attr("ry", _config.legend.ry)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", d.color)
                            .attr("type", _config.CHART_TYPE_BAR);
                        _legend.mouseEvent(".rect" + i, ".text" + i);
                    } else if (d.type === _config.CHART_TYPE_SCATTER) //画散点图图例
                    {
                        classes = ".legCircle";
                        var r = 10;//圆的半径
                        if (legHeight < legWidth) {
                            r = legWidth / 2;
                        } else {
                            r = legHeight / 2;
                        }
                        legHeight = 2 * r;
                        legWidth = 2 * r;
                        d3.select(this).append("circle").
                            attr("class", "legCircle" + i)
                            .attr("cx", function () {
                                return r;
                            })
                            .attr("cy", r)
                            .attr("r", r)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//矩形的透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", d.color)
                            .attr("type", _config.CHART_TYPE_SCATTER);
                        _legend.mouseEvent(".legCircle" + i, ".text" + i);
                    } else if (d.type === _config.CHART_TYPE_PIE)  //饼图
                    {
                        classes = ".arc";
                        var outerR = 30, innerR = 10;//扇形的外半径及内半径 默认30,10
                        if (legWidth > legHeight) { //宽大于高 外半径设置宽长
                            outerR = legWidth;
                            innerR = legWidth / 2;
                        } else {  //外半径设置高长
                            outerR = legHeight;
                            innerR = legHeight / 2;
                        }

                        var pieData = {startAngle: 0, endAngle: Math.PI * 0.5};////扇形的数组
                        var arc = d3.svg.arc().outerRadius(outerR)
                            .innerRadius(innerR);
                        d3.select(this).append("path")
                            .attr("class", "arc" + i)
                            .attr("fill", d.color)
                            .attr("stroke", _config.legend.borderColor) //边框线的颜色
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("transform", "translate(15,25)rotate(-45)scale(1)")
                            .attr("d", arc(pieData, 0))
                            .attr("type", _config.CHART_TYPE_PIE);

                        _legend.mouseEvent(".arc" + i, ".text" + i);//添加鼠标移动上事件
                    } else if (d.type === _config.CHART_TYPE_LINE) //折线图图例
                    {
                        classes = ".line";
                        var lineData = [{"x": 0, "y": 7}, {"x": 30, "y": 7}];
                        //线生成器
                        var lineFunction = d3.svg.line()
                            .x(function (d) {
                                return d.x;
                            })
                            .y(function (d) {
                                return d.y;
                            })
                            .interpolate("linear");

                        d3.select(this).append("path") //把path放到容器中，并给d赋属性  画虚线
                            .attr("d", lineFunction(lineData))
                            .attr("class", "line" + i)
                            .attr("stroke", function (d) { //边框线的颜色
                                if (d.color == undefined) {
                                    return _config.legend.borderColor
                                }
                                return d.color;
                            })
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)//透明度
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("stroke-dasharray", "10 10")
                            .attr("type", _config.CHART_TYPE_LINE);

                        //在线的中间位置画一个圆形
                        var lineD = lineFunction(lineData);
                        var endPoint = lineD.split("L")[1];
                        var endX = endPoint.split(",")[0];
                        var endY = endPoint.split(",")[1];
                        var cx = endX / 2, cy = endY, cr = 4;//圆的圆心及半径
                        d3.select(this).append("circle")
                            .attr("class", "line" + i)
                            .attr("cx", cx)
                            .attr("cy", cy)
                            .attr("r", cr)
                            .attr("stroke", function (d, i) { //边框线的颜色
                                if (d.color == undefined) {
                                    return _config.legend.borderColor
                                }
                                return d.color;
                            })
                            .attr("stroke-width", _config.legend.borderWidth)//边框线粗细
                            //.attr("fill-opacity", _config.legend.opacity)
                            .attr("stroke-opacity", _config.legend.borderOpacity) //边框的透明度
                            .attr("fill", "none");

                        legWidth = 30;
                        _legend.mouseEvent(".line" + i, ".text" + i);
                    }
                    d3.select(this).append("text")//g容器添加text文本
                        .attr("class", "text" + i)
                        .text(function (d) {
                            if (d.name !== undefined && d.name != null) {
                                return d.name;
                            }
                        })
                        .attr("font-family", _config.legend.textStyle.font_family)
                        .attr("font-size", _config.legend.textStyle.font_size)
                        .attr("type", d.type)
                        .attr("fill", function () {
                            return _config.legend.textStyle.color;
                        })
                        .attr("transform", function () { //平移字的位置
                            var tw = d3.select(this).node().getBBox().width,
                                th = d3.select(this).node().getBBox().height;

                            textWidth = tw;
                            textHeight = th;
                            textWidthArray.push(tw);
                            textHeightArray.push(th);
                            var translate = textPosition(legWidth, legHeight, textWidth, textHeight);
                            return translate;
                        });
                    _legend.mouseEvent(".text" + i, classes + i); //文本加移动事件
                }


            });


            g.attr("transform", function (d, i) {//每个一个legend对应的g容器进行平移

                if (d === null) {
                    var translate = gPosition(0, 0, "br");
                    return translate;
                } else {
                    var tw=textWidthArray[i];
                    var th=textHeightArray[i];
                    var translate = gPosition(tw, th, "");
                    return translate;
                }

            });

        }
        gGlobal.attr("transform", function () {//最外层的gGlobal整体平移
            var translate = globalPosition();
            return translate;
        })

    };


    /**
     * 根据用户自定义数据与程序中传送的图例数组进行比对整合
     * @param data  接收到的图例data数组
     * @return newData
     */
    function filterData(data)
    {
        var newData=[];
        var customerData=_config.legend.data; //_config中用户自定义数组
        if(customerData===undefined || customerData===null || customerData.length==0)//如果没有定义则按照接收到的数据为准
        {
            newData=data;
        }
        else //根据用户自定义的查找，若有则按照规则画，若无则按照默认
        {

            for(var i=0;i<customerData.length;i++)
            {
                var cusData=customerData[i].toString();

                if(cusData===null || cusData==="\n")
                {
                    newData.push(null); //若有为空则为换行
                }else
                {
                    var flag=0; //在接收的数据组中是否有 若有则为1；
                    for(var j=0;j<data.length;j++)
                    {
                        var serverData=data[j];
                        if(serverData!==undefined && serverData!==null)
                        {
                            if(cusData===serverData.name) //若找到
                            {
                                newData.push(serverData);
                                flag=1;
                                break;
                            }
                        }

                    }
                    if(flag===0)
                    {
                        var color=d3.rgb('gray');
                        newData.push({
                            name: cusData,
                            color: color,
                            type: "bar",
                            symbol: "",
                            symbolStyle: ""
                        })

                    }
                }

            }
        }


        return newData;

    }
    /**
     * 鼠标移动上去的事件
     * @param thisClasses  当前鼠标移动上去的组件
     * @param thatClasses  随着变化的组件
     */
    _legend.mouseEvent = function (thisClasses, thatClasses) {

        var type = d3.select(thisClasses).attr("type");
        var pieData = [{startAngle: 0, endAngle: Math.PI * 0.5}];
        var rectWidth, rectHeight, r, outerR, innerR, lineWidth, cr;
        d3.selectAll(thisClasses)
            .on("mouseover", function (d) {
                switch (type) {
                    case  _config.CHART_TYPE_BAR://直方图

                        if (thisClasses.indexOf("text") > 0) {
                            rectWidth = d3.select(thatClasses).attr("width"); //当前的宽
                            rectHeight = d3.select(thatClasses).attr("height");//当前的高
                        } else {
                            rectWidth = d3.select(thisClasses).attr("width"); //当前的宽
                            rectHeight = d3.select(thisClasses).attr("height");//当前的高
                        }

                        break;
                    case _config.CHART_TYPE_SCATTER: //散点图

                        if (thisClasses.indexOf("text") > 0) {
                            r = d3.select(thatClasses).attr("r");
                        } else {
                            r = d3.select(thisClasses).attr("r");
                        }

                        break;
                    case _config.CHART_TYPE_PIE: //饼图

                        var itemWidth = _config.legend.itemWidth, //图例的宽
                            itemHeight = _config.legend.itemHeight; //图例的高

                        if (itemWidth > itemHeight) {
                            outerR = itemWidth;
                            innerR = itemWidth / 2;
                        } else {
                            outerR = itemHeight;
                            innerR = itemHeight / 2;
                        }
                        break;
                    case _config.CHART_TYPE_LINE: //折线图
                        var nodes;
                        if (thisClasses.indexOf("text") > 0) {
                            nodes = d3.selectAll(thatClasses);
                        } else if (thisClasses.indexOf(type) > 0) {
                            nodes = d3.selectAll(thisClasses);
                        }
                        nodes.forEach(function (d) {

                            var line = d3.select(d[0]);
                            lineWidth = line.attr("stroke-width");
                            var circle = d3.select(d[1]);
                            cr = circle.attr("r");


                        });
                        break;

                }

                //var fillColor = d.color;
                var fillColor=d3.rgb(d.color).brighter(0.9);

                if (thisClasses.indexOf("text") > 0) //鼠标移动到文本上时
                {
                    d3.selectAll(thisClasses).attr("style", "cursor: hand").attr("fill", fillColor);//.attr("oldColor", d.color);
                    d3.selectAll(thatClasses)
                        .attr("style", "cursor: hand")
                        .attr("fill",fillColor); //.attr("fill-opacity", .5)

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            var blowW = parseInt(rectWidth) + 1;
                            var blowH = parseInt(rectHeight) + 1;
                            d3.select(thatClasses).attr("width", blowW).attr("height", blowH);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图
                            var blowR = parseInt(r) + 1;
                            d3.select(thatClasses).attr("r", blowR);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thatClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR + 1)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                });
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thatClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth) + 1)
                                var circle = d3.select(d[1]);
                                circle.attr("r", (parseInt(cr) + 1))
                                    .attr("fill", "none");
                            });
                            break;
                    }

                }
                else {
                    d3.selectAll(thisClasses)
                        .attr("style", "cursor: hand")
                        .attr("fill",fillColor)

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            var blowW = parseInt(rectWidth) + 1;
                            var blowH = parseInt(rectHeight) + 1;
                            d3.select(thisClasses).attr("width", blowW).attr("height", blowH);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            var blowR = parseInt(r) + 1;
                            d3.select(thisClasses).attr("r", blowR);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thisClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR + 1)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                });
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thisClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);

                                var lw=parseInt(lineWidth)+1;

                                line.attr("stroke-width",lw)
                                var circle = d3.select(d[1]);

                                var crr=parseInt(cr)+1;
                                circle.attr("r", crr)
                                    .attr("fill", "none");
                            });
                            break;
                    }
                    d3.select(thatClasses).attr("fill", fillColor);
                }
                _config.EVENT.LEGEND_HOVERLINK(d.name);
            }).on("mouseout", function (d) {

                var fillColor = d.color;
                var visible = d3.select(this).attr("visible");
                if (thisClasses.indexOf("text") > 0) //鼠标离开文本
                {

                    if (visible === null || visible === "true") {
                        d3.select(thisClasses).attr("fill", _config.legend.textStyle.color);
                        d3.select(thatClasses).attr("fill", fillColor);

                    } else {
                        fillColor=d3.rgb('gray').brighter(0.9);
                        d3.select(thisClasses).attr("fill",fillColor );
                       d3.select(thatClasses).attr("fill",fillColor);
                    }
                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            d3.select(thatClasses)
                                .attr("width", rectWidth)
                                .attr("height", rectHeight)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            d3.select(thatClasses).attr("r", r)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图
                            d3.select(thatClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                })
                                .attr("stroke", _config.legend.borderColor);
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thatClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth))
                                    .attr("stroke", fillColor);
                                var circle = d3.select(d[1]);
                                circle.attr("r", (parseInt(cr)))
                                    .attr("stroke", _config.legend.borderColor)
                                    .attr("fill", "none");
                            });
                            break;
                    }

                } else {


                    if (visible === null || visible === "true") {
                        d3.select(thatClasses).attr("fill", _config.legend.textStyle.color);
                        d3.select(thisClasses).attr("fill",fillColor);
                    } else {
                        fillColor=d3.rgb('gray').brighter(0.9);
                        d3.select(thatClasses).attr("fill", fillColor);
                        d3.select(thisClasses).attr("fill", fillColor);

                    }

                    switch (type) {
                        case  _config.CHART_TYPE_BAR://直方图
                            d3.select(thisClasses).attr("width", rectWidth)
                                .attr("height", rectHeight)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_SCATTER: //散点图

                            d3.select(thisClasses).attr("r", r)
                                .attr("stroke", _config.legend.borderColor);
                            break;
                        case _config.CHART_TYPE_PIE: //饼图

                            d3.select(thisClasses)
                                .attr("d", function () {
                                    var arc = d3.svg.arc().outerRadius(outerR)
                                        .innerRadius(innerR);
                                    return arc(pieData[0], 0);
                                })
                                .attr("stroke", _config.legend.borderColor);
                            break;

                        case _config.CHART_TYPE_LINE: //折线图
                            var nodes = d3.selectAll(thisClasses);
                            nodes.forEach(function (d) {
                                var line = d3.select(d[0]);
                                line.attr("stroke-width", parseInt(lineWidth)).attr("stroke", fillColor);
                                var circle = d3.select(d[1]);
                                circle.attr("fill", "none")
                                    .attr("r", (parseInt(cr)))
                                    .attr("stroke", _config.legend.borderColor);

                            });
                            break;
                    }

                }
                _config.EVENT.LEGEND_OUTLINK(d.name);
            }).on("click", function (d, i) {

                var visible = d3.select(this).attr("visible");
                var type = d3.select(this).attr("type");
                if (visible == null || visible === "true") {
                    d3.select(this).attr("visible", "false"); //设置不可用
                    d3.select(thatClasses).attr("visible", "false");
                    _config.EVENT.LEGEND_SELECTED(d.name);
                } else {
                    d3.select(this).attr("visible", "true"); //设置可用
                    d3.select(thatClasses).attr("visible", "true");
                    _config.EVENT.LEGEND_SELECTED(d.name);

                }
            });
    };

    //确定gGlobal容器的位置
    var globalPosition = function () {
        var rx, ry; //偏移量
        var orient = _config.legend.orient; //图例的排放位置
        var _x = _config.legend.x; //图例在x轴方向的位置
        var _y = _config.legend.y;//图例在y轴方向的位置

        if (orient === undefined || orient === null || orient === "") //若未定义 设置默认值
        {
            orient = "horizontal";
        }
        if (_x === undefined || _x === null || _x === "") {
            _x = "center";
        }

        if (_y === undefined || _y === null || _y === "") {
            _y = "top";
        }

        if (typeof _x === "number") {
            rx = _x;
        } else {
            var maxWidth; //获取行的最大宽度
            if (_allWidthArray.length > 0) //有换行
            {
                maxWidth = d3.max(_allWidthArray);
            } else {
                if (_gWidthArray.length > 0) {
                    maxWidth = eval(_gWidthArray.join("+"));
                } else {
                    maxWidth = _gWidth;  //一列的情况 宽为每组图例的宽
                }

            }
            switch (_x) {
                case "left":

                    if (_config.legend.textStyle.align === "left") {
                        rx = _gWidth;
                    } else {
                        rx = 25;
                    }

                    break;
                case "center":
                    rx = (_config.canvas.width - maxWidth) / 2;
                    break;
                case "right":
                    rx = (_config.canvas.width - maxWidth);
                    break;
            }
        }
        if (typeof _y === "number") //若是一个数值
        {
            ry = _y;
        } else {
            var maxHeight;
            if (_allHeightArray.length > 0) //有换列
            {
                maxHeight = d3.max(_allHeightArray);//获取列的最大高度
            } else {

                if (_gHeightArray.length > 0) {
                    maxHeight = eval(_gHeightArray.join("+")); //多行多列
                } else {
                    maxHeight = _gHeight;//多行一列
                }

            }
            switch (_y) {
                case "top":

                    if (_config.legend.textStyle.align === "top") {
                        ry = _gHeight;
                    } else {
                        ry = 10;
                    }

                    break;
                case "center":

                    ry = (_config.canvas.height - maxHeight) / 2;
                    break;
                case "bottom":
                    ry = (_config.canvas.height - maxHeight) + 20;
                    break;
            }
        }
        return "translate(" + rx + "," + ry + ")"
    };
    /***
     * 定位每一个图例对应的g的位置
     * @param textWidth 文本文字的宽
     * @param textHeight 文本文字的高
     * @returns {*} translate(" + rx + "," + ry + ")
     */
    var rx = 0, ry = 0;
    var gPosition = function (textWidth, textHeight, mark) {

        var translate;
        var orient = _config.legend.orient; //图例是水平排列还是垂直排列
        var textAlign = _config.legend.textStyle.align;
        var itemGap = _config.legend.itemGap;//各个item之间的间隔
        var itemWidth = _config.legend.itemWidth;//图例的宽
        var itemHeight = _config.legend.itemHeight;//图例的高
        var gw = eval(_gWidthArray.join("+")); //计算每一行图例的宽
        if (orient === undefined || orient === null || orient === "") {
            orient = "horizontal"; //默认水平排列
        }
        if (textAlign === "right" || textAlign === "left") {
            _gWidth = parseInt(itemWidth) + parseInt(textWidth) + parseInt(itemGap);
            _gHeight = parseInt(itemHeight) + parseInt(itemGap);
        } else if (textAlign === "top" || textAlign === "bottom") {
            _gWidth=parseInt(itemWidth) + parseInt(textWidth) + parseInt(itemGap);
            _gHeight = parseInt(itemHeight) + parseInt(textHeight) + parseInt(itemGap);
            if (parseInt(itemWidth) > parseInt(textWidth)) {
                _gWidth = parseInt(itemWidth)+parseInt(itemGap);
            } else {
                _gWidth = textWidth+parseInt(itemGap);
            }
        }

        if (orient === "horizontal") //水平
        {

            //首先判断是否有换行符，若没有则默认水平方向一行排列
            if ((typeof (mark)) === "undefined" || mark === null || mark === "") {
                if ((typeof gw) === "undefined" || gw === 0) {
                    rx = 0;
                } else {
                    rx = gw;
                }
                _rowWidth = gw;
                _gWidthArray.push(_gWidth);


            } else if (mark === "br") //换行
            {
                _gHeightArray.push(_gHeight); //g的高放入数组
                rx = 0; //rx重置为0
                ry = eval(_gHeightArray.join("+"));//ry进行叠加
                _allWidthArray.push(eval(_gWidthArray.join("+")));//如果换行，把没一行的宽放入_allWidthArray中
                _allHeightArray.push(eval(_gHeightArray.join("+")));
                _gWidthArray = [];//宽的数组置为空
            }


        } else if (orient === "vertical")//垂直
        {

            var gh = eval(_gHeightArray.join("+"));
            if (typeof (mark) === "undefined" || mark === null || mark === "") {


                if ((typeof (gh)) === "undefined" || gh === 0) {
                    ry = 0;
                } else {
                    ry = gh;
                }
                _gHeightArray.push(_gHeight);
            } else if (mark === "br") {
                _gWidthArray.push(_gWidth);
                ry = 0;
                _allHeightArray.push(eval(_gHeightArray.join("+")));
                _allWidthArray.push(eval((_gWidthArray.join(("+")))));
                _gHeightArray = [];
                rx = eval(_gWidthArray.join("+"));

            }

            _rowWidth = gw;
        }

        translate = "translate(" + rx + "," + ry + ")";

        return translate;
    };
    /**
     * 定位text文本的位置
     * @param legWidth  图例的宽度
     * @param legHeight 图例的高度
     * @param textWidth  文本文字的宽度
     * @param textHeight 文本文字的高度
     * @returns {string} translate(" + rx + "," + ry + ")
     */
    var textPosition = function (legWidth, legHeight, textWidth, textHeight) {

        var rectWidth = legWidth;
        var rectHeight = legHeight;
        var textAlign = _config.legend.textStyle.align;
        var textSpace = _config.legend.textStyle.space;
        var rx, ry;
        switch (textAlign) {
            case "right": //文字在图例的右侧  居中
                rx = rectWidth + parseInt(textSpace) + 5;
                ry = (rectHeight + parseInt(textHeight)) / 2.5;
                break;
            case "left":  //文字字图例左侧
                rx = -(parseInt(textWidth) + parseInt(textSpace) + 2);
                ry = (rectHeight + parseInt(textHeight)) / 2.5;
                break;
            case "top": //文字在图例顶部
                rx = (rectWidth - parseInt(textWidth)) / 2;
                //ry =( (rectHeight + parseInt(textHeight) + parseInt(textSpace)));
                ry=-(textHeight)+parseInt(textSpace);
                break;
            case "bottom"://文字在图例底部
                rx = (rectWidth - parseInt(textWidth)) / 2;
                ry = (rectHeight + parseInt(textHeight) + parseInt(textSpace));
                break;
        }

        return "translate(" + rx + "," + ry + ")";
    };
    return _legend;
}



;"use strict";
/**
 * 坐标轴组件
 * @example axis(option,svg,config).render();
 * @param option
 * @param svg
 * @param config 用户配置与默认配置合并后的config
 * @returns {{}}
 * @author chen_hao
 * @time 2014-12-17
 */
function axis(option,svg,config) {

    var _config =config;
    var _utils = utils();
    var _opt = option;

    var _xParameters=[], //画x轴所需要的所有参数：[{scale:*,data:*,max:*,min:*,boundaryGap:},{},{}]
        _yParameters=[]; //画y轴所需要的所有参数:比例尺，类目轴数据，值轴最大值和最小值，轴起始和结束空白策略


    var _width = _config.canvas.width,
        _height = _config.canvas.height,
        _margins = _config.canvas.margins;

    var _axis = {}; //返回的轴对象

    var _X_AXIS = 0, //x轴
        _Y_AXIS = 1, //y轴
        _CATEGORY_AXIS = 0,//类目轴
        _VALUE_AXIS =1;//值轴

    var _xAxisType,
        _yAxisType;//标记x轴和y轴到底画的哪种类型(类目轴或者值轴)

    _axis.xAxis = [];
    _axis.yAxis = [];

    /**
     * 初始化，循环判断x轴。
     *
     */
    _opt.xAxis.forEach(function(d){

        var oScale; //画轴需要的比例尺
        var returnXScale; //对外返回的比例尺
        var optimizeObject;

        if("category"===d.type ||typeof(d.type)==="undefined"){

            //如果不设置轴类型，x轴默认为类型轴
            if(typeof(d.type)==="undefined"){
                d.type="category";
            }

            _xAxisType=0;
            _utils.merge(d,_config.categoryAxis,false);

            //设置默认值
            if(["top","bottom"].indexOf(d.position)<0){
                d.position="bottom";
            }
            if(["top","bottom"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="bottom";
            }


            var xbg =d.boundaryGap;
            var scale = setCateScale(xbg,d.data,0);
                if(xbg){
                    var w = scale.rangeBand();
                    returnXScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangeBands([w/2,(quadrantWidth()+w/2)]); //比例尺向右移动半个刻度区间长度
                }else{
                    returnXScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangePoints([0,quadrantWidth()]); //更改定义域的目的是为了获取类目轴像素点方便
                }
                oScale = scale; //画轴时仍然使用原来的比例尺。
            }
        if("value"===d.type){
            _xAxisType=1;

            _utils.merge(d,_config.valueAxis,false);

            //设置默认值
            if(["top","bottom"].indexOf(d.position)<0){
                d.position="bottom";
            }
            if(["top","bottom"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="bottom";
            }

                scale =setValueScale(d.max,d.min,0, d.isLinear);
                optimizeObject = optimizeAxisMaxMin(scale,d.max,d.min, d.onZero);//值轴优化后返回的对象，包括优化后的比例尺和优化后的最大值和最小值
                returnXScale=optimizeObject.oScale;
                oScale = optimizeObject.oScale;
                var oMax=optimizeObject.oMax;
                var oMin=optimizeObject.oMin;
            }
            _xParameters.push({scale:oScale,data: d.data,max:oMax,min:oMin,boundaryGap:xbg,config:d,type:_xAxisType}); //将画x轴的参数都保存起来。
        var xxx ={};
            //获取指定比例尺
            xxx.getScale = returnXScale;
            //获取轴刻度数
            xxx.getTickNum= function(axisType){
                var tickNum;
                var scale = returnXScale;
                if(axisType===_CATEGORY_AXIS){
                    var text = scale.domain()[0];
                    if(scale(text)===0){
                        tickNum = scale.domain().length-1;
                    }else{
                        tickNum = scale.domain().length;
                    }
                }
                if(axisType===_VALUE_AXIS){
                    tickNum = scale.ticks().length-1;
                }
                return tickNum;
            }(_xAxisType);
            //获取步长(刻度区间宽度)
            xxx.getStep = function(axisType){
                var step;
                    if(axisType===_CATEGORY_AXIS){ //类目轴步长，
                        step = Math.abs(returnXScale(1)-returnXScale(0));
                    }
                    if(axisType===_VALUE_AXIS){ //值轴步长，
                        var ticks = returnXScale.ticks();
                        step = Math.abs(returnXScale(ticks[0]) - returnXScale(ticks[1]));
                    }
                return step;
            }(_xAxisType);

            _axis.xAxis.push(xxx);

        });
    /**
     * 初始化，循环判断y轴
     *
     */
    _opt.yAxis.forEach(function(d){

        var oScale;//画轴需要的比例尺
        var returnYScale; //对外返回的y轴比例尺
        var optimizeObject;

        if("category"===d.type){

            _yAxisType=0;
            _utils.merge(d,_config.categoryAxis,false);

            //设置默认值
            if(["left","right"].indexOf(d.position)<0){
                d.position="left";
            }
            if(["left","right"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="left";
            }

            var ybg = d.boundaryGap; //类目轴两端空白策略

            var scale = setCateScale(ybg,d.data,1);
            if(ybg){
                var w = scale.rangeBand();
                returnYScale =d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangeBands([(quadrantHeight()+w/2),w/2]); //比例尺向右移动半个刻度区间长度
            }else{
                returnYScale = d3.scale.ordinal().domain(d3.range(unique(d.data).length)).rangePoints([quadrantHeight(),0]); //更改定义域的目的是为了获取类目轴像素点方便
            }
            oScale = scale; //画轴时使用原来的比例尺

        }
        if("value"===d.type ||typeof(d.type)==="undefined"){

            _yAxisType=1;
            _utils.merge(d,_config.valueAxis,false);

            //如果不设置轴类型，y轴默认为值轴
            if(typeof(d.type)==="undefined"){
                d.type="value";
            }

            //设置默认值
            if(["left","right"].indexOf(d.position)<0){
                d.position="left";
            }
            if(["left","right"].indexOf(d.axisLabel.align)<0){
                d.axisLabel.align="left";
            }

            ybg=d.boundaryGap; //值轴两端空白策略[0,0],暂不处理
            var scale =setValueScale(d.max,d.min,1, d.isLinear);
            optimizeObject = optimizeAxisMaxMin(scale,d.max,d.min, d.onZero);//值轴优化后返回的对象，包括优化后的比例尺和优化后的最大值和最小值
            returnYScale=optimizeObject.oScale;
            oScale=optimizeObject.oScale;
            var oMax =optimizeObject.oMax;
            var oMin =optimizeObject.oMin;
        }
        _yParameters.push({scale:oScale,data: d.data,max:oMax,min:oMin,boundaryGap:ybg,config:d,type:_yAxisType}); //将画y轴的参数保存起来。

    var yyy = {};

        //获取指定步长
        yyy.getScale =returnYScale;
         //获取刻度数
        yyy.getTickNum= function(axisType){
            var tickNum;
            if(axisType===_CATEGORY_AXIS){
                var text = returnYScale.domain()[0];
                    if(returnYScale(text)===0){
                        tickNum = returnYScale.domain().length-1;
                    }else{
                        tickNum = returnYScale.domain().length;
                    }
            }
            if(axisType===_VALUE_AXIS){
                    tickNum = returnYScale.ticks().length-1;
            }
            return tickNum;
        }(_yAxisType);
        //获取步长
        yyy.getStep = function(axisType){
            var step;
                if(axisType===_CATEGORY_AXIS){
                    step = Math.abs(returnYScale(1)-returnYScale(0));
                }
                if(axisType===_VALUE_AXIS){
                    var ticks = returnYScale.ticks();
                    step = Math.abs(returnYScale(ticks[0]) - returnYScale(ticks[1]));
                }
            return step;
        }(_yAxisType);

        _axis.yAxis.push(yyy);

    });

    /**
     * 更新x轴方法
     * @param index 更新第几个x轴 ，若最多存在两个轴，则可分为top和bottom
     * @param xAxis x轴对象{type:*,max:*,min:*,data:*}
     *
     * type: 轴类型 0或者1。0为类目轴category ,1为值轴value
     *
     * 当为value时，xAxis有三个参数，即：type，max,min;
     * 当为category时,xAxis 有两个参数，即:type,data
     *
     * data:有两种数据格式
     * 一种字符串 data:"腾讯"，则更新效果为累计在后面添加
     * 一种是数组 data:["腾讯"],则更新效果为后面添加几个，向前移动几个，前面相应删除。
     *
     */
    _axis.updateXAxis =function (index,xAxis){

        //更新类目轴
        if(xAxis.type===_CATEGORY_AXIS){

            var newData=_xParameters[index].config.data;

            //判断数据是否是字符串类型
            if(typeof xAxis.data==="string"){
                newData.push(xAxis.data);
            }

            //判断数据是否是数组类型
            var l=0;
            if(xAxis.data instanceof Array){

                newData.map(function(d,i){

                    newData[i]=newData[xAxis.data.length+i];

                    if(i >=newData.length-xAxis.data.length){

                        newData[i]=xAxis.data[l++]
                    }

                });
                if(newData.length<=xAxis.data.length){
                    newData=xAxis.data;
                }

            }

            var xScale = setCateScale(_xParameters[index].config.boundaryGap,newData,0);
            var yScale = _yParameters[index].scale;
            var config =_xParameters[index].config;

            //修改返回的比例尺，区间刻度数，步长。
            _axis.xAxis[index].getScale=xScale;

            var texts = xScale.domain()[0];
            _axis.xAxis[index].getTickNum=function(scale){
                var tickNum;

                if(scale(texts[0])===0){
                    tickNum = scale.domain().length-1;
                }else{
                    tickNum = scale.domain().length;
                }
                return tickNum;
            }(xScale);
            _axis.xAxis[index].getStep=xScale(texts[1]) - xScale(texts[0]);

            loadXAxisStyle(xScale,config,yScale,index);

           /* gXAxisArray[index].transition().call(xAxisArray[index]);*/

        }

        if(xAxis.type===_VALUE_AXIS){

            //设置比例尺并优化，取得优化后的比例尺，最大值和最小值。
            var optimizeObject = optimizeAxisMaxMin(setValueScale(xAxis.max,xAxis.min,0,_xParameters[index].isLinear),xAxis.max,xAxis.min,_xParameters[index].config.onZero);
            var oScale = optimizeObject.oScale;

            //x轴需要的偏移量
            /*var bottomOffset = yStart()-getValueNWeight(oScale);*/

            //修改返回的比例尺，区间刻度数，步长。
            _axis.xAxis[index].getScale=oScale;
            _axis.xAxis[index].getTickNum=oScale.ticks().length-1;
            _axis.xAxis[index].getStep=oScale(oScale.ticks()[0]) - oScale(oScale.ticks()[1]);

            _xParameters[index].scale=oScale;


            loadXAxisStyle(oScale,_xParameters[index].config,_yParameters[index].scale,index);

            loadYAxisStyle(_yParameters[index].scale,_yParameters[index].config,oScale,index);


        }

    };


    /**
     * 更新y轴方法
     * @param index 更新第几个x轴 ，若最多存在两个轴，则可分为top和bottom
     * @param yAxis y轴对象{type:*,max:*,min:*,data:*}
     *
     * type: 轴类型 0或者1。0为类目轴category ,1为值轴value
     *
     * 当为value时，yAxis有三个参数，即：type，max,min;
     * 当为category时,yAxis 有两个参数，即:type,data
     */
    _axis.updateYAxis = function(index,yAxis){

        //更新值轴
        if(yAxis.type===_VALUE_AXIS){

            //设置比例尺并优化，取得优化后的比例尺，最大值和最小值。
            var optimizeObject = optimizeAxisMaxMin(setValueScale(yAxis.max,yAxis.min,1,_yParameters[index].isLinear),yAxis.max,yAxis.min,_yParameters[index].config.onZero);
            var oScale = optimizeObject.oScale;

            //x轴需要的偏移量
            /*var bottomOffset = yStart()-getValueNWeight(oScale);*/

            //修改返回的比例尺，区间刻度数，步长。
            _axis.yAxis[index].getScale=oScale;
            _axis.yAxis[index].getTickNum=oScale.ticks().length-1;
            _axis.yAxis[index].getStep=oScale(oScale.ticks()[0]) - oScale(oScale.ticks()[1]);

            _yParameters[index].scale=oScale;


            loadYAxisStyle(oScale,_yParameters[index].config,_xParameters[index].scale,index);

            loadXAxisStyle(_xParameters[index].scale,_xParameters[index].config,oScale,index);


        }

        //更新类目轴
        if(yAxis.type===_CATEGORY_AXIS){

            var newData=_yParameters[index].config.data;

            //判断数据是否是字符串类型
            if(typeof yAxis.data==="string"){
                newData.push(yAxis.data);
            }

            //判断数据是否是数组类型
            var l=0;
            if(yAxis.data instanceof Array){

                newData.map(function(d,i){

                    newData[i]=newData[yAxis.data.length+i];

                    if(i >=newData.length-yAxis.data.length){

                        newData[i]=yAxis.data[l++]
                    }

                });
                if(newData.length<=yAxis.data.length){
                    newData=yAxis.data;
                }

            }

            var yScale = setCateScale(_yParameters[index].config.boundaryGap,newData,1);
            var xScale = _xParameters[index].scale;
            var config =_yParameters[index].config;

            //修改返回的比例尺，区间刻度数，步长。
            _axis.yAxis[index].getScale=yScale;

            var texts = yScale.domain()[0];
            _axis.yAxis[index].getTickNum=function(scale){
                var tickNum;

                if(scale(texts[0])===0){
                    tickNum = scale.domain().length-1;
                }else{
                    tickNum = scale.domain().length;
                }
                return tickNum;
            }(yScale);
            _axis.yAxis[index].getStep=yScale(texts[1]) - yScale(texts[0]);

            loadYAxisStyle(yScale,config,xScale,index);

            /* gXAxisArray[index].transition().call(xAxisArray[index]);*/


        }



    };

    /**
     * 画轴，render();
     */
    var _gAxis;
    _axis.render =function() {

        if(_gAxis){
            _gAxis.remove();  //删除坐标轴层
        }

        //创建坐标轴层
        var gAxis = svg.selectAll(".gAxis")
            .data([1])
            .enter()
            .append("g")
            .attr("class","gAxis");

        renderXAxis(gAxis);
        renderYAxis(gAxis);
    };

    /**
     *画x轴
     * @param gAxis
     */
    var gXAxisArray=[];
    var xAxisArray=[];
    var xAxisNameArray=[];
    function  renderXAxis(gAxis){

        //画x轴
        _opt.xAxis.forEach(function(d,i){

            var scale = _xParameters[i].scale;
            var config =_xParameters[i].config;
            var yScale = _yParameters[0].scale;

            //创建x轴层
            var gXAxis = gAxis.selectAll(".gXAxis")
                .data([1])
                .enter()
                .append("g")
                .attr("class","x-axis");
            gXAxisArray.push(gXAxis);

            //添加x轴
            var xAxis = d3.svg.axis()
                /*.scale(scale)
                .orient("bottom")*/;
                gXAxis.attr("transform", function () {
                    return "translate(" +  xStart() + "," + yEnd() + ")";
                })
                .call(xAxis);
            xAxisArray.push(xAxis);

            //添加坐标轴名称
            var axisName = gAxis.append("text")
                .attr("class","axisName");

            xAxisNameArray.push(axisName);

            //x轴样式更新
            loadXAxisStyle(scale,config,yScale,i);

        });
    }



    var gYAxisArray=[];
    var yAxisArray=[];
    var yAxisNameArray=[];

    /**
     * 画y轴
     * @param gAxis 坐标轴g
     */
    function  renderYAxis(gAxis){

        // 画y轴
        _opt.yAxis.forEach(function(d,i){

            var scale = _yParameters[i].scale;
            var config =_yParameters[i].config;
            var xScale = _xParameters[0].scale;

            //创建y轴层
            var gYAxis = gAxis.selectAll(".gYAxis")
                .data([1])
                .enter()
                .append("g")
                .attr("class","y-axis");
            gYAxisArray.push(gYAxis);

            //添加y轴
            var yAxis = d3.svg.axis()
                .scale(scale)
                .orient(config.axisLabel.align)
                /*.tickSize(0)*/;
            yAxisArray.push(yAxis);
            gYAxis.attr("transform", function () {
                    return "translate(" +  xStart() + "," + yEnd() + ")";
                })
                .call(yAxis);


            //添加坐标轴名称
            var axisName = gAxis.append("text")
                .attr("class","axisName");
            yAxisNameArray.push(axisName);

            //Y轴样式更新
            loadYAxisStyle(scale,config,xScale,i);

        });

    }

    /**
     * 获取轴层坐标平移位置
     * @param position x轴位置 top,bottom是x轴位置，left、right是y轴位置。
     * @param scale 轴比例尺
     */
    function getGAxisTranslate(position,scale){
        var translate=0;

        if("top"===position){
            translate=yEnd();
        }
        if("bottom"===position){
            translate=yStart()-getValueNWeight(scale);
        }
        if("left"===position){
            translate=xStart()+getValueNWeight(scale);
        }
        if("right"===position){
            translate=xEnd();
        }
        return translate;
    }



    /**
     * 获取x轴刻度线右移距离
     * @param scale x轴比例尺
     * @param boundaryGap 文字是否在刻度中间显示
     */
    function getLineAxisTranslateX(scale,boundaryGap){
        var translateX=0;

        if(boundaryGap && typeof boundaryGap==="boolean"){

            translateX=scale.rangeBand()/2;

        }else{
            translateX=0;
        }

        return translateX;
    }

    /**
     * 获取x轴名称横纵坐标位置
     * @param position 轴位置
     * @param location 名称位置
     * @param scale y比例尺
     */
    function getTextAxisTranslate(position,location,scale){
        var textBox=[], x,y;

        if("top"===position){
            if("start"===location){
                x=xStart();
                y=yEnd();
            }
            if("end"===location){
                x=xEnd();
                y=yEnd();
            }
        }

        if("bottom"===position){
            if("start"===location){
                x=xStart();
                y=yStart()-getValueNWeight(scale);
            }
            if("end"===location){
                x=xEnd();
                y=yStart()-getValueNWeight(scale);
            }
        }
        textBox.push(x);
        textBox.push(y);

        return textBox;
    }

    /**
     * 获取轴标签文字与轴的距离
     * 标签文字始终在top,bottom.,left,right不随轴移动而移动！
     * @param config 轴样式
     * @returns {*}
     */
    function getTickPadding(config){

        var position = config.position,
            align = config.axisLabel.align,
            tickLength = config.axisTick.length;

        var tickPadding;

        //通过坐标轴位置，确定文字标签与轴的距离
        if("top"===position){

            if("top"===align){
                tickPadding =config.axisLabel.margin; //默认距离
            }
            if("bottom"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        if("bottom"===position){
            if("top"===align){
                tickPadding =5; //默认距离
            }
            if("bottom"===align){

                tickPadding=config.axisLabel.margin+getValueNWeight(_yParameters[0].scale)-tickLength;
            }
        }

        if("left"===position){

            if("left"===align){

                tickPadding =config.axisLabel.margin+getValueNWeight(_xParameters[0].scale)-tickLength;
            }
            if("right"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        if("right"===position){
            if("left"===align){
                tickPadding =config.axisLabel.margin;
            }
            if("right"===align){
                tickPadding =config.axisLabel.margin;
            }
        }

        return tickPadding;
    }



    /**
     *获取y轴标签文字位置
     * @param position y轴位置
     * @param location y轴名称位置
     * @param scale x轴比例尺
     */
    function getTextYAxisTranslate(position,location,scale){
        var textBox=[], x,y;

        if("left"===position){
            if("start"===location){
                x=xStart()+getValueNWeight(scale);
                y=yEnd();
            }
            if("end"===location){
                x=xStart()+getValueNWeight(scale);
                y=yEnd();
            }
        }

        if("right"===position){
            if("start"===location){
                x=xEnd();
                y=yEnd();
            }
            if("end"===location){
                x=xEnd();
                y=yEnd();
            }
        }
        textBox.push(x);
        textBox.push(y);

        return textBox;

    }

    function getXAxisTextPX(rotate,tickPadding){
        var x,mode="lr"; var angle = 90-rotate/2; var radian = (Math.PI*angle)/180 ; var radian1=(Math.PI*(rotate/2))/180;
        var l =Math.cos(radian)*tickPadding*2;
        x=Math.cos(radian1)*l;
        var y = Math.sin(radian1)*l;
        if(Math.abs(rotate)===90){
            x=0;
            mode="tb";
            rotate=0;
            y=0;
        }


        return {x:x,mode:mode,rotate:rotate,y:y};

    }

    /**
     *加载x轴样式
     * @param xScale x轴比例尺
     * @param config x轴样式属性
     * @param yScale y轴比例尺
     * @param index 轴标识
     */
    var flag= 0,duration;
    function loadXAxisStyle(xScale,config,yScale,index){
        if(flag==0){
            duration=0;
        }else{
            duration=_config.animation.dur
        }
        flag++;

        //更新x轴
        var tickPadding = getTickPadding(config);
        xAxisArray[index].tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .scale(xScale)
            .orient(config.axisLabel.align)
            .tickPadding(tickPadding)
            /*.ticks(config.data.length)*/;

        //更新x轴所在g
        var gTranslateY = getGAxisTranslate(config.position,yScale);
        gXAxisArray[index]
            .transition().duration(duration)
            .attr("transform", function () {
            return "translate(" +  xStart() + "," + gTranslateY + ")";
        })

            .call(xAxisArray[index]);

        //更新轴线
        gXAxisArray[index].select("path")
            .attr("fill","none")
            .attr("display",config.show===true? "block":"none")
            .attr("stroke",config.axisLine.lineStyle.color)
            .attr("stroke-width",config.axisLine.lineStyle.width);

        //更新轴标签文字
        var box = getXAxisTextPX(config.axisLabel.rotate,tickPadding);
        gXAxisArray[index].selectAll("text")
            .attr("transform", "rotate("+ box.rotate+")")
            .attr("writing-mode", box.mode)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisLabel.textStyle.color)
            .attr("dy",function(){
                return d3.select(this).node().getBBox().height/2 -box.y;
            })
            .attr("dx",function(){
                return /*d3.select(this).node().getBBox().width/2*/ box.x;
            });

        //更新刻度线
        var lineTranslateX = getLineAxisTranslateX(xScale,config.boundaryGap);
        gXAxisArray[index].selectAll("line")
            .attr("transform",function () {
                return "translate(" +  lineTranslateX + "," + 0 + ")";
            })
            .attr("stroke",config.axisLine.lineStyle.color);

        //更新轴名字
        var textBox = getTextAxisTranslate(config.position,config.axisName.location,yScale);
        var x = textBox[0];
        var y = textBox[1];
        xAxisNameArray[index]
            .text(config.axisName.text)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisName.show===false? "none":config.axisName.textStyle.color)
            .attr("x",x)
            .attr("y",y);

        var length = getValueNWeight(yScale);

        renderXGridLines(gXAxisArray[index],config,xScale ,length);
    }

    /**
     * 加载y轴样式
     * @param yScale y轴比例尺
     * @param config y轴样式属性
     * @param xScale x轴比例尺
     * @param index y轴标识
     */
    var flagY= 0,durationY;
    function loadYAxisStyle(yScale,config,xScale,index){
        if(flagY==0){
            durationY=0;
        }else{
            durationY=_config.animation.dur
        }
        flagY++;

        //更新Y轴
        var tickPadding = getTickPadding(config);
        yAxisArray[index].tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .scale(yScale)
            .orient(config.axisLabel.align)
            .tickSize(config.axisTick.show===true? config.axisTick.length:0)
            .tickPadding(tickPadding)
            /* .ticks(7)*/;

        //更新y轴所在g
        var gTranslateX = getGAxisTranslate(config.position,xScale);
        gYAxisArray[index]
            .transition().duration(durationY)
            .attr("transform", function () {
            return "translate(" +  gTranslateX + "," + yEnd() + ")";
        })

            .call(yAxisArray[index]);

        //更新轴线
        gYAxisArray[index].select("path")
            .attr("fill","none")
            .attr("display",config.show===true? "block":"none")
            .attr("stroke",config.axisLine.lineStyle.color)
            .attr("stroke-width",config.axisLine.lineStyle.width);

        //更新轴标签文字
        var box = getXAxisTextPX(config.axisLabel.rotate,tickPadding);
        gYAxisArray[index].selectAll("text")
            .attr("transform", "rotate("+ box.rotate+")")
            .attr("writing-mode", box.mode)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisLabel.textStyle.color)
            .attr("dy",function(){
                return d3.select(this).node().getBBox().height/2 -box.y;
            })
            .attr("dx",function(){
                return /*d3.select(this).node().getBBox().width/2*/ box.x;
            });

        //更新刻度线
        var lineTranslateY = -getLineAxisTranslateX(yScale,config.boundaryGap);
        gYAxisArray[index].selectAll("line")
            .attr("transform",function () {
                return "translate(" +  0 + "," + lineTranslateY + ")";
            })
            .attr("stroke",config.axisLine.lineStyle.color);

        //更新轴名字
        var textBox = getTextYAxisTranslate(config.position,config.axisName.location,xScale);
        var x = textBox[0];
        var y = textBox[1];
        yAxisNameArray[index]
            .text(config.axisName.text)
            .attr("font-family",_config.textStyle.fontFamily2)
            .attr("font-size",_config.textStyle.fontSize)
            .attr("fill",config.axisName.show===false? "none":config.axisName.textStyle.color)
            .attr("x",x)
            .attr("y",y);

        var length = getValueNWeight(xScale);

        renderYGridLines(gYAxisArray[index],config,yScale,length);

    }

    /**
     *绘制y轴网格线
     * @param g y轴的g
     * @param config
     * @param scale 比例尺
     * @param tickPadding 文字与轴的距离
     *
     */
    function renderYGridLines(g,config,scale,tickPadding){
        var x1,x2,y1,y2;
        var position = config.position;
        var bg = config.boundaryGap;

        if("left"===position){

             x1 = -tickPadding;
             x2=quadrantWidth()-tickPadding;

        }
        if("right"===position){

             x1 = -quadrantWidth()+tickPadding;
             x2=tickPadding;
        }
        if(bg && typeof bg==="boolean"){

            y1=-scale.rangeBand()/2;
            y2=-scale.rangeBand()/2;
        }else{
            y1=0;
            y2=0;
        }

        var lines = d3.selectAll("g.y-axis g.tick")
            .select("line.grid-line")
            .remove();
        lines = g.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true);
        lines.attr("stroke-width",_config.grid.borderWidth)
            .attr("stroke",_config.grid.borderColor)
            .attr("shape-rendering","crispEdges")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2);

    }

    /**
     * 绘制x轴网格线
     * @param g x轴g
     * @param config
     * @param scale
     * @param tickPadding 文字与轴的距离
     */
    function renderXGridLines(g,config,scale,tickPadding){
        var x1,x2,y1,y2;
        var position = config.position;
        var bg = config.boundaryGap;


        if("bottom"===position){

            y1 = tickPadding;
            y2=-quadrantHeight()+tickPadding;
        }
        if("top"===position){

            y1 = -quadrantHeight()+tickPadding;
            y2=tickPadding;
        }

        if(bg && typeof bg==="boolean"){
            x1=scale.rangeBand()/2;
            x2=scale.rangeBand()/2;

        }else{

            x1=0;
            x2=0;

        }

        var lines = d3.selectAll("g.x-axis g.tick")
            .select("line.grid-line")
            .remove();
        lines = g.selectAll("g.x-axis g.tick")
            .append("line")
            .classed("grid-line", true);
        lines.attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke-width",_config.grid.borderWidth)
            .attr("stroke",_config.grid.borderColor)
            .attr("shape-rendering","crispEdges")
            /*.on("mouseover",function(d){// 鼠标移到某元素上
                d3.select(this)
                    .attr("stroke","yellow");
            })
            .on("mouseout",function(d){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("stroke","yellow");
            })*/;

    }

    /**
     * 数组去重方法
     * @returns {Array}
     */
    function unique(array){
        var n =[];
        for(var i =0; i<array.length;i++){
            if(n.indexOf(array[i])===-1){
               n.push(array[i]);
          }
        }
        return n;
    }

    /**
     *获取值轴负半轴长度的方法
     * @param scale 值轴比例尺
     * @returns {number}
     */
    function getValueNWeight(scale){

        var oMin=scale.domain()[0];
        var w=0;
        if(typeof(oMin)==="undefined"||oMin===null||isNaN(oMin)){//判断，如果不是值轴则返回0;
            return w;
        }else{
            var ticks = scale.ticks();
            if(0 >= ticks[ticks.length-1]){
                w=scale(ticks[0])-scale(ticks[ticks.length-1]);
            }else{
                if(ticks[0]<=0){
                    w = scale(oMin)-scale(0);
                }else{
                    w=0;
                }

            }
            return Math.abs(w);
        }
    }

    /**
     * 设置类目轴比例尺
     * @param boundaryGap 类目轴两端空白策略 true为文字标签在刻度中间显示
     * @param cateData 类目轴数据
     * @param isX 是否是x轴上的类目轴，0是x;1是y
     * @returns {*}
     */
    function setCateScale(boundaryGap,cateData,isX){

        var cateScale,rangeMax;

        if(isX===_X_AXIS){ //类目轴在x轴
            rangeMax=quadrantWidth();
        }

        if(isX===_Y_AXIS){ //类目轴在y轴
            rangeMax=quadrantHeight();
            cateData =  cateData.reverse(); //倒序排列数组
        }


        if(boundaryGap){
            cateScale =d3.scale.ordinal().domain(cateData).rangeBands([0,rangeMax]);
        }else{
            cateScale=d3.scale.ordinal().domain(cateData).rangePoints([0,rangeMax]);
        }

        return cateScale;
    }

    /**
     * 设置值轴比例尺
     * @param max 值轴最大值
     * @param min 值轴最小值
     * @param isY 是否在y轴上的值轴。0是x;1是y
     * @param isLinear 是否是线性比例尺
     * @returns {*}
     */
    function setValueScale(max,min,isY,isLinear){

        var valueScale;

        if(max===min){ //判断最大值和最小值相等的情况，若大于0，则min=0,若小于0，则max=0,若等于0，则max=1;
            if(min===0){
                max=1;
            }else if(max<0){
               max=0;
            }else if(max>0){
                min=0;
            }
        }

        if(isY===_X_AXIS){

            /*if(isLinear || typeof isLinear==="undefined"){*/
                valueScale = d3.scale.linear()
                    .domain([min,max])
                    .range([0,quadrantWidth()]);
            /*}
            if(!isLinear){ //如果不是线性比例尺，则设置为对数比例尺
                valueScale = d3.scale.log()
                    .domain([min,max.value]).nice()
                    .range([0,quadrantWidth()]);

            }*/

        }

        if(isY===_Y_AXIS){

           /* if(isLinear){*/
                valueScale = d3.scale.linear()
                    .domain([min,max])
                    .range([quadrantHeight(),0]);
            /*}

            if(!isLinear){
                valueScale = d3.scale.log()
                    .domain([min,max.value]).nice()
                    .range([quadrantHeight(),0]);
            }*/

        }
        return valueScale;
    }

    /**
     *获取刻度区间宽度
     * @param scale 比例尺
     * @returns {number}
     */
    function  getSectionWidth (scale){
        var sectionWidth;
        var ticks = scale.ticks();
        sectionWidth = Math.abs(ticks[0] - ticks[1]);
        return sectionWidth;
    }

    /**
     *优化值轴的最大值：最终结果为：标签显示最大值 > 数据最大值，最小值 < 数据最小值。
     * @param scale 轴比例尺
     * @param max 数据最大值
     * @param min 数据最小值
     * @param onZero 值轴起始点是否从0开始
     * @returns {*}
     */
    function optimizeAxisMaxMin(scale,max,min,onZero){

        var opObject={};
        var oScale = scale;
        var ticks = oScale.ticks();
        var oMax =ticks[ticks.length-1];
        var oMin = ticks[0];

        //判断最大值和最小值相等的情况，若大于0，则min=0,若小于0，则max=0,若等于0，则max=1;
        if(max===min){
            if(min===0){
                max=1;
            }else if(max<0){
                max=0;
            }else if(max>0){
                min=0;
            }
        }

        //判断值轴是否从0开始
        if(onZero){

            if(min>=0){
                oMin=0;
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
            }
            if(max<=0){
                oMax=0;
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
            }

        }

        while(oMax < max){
                oMax =oMax + getSectionWidth(oScale);
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMax=ticks[ticks.length-1];
        }

        while(oMin > min){
                oMin = oMin - getSectionWidth(oScale);
                oScale.domain([oMin,oMax]);
                ticks=oScale.ticks();
                oMin=ticks[0];
        }

        oScale.domain([oMin,oMax]);
        opObject.oScale=oScale;
        opObject.oMax=oMax;
        opObject.oMin=oMin;
        return opObject;
    }



    //x轴开始坐标
    function xStart() {
        return _margins.left;
    }
    //y轴开始坐标
    function yStart() {
        return _height - _margins.bottom;
    }
    //x轴结束坐标
    function xEnd() {
        return _width - _margins.right;
    }
    //y轴结束坐标
    function yEnd() {
        return _margins.top/*+_legendH*/;
    }
    //x轴宽度
    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }
    //y轴高度
    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom/*-_legendH*/;
    }

    return _axis;
}

"use strict";

/**
 * 标题
 * @autor wang_heng
 * @date 2014-12-26
 * @example
 *
 * var myTitle = title();
 * myTitle.render(svg,config);
 * @returns {{}}
 */
function title() {
    var _title = {};

    var _gTitle;  //标题层

    /**
     * 创建标题层
     * @param svg  svg对象
     * @param config  与用户定义的配置合并后的配置对象
     */
    _title.render = function(svg,config){
        if(config.title.text==='' && config.title.subtext===''){
            if(_gTitle){
                _gTitle.remove();  //删除标题层
            }
            return;
        }

        //创建标题层
        var gTitle = svg.selectAll(".gTitle")
            .data([1])
            .enter()
            .append("g")
            .attr("class","gTitle");

        //添加背景框
        var titleRect = gTitle.append("rect")
            .attr("class","titleRect")
            .attr("x",0)
            .attr("y",0);

        //添加主标题
        var titleText = gTitle.append("text")
            .attr("class", "titleText");

        //添加副标题
        var titleSubtext = gTitle.append("text")
            .attr("class", "titleSubtext");



        //标题样式更新
        var gTitleUpdate = svg.select(".gTitle");
        var titleRect = gTitleUpdate.selectAll(".titleRect");
        var titleTextUpdate = gTitleUpdate.selectAll(".titleText");
        var titleSubtextUpdate = gTitleUpdate.selectAll(".titleSubtext");
        _gTitle = gTitleUpdate;


        //更新主标题的样式
        titleTextUpdate.attr("font-family",config.title.textStyle.fontWeight)
            .attr("font-size",config.title.textStyle.fontSize)
            .attr("fill",config.title.textStyle.color)
            .text(config.title.text)
            .attr("x",0)
            .attr("y",function(){
                return d3.select(this).node().getBBox().height;
            });

        var titleTextBBox = titleTextUpdate.node().getBBox();
        var titleTextHeight = titleTextBBox.height;
        var titleTextWidth = titleTextBBox.width;

        //更新副标题样式
        titleSubtextUpdate.text(config.title.subtext)
            .attr("fill",config.title.subtextStyle.color)
            .attr("x",0)
            .attr("y",function(){
                return titleTextHeight+parseFloat(d3.select(this).node().getBBox().height)+config.title.itemGap;
            });

        var titleSubtextBBox = titleSubtextUpdate.node().getBBox();
        var titleSubTextWidth = titleSubtextBBox.width;


        //获取标题层的高宽
        var gBBox = gTitleUpdate.node().getBBox();
        var gHeight = gBBox.height;
        var gWidth = gBBox.width;

        //更新背景的样式
        titleRect.attr("width",gWidth+1)
            .attr("height",gHeight+config.title.itemGap+1)
            .style("fill",config.title.backgroundColor)
            .style("stroke",config.title.borderColor)
            .style("stroke-width",config.title.borderWidth);


        //标题位置变换
        var translatX = getTranslateX(config,titleTextUpdate,titleSubtextUpdate,titleTextWidth,titleSubTextWidth);  //x轴平移距离
        var translatY = getTranslateY(config,gHeight);  //y轴平移距离
        gTitleUpdate.attr("transform","translate("+translatX+","+translatY+")");
    };

    /**
     * 获取x轴平移的位置
     * @param config  配置参数对象
     * @param titleTextUpdate  主标题对象
     * @param titleSubtextUpdate  副标题对象
     * @param titleTextWidth  主标题宽度
     * @param titleSubTextWidth  副标题宽度
     * @returns {number}
     */
    function getTranslateX(config,titleTextUpdate,titleSubtextUpdate,titleTextWidth,titleSubTextWidth){
        var translatX = 0;

        switch (config.title.x){
            case 'left':
                translatX = 5;
                break;
            case 'center':
                translatX = (config.canvas.width-(titleTextWidth>titleSubTextWidth?titleTextWidth:titleSubTextWidth))/2;
                titleTextWidth>titleSubTextWidth?titleSubtextUpdate.attr("x",(titleTextWidth-titleSubTextWidth)/2):titleTextUpdate.attr("x",(titleSubTextWidth-titleTextWidth)/2);
                break;
            case 'right':
                translatX = (config.canvas.width-(titleTextWidth>titleSubTextWidth?titleTextWidth:titleSubTextWidth))-5;
                titleTextWidth>titleSubTextWidth?titleSubtextUpdate.attr("x",(titleTextWidth-titleSubTextWidth)):titleTextUpdate.attr("x",(titleSubTextWidth-titleTextWidth));
                break;
            default :
                if(isNaN(parseFloat(config.title.x))){
                    translatX = 5;
                }else{
                    translatX = config.title.x;
                }
                break;
        }
        return translatX;
    }

    /**
     *
     * @param config  配置对象
     * @param gHeight  标题层的高度
     * @returns {number}
     */
    function getTranslateY(config,gHeight){
        var translatY = 0;

        switch (config.title.y){
            case 'top':
                translatY = 0;
                break;
            case 'center':
                translatY = ((config.canvas.height-gHeight)/2)-5;
                break;
            case 'bottom':
                translatY = config.canvas.height-gHeight-5;
                break;
            default :
                if(isNaN(parseFloat(config.title.y))){
                    translatY = 0;
                }else{
                    translatY = config.title.y;
                }
                break;
        }
        return translatY;
    }

    return _title;
};"use strict";

function point() {

    var _point = {};

    var css = document.styleSheets[0];
    var beforRule = css.rules[css.cssRules.length - 2];
    var afterRule = css.rules[css.cssRules.length - 1];
    _point.render = function (x, y, color, conent) {




        //oRule.style.borderColor=data.color+"transparent transparent"
        beforRule.style.background = "" + color + "";
        beforRule.style.content = "'" + conent + "'";

        afterRule.style.borderColor = "" + color + " transparent transparent";

        console.log(beforRule.style.borderColor)
        console.log(afterRule.style.borderColor)
        console.log(beforRule.style.content)

        var div = d3.select("body")
            .append("div")
            .attr("id","div"+x)
            .style("left", x + "px")
            .style("top", y + "px")
            .attr("class", "demoSpan1");





    }
    return _point;
}
;'use strict';
/**
 *
 * 区域缩放控制器(缩放轴)
 * @param svg
 * @param config
 * @returns dataZoom
 * @author  chenxiushen1@163.com (chenxiushen)
 * @date  2014-12-29
 * @example
 *      var _dataZoom = dataZoom(svg, config);
 *      _dataZoom.render();
 *
 */
function dataZoom(option , svg , config) {

    var dataZoom = {};
    var _config = config;
    var _option = option;
	var _utils = utils();
	
    var _brush,
        _left,
        _right,
        _x,
        _range,
        _max,
        _min;

    var _width = _config.canvas.width,
        _height = _config.canvas.height,
        _margins = _config.canvas.margins;

    /**
     * 绘制缩放轴
     * @param {}
     * @return {}
     */
    dataZoom.render = function render() {

        _range = _width - _margins.left - _margins.right

        _option.xAxis.forEach(function(d) {
            _utils.merge(d,_config.valueAxis,false);
			_min = d.min;
            _max = d.max;
            _x = setValueScale(d.max, d.min);
			console.log(d.max);
        });
		
        _brush = d3.svg.brush()    //定义刷子
            .x(_x)
            .extent([_min,_max])
            .on("brush", brushmove);

        var brushg = svg.append("g")    //定义整个缩放轴区域
            .attr("class", "brush")
            .attr("width", _range)
            .attr("height", 30)
            .attr("fill-opacity",".125")
            .attr("shape-rendering","crispEdges")
            .attr("transform", "translate("
                + _margins.left + ","
                + zoomPosition() +")")
            .call(_brush);

        brushg.selectAll(".resize").append("rect")    //定义缩放区域两边小滑块
            .attr("height", 30)
            .attr("width",10)
            .attr("fill","blue");

        brushg.selectAll("rect")     //定义中间矩形
            .attr("height", 30);

        _left = brushg.append("rect")    //定义左侧空白区域
            .attr("height",30)
            .attr("fill-opacity","0")
            .attr("stroke","blue")
            .attr("shape-rendering","crispEdges");

        _right = brushg.append("rect")    //定义右侧空白区域
            .attr("height",30)
            .attr("fill-opacity","0")
            .attr("stroke","blue")
            .attr("shape-rendering","crispEdges");

        brushstart();
        brushmove();
    }

    /**
     * 缩放轴刷子开始移动事件
     * @param {}
     * @return {}
     */
    function brushstart() {
        svg.classed("selecting", true);
    }

    /**
     * 缩放轴刷子移动事件
     * @param {}
     * @return {}
     */
    function brushmove() {
        var s = _brush.extent();
        _config.EVENT.DATAZOOM_DRAGED(s);    //拖动刷子回调，参数为两边刷子经过比例尺转换后在x轴上的位置数组
        _left.attr("width",_x(s[0]));
        if(_range - _x(s[1]) - 10 < 0){
            _right.attr("width",0);
        }else{
            _right.attr("width",_range - _x(s[1]) - 10);
        }
        _right.attr("x",_x(s[1]) + 10);
    }

    /**
     * 缩放轴刷子结束移动事件
     * @param {}
     * @return {}
     */
    function brushend() {
        svg.classed("selecting", !d3.event.target.empty());
    }

    /**
     * 确定缩放轴纵向位置
     * @param {}
     * @return {}
     */
    function zoomPosition() {
        return _height - _margins.top - _margins.bottom/*-_legendH*/;
    }

    function setValueScale(max,min){

        var valueScale;
        valueScale = d3.scale.linear()
            .domain([min,max])
            .range([0,_range]);
        return valueScale;
    }

    return dataZoom;
}
;"use strict";
/**
 *
 * @returns {Function}
 */
function layout() {
    var _layout = {};

    _layout.conversion = function (data){
        var newSeries = [];//重新排序后data数组，按柱子顺序，同一组柱子放在一起
        var barsNum;//一个刻度区间内柱子数
        var groupList = [];//groupList数组中每个数组代表一组堆叠或层叠的数据，即stack属性或cover属性相同的数据
        var typeList = [];//下标与groupList对应，stack数据存放“stack”+stack值，cover数据存放“cover”+cover值，不是stack和cover的存放“$$”+i
        var regStack = /^stack:/;
        var regCover = /^cover:/;
        //将属于同一个stack或cover的放到一个数组中并把数组放到groupList数组中
        for(var i=0;i<data.length;i++){
            var s = data[i];
            if(s.stack===null&& s.cover===null){
                typeList.push("$$"+i);
                groupList.push([s]);
            }else if(s.stack!==null){
                //判断是否已经存在该stack分组
                var index = typeList.indexOf("stack:"+ s.stack);
                if(index==-1){
                    typeList.push("stack:"+ s.stack);
                    groupList.push([s]);
                }else{
                    groupList[index].push(s);
                }
            }else{
                //判断是否已经存在该cover分组
                var index = typeList.indexOf("cover:"+ s.cover);
                if(index==-1){
                    typeList.push("cover:"+ s.cover);
                    groupList.push([s]);
                }else{
                    groupList[index].push(s);
                }
            }
        }
        //分别处理stack或cover数据
        for(var i=0;i<groupList.length;i++){//分三步，1、取出每个中的data属性（数值数组）组成数组 2、判断类型，转换数据 3、将转化后的值赋给原对象；
            var data = [];
            //为转换数据，将一组柱子的data属性值分别取出放入data数组
            for(var j=0;j<groupList[i].length;j++){
                data.push(groupList[i][j].data);
            }
            //判断数组是堆叠层叠还是分组
            if(regStack.exec(typeList[i])!==null){
                data = stack(i,data);
            }else if(regCover.exec(typeList[i])!==null){
                data = cover(i,data);
            }else{
                data = group(i,data);
            }
            //将转换完成的data值放回到data属性
            for(var n=0;n<groupList[i].length;n++){
                groupList[i][n].data = data[n];
                newSeries.push(groupList[i][n]);
            }
        }
        //返回处理后数据和每个刻度柱子数
        return [newSeries,groupList.length];
    }

    /**
     * @param x 标识在刻度区间内，该堆叠柱子是第几根柱子
     * @param data data格式二维数组，长度统一，可能有‘-’数据
     * @returns {Array}[x:0,y:1,x0:1,y0:1]  x：数据在数组中下标
     *                                   y：数据值，当该data值为‘-’是y值为‘n-’n为标识本次‘-’是在同一堆叠中出现的第几个
     *                                   x0：该数据标识的柱子在一个刻度区间内属于第几根
     *                                   y0：堆叠属性，下方堆叠柱子的x的和，当y值为非数值类型时，y0为所有数值类型x的和，层叠和分组时为0
     */
    function stack(x,data) {
        var newData =[];
        var positive = [];//记录正数值堆积y0
        var negative = [];//记录负数值堆积y0
        var special = [];//标记数据中出现的‘-’是同一堆叠中第几个
        for(var j=0;j<data.length;j++){
            var blist = data[j];
            if(j===0){//堆叠数据第一个，y0为0
                for(var i=0;i<blist.length;i++){
                    if(typeof(blist[i])!=="number"){
                        blist[i] = {x:i,y:0+blist[i],x0:x,y0:0};
                        special.push(1);
                        positive.push(0);
                        negative.push(0);
                    }else{
                        blist[i] = {x:i,y:blist[i],x0:x,y0:0};
                        special.push(0);
                        if(blist[i].y>=0){
                            positive.push(blist[i].y);
                            negative.push(0);
                        }else{
                            positive.push(0);
                            negative.push(blist[i].y);
                        }
                    }
                }
                newData.push(blist);
            }else{
                for(var i=0;i<blist.length;i++){
                    if(typeof(blist[i])!=="number"){
                        blist[i] = {x:i,y:(special[i]+blist[i]),x0:x,y0:0};
                        special[i] +=1;
                    }else{
                        blist[i] = {x:i,y:blist[i],x0:x,y0:getBefore(newData,i,blist[i])};
                        if(blist[i].y>=0){
                            positive[i] = blist[i].y+blist[i].y0;
                        }else{
                            negative[i] = blist[i].y+blist[i].y0;
                        }
                    }
                }
                newData.push(blist);
            }
        }
        //修改非数值型data的y0值
        for(var k=0;k<newData.length;k++){
            for(var m=0;m<newData[k].length;m++){
                if(typeof(newData[k][m].y)!=="number"){
                    if(positive[m]==0&&negative[m]==0){
                        newData[k][m].y0 = 0;
                    }else if(positive[m]!==0){
                        newData[k][m].y0 = positive[m];
                    }else{
                        newData[k][m].y0 = negative[m];
                    }
                }
            }
        }
        return newData;
    }

    /**
     * 处理堆叠在一起的数据同时有正负数情况时的y0值
     * 从list数组中上一组中正负相同的y0值
     * list格式：[[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}],[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}],[{x:0,y:1,x0:1,y0:1},{x:0,y:1,x0:1,y0:1}]]
     * @param list stack方法已经转化的柱子数据
     * @param n 数组中的下标，对应到list数据数组下标
     * @param value 柱子数据值
     * @returns {*}
     */
    function getBefore(list,n,value){
        //倒序循环list
        for(var i=list.length-1;i>=0;i--){
            var vb = list[i][n].y;
            if(value>=0&&vb>=0){
                return vb+list[i][n].y0;
            }else if(value<0&&vb<0){
                return vb+list[i][n].y0;
            }
        }
        return 0;
    }

    /**
     *
     * @param x 标识在刻度区间内，该是第几根柱子
     * @param data
     * @returns {Array}
     */
    function cover(x,data){
        var _data =[];
        for(var i=0;i<data.length;i++){
            var d = [];
            for(var j=0;j<data[i].length;j++){
                d.push({x:j,y:data[i][j],x0:x,y0:0});
            }
            _data.push(d);
        }
        return _data;
    }

    /**
     *
     * @param x 标识在刻度区间内，该是第几根柱子
     * @param data
     * @returns {Array}
     */
    function group(x,data){
        var _data =[];
        for(var i=0;i<data.length;i++){
            var d = [];
            for(var j=0;j<data[i].length;j++){
                d.push({x:i,y:data[i][j],x0:x,y0:0});
            }
            _data.push(d);
        }
        return _data;
    }

    return _layout;
}
;"use strict";
/**
 *
 * @param svg svg标签
 * @param opt json格式数据（包含xy轴信息，柱子数据）
 * @returns {{}}
 */
function bar(svg,opt,config){
    var _bar = {};

    var _svg = svg;

    var _axis;//坐标轴
    var _xStep;//x轴刻度长度
    var _xNum;//x轴刻度数
    var axisData = {};//绘制坐标轴参数
    var _maxmin;//柱子数据最大值最小值

    var _config = config;
    var _utils = utils();

    var _rect;
    var _series;//柱体数据及样式参数
    var _cloneBars = [];//数据隐藏是备用恢复数据
    var _legendData = [];//图例需要的参数

    var _barOpacity = 1,//特殊柱体透明度
        _barHeight = 15,//特殊柱体高度
        _strokeWidth = 2,//特殊柱体边线宽
        _strokeColor = "red";//边线颜色

    var _transition;//延时执行切换


    //图例点击回调函数
    var _onClickCallback = function(name){
        clearTimeout(_transition);
        //根据name更新要显式的数据
        setShowData(name);
        //所有数据都被隐藏掉时
        if(_series.length<=0){
            _maxmin=[0,0];
            //更新坐标轴,重新获取比例尺，
            _axis.updateYAxis(_cloneBars[0].yAxisIndex,_maxmin[0],_maxmin[1]);
            //重绘柱状图
            _svg.selectAll(".layer").remove();
//            _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
        }else{
            //计算最大最小值
            _maxmin = getMaxMin(_series);
            //更新坐标轴,重新获取比例尺，
            _axis.updateYAxis(_cloneBars[0].yAxisIndex,_maxmin[0],_maxmin[1]);
            //重绘柱状图
            _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
        }

    }
    //鼠标移动到图例上悬停时回调函数
    var _hoverCallback = function (name){
        _rect.selectAll("#"+name).style("fill", function(){
            for(var i=0;i<_series.length;i++){
                if(_series[i].name===name){
                    return _series[i].itemStyle.emphasis.color
                }
            }
        })
    }

    /**
     * 绘制柱状图方法
     */
    _bar.render = function(){
        //校验数据
        var mark = checkout(opt);
        if(!mark){
            console.log("数据不完整！");
            return mark;
        }

        //第一次创建坐标轴对象，获取x轴刻度数，用于整理数据
        axisData.xAxis = [opt.xAxis];
        axisData.yAxis = [opt.yAxis];
        _axis = axis(axisData,_svg,_config);//创建轴
        _xNum = _axis.xAxis[0].getTickNum;//x轴刻度数
        _xStep = _axis.xAxis[0].getStep;//获取x轴刻度长度
        //处理数据中data格式长度
        _series = pretreatment(opt.series,_xNum);
        //merge客户设置参数(xy轴数据和柱子数据不合并)
        mergeData(_config,opt);
        //获取最大最小值,将最大值最小值放入坐标轴参数对象，创建轴对象
        _maxmin = getMaxMin(_series);
        axisData.yAxis[0].max = _maxmin[0];
        axisData.yAxis[0].min = _maxmin[1];
        _axis = axis(axisData,_svg,_config);

        //画坐标轴
        _axis.render();
        //画柱子
        _bar.renderRect(_config,_series,_svg,_axis.xAxis[0],_axis.yAxis[0]);
        //图例
        _config.EVENT.LEGEND_SELECTED = _onClickCallback;
        _config.EVENT.LEGEND_HOVERLINK = _hoverCallback;
        var _legend = legend(_svg,_config,_legendData);
        _legend.render();
        //标题

        var _title = title();
        _title.render(_svg,_config);

    }
    /**
     *  画柱体方法
     * @param conf 合并后的config
     * @param svg    画板
     * @param series 柱子数据
     * @param xAxis  x轴信息，包含刻度步长，刻度数，比例尺
     * @param yAxis  y轴信息，包含刻度步长，刻度数，比例尺
     */
    _bar.renderRect = function(conf,series,svg,xAxis,yAxis){
        var lay = layout();//数据转换对象
        //复制series数组，为以后操作不修改series数据,真正用于显式的数据
        var tempData = [];
        tempData = _utils.cloneObject(series);
        var con = lay.conversion(tempData);//数据转换返回值[[数据data转换并变换数序后的series数组],刻度内柱子数]
        var layers = con[0];//layout转换后数据
        var barsNum = con[1];//每个刻度中柱子数
        var barWidth;//柱子宽度
        var outer;//柱子组与组之间间隔
        var inner;//刻度内柱子之间间隔
        var xScale = xAxis.getScale,//x轴比例尺
            yScale = yAxis.getScale;//y轴比例尺
        //清空画布上的柱子
        svg.selectAll(".layer").remove();
        if(series.length<=0){
            return false;
        }
        var layer = svg.selectAll(".layer")
            .data(layers);
        layer.enter().append("g")
            .attr("class", "layer")
            .attr("id",function(d){return d.name})
            //坐标平移
            .attr("transform",
                "translate(" + conf.canvas.margins.left + ","
                    + (conf.canvas.margins.top)+ ")")
            .style("fill", function(d, i) {return d.itemStyle.normal.color; });
        var style = [];//存放样式数据，设置柱子样式时读取
        _rect = layer.selectAll("rect")
            .data(function(d) {style.push(d); return d.data; })
            .enter().append("rect")
            //设置柱体宽度,当前每组柱子都可设置间隔，按第一组设置数据画柱子**
            .attr("width", function(d){barWidth = _xStep*(1-_cloneBars[0].barCategoryGap)/(barsNum>1?(barsNum+(barsNum-1)*_cloneBars[0].barGap):(1));
                outer = _xStep*conf.bar.barCategoryGap/2;
                inner = barWidth*conf.bar.barGap/(barsNum>1?(barsNum-1):1);
                if(typeof(d.y)!=="number"){
                    return barWidth-_strokeWidth;
                }else{
                    return barWidth;
                }
                })
            //设置x坐标
            .attr("x", function(d,i,j){
                if(typeof(d.y)!=="number"){
                    return xScale(i)+outer+ d.x0*(inner+barWidth)-_xStep/2+_strokeWidth/2;//右移白框线宽
                }else{
                    return xScale(i)+outer+ d.x0*(inner+barWidth)-_xStep/2;
                }
                })
            //设置y坐标，动画效果，从x轴变高
            .attr("y", yScale(0))
            //设置柱体高度，动画效果，从x轴变高
            .attr("height",0)
            //设置透明度
            .style("opacity", function(d,i,j){
                //判断特殊柱子，设置透明度
                if(typeof(d.y)==="number"){
                    return tempData[j].opacity;
                }else{
                    return _barOpacity;
                }
            })
            .style("stroke",function(d,i,j){
                //判断特殊柱子，设置边线颜色
                if(typeof(d.y)==="number"){
                    return tempData[j].itemStyle.normal.barBorderColor;
                }else{
                    return _strokeColor;
                }
            })
            .style("stroke-width",function(d,i,j){
                //判断特殊柱子，设置边线宽度
                if(typeof(d.y)==="number"){
                    return tempData[j].itemStyle.normal.barBorderWidth;
                }else{
                    return _strokeWidth;
                }
            })
            .style("fill",function(d,i,j){
                //判断特殊柱子，设置柱子颜色
                if(typeof(d.y)!=="number"){
                    return "white";
                }else{
                    return tempData[j].itemStyle.normal.color;
                }
            })
            .attr("rx",function(d,i,j){
                return tempData[j].itemStyle.normal.barBorderRadius
            })
            .attr("ry",function(d,i,j){
                return tempData[j].itemStyle.normal.barBorderRadius
            })
            .on("mouseover",function(d,i,j){
                //设置鼠标选中样式
                if(typeof(d.y)==="number"){
                    d3.select(this)
                        .style("fill", tempData[j].itemStyle.emphasis.color)
                        .style("stroke",tempData[j].itemStyle.emphasis.barBorderColor)
                        .style("stroke-width",tempData[j].itemStyle.emphasis.barBorderWidth)
                        .attr("rx",tempData[j].itemStyle.emphasis.barBorderRadius)
                        .attr("ry",tempData[j].itemStyle.emphasis.barBorderRadius);
                }
            })
            .on("mouseout",function(d,i,j){
                //设置鼠标离开样式
                if(typeof(d.y)==="number"){
                    d3.select(this)
                        .style("fill",tempData[j].itemStyle.normal.color)
                        .style("stroke",tempData[j].itemStyle.normal.barBorderColor)
                        .style("stroke-width",tempData[j].itemStyle.normal.barBorderWidth)
                        .attr("rx",tempData[j].itemStyle.normal.barBorderRadius)
                        .attr("ry",tempData[j].itemStyle.normal.barBorderRadius);
                }

            });
        _rect.transition()
            .delay(function(d, i) { return i * 100; })
            //根据数据正负值判断并设置y坐标位置
            .attr("y", function(d) {
                if(typeof(d.y)!=="number"){
                    return d.y0>0?yScale(d.y0)-_barHeight*(parseFloat(d.y)+1):yScale(d.y0)+_barHeight*parseFloat(d.y);
                }else{
                    return d.y>=0?yScale(d.y0 + d.y):yScale(d.y0);
                }
            })
            .attr("height",
            function(d) {
                if(typeof(d.y)!=="number"){
                    return _barHeight;
                }else if(d.y<0){
                    return Math.abs(yScale(d.y)-yScale(0));
                }else{
                    return yScale(0) - yScale(d.y);
                }

            });
        layer.exit().remove();
        //转换为分组显式柱状图

        //_transition = setTimeout(transitionGrouped,2000);

    };

    /**
     * 将柱状图转换为全部分组显式
     */
    function transitionGrouped(){
        //求最值
        var allData = [];
        for(var i=0;i<_series.length;i++){
            allData.push(_series[i].data)
        }
        _maxmin = getNormalMaxMin(allData);
        //重绘坐标轴
        _axis.updateYAxis(_cloneBars[0].yAxisIndex,_maxmin[0],_maxmin[1]);
        //分组显式每个刻度内柱子数
        var barsN = _series.length;
        //此处获取新比例尺
        var x = _axis.xAxis[0].getScale,
             y = _axis.yAxis[0].getScale;

        var barwidth,//柱子宽度
            inwidth,//同一刻度内柱子之间间距
            outwidth;//柱子在刻度内两端空白距离
        //修改柱体xy坐标，宽高
        _rect.transition()
            .duration(500)
            .delay(function(d, i) { return i * 10; })
            .attr("width", function(d,i,j){
                barwidth = _xStep*(1-_series[0].barCategoryGap)/(barsN>1?(barsN+(barsN-1)*_series[0].barGap):(1));
                inwidth = barwidth*_series[0].barGap;
                outwidth = _xStep*_series[0].barCategoryGap/2;
                if(typeof(d.y)!=="number"){
                    return barwidth-_strokeWidth;
                }else{
                    return barwidth;
                }
            })
            //设置柱体x坐标，宽度，柱体宽度是离散间隔的均分
            .attr("x", function(d, i,j) {return x(i)-_xStep/2+j*(inwidth+barwidth)+outwidth; })/**/
            .transition()
            //设置y坐标和高度
            .attr("y", function(d) {
                if(typeof(d.y)!=="number"){
                    return d.y0>0?y(0)-_barHeight:y(0);
                }else{
                    return d.y>=0?y(d.y):y(0);
                }
            })
            .attr("height",
            function(d) {
                if(typeof(d.y)!=="number"){
                    return _barHeight;
                }else if(d.y<0){
                    return Math.abs(y(d.y)-y(0));
                }else{
                    return y(0) - y(d.y);
                }

            });
    }


    /**
     * 获取最大值最小值方法，传入json，返回[max,min]数组
     * @param datas
     */
    function getMaxMin(datas){
        var barOpts = [];
        //barOrder内数据为  name 、name_stacke 、 name_cover
        var barOrder = [];
        var groupBars = [];//存放分组柱子数据data属性的数组
        var stackBars = [];//存放堆叠柱子数据data属性的数组
        var coverBars = [];//存放层叠柱子数据data属性的数组
        //数据分类，将不同类的柱子放在各自的数组中
        datas.forEach(function(d){
            if(d.stack===null&& d.cover===null){
                barOrder.push(d.name);
                groupBars.push(d.data);
            } else if(d.stack!==null){
                //stack属性不为空，如果之前已经出现过相同的stack值，将此data放到之前的数组中，否则放到新的数组
                var i = barOrder.indexOf(d.stack);
                if(i===-1){
                    barOrder.push(d.stack);
                    var newStack = [];//存放stack值相同的data数组
                    newStack.push(d.data);
                    stackBars.push(newStack);
                }else{
                    stackBars[i].push(d.data)
                }
            } else {
                barOrder.push(d.cover);
                coverBars.push(d.data);
            }
        });
        var extremum = [];//存放多个不同数组计算出来的最大值最小值的二维数组
        if(groupBars.length>0){
            //获取分组柱子的最大最小值数组
            extremum.push(getNormalMaxMin(groupBars));
        }
        if(stackBars.length>0){
            //获取堆叠柱子的最大最小值数组
            extremum.push(getStackMaxMin(stackBars));
        }
        if(coverBars.length>0){
            //获取层叠柱子的最大最小值数组（与分组显式相同）
            extremum.push(getNormalMaxMin(coverBars));
        }

        return extremum.length>0?getNormalMaxMin(extremum):[0,0];
    }

    /**
     * 计算stack数据最大值最小值，传入参数[ [[],[]],[[],[]] ]三维数组，其中每一个二维数组为一组堆叠数据
     * @param data 包含堆叠数据的数组
     * @returns {Array}  数组[最大值，最小值]
     */
    function getStackMaxMin(data){
        var minMaxArray = [];
        for(var i=0;i<data.length;i++){
            var max = [];//同属一个堆叠柱子的数据正值之和的数组
            var min = [];//同属一个堆叠柱子的数据负值之和的数组
            for(var k=0;k<data[i].length;k++){
                if(k==0){//第一次循环 max[]和min[]为空
                    for(var j=0;j<data[i][k].length;j++){
                        if(typeof("number"===data[i][k][j])){
                            min.push(data[i][k][j]);
                            max.push(data[i][k][j]);
                        }else{
                            min.push(0);
                            max.push(0);
                        }
                    }
                } else {//第一次之后循环 max[]和min[]不为空
                    for(var j=0;j<data[i][k].length;j++){
                        if(data[i][k][j]==="-"){

                        }else if(data[i][k][j]>=0){
                            if(typeof(max[j])==="number"&&max[j]>=0){
                                max[j] += data[i][k][j];
                            }else{
                                max[j] = data[i][k][j];
                            }
                        }else{
                            if(typeof(min[j])==="number"&&min[j]<=0){
                                min[j] += data[i][k][j];
                            }else{
                                min[j] = data[i][k][j];
                            }
                        }
                    }
                }
            }
            //每一组stack柱子最值
            var d = [max,min];
            var m = getNormalMaxMin(d);
            //
            minMaxArray.push(m);
        }
        return getNormalMaxMin(minMaxArray);
    };

    /**
     * 计算二维数组中的最大值最小值
     * @param data [[],[]]二维数组
     * @returns {Array}返回值类型[max,min]
     */
    function getNormalMaxMin(data){
        for(var i=0;i<data.length;i++){
            var max,min;//存放最大值最小值
            for(var j=0;j<data[i].length;j++){
                if(typeof(max) == "undefined"&&typeof(min) == "undefined"&&typeof(data[i][j])=="number"){
                    max = data[i][j];
                    min = data[i][j];
                }else{
                    if(max<data[i][j]){
                        max = data[i][j];
                    }
                    if(min>data[i][j]){
                        min = data[i][j];
                    }
                }
            }
        }
        return [max,min];
    };

    /**
     * 数据校验方法
     * 1、x和y轴信息
     * 2、series数组长度大于0
     * @param opt
     * @returns {boolean}
     */
    function checkout(opt){
            //包含xy轴信息&&xy轴数据&&
        for(var i=0;i<opt.series.length;i++){
            opt.series[i].name;
        }

        if(typeof(opt.xAxis)!=="undefined"&&typeof(opt.yAxis)!=="undefined"
            &&typeof(opt.xAxis.data)!=="undefined"
            &&opt.xAxis.data.length>0
            &&typeof(opt.series)!=="undefined"&&opt.series.length>0){
            return true;
        }
        return false;
    }

    /**
     * 数据预处理，比较data数据长度，删除多余，‘-’补足缺少，string转化‘-’
      * @param series 用户数据
     * @param tickNum x轴刻度数（数据data正确长度）
     * @returns {*}
     */
    function pretreatment(series,tickNum){
        for(var n=0;n<series.length;n++){
            var standardData = [];//处理后的标准数据
            for(var i=0;i<tickNum;i++){
                var t = (series[n].data)[i];
                if(typeof(t)==="number"){
                    standardData.push(series[n].data[i]);
                }else{
                    standardData.push('-');
                }
            }
            series[n].data = standardData;
        }
        return series;
    };

    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param conf
     */
    function mergeData(conf,option){
        //保存xy轴数据
        var x = option.xAxis;
        var y = option.yAxis;
        //删除option中的xy轴和series数据
        delete option.xAxis;
        delete option.yAxis;
        delete option.series;
        //合并option数据
        _config = _utils.merge(conf,option,true);
        var index = 0;
        //合并series数据
        _series.forEach(function(d){
            d = _utils.merge(d,_config.bar,false);
            //判断用户属否设置颜色，如果未设置取柱体颜色
            if(d.itemStyle.normal.color===null){
                d.itemStyle.normal.color = conf.color[index];
            }
            if(d.itemStyle.emphasis.color===null){
                d.itemStyle.emphasis.color = d3.rgb(conf.color[index]).brighter(0.9);
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.itemStyle.normal.color;
            //图形标识
            legend.type = _config.CHART_TYPE_BAR;
            _legendData.push(legend);
            index++;
        });
        //复制一份完整数据保存
        _cloneBars = _utils.cloneObject(_series);
    }

    /**
     * 图例回调函数调用，传入name值，判断当前显式的数据中有没有，如果有就删除（隐藏），如果没有就从原数据（_cloneBars）中获取添加（显式）
     * @param dataName 图例传入的参数
     */
    function setShowData(dataName){
        var flag = 0;//标识bars数组中是否有该name的数据0：没有1：有
        for(var i=0;i<_series.length;i++){
            if(_series[i].name===dataName){
                _series.splice(i,1);
                flag = 1;
                break;
            }
        }
        if(flag==0){
            var newSeries = _utils.cloneObject(_cloneBars);
            //判断是否是在所有都隐藏的基础上显式一组数据
            if(_series.length<=0){
                for(var k=0;k<newSeries.length;k++){
                    if(newSeries[k].name===dataName){
                        _series.push(newSeries[k]);
                        break;
                    }
                }
            }else{
                var nameList = [];
                for(var x=0;x<_series.length;x++){
                    nameList.push(_series[x].name);
                }
                nameList.push(dataName);
                _series = [];
                for(var n=0;n<newSeries.length;n++){
                    if(nameList.indexOf(newSeries[n].name)!==-1){
                        _series.push(newSeries[n]);
                    }
                }
            }
        }
    }
    return _bar;
};"use strict";
/**
 * 画折线图方法
 * @param config    用户自定义的参数与config合并后的对象
 * @param showdata  用户输入的数据
 * @returns {{}}  返回方法
 * @author WangJing
 * @time 2014-12-9
 * 使用方法
 *
 */
function lineChart(config,showdata){
    var conf = config;

    var line = {};
    var _width = conf.canvas.width,
        _height = conf.canvas.height,
        _margins = conf.canvas.margins,
        _opacity = conf.line.opacity,//透明度
        _xAxisData = conf.xAxis.data,//x轴数据
        _colors =  d3.scale.category10(),
        _xScale,_yScale,//定义x轴比例尺、y轴比例尺
        _data = dataTransition(showdata[0].da),//转换用户输入的数据
        _svg,
        _bodyG,
        _line;

    //绘制坐标轴js
    var Axis = drawAxis(conf);
    console.log("Axis"+Axis);
    /**
     * 画折线图方法
     */
    line.render = function(){
        //初始化创建svg
        if(!_svg){
            _svg = d3.select("body").append("svg")//创建画板（svg），并设置宽高
                .attr("height",_height)
                .attr("width",_width);

        }
        //画坐标轴
        Axis.renderAxes(_svg,_xAxisData,_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _xScale = scale[0];
        _yScale = scale[1];

        renderBody(_svg);
    }
    /**
     * 图表主体渲染函数
     * @param svg 绘制画布
     */
    function renderBody(svg){
        if(!_bodyG)
            _bodyG = svg.append("g")//生成g元素，该元素包含了图表主体中的所有元素
                .attr("class","body")
                .attr("transform", "translate(" + xStart() + "," + yEnd() + ")")
                .attr("clip-path","url(#body-clip)");

        renderLines();
        renderDots();
        //绘制图例
        var leg = legend(conf);
        console.log(showdata[0].da);
        leg.drawLegend(_svg,showdata[0].da);
    }
    /**
     *渲染数据序列函数
     */
    function renderLines(){
        _line = d3.svg.line()//为每一个数据序列创建svg:path元素
            .interpolate("cardinal")//设置或获取插值模式.
            .x(function(d){ return _xScale(d.x);})
            .y(function(d){ return _yScale(d.y);});

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter()
            .append("path")//创建数据线段
            .style("opacity",_opacity)//线的透明度
            .style("stroke",function(d,i){
                return _colors(i);
            })
            .attr("class","line");


        _bodyG.selectAll("path.line")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素
                d3.select(this)
                    .style("stroke","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("stroke","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("stroke",_colors(i));
            })
            .transition()//过渡样式
            .attr("d",function(d){ return _line(d);});
    }
    /**
     * 渲染小圆点函数
     */
    function renderDots(){
        _data.forEach(function(list,i){
            _bodyG.selectAll("circle._" + i)
                .data(list)
                .enter()
                .append("circle")
                .attr("class","dot _" + i);

            _bodyG.selectAll("circle._"+i)
                .data(list)
                .style("stroke",function(d){
                    return _colors(i);
                })
                .on("click",function(d,i){// 鼠标单击某元素
                    d3.select(this)
                        .style("fill","red");
                })
                .on("mouseover",function(d,i){// 鼠标移到某元素上
                    d3.select(this)
                        .style("fill","blue");
                })
                .on("mouseout",function(d,i){//鼠标从某元素移开
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill","white");
                })
                .transition()//为其添加过渡效果，数据更新时，点会随着线条一起移动
                .attr("cx",function(d){return _xScale(d.x);})//折点cx
                .attr("cy",function(d){return _yScale(d.y);})//折点cy
                .attr("r",4.5);//折点的半径
        });
    }
    /**
     *转换用户输入的数据
     * 输入为普通二维数组
     * 转换结果
     */
    function dataTransition(data){
        var d = [];
        for (var j = 0; j < data.length; j++){
            console.log(data[j]);

            d.push(d3.range(data[j].length).map(function (i) {
                return {x: i, y: data[j][i]};
            }));
        }
        return d;
    }
    /**
     * 重新绘图
     */
    function update()
    {
        //重绘坐标轴
        Axis.updateYAxis(_data);
        //获取比例尺
        var scale = Axis.getAxisScale();
        _xScale = scale[0];
        _yScale = scale[1];

        renderBody(_svg);
//     d3.selectAll("g").remove();
//        _bodyG.selectAll("path.line")
//            .remove();

        for (var i = 0; i < _data.length; ++i) {
            var series = _data[i];
            series.length =0;
            for (var j = 0; j < 8; ++j)
                series.push({x: j, y: randomData()});
        }
        function randomData() {
            return Math.random() * 15 ;//定义（y轴）随机数值
        }
        renderBody();
    }
    /**
     *根据参数调用线图方法
     */
    line.change = function(val){
//        for(var i = 0; i < 10; i++){
        if(val==="update"){
            update(_data);
        }
//        console.log(val);
//            break;
//            continue;
//        }
    }
    function xStart() {
        return _margins.left;
    }
    function yEnd() {
        return _margins.top;
    }

    return line;

}

;"ues strict";
/**
 * 画线图方法
 * @param config 用户自定义的参数与config合并后的对象
 * @param showdata 用户输入的数据
 * @returns {{}} 返回方法
 * @author WangJing
 * @time 2014-12-9
 * 使用方法
 *
 */
function areaChart(con,svg){
    var opt = config();
    var _utils = utils();
    var conf = con;
    var area = {};
    var _width = conf.canvas.width,//画布宽
        _height = conf.canvas.height,//画布高
        _margins = conf.canvas.margins,//画布外边距
        _area = conf.series,
    // console.log(_dat);
        _opacity = opt.line.itemStyle.normal.areaStyle,//线的透明度
        _colors = conf.color,
        _xScale,_yScale;//定义x轴比例尺、y轴比例尺
    // _data = dataTransition(_area[0].data),
    var _data = [];
    console.log(_data);
    for(var i =0;i<_area.length;i++){
        console.log(_area.length);
        _data.push(_area[i].data);
    }
    console.log(_data);
    var _svg,//画布
        _bodyG,
        _line;//线

//    var lastData = _data,//去掉隐藏线数据后的处理数据
//        lastColors = _colors;//去掉隐藏线数据后的处理数据

    /**
     * 定义隐藏显示线图的方法，图例调用
     * @param name
     */
//    var clickCount = 0;
//    config.legend.legend_item_onclick = function(name){
//        //初始化显式数组lastData，设置要显式的数据和颜色参数
//        var dc = setDataAndColor(_area,name);
//        console.log(dc);
//        for(var i = 0;i<dc.length;i++){
//            _area=dc[i];//_area=dc[0];
//            lastColors=dc[1];
//        }
//        console.log(_area);
//        _svg.select(".area").remove();
//        _svg.select(".line").remove();
//        d3.selectAll(".dot _0").remove();
//
//        console.log(d3.selectAll(".dot _0"));
//        //console.log(d3.selectAll(".dot _0"));
//        // renderBody(_svg,_area);
//        // renderBodyArea(_svg,lastData);
//        // renderBodyStacked(_svg,lastData);
//        clickCount++;
//    };
    /**
     * 隐藏线图时编辑数据
     */
//    function setDataAndColor(_areaData,name){
//        console.log(_areaData);
//        var newDa = [],
//            newColor = [];
//        for(var i = 0; i<_areaData.length;i++){
//            console.log(_areaData[i].data);
//            if(_areaData[i].name !== name){
//                console.log(name);
//                // console.log(_areaData.length);
//                // console.log(_areaData[0][i]);
//                console.log(_areaData[i].data);
//                newDa.push(_areaData[i].data);
//                newColor.push(lastColors[i]);
//
//            }else{
//
//            }
//        }
//        return [newDa,newColor];
//    }
    conf.series.forEach(function(d){
        var cloneConfig = _utils.cloneObject(opt.categoryAxis); //先克隆一个，然后再merge
        _utils.merge(cloneConfig,d,false);

    })
    /**
     * 画分层面积图方法
     */
    area.render = function () {
//        if (!_svg) {
//            _svg = d3.select("body").append("svg")
//                .attr("height", _height)
//                .attr("width", _width);
//            defineBodyClip(svg);
//        }
        //绘制坐标轴
//        var axis1 = axis(option,svg);
        var axis1 = axis(option,svg,opt);
        console.log(axis1);
        //获取比例尺
        _xScale = axis1.xAxis[0].getScale(0);
        _yScale = axis1.yAxis[0].getScale(0);
        //获取x轴刻度数
        // var xNum = da.xAxis[0].getTickNum;
        //获取x轴刻度长度
        // var xStep = da.xAxis[0].getStep;
        // mergeData(option,conf);
//        var series = pretreatment(_data);
        // var ticks = _yScale.ticks();
        // console.log(ticks);
        axis1.render();
        //渲染body
        renderBody(svg);
        // console.log(_data)
        // renderBodyArea(_svg);

        var _legendArray=[];//组装图例数组
        //绘制图例
        for (var i = 0; i < _area.length; i++) {
            _legendArray.push({name:_area[i].name,color:_colors[i],type:_area[i].type,symbol:"",symbolStyle:""})
        }
        var leg=legend(svg,conf,_legendArray);
        leg.render();
    };
    /**
     *
     * @param svg
     */
    function defineBodyClip(svg) {
        var padding = 5;//内边距
        svg.append("defs")
            .append("clipPath")//clipPath属性用来限制绘图区域
            .attr("id", "body-clip")
            .append("rect")
            .attr("x", 0 - padding)
            .attr("y", 0)
            .attr("width", quadrantWidth() + 2 * padding)
            .attr("height", quadrantHeight());
    }
    /**
     * 渲染body
     * @param svg 传入一个画布（svg）参数
     */
    function renderBody(svg) {
        if (!_bodyG)
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + xStart() + ","
                    + yEnd() + ")")
                .attr("clip-path", "url(#body-clip)");

        renderLines();
        // renderAreas();
        renderDots();

        var t = title(svg,conf);
        t.addTitle();
    }

    /**
     * 分层面积区域
     * @param svg 传入一个画布(svg)参数
     */

    function renderBodyArea(svg) {
        if (!_bodyG)
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + xStart() + ","
                    + yEnd() + ")")
                .attr("clip-path", "url(#body-clip)");

        renderLines();
        renderAreas();
        renderDots();

    }

    /**
     * 堆叠面积区域
     * @param svg 传入一个画布(svg)参数
     */

    function renderBodyStacked(svg) {
        if (!_bodyG)
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + xStart() + ","
                    + yEnd() + ")")
                .attr("clip-path", "url(#body-clip)");

        var stack = d3.layout.stack()//构建一个默认的堆叠图
            .offset('zero');//设置偏移值为zero
        stack(_data);
        renderLinesStacked(_data);
        renderDotsStacked();
        renderAreasStacked(_data);
    }

    /**
     * 判断线图是否平滑
     */
    var isSmooth = function(){
        if(conf.line.isSmooth===false){
            return null;
        }else{
            return "cardinal";
        }
    }
    /**
     * 渲染数据序列函数
     */
//    var arr = conf.xAxis[0].data;
    function renderLines() {
        _line = d3.svg.line()
            .interpolate(isSmooth())//设置或获取插值模式.
            .x(function(d){ return _xScale(d.x);})
//            .x(function (d,i) {
//                var text=arr[i];
//                // console.log(text)
//                return _xScale(text); })
            .y(function (d) {
                var dy= d.y;
                // console.log(dy)
                if(dy===undefined)
                {
                    return _yScale(d);
                }else
                {
                    return _yScale(d.y);
                }
            });

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter()
            .append("path")
            .style("opacity",_opacity)
            .style("stroke", function (d, i) {
                return _colors[i];
            })
            .attr("class", "line")
            .attr("d", function (d) {
                return _line(d); });

        _bodyG.selectAll("path.line")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素
                // d3.select(this)
                // .remove();
                d3.select(this)
                    .style("stroke","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("stroke","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("stroke",_colors[i]);
            })
            .transition()
            .attr("d", function (d) { return _line(d); });
    }

    /**
     * 渲染(分层)小圆点函数
     */
    function renderDots() {
        // console.log("dddddd"+_data);
        _data.forEach(function (list, i) {
            _bodyG.selectAll("circle._" + i)
                .data(list)
                .enter().append("circle")
                .attr("class", "dot _" + i)
                .attr("id","dot"+i)
                .attr("cx",function(d){return _xScale(d.x);})
//                .attr("cx", function (d,i) {
//                    // console.log(i);
//                    var text=arr[i];
//                    return _xScale(text); })
                .attr("cy", function (d) {
                    var dy= d.y;
                    // console.log(dy)
                    if(dy===undefined)//判断初始化显示
                    {
                        return _yScale(d);
                    }else
                    {
                        return _yScale(d.y);
                    }
                })
                // .attr("cy", function (d) {
                // return _yScale(d.y); })
                .attr("r", 4.5);

            _bodyG.selectAll("circle._" + i)
                .data(list)
                .style("stroke", function (d) {
                    return _colors[i];
                })
                .style("opacity", _opacity)
                .on("click",function(d,i){// 鼠标单击某元素
                    // d3.select(this).remove();
                    d3.select(this)
                        .style("fill","red");
                })
                .on("mouseover",function(d,i){// 鼠标移到某元素上
                    d3.select(this)
                        .style("fill","blue");
                })
                .on("mouseout",function(d,i){//鼠标从某元素移开
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill","white");
                })
                .transition()
                .attr("cx",function(d){return _xScale(d.x);})
//                .attr("cx", function (d,i) {
//                    // console.log(i);
//                    var text=arr[i];
//                    return _xScale(text); })
                .attr("cy", function (d) {
                    var dy= d.y;
                    // console.log(dy)
                    if(dy===undefined)
                    {
                        return _yScale(d);
                    }else
                    {
                        return _yScale(d.y);
                    }
                })
                .attr("r", 4.5);
        });
    }

    /**
     * 渲染(堆叠)小圆点函数
     */

    function renderDotsStacked() {
        _data.forEach(function (list, i) {
            _bodyG.selectAll("circle._" + i)
                .data(list)
                .enter().append("circle")
                .attr("class", "dot _" + i);
            _bodyG.selectAll("circle._" + i)
                .data(list)
                .style("stroke", function (d) {
                    return _colors[i];
                })
                .style("opacity", _opacity)
                .on("click",function(d,i){// 鼠标单击某元素
                    d3.select(this)
                        .style("fill","red");
                })
                .on("mouseover",function(d,i){// 鼠标移到某元素上
                    d3.select(this)
                        .style("fill","blue");
                })
                .on("mouseout",function(d,i){//鼠标从某元素移开
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill","white");
                })
                .transition()
                .attr("cx",function(d){return _xScale(d.x)})
//                .attr("cx", function (d,i) {
//                    // console.log(i);
//                    var text=arr[i];
//                    return _xScale(text); })
                .attr("cy", function (d) { return _yScale(d.y + d.y0); })
                .attr("r", 4.5);
        });
    }
    /**
     * 判断线图是否平滑
     */
    var isSmooth = function(){
        if(conf.line.isSmooth===false){
            return null;
        }else{
            return "cardinal";
        }
    }
    /**
     * 渲染分层面积区域函数
     */

    function renderAreas() {
        var area = d3.svg.area()
            .interpolate(isSmooth())//设置或获取插值模式.
            .x(function(d){return _xScale(d.x);})
//            .x(function (d,i) {
//                // console.log(i);
//                var text=arr[i];
//                return _xScale(text); })
            .y0(yStart())
            .y1(function(d) { return _yScale(d.y); });

        _bodyG.selectAll("path.area")
            .data(_data)
            .enter()
            .append("path")
            .style("opacity",_opacity)
            .style("fill", function (d, i) {
                return _colors[i];
            })
            .attr("class", "area");

        _bodyG.selectAll("path.area")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素
                d3.select(this)
                    .style("fill","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("fill","blue");
            })
            .on("mouseout",function(d,i){//鼠标从某元素移开
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("fill",_colors[i]);
            })
            .transition()
            .attr("d", function (d) {
                return area(d);
            });
    }
    /**
     * 判断线图是否平滑
     */
    var isSmooth = function(){
        if(conf.line.isSmooth===false){
            return null;
        }else{
            return "cardinal";
        }
    }
    /**
     *渲染堆叠面积图线
     */
    function renderLinesStacked() {//stackedData
        _line = d3.svg.line()// 创建一个线段生成器
            .interpolate(isSmooth())//设置或获取插值模式.
            .x(function(d){return _xScale(d.x);})
//            .x(function (d,i) {
//                // console.log(i);
//                var text=arr[i];
//                return _xScale(text); })
            .y(function (d) {
                return _yScale(d.y + d.y0);
            });

        _bodyG.selectAll("path.line")
            .data(_data)//stackedData
            .enter()
            .append("path")
            .style("opacity",_opacity)
            .style("stroke", function (d, i) {
                return _colors[i];
            })
            .attr("class", "line");

        _bodyG.selectAll("path.line")
            .data(_data)//stackedData
            .on("click",function(d,i){// 鼠标单击某元素
                d3.select(this)
                    .style("stroke","red");
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("stroke","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)//每个元素过渡的持续时间
                    .style("stroke",_colors[i]);
            })
            .transition()
            .attr("d", function (d) {
                return _line(d);
            });
    }
    /**
     * 判断线图是否平滑
     */
    var isSmooth = function(){
        if(conf.line.isSmooth===false){
            return null;
        }else{
            return "cardinal";
        }
    }
    /**
     * 渲染堆叠面积图区域
     */
    function renderAreasStacked() {//stackedData
        var area = d3.svg.area()//创建一个新的区域生成器
            .interpolate(isSmooth())//设置或获取插值模式.//cardinal
            .x(function(d){return _xScale(d.x);})
//            .x(function (d,i) {
//                // console.log(i);
//                var text=arr[i];
//                return _xScale(text); })
            .y0(yStart())
            // .y0(function(d){return _yScale(d.y0);})
            .y1(function (d) {
                return _yScale(d.y + d.y0);
            });

        _bodyG.selectAll("path.area")
            .data(_data)//stackedData
            .enter()
            .append("path")
            .style("opacity",_opacity)
            .style("fill", function (d, i) {
                return _colors[i];
            })
            .attr("class", "area");


        _bodyG.selectAll("path.area")
            .data(_data)
            .on("click",function(d,i){// 鼠标单击某元素

                d3.select(this)
                    .style("fill","red");
                // d3.select(this).style(function(d,i){
                // return _colors[i];
                // });
            })
            .on("mouseover",function(d,i){// 鼠标移到某元素上
                d3.select(this)
                    .style("fill","blue");
            })
            .on("mouseout",function(d,i){//鼠标从某元素移开
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("fill",_colors[i]);
            })
            .transition()
            .attr("d", function (d) {
                return area(d);
            });
    }
    /**
     *转换用户输入的数据
     * 输入为普通二维数组 例如[[1,2],[1,2]]
     * 转换结果 [[{x:0,y:1},{x:1,y:2}],[{x:0,y:1},{x:1,y:2}]]对象
     */

    // function dataTransition(data){
    // console.log(data)
    // var d = [];
    // for (var j = 0; j < data.length ; j++){
    // console.log("data"+data);
    // d.push(d3.range(data.length).map(function (i) {
    //// console.log("nnnnnn");
    // return {x: i, y: data[j][i]};
    //
    // }));
    // }
    // return d;
    // }
    /**
     * 重新绘制线图
     */
    function line()
    {
        // console.log("line()....")
        // console.log(_data)
        //重绘坐标轴
        var axis1 = axis(option,svg);
        //获取比例尺
        _xScale = axis1.xAxis[0].getScale(0);
        _yScale = axis1.yAxis[0].getScale(0);
        axis1.render();
        renderBody(svg);
        for (var i = 0; i < _data.length; ++i) {
            var series = _data[i];
            series.length =0;
            for (var j = 0; j < conf.xAxis[0].data.length; ++j)
                series.push({x: j, y: Math.random() * (conf.yAxis[0].max-10)});
        }
        renderBody();
    }

    /**
     * 重新绘制分层面积图
     */

    function areaUpdata()
    {
        //重绘坐标轴
        var axis1 = axis(option,svg);
        //获取比例尺
        _xScale = axis1.xAxis[0].getScale(0);
        _yScale = axis1.yAxis[0].getScale(0);
        axis1.render();
        renderBodyArea(svg);
        for (var i = 0; i < _data.length; ++i) {
            var series = _data[i];
            series.length =0;
            for (var j = 0; j < conf.xAxis[0].data.length; ++j)
                series.push({x: j, y: Math.random() * (conf.yAxis[0].max-10)});
        }
        renderBodyArea();
    }

    /**
     * 重新绘制堆叠面积图
     */
    function areaStackedUpdata()
    {
        //重绘坐标轴
        var axis1 = axis(option,svg);
        //获取比例尺
        _xScale = axis1.xAxis[0].getScale(0);
        _yScale = axis1.yAxis[0].getScale(0);
        axis1.render();
        renderBodyStacked(svg);
        for (var i = 0; i < _data.length; ++i) {
            var series = _data[i];
            series.length =0;
            for (var j = 0; j < conf.xAxis[0].data.length; ++j)
                series.push({x: j, y: Math.random() * (conf.yAxis[0].max-40)});
        }
        renderBodyStacked();
    }
    /**
     *根据参数调用线图、分层面积图方法
     */
    area.change = function(value){
        if(value==="line"){
            svg.selectAll(".area")
                .remove();
            line(_data);
        }else if(value==="areaUpdata"){
            areaUpdata(_data);
        }else if(value==="areaStackedUpdata"){
            areaStackedUpdata(_data);
        }

    }

    //step 1校验数据
//    var mark = checkout(option);
//    if(!mark){
//        return mark;
//    }
//    /**
//     * 数据校验方法
//     * 1、x和y轴信息
//     * 2、series数组长度大于0
//     * @param opt
//     * @returns {boolean}
//     */
//    function checkout(option){
//        //包含xy轴信息&&xy轴数据
//        // console.log(option.xAxis);
//        // console.log(option.yAxis);
//        // console.log(option.xAxis[0].data);
//        // console.log(option.xAxis[0].data.length);
//        // console.log(typeof(option.series));
//        // console.log(option.series.length);
//
//        if(typeof(option.xAxis[0])!=="undefined"&&typeof(option.yAxis[0])!=="undefined"//undefined未定义，未限定
//            &&typeof(option.xAxis[0].data)!=="undefined"
//            &&option.xAxis[0].data.length>0
//            &&typeof(option.series)!=="undefined"&&option.series.length>0){
//            // console.log(option)
//            return true;
//        }
//        return false;
//    }

    /**
     * 数据预处理，比较data数据长度，删除多余，‘-’补足缺少，string转化‘-’
     * @param datas
     */
    //x轴刻度数
//    function pretreatment(series,axisLength){
//        for(var n=0;n<series.length;n++){
//            var dd = [];
//            for(var i=0;i<axisLength;i++){
//                var t = (series[n].data)[i];
//                console.log(typeof(t));
//                if(typeof(t)==="number"){
//                    dd.push(series[n].data[i]);
//                }else{
//                    //dd.push("-");
//                }
//            }
//            // console.log(dd);
//            series[n].data = dd;
//        }
//        return series;
//    };
    /**
     * 深度克隆
     * @param obj
     * @returns {Array}
     */
    function cloneObject(obj){
        console.log(obj.constructor);
        var o = obj.constructor === Array ? [] : {};
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
            }
        }
        return o;
    }

    function xStart() {
        return _margins.left;
    }
    function yStart() {
        return _height - _margins.bottom;
    }
    function xEnd() {
        return _width - _margins.right;
    }
    function yEnd() {
        return _margins.top;
    }
    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }
    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom;
    }
    area.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return area;
    };
    area.height = function (h) {
        if (!arguments.length) return _height;
        _height = h;
        return area;
    };
    area.margins = function (m) {
        if (!arguments.length) return _margins;
        _margins = m;
        return area;
    };
    area.colors = function (c) {
        if (!arguments.length) return _colors;
        _colors = c;
        return area;
    };
    area.x = function (x) {
        if (!arguments.length) return _xScale;
        _xScale = x;
        return area;
    };
    area.y = function (y) {
        if (!arguments.length) return _yScale;
        _yScale = y;
        return area;
    };
    area.addSeries = function (series) {
        _data.push(series);
        return area;
    };
    return area;
};"use strict";
function pieT(option,piesvg,config) {
    var _config =  config;
    var _pie = {};
    var opt = option;
    var _utils = utils();

    var _legendArray=[];//组装图例数组
    //合并option数据
    var _con = _utils.merge(_config,opt,true);
    var _width = _con.canvas.width,
        _height = _con.canvas.height;
    var newArray = [];
    opt.series.forEach(function(d){
        if("pie" === d.type){
            _utils.merge(d,_config.pie,false);
        }
        var _colors = _con.color,
            _data = d.data,
            _radius = d.radius,
            _center = d.center,
            _roseType = d.roseType;// 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
        var rad1 = parseFloat(_radius[0])/100;//百分数转换成小数
        var rad2 = parseFloat(_radius[1])/100;//百分数转换成小数
        var cen1 = parseFloat(_center[0])/100;//百分数转换成小数
        var cen2 = parseFloat(_center[1])/100;//百分数转换成小数
        var lastColors = _colors;//去掉隐藏柱子数据后的处理数据
        var pieData = _utils.cloneObject(_data);
        var pieColor = _utils.cloneObject(_colors);

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([5, 0])
            .html(function(d,i) {
                var daArray = _data.map(function(d){ return d.data;});
                var sum=eval(daArray.join("+"));
                return " <span style='color:#ffffff;font-size: 12px;font-family: Microsoft YaHei, SimHei;'><p>访问来源</p><p>" + d.data.name+":"+daArray[i]+"("+(daArray[i]/sum).toFixed(4).slice(2,4)+"."+(daArray[i]/sum).toFixed(4).slice(4,6)+"%)"+ "</p></span>";
            });
        var arcInRad = Math.min(_width, _height)*rad1;
        var arcOutRad = Math.min(_width, _height)*rad2;

        _pie.render = function(){
            piesvg.call(tip);//提示框
            piesvg.append("g")//创建饼图容器
                .attr("class", "slices");
            piesvg.append("g")//创建文字容器
                .attr("class", "labels")
                .attr("transform", "translate("+_width*cen1+","+_height*cen2+")");
            piesvg.append("g")//创建指示线容器
                .attr("class", "lines");
            var newData = [];
            //var newArray = [];
            var sum = 0;
            var zeroNum = 0;
            var largeZero = 0;
            var str = 0;
            for(var m = 0;m < _data.length;m++){
                if(_data.length > 0 && typeof(_data)!=="undefined"){
                    //判断数据类型 如果为非number类型的用“-”代替
                    if(typeof _data[m].data !== "number"){
                        _data[m].data = "-";
                        str++;
                    }else{
                        if(_data[m].data < 0){
                            newData.push(_data[m]);
                            sum++;
                        }else if(_data[m].data > 0){
                            newData.push(_data[m]);
                            largeZero++;
                        }else if(_data[m].data === 0){
                            newData.push(_data[m]);
                            zeroNum++;
                        }
                    }
                }else{
                    if(rad1 === 0){
                        drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad,arcOutRad+10,d);
                    }else{
                        drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad-10,arcOutRad+10,d);
                    }
                }
            }

            if(sum === 0 && largeZero === 0 && zeroNum <= newData.length){ //零
                if(rad1 === 0){
                    drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad,arcOutRad+10,d);
                }else{
                    drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad-10,arcOutRad+10,d);
                }
            }else{
                if(str !== 0 && sum === 0 && zeroNum === 0 && largeZero ===0){//字符串
                    return null;
                }else if((sum === 0 && zeroNum === 0 && largeZero <= newData.length)|| (sum === 0 && largeZero < newData.length && zeroNum <newData.length)){//正数 //正数 零
                    //newArray = newData;
                    console.log(newData);
                    for(var t = 0; t <newData.length ;t++){
                        if(newData[t].data !== 0){
                            newArray.push(newData[t]);
                        }
                    }
                    if( _roseType === null){
                        renderPie(piesvg,newArray,d,tip,lastColors);
                    }else{
                        drawAsterPlot(piesvg,newArray,d,tip,lastColors);
                    }
                }else if((largeZero === 0 && zeroNum === 0 && sum <= newData.length) || (largeZero === 0 && sum < newData.length && zeroNum < newData.length)){//负数 || 负数 零
                    // newArray = newData;
                    console.log(newData);
                    for(var t = 0; t <newData.length ;t++){
                        if(newData[t].data !== 0){
                            newArray.push(newData[t]);
                        }
                    }
                    for(var m = 0; m < newArray.length;m++){
                        if(newArray[m].data < 0){
                            newArray[m].data= Math.abs(newArray[m].data);
                        }
                    }
                    if( _roseType === null){
                        renderPie(piesvg,newArray,d,tip,lastColors);
                    }else{
                        drawAsterPlot(piesvg,newArray,d,tip,lastColors);
                    }
                }else if((zeroNum === 0 && largeZero < newData.length && sum < newData.length)||(sum  < newData.length && largeZero < newData.length && zeroNum <newData.length)){//负数 正数 //负数 零 正数
                    //newArray = newData;
                    for(var t = 0; t <newData.length ;t++){
                        if(newData[t].data !== 0 && newData[t].data > 0){
                            newArray.push(newData[t]);
                        }
                    }
                    if( _roseType === null){
                        renderPie(piesvg,newArray,d,tip,lastColors);
                    }else{
                        drawAsterPlot(piesvg,newArray,d,tip,lastColors);
                    }
                }
                if(rad1 === 0){
                    drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad,arcOutRad+10,d);
                }else{
                    drawCircle(piesvg,_width*cen1,_height*cen2,arcInRad-10,arcOutRad+10,d);
                }
                //绘制图例========================================================================================绘制图例
                for (var i = 0; i < newData.length; i++) {
                    _legendArray.push({name:newData[i].name,color:_colors[i],type:"pie",symbol:"",symbolStyle:""})
                }
                _con.EVENT.LEGEND_SELECTED = _legendClick;
                _con.EVENT.LEGEND_HOVERLINK = _hoverCallback;
                _con.EVENT.LEGEND_OUTLINK = _outCallback;
                var leg=legend(piesvg,_con,_legendArray);
                leg.render();

            }

            //画标题
            var _title = title();
            _title.render(piesvg,_con);
        };
        /**
         * 定义隐藏显示扇形的方法，图例调用
         * @param list
         */
        var _legendClick = function(name){
            //初始化显式数组lastData，设置要显式的数据和颜色参数
            setShowData(name);
            //先删除之前的所有
            piesvg.selectAll(".label").remove();
            piesvg.selectAll("polyline").remove();
            // renderPie(piesvg,nw,d,tip,lastColors);
            if( _roseType === null){
                piesvg.selectAll(".pieg").remove();
                //_pie.update(newArray);
                renderPie(piesvg,newArray,d,tip,lastColors);
            }else{
                piesvg.selectAll(".solidArc").remove();
                drawAsterPlot(piesvg,newArray,d,tip,lastColors);
            }
        };

        /**
         *  图例回调函数调用，传入name值，判断当前显式的数据中有没有，如果有就删除（隐藏），如果没有就从原数据（_cloneBars）中获取添加（显式）
         * @param dataName 图例传入的参数
         */

        function setShowData(dataName) {
            var flag = 0;//标识bars数组中是否有该name的数据0：没有1：有
            for (var i = 0; i < newArray.length; i++) {
                if (newArray[i].name === dataName) {
                    newArray.splice(i, 1);//方法向/从数组中添加/删除项目，然后返回被删除的项目。
                    lastColors.splice(i, 1);
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                var beforeNameList = _utils.cloneObject(pieData);
                var beforeColorList = _utils.cloneObject(pieColor);
                if(newArray.length <= 0){
                    for(var k =0; k < beforeNameList.length;k++ ){
                        if(beforeNameList[k].name===dataName){
                            newArray.push(beforeNameList[k]);
                            lastColors.push(beforeColorList[k]);
                            break;
                        }
                    }
                }else{
                    var nameList = [];
                    for(var x = 0 ; x < newArray.length;x++){
                        nameList.push(newArray[x].name);
                    }
                    nameList.push(dataName);
                    newArray = [];
                    lastColors = [];
                    for(var n = 0;n<beforeNameList.length;n++){
                        if(nameList.indexOf(beforeNameList[n].name) !== -1){
                            newArray.push(beforeNameList[n]);
                            lastColors.push(beforeColorList[n]);

                        }
                    }
                }
            }
        }

        //鼠标移动到图例上悬停时回调函数
        var _hoverCallback = function (name){
            var oldColor = d3.select("#"+name).attr("fill");
            var fillColor = d3.rgb(oldColor).brighter(0.2);
            d3.select("#"+name).attr("fill",fillColor);
        };

        var _outCallback = function(name){
            for(var t =0 ; t < newArray.length;t++){
                if(name === newArray[t].name){
                    d3.selectAll("#"+newArray[t].name).attr("fill",lastColors[t]);
                }
            }
        };
    });

//画圆圈=============================================================================================画圆圈
    function drawCircle(svg,cx,cy,r1,r2,con){
        var circleData = [[cx,cy,r1],[cx,cy,r2]];
        svg.selectAll("circle")
            .data(circleData)
            .enter().append("circle")
            .attr("fill", con.itemStyle.normal.circleFill)
            .attr("stroke", con.itemStyle.normal.circlestoke)
            .attr("stroke-width",  con.itemStyle.normal.circlestokewidth)
            .style("opacity", con.itemStyle.normal.opacity)
            .transition().duration(2000)
            .style("opacity", con.itemStyle.emphasis.opacity)
            .attr("cx", cx)
            .attr("cy",cy)
            .attr("r", function (d, i) {
                if(i === 0){
                    return r1;
                }else if(i === 1){
                    return r2;
                }
            });

    }

    //pie转换数据为适合生成饼图的对象数组
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.data;
        });
    //画饼图===========================================================================================画饼图
    function renderPie(svg,da,con,ti,lastco) {
        console.log(da);
        //设置弧度的内外半径，等待传入的数据生成弧度
        var _radius = con.radius;
        var rad1 = parseFloat(_radius[0])/100;
        var rad2 = parseFloat(_radius[1])/100;
        var _center = con.center;
        var cen1 = parseFloat(_center[0])/100;//百分数转换成小数
        var cen2 = parseFloat(_center[1])/100;//百分数转换成小数
        var _selectedOffset = con.selectedOffset;
        //var lastColors = con.itemStyle.normal.color;
        var arcInRad = Math.min(_width, _height)*rad1;
        var arcOutRad = Math.min(_width, _height)*rad2;
        var arc = d3.svg.arc()
            .innerRadius(arcInRad)
            .outerRadius(arcOutRad);

        svg.select(".slices").selectAll(".pieg")
            .data(pie(da))
            .enter()
            .append("g")
            .attr("class", "pieg")
            .attr("transform","translate("+_width*cen1+","+_height*cen2+")")//平移饼图中心
            .insert("path")
            .attr("id",function(d,i){
                return da[i].name;
            })
            .attr("fill",function(d,i){
                //为饼图填充颜色
                return lastco[i];
            })
            /*.attr("stroke-width",2)*/
            .attr("d",function(d){
                return arc(d);
            })
            .on("mouseover",function (d,i){
                //鼠标触发方法，移到饼图
                mouseOverEvent(svg,".pieg",d,i,ti,con,lastco);
                var oldColor = d3.select(this).style("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                console.log(oldColor);
                console.log(fillColor);
                d3.select(this)
                    .attr("fill", fillColor);
            })
            .on("mouseout",function(d,i){
                //鼠标移出方法，离开饼图
                mouseOutEvent(svg,".pieg",".textG"+i,ti);
                d3.select(this)
                    .attr("fill", lastco[i]);
            })
            .on("click",function(d,i){
                if(con.selectedMode === false){// 选择模式，默认关闭，可选single，multiple
                    d3.select(this)
                        .attr("transform","translate(0,0)")
                }else if(con.selectedMode === "single"){
                    var count = 0;
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("class","clicked")
                        .attr("transform", function(d){
                            var startAng = d.startAngle;
                            var endAng = d.endAngle;
                            var ang = startAng+(endAng-startAng)/2;
                            //计算平移时坐标位置

                            var x = _selectedOffset * Math.sin(ang);
                            var y = -_selectedOffset * Math.cos(ang);
                            count ++;
                            //返回平移时坐标位置
                            return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                        });

                    if(count > 0){
                        //点一个弧出来，点另一个弧时，前一个平移到原来位置，点的这个平移出来
                        if(d3.select(".clicked")!=null){
                            d3.select(".clicked")
                                .transition()
                                .duration(opt.series[0].transDate)
                                .attr("class","pieG")
                                .attr("transform","translate(0,0)");
                        }
                    }

                }else if(con.selectedMode === "multiple"){
                    var countMul = 0;
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("class","mulclass"+i)
                        .attr("transform", function(d){

                            var startAng = d.startAngle;
                            var endAng = d.endAngle;
                            var ang = startAng+(endAng-startAng)/2;
                            //计算平移时坐标位置
                            var x = _selectedOffset * Math.sin(ang);
                            var y = -_selectedOffset * Math.cos(ang);
                            countMul++;
                            //返回平移时坐标位置
                            return "translate("+parseFloat(x)+","+parseFloat(y)+")";
                        });
                    if( countMul > 0){
                        if(d3.select(".mulclass"+i)!=null){
                            d3.select(".mulclass"+i)
                                .transition()
                                .duration(opt.series[0].transDate)
                                .attr("class","piegg")
                                .attr("transform","translate(0,0)");
                        }
                    }
                }
            })
            .transition().duration(2000)
            .attrTween("d", function (d) {
                var currentArc = this.__current__; // <-C
                if (!currentArc)
                //开始显示动画旋转
                //    currentArc = {startAngle: -_startAngle/(Math.PI),
                //        endAngle:-_startAngle/(Math.PI)};
                //从0旋转
                    currentArc = {startAngle: 0,
                        endAngle:0};
                var interpolate = d3.interpolate(
                    currentArc, d);

                this.__current__ = interpolate(1);//<-D

                return function (t) {
                    return arc(interpolate(t));
                };
            });

        //_pie.mouseOverEvent(d,i)
        //调用添加文字和指示线
        drawTextLine(arc,svg,da,con,lastco);

        /*_pie.update = function(nd){
         svg.selectAll("path")
         .data(pie(nd))
         .transition().duration(500)// 开始一个动画过渡 指定每个元素过渡的持续时间（单位：毫秒ms）。
         .attrTween("d", arcTween);//在不同attr属性值之间平滑过渡（起始属性值可在过渡函数中设置,甚至整个过渡函数都可以自定义）。
         }
         function arcTween(a) {
         //d3.interpolate()实际上直接使用transition.attr()以及transition.style()当方法，
         //d3就已经能够给我们带来不少基本的过渡效果了。比较神奇的是，如果过渡的开始和结束都是两个数字的话还不难理解，但实际上即便是字符串d3也能实现一些相应的过渡效果。
         var i = d3.interpolate(this._current, a);
         this._current = i(0);
         return function(t) { return arc(i(t));    };
         }*/
    }

    /* pC.update = function(nD){
     piesvg.selectAll("path")
     .data(pie(nD))
     .transition().duration(500)// 开始一个动画过渡 指定每个元素过渡的持续时间（单位：毫秒ms）。
     .attrTween("d", arcTween);//在不同attr属性值之间平滑过渡（起始属性值可在过渡函数中设置,甚至整个过渡函数都可以自定义）。
     }
     */


//画南丁格尔玫瑰图==========================================================================
    function drawAsterPlot(svg,dataSet,con,ti,lastco){
//设置弧度的内外半径，等待传入的数据生成弧度
        var _radius = con.radius;
        var rad1 = parseFloat(_radius[0])/100;
        var rad2 = parseFloat(_radius[1])/100;
        var _center = con.center;
        var cen1 = parseFloat(_center[0])/100;//百分数转换成小数
        var cen2 = parseFloat(_center[1])/100;//百分数转换成小数
        var _selectedOffset = con.selectedOffset;
        //var lastColors = con.itemStyle.normal.color;
        var arcInRad = Math.min(_width, _height)*rad1;
        var arcOutRad = Math.min(_width, _height)*rad2;
        var _startAngle = con.startAngle;
        var rad = con.roseRadius;
        var arc = d3.svg.arc()
            .innerRadius(arcInRad)
            .outerRadius(function (d) {//(_con.roseRadius)
                return (arcOutRad - arcInRad) * (d.data.data / rad) + arcInRad;
            });

        dataSet.forEach(function(d) {
            d.weight = +d.weight;
            d.data  = +d.data;
            d.name  =  d.name;
        });

       var solidArc = svg.select(".slices").selectAll(".solidArc")
            .data(pie(dataSet));
        solidArc.enter()
            //.append("g")
            //.attr("class", "solidArc")
            .append("path")
            .attr("class", "solidArc")
            .attr("id",function(d,i){
                return dataSet[i].name;
            })
            .attr("transform","translate("+_width*cen1+","+_height*cen2+")")
            .attr("fill",function(d,i){
                return lastco[i];
            })
            .attr("stroke", "gray");
        solidArc .transition().duration(2000)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                };
            });
        solidArc .on('mouseover', function (d,i){
                mouseOverEvent(svg,".slices",d,i,ti,con,lastco);
                var oldColor = d3.select(this).style("fill");
                var fillColor = d3.rgb(oldColor).brighter(0.2);
                d3.select(this)
                    .attr("fill", fillColor);
            })
            .on('mouseout', function(d,i){
                mouseOutEvent(svg,".slices",".textG"+i,ti);
                d3.select(this)
                    .attr("fill", lastco[i]);

            })
            .transition().duration(2000)
            .attrTween("d", function (d) {//差值
                var currentArc = this.__current__; // <-C
                if (!currentArc)
                //开始显示动画旋转
                    currentArc = {startAngle: -_startAngle/(Math.PI),
                        endAngle:-_startAngle/(Math.PI)};
                //从0旋转
                //    currentArc = {startAngle: 0,
                //        endAngle:0};
                var interpolate = d3.interpolate(
                    currentArc, d);

                this.__current__ = interpolate(1);//<-D

                return function (t) {
                    return arc(interpolate(t));
                };
            });
        solidArc.exit().remove();
        // calculate the weighted mean score计算加权平均数
        var data =
            dataSet.reduce(function(a, b) {
                //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
                return a + (b.data * b.weight);
            }, 0) /
            dataSet.reduce(function(a, b) {
                return a + b.weight;
            }, 0);
        //调用添加文字和指示线
        drawTextLine(arc,svg,dataSet,con,lastco);
    }
    //获取中间角度
    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }
    //为饼图或者玫瑰图添加文字和指示线================================================为饼图或者玫瑰图添加文字和指示线
    function drawTextLine(aarc,ssvg,dada,con,lastco){
        var _radius = con.radius;
        var rad1 = parseFloat(_radius[0])/100;
        var rad2 = parseFloat(_radius[1])/100;
        var _center = con.center;
        var cen1 = parseFloat(_center[0])/100;//百分数转换成小数
        var cen2 = parseFloat(_center[1])/100;//百分数转换成小数
        var arcInRad = Math.min(_width, _height)*rad1;
        var arcOutRad = Math.min(_width, _height)*rad2;
        var lastColors = con.itemStyle.normal.color;
        var _inflexioLen = con.itemStyle.normal.labelLine.inflexiolen,
            _fontLen = con.itemStyle.normal.labelLine.fontlen,
            _stokeWidth = con.itemStyle.normal.labelLine.lineStyle.width;
        //设置弧度的内外半径，等待传入的数据生成弧度
        var outerArc = d3.svg.arc()
            .innerRadius(arcInRad*1.7)
            .outerRadius(arcOutRad*1.7);
        /* ------- TEXT LABELS -------*/

        ssvg.select(".labels").selectAll("text")
            .data(pie(dada))
            .enter()
            .append("text")
            .attr("class","label")
            .attr("dy", ".35em")
            .text(function(d) {
                return d.data.name;
            })
            .style("fill",function(d,i){
                return lastco[i];
            })
            .style("opacity", 0)
            .transition().duration(4000)
            .style("opacity", 1)
            .attrTween("transform", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    //计算文字位置，和指示线的终点位置一样计算
                    var pos = outerArc.centroid(d2);
                    pos[0] =(_inflexioLen + arcOutRad)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2))+_fontLen* (midAngle(d2) < Math.PI ? 1 : -1);
                    pos[1] =-(arcOutRad+_inflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));

                    return "translate("+ pos +")";
                };
            })
            .styleTween("text-anchor", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start":"end";
                };
            });

        /* ------- SLICE TO TEXT POLYLINES -------*/

        var polyline = ssvg.select(".lines").selectAll("polyline")
            .data(pie(dada));

        polyline.enter()
            .append("polyline")
            .attr("transform","translate("+_width*cen1+","+_height*cen2+")rotate(-360)scale(1)");

        polyline .style("opacity", 0)
            .transition().duration(6000)
            .style("opacity", 0.8)
            .attr("stroke",function(d,i){
                return lastco[i];
            })
            .attr("stroke-width",_stokeWidth)
            .attr("fill","none")
            .attrTween("points", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    var startPoint = aarc.centroid(d2);
                    if( con.roseType === null){
                        //指示线起始位置
                        startPoint[0] = arcOutRad*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        startPoint[1] = - arcOutRad*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }else{
                        var roseOutRad = (arcOutRad - arcInRad) * (d.data.data / 100.0) + arcInRad;
                        //指示线起始位置
                        startPoint[0] = roseOutRad*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                        startPoint[1] = - roseOutRad*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    }
                    //指示线转折点位置 pos[0] = pos[0]+100* (midAngle(d2) < Math.PI ? 1 : -1);
                    var  inflexio = outerArc.centroid(d2);
                    inflexio[0] =(_inflexioLen+ arcOutRad)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    inflexio[1] =-(arcOutRad+_inflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));
                    //指示线结束位置
                    var pos = outerArc.centroid(d2);
                    pos[0] =(30 + arcOutRad)*Math.sin(d2.startAngle+((d2.endAngle-d2.startAngle)/2))+_fontLen* (midAngle(d2) < Math.PI ? 1 : -1);
                    pos[1] =-(arcOutRad+_inflexioLen)*Math.cos(d2.startAngle+((d2.endAngle-d2.startAngle)/2));

                    return [startPoint, inflexio,pos];
                };
            });
    }

    function mouseOverEvent(ssvg,classname,dd,n,ti,con,lastcolor){
        var _center = con.center;
        var lastColors = con.itemStyle.normal.color;
        var cen1 = parseFloat(_center[0])/100;//百分数转换成小数
        var cen2 = parseFloat(_center[1])/100;//百分数转换成小数
        var _radius = con.radius;
        var rad1 = parseFloat(_radius[0])/100;
        var rad2 = parseFloat(_radius[1])/100;
        var arcInRad = Math.min(_width, _height)*rad1;
        var arcOutRad = Math.min(_width, _height)*rad2;
        var _fontWeight =con.itemStyle.normal.label.textStyle.font_weight,
            _fontSize = con.itemStyle.normal.label.textStyle.font_size,
            _fontFamily = con.itemStyle.normal.label.textStyle.font_family;
        //提示框显示
        d3.selectAll(classname)
            .on("mouseover",ti.show);
        //显示文字在饼图中间
        ssvg.append("g")
            .attr("class","textG"+n)
            .append("text")
            .text(function(){
                var textValue= dd.data.name;
                return textValue;
            })
            .attr("font-weight",_fontWeight)
            .attr("font-size",_fontSize)
            .attr("font-family",_fontFamily)
            .attr("transform",function(){
                var wid = parseInt(d3.select(this).style("width"));
                var hei = parseInt(d3.select(this).style("height"));
                if(arcInRad === 0){
                    return "translate("+(_width*cen1-(wid/2))+","+ (wid-80) +")";
                }

                return "translate("+(_width*cen1-(wid/2))+","+(_height*cen2+hei/4)+")";
            })
            .attr("fill",function(){ return lastcolor[n];} );
    }
    function mouseOutEvent(ssvg,className,classNames,ti){
        //提示框隐藏
        ssvg.selectAll(className)
            .on("mouseout",ti.hide);

        ssvg.selectAll(classNames).remove();

    }
    return _pie;
};'use strict';
var radarChart = function () {
    
    var _opt,          //雷达图用户数据
        _config,       //雷达图默认配置参数
        _svg;          //svg
        
    var _polars = [],  //雷达图配置参数
        _series = [],  //雷达图用户数据
        _legend = [];  //图例数据
   
    
    var legendSelected = function (name){
        _series.map(function(d,i){
            if(d.name === name){
                if(d.state){
                    d3.select("#radarLineG"+i).selectAll("g").remove();
                    d.state = 0;
                }
                else{
                    renderRadarShape(d3.select("#radarLineG"+i),d);
                    d.state = 1;
                }
            }
        });
    }
    
    
    //雷达图主方法
    function radar(svg) {
        //初始化
        var isSuccess = init();
        if (!isSuccess) { 
            return; 
        }
        _svg = svg;
        _svg.attr("height", _opt.canvas.height).attr("width", _opt.canvas.width);
        _svg.selectAll("g").remove();
        
        //绘画标题
        title().render(_svg,_opt);
        
        //绘画图例
        legend(_svg,_opt,_legend).render();
        _opt.EVENT.LEGEND_SELECTED = legendSelected;
      
        //创建雷达图GROUP
        var radarGs = _svg.selectAll("g.radar")
            .data(_polars)
            .enter()
            .append("g")
            .attr("class","g.radar")
            .attr("transform", function(d){
                return "translate("+d.center+")";
            });
        
        //画正多边形
        radarGs.append("g")
            .each(renderPolygon);
        //画坐标轴
        radarGs.append("g")
            .each(renderAxes);
        //画数据图形
        radarGs.append("g")
            .attr("id",function(d,i){
                return "radarShapeG" + i;
            });
            
        _series.map(function(d,i){
             //绘画数据图形
            var lineG = _svg.select("#radarShapeG" + d.polarIndex)
                .append("g")
                .attr("id","radarLineG" + i);
            renderRadarShape(lineG,d);
        });
        
    }
    
    
    //绘画雷达图多边形
    function renderPolygon(polar){
        
        if(!polar.splitLine.show){
            return;
        }
        //雷达图坐标轴顶点信息
        var vertex = polar.axis.slice(0);
        vertex.push(vertex[0]);
        
        //雷达图分隔数
        var splitNumber = polar.splitNumber;
        
        //循环画雷达图正多边形
        for(var i = splitNumber; i > 0; i--){
            var area = d3.svg.area()
                .x(function(d) { return d.x*i/splitNumber; })
                .y(function(d) { return d.y*i/splitNumber; });
            
            //如果隔行填充，设置填充区域
            if(polar.splitLine.isArea){
                area.x0(function(d){
                     return d.x*(i-1)/splitNumber
                })
                .y0(function(d){ 
                    return d.y*(i-1)/splitNumber
                })
            }
            d3.select(this).append("g")
                .append("path")
                .datum(vertex)
                .attr("d", area)
                .style("fill",function(){
                    if(i%2 === 0) return polar.splitLine.areaStyle.color[1];
                    else return polar.splitLine.areaStyle.color[0];
                })
                .style("stroke",function(){return polar.splitLine.lineStyle.color})
                .style("stroke-width",function(){return polar.splitLine.lineStyle.width});
        }

    }
    
    
    //绘画雷达图坐标轴
    function renderAxes(polar){
        //雷达图配置信息
        if(!polar.axisLine.show && !polar.axisName.show){
            return;
        }
        
        var axesG = d3.select(this).selectAll("g")
            .data(polar.axis)
            .enter()
            .append("g");
        
        
        //雷达图顶点信息
        var vertex = polar.axis.slice(0);
        vertex.push(vertex[0]);
         //画坐标线
        if(polar.axisLine.show){
            axesG.append("line")
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', function(d,i){return vertex[i].x})
                .attr('y2', function(d,i){return vertex[i].y})
                .style("stroke",polar.axisLine.lineStyle.color)
                .style("stroke-width",polar.axisLine.lineStyle.width)
        }

        //画坐标名称
        if(polar.axisName.show){
            axesG.append("text")
                .text(function(d,i){ return d.text;})
                .style("fill",polar.axisName.textStyle.color)
                .style("font-Family",_opt.textStyle.fontFamily2)
                .style("font-Size",_opt.textStyle.fontSize)
                .attr('y', function(d,i){  
                    //计算坐标轴名称Y坐标
                    var height = parseFloat(d3.select(this).style("height"));
                    if(vertex[i].angle > 180 && vertex[i].angle < 360) return vertex[i].y * 1.1 + height;
                    else return vertex[i].y * 1.1;
                })
                .attr('x', function(d,i){
                    //计算坐标轴名称X坐标
                    var width = parseFloat(d3.select(this).style("width"));
                    if(vertex[i].angle === 90 || vertex[i].angle === 270) return vertex[i].x - width/2;
                    else if(vertex[i].angle < 90 || vertex[i].angle > 270) return vertex[i].x * 1.1 - width;
                    else return vertex[i].x * 1.1;
                });
        }
    }
    
    //绘画雷达图图形
    function renderRadarShape(g,serie){
        //如果没有雷达图数据，直接返回
        if(!serie){
            return;
        }
        //绘画雷达图线
        var lineG = g.append("g");
        
        //动画前
        var line1 = d3.svg.line()
            .x(function(d,i) { return 0; })
            .y(function(d,i) { return 0; });
        //动画后
        var line2 = d3.svg.line()
            .x(function(d,i) { return d.x; })
            .y(function(d,i) { return d.y; });
        var radarLine = lineG.append("path")
            .datum(serie.data)
            .style("stroke",function(d,i){return serie.itemStyle.normal.color;})  //线条颜色
            .style("stroke-width",function(){return serie.itemStyle.normal.lineStyle.width}) //线条粗细
            .style("fill",function(d,i){   //path 填充
                if(!serie.isArea) return "none";  //无填充
                return serie.itemStyle.normal.color; //有填充
            })
            .style("fill-opacity",function(){return serie.itemStyle.normal.areaStyle.opacity}) //填充透明度
            .on("mouseover",function(d,i){ mouseover(this); })   //鼠标移上事件
            .on("mouseout",function(d,i){ mouseout(this); });    //鼠标移除事件
        
        //定义动画
        radarLine.attr("d", function(d){return line1(d) + "z";})
            .transition()
            .duration(1000)
            .attr("d", function(d){return line2(d) + "z";});
        
        if( "none"!==serie.symbol ){
             //画雷达图拐点
            var dotsG = g.append("g");
            var radarDots = dotsG.selectAll("dots")
                .data(serie.data)
                .enter()
                .append("circle")
                .attr("r",serie.itemStyle.normal.symbolStyle.symbolSize) //拐点大小
                .attr("stroke",function(d,i){return serie.itemStyle.normal.color}) //拐点线条颜色
                .attr("stroke-width",function(){return serie.itemStyle.normal.symbolStyle.width}) //拐点线条粗细
                .attr("fill","rgb(255,255,255)");  //拐点填充
            //雷达图拐点动画
            radarDots.attr("cx",function(d,i){ return 0;}) //拐点圆心X坐标
                .attr("cy",function(d,i){ return 0;}) //拐点圆心Y坐标
                .transition()
                .duration(1000)
                .attr("cx",function(d,i){ return d.x;}) //拐点圆心X坐标
                .attr("cy",function(d,i){ return d.y;}); //拐点圆心Y坐标
        }
        
        //鼠标移上事件
        function mouseover(obj){
             d3.select(obj)
                .style("stroke",function(){return serie.itemStyle.emphasis.color;})//线条强调颜色
                .style("stroke-width",function(){return serie.itemStyle.emphasis.lineStyle.width}) //线条强调粗细 
                .style("fill",function(){
                    if(!serie.isArea) return "none";
                    return serie.itemStyle.emphasis.color;  //强调填充颜色
                })
               .style("fill-opacity",function(){return serie.itemStyle.emphasis.areaStyle.opacity}); //强调透明度
        }
        
        //鼠标移除事件
        function mouseout(obj){
             d3.select(obj)
                .style("stroke",function(){return serie.itemStyle.normal.color;}) //线条颜色
                .style("stroke-width",function(){return serie.itemStyle.normal.lineStyle.width}) //线条粗细
                .style("fill",function(){
                    if(!serie.isArea) return "none"; //无填充
                    return serie.itemStyle.normal.color; //填充色
                })
               .style("fill-opacity",function(){return serie.itemStyle.normal.areaStyle.opacity}); //透明度
        }
        
    }
    

     //获取或设置_opt
    radar.option = function(x) {
        if (!arguments.length) return option;
        _opt = x;
        return radar;
    };
    
    //获取或设置_config
    radar.config = function(x){
        if (!arguments.length) return config;
        _config = x;
        return radar;
    };
    
 

    //数据初始化处理方法
    function init(){
        if("undefined" === typeof(_opt) || "undefined" === typeof(_config)){
            return false;
        }
        var util = utils(); //工具类对象
        
        //初始化雷达图基础配置
        _opt.polar.map(function(d){
            _polars.push(util.merge(d,_config.polar,false));
        });
        delete(_opt.polar);
        //格式化polar配置
        _polars.map(function(d0,i){
            formatPolar(d0,i);
        });
        
        //初始化雷达图数据
        _series = _opt.series;
        delete(_opt.series);
        util.merge(_opt,_config,false);
        //雷达图数据信息
        _series.map(function(d0,i){
            formatSerie(d0,i);
            //图例数据
            var legend = {
                name:d0.name,
                type:_opt.CHART_TYPE_BAR,
                color:d0.itemStyle.normal.color
            }
            _legend.push(legend);
        });
        
        return true;
    }
    
    
    //格式化处理polar数据
    function formatPolar(polar,polarIndex){
        //初始化雷达图中心点X值
        if("number" !== typeof(polar.center[0])){
            polar.center[0] = _opt.canvas.width * parseFloat(polar.center[0])/100;
        }
        //初始化雷达图中心点Y值
        if("number" !== typeof(polar.center[1])){
            polar.center[1] = _opt.canvas.height * parseFloat(polar.center[1])/100;
        }
         //初始化雷达图半径
        if("number" !== typeof(polar.radius)){
            if(_opt.canvas.width < _config.canvas.height){
                polar.radius = _opt.canvas.width * parseFloat(polar.radius)/100;
            }
            else{
                polar.radius = _opt.canvas.height * parseFloat(polar.radius)/100;
            }
        }
         //初始化雷达图坐标轴
        polar.axis.map(function(d1,j){
            d1.x = getX(polarIndex,j);
            d1.y = getY(polarIndex,j);
            d1.angle = getAngle(polarIndex,j);
        });
    }
    
    
    //格式化处理Serie数据
    function formatSerie(serie,serieIndex){
        var util = utils(); //工具类对象
        util.merge(serie,_opt.radar,false);
            
        //如果polarIndex没有设置,默认为0
        if(null === serie.polarIndex){
            serie.polarIndex = 0;
        }

        //初始化雷达图颜色
        if(null === serie.itemStyle.normal.color){
            serie.itemStyle.normal.color = _config.color[serieIndex];
        }
        //初始化雷达图强调颜色
        if(null === serie.itemStyle.emphasis.color){
            serie.itemStyle.emphasis.color = d3.rgb(serie.itemStyle.normal.color).brighter(0.2);
        }
        
        serie.state = 1;//初始化serie状态，1:显示，0:不显示
        
        //格式校验
        serie.data.length = _polars[serie.polarIndex].axis.length;
        for(var j = 0; j < serie.data.length; j++){
            if("number" != typeof(serie.data[j])){
                serie.data[j] = "-";
            }
        }

        serie.data = formatData(serie.data,serie.polarIndex);
        
        //雷达图数据格式化
        function formatData(data,polarIndex){
            var newData = [];
            for(var i = 0; i < data.length; i++){
                if('-' === data[i]){ continue;}
                var info = {};
                info.value = data[i];
                info.x = getX(polarIndex,i,data[i],_polars[polarIndex].axis[i].max);
                info.y = getY(polarIndex,i,data[i],_polars[polarIndex].axis[i].max);
                newData.push(info);
            }
            return newData;
        }
    }
    
    
    //获取雷达图坐标轴上点的位置
    function getPosition(polarIndex,axisIndex,value,max,func){
        if ("undefined" === typeof(polarIndex)) { 
           polarIndex = 0;
        }
        if ("undefined" === typeof(axisIndex)) { 
           axisIndex = 0;
        }
        if ("undefined" === typeof(value)) { 
           value = 1;
        }
        if ("undefined" === typeof(max)) { 
           max = 1;
        }
        var arc = getAngle(polarIndex,axisIndex)/360 * 2 * Math.PI;
        return 0 - _polars[polarIndex].radius * value / max * func(arc);
    }

    //获取雷达图坐标轴上的点的X像素值
    function getX(polarIndex,axisIndex,value,max){
        return getPosition(polarIndex,axisIndex,value,max,Math.cos);
    }
    //获取雷达图坐标轴上点的Y像素值
    function getY(polarIndex,axisIndex,value,max){
        return getPosition(polarIndex,axisIndex,value,max,Math.sin);
    }

    function getAngle(polarIndex,axisIndex){
        var angle = axisIndex/_polars[polarIndex].axis.length * 360 + _polars[polarIndex].startAngle;
        //将角度变换至 0-360 范围内
        if(angle/360 > 1){
            angle = angle - Math.floor(angle/360)*360;
        }
        else if(angle/360 < -1){
            angle = angle + Math.floor(angle/360)*360;

        }
        return angle;
    }
    
    return radar;
};;"use strict";

/**
 * 散点图的实现
 * @param opt
 * @param data 数据格式[{name:"女性",,color:"blue",type:"",data:[]},name"男性",color:"blue",type:"",data:[]]
 * @returns {{}}
 */
function bubble(opt, svg) {
    var _config = config();
    var _width = opt.canvas.width;
    var _height = opt.canvas.height;
    var _svg = svg;

    var padding = 40;
    var _bubble = {};
    var xScale, yScale, rScale;
    var _x, _y, _r;
    var _data = opt.series;
    var _utils = utils();
    var path = "M458,302.5c0-56.6-45.9-102.5-102.5-102.5S253,245.9,253,302.5  c0,21.7,6.7,41.7,18.2,58.3h0L355.5,499l84.3-138.2C451.3,344.2,458,324.2,458,302.5z";
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, i) {
            var info = _data[0].data;
            return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'><p>" + _data[0].name + "</p><p>" + info[i][0] + "cm &nbsp;&nbsp;" + info[i][1] + "kg" + "</p></span>";
        })

    var _point = point();//小水滴效果

    var _legendData = [];//组装图例数组
    _bubble.render = function () {

        mergeData(_config,opt);
        var newData = [];
        for (var i = 0; i < _data.length; i++) {


            var info = _data[i].data;
            if (info !== undefined) {
                for (var j = 0; j < info.length; j++) {
                    newData.push(info[j]);
                }    //_utils.merge(info, _config.scatter, false);


                //_legendArray.push({
                //    name: _data[i].name,
                //    color: _data[i].color,
                //    type: _data[i].type,
                //    symbol: "",
                //    symbolStyle: ""
                //})
            }else
            {
               // _legendArray.push(null);
            }



        }
        if (!_svg) {
            _svg = d3.select("body").append("svg") //创建画板（svg），并设置宽高
                .attr("height", _height)
                .attr("width", _width);
        }
        _svg.call(tip);
        renderAxes(_svg, newData);
        //画圆
        draw(_svg, _data);
        var leg = legend(_svg, _config, _legendData);
        leg.render();
    };

    function draw(svg, data) {


        data.forEach(function (d, i) {


            console.log(d.color);
            //画泡泡图
            drawPoint(svg, d, i);
            drawMaxPoint(svg, d);

        });
    }


    /***
     *
     * @param svg
     * @param data
     */
    function drawPoint(svg, data, ii) {
        var info = data.data;
        var _c = data.color;

        if (info != null && info.length != 0) {
            svg.selectAll(".circle" + ii)
                .data(info)
                .enter()
                .append('circle')
                .attr("class", "circle" + ii)
                .attr("stroke", function (d, i) {
                    return _c;
                })
                .attr("fill", function (d, i) {
                    return _c;
                })
                .attr("cx", function (d) {
                    return xScale(d[0]);

                })
                .attr("cy", function (d) {
                    return yScale(d[1]);
                })
                .attr("r", function (d) {

                    return rScale(d[1]);
                })
                .attr("opacity", .5)
                .on("mouseover", function (d, i) {
                    //tip.show;
                    d3.select(this)
                        .attr("opacity", .8)
                        .attr("style", "cursor: hand");
                    svg.selectAll(".circle" + ii)
                        .on("mouseover", tip.show)

                }).on("mouseout", function (d, i) {
                    d3.select(this).attr("opacity", .5)
                    svg.selectAll(".circle" + ii)
                        .on("mouseout", tip.hide)
                })
            ;
        }

    }

    /***
     *
     * @param svg
     * @param data
     */

    function drawMaxPoint(svg, data) {

        if(data.data!==undefined)
        {
            var maxX = d3.max(data.data, function (d) {
                return d[0]
            });
            var maxY = d3.max(data.data, function (d) {
                return d[1];
            })
            var minX = d3.min(data.data, function (d) {
                return d[0];
            });

            var minY = d3.min(data.data, function (d) {
                return d[1];
            })
            _point.render(xScale(minX), yScale(minY), data.color, minX + "kg");
        }

        //_point.render(xScale(maxX),yScale(maxY),data.color);





    }

    //
    function renderAxes(svg, data) {

        //创建坐标轴，这里需要调用陈浩的坐标轴的方法
        //console.log(svg);
        //console.log(opt);
        //var _axis = axis(opt,svg);
        //console.log(_axis);
        //axis.render();
        xScale = d3.scale.linear()
            .domain([140, d3.max(data, function (d) {
                return d[0] + 10;
            })])
            .range([padding, _width]);
        yScale = d3.scale.linear()
            .domain([20, d3.max(data, function (d) {
                return d[1] + 5;
            })])
            .range([_height - padding, padding]);

        rScale = d3.scale.linear()
            .domain([0, d3.max(data, function (d) {
                return d[1];
            })])
            .range([2, 6]);

        //声明x坐标轴
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom").ticks(xScale.ticks().length)


        //创建x轴
        svg.append("g")
            .attr("class", "axis")
            .attr("stroke", "black")
            .attr("transform", "translate(120," + (_height - padding) + ")")
            .call(xAxis)
            .selectAll("text").text(function (d, i) {
                return d + "cm";
            });
        //声明y轴
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left").ticks(yScale.ticks().length);
        //创建y轴
        svg.append("g").attr("class", "axis")
            .attr("transform", "translate(160,0)")
            .attr("stroke", "black")
            .call(yAxis)
            .selectAll("text").text(function (d, i) {
                return d + "G";
            })
    }
    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param conf
     */
    function mergeData(conf,option){
        //保存xy轴数据
        var x = option.xAxis;
        var y = option.yAxis;
        //删除option中的xy轴和series数据
        delete option.xAxis;
        delete option.yAxis;
        delete option.series;
        //合并option数据
        _config = _utils.merge(conf,option,true);
        var index = 0;
        //合并series数据
        _data.forEach(function(d){
            d = _utils.merge(d,_config.bar,false);
            //判断用户属否设置颜色，如果未设置取柱体颜色
            if(d.itemStyle.normal.color===null){
                d.itemStyle.normal.color = conf.color[index];
            }
            if(d.itemStyle.emphasis.color===null){
                d.itemStyle.emphasis.color = conf.emphasisColor[index];
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.color;
            //图形标识
            legend.type = _config.CHART_TYPE_SCATTER;
            _legendData.push(legend);
            index++;
        });
        //复制一份完整数据保存
       // _cloneBars = _utils.cloneObject(_series);
    }
    return _bubble;
}
;"use strict";

function scatter(option, svg, config) {
    var _scatter = {};
    var _svg = svg;

    var _series = option.series;
    var _filterData;
    var _axis;//坐标轴
    var _config = config;
    var _option = option;
    var _axisData = {};//绘制坐标轴参数
    var _legendData = []; //绘制图例所需要的数组
    var _utils = utils();

    var _xAxis, _yAxis; //x、y坐标轴
    var _xScale, //x轴比例尺
        _yScale, //y轴比例尺
        _rScale; //r半径比例尺
    var _tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, i) {
            var sex, height, weight,maxmin;

            sex = d3.select(this).attr("sex");

            maxmin=d3.select(this).attr("maxmin");
            height = d[0];
            weight = d[1];
            if(maxmin==="normal")
            {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex +":" +"</p><p>" + height + "cm &nbsp;&nbsp;" + weight + "kg" + "</p></span>";
            }
            else if(maxmin==="max")
            {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex+ ":" + "</p><p>"+"最大值：" + weight + "kg" + "</p></span>";
            }else if(maxmin==="min")
            {
                return "<span style='color:#ffffff;font-size: xx-small;font-family: 'Microsoft YaHei', SimHei;'>" +
                    "<p>" + sex +":"+ "</p><p>"+"最小值：" + weight + "kg" + "</p></span>";
            }

        });
    _svg.call(_tip);


    //呈现图形
    _scatter.render = function () {

        //画标题
        var _title = title();
        _title.render(_svg,_config);

        //_svg.call(_tip);

        // 进行数据校验
        //合并config

        mergeData(_config, _option);
        //初始化画坐标轴
        initAxis();

        _filterData = checkout(_series);
        draw(_svg, _filterData);

        var leg = legend(_svg, _config, _legendData);
        leg.render();


        _config.EVENT.LEGEND_HOVERLINK=_mouseOverLink;
        _config.EVENT.LEGEND_OUTLINK=_mouseOutLink;
        _config.EVENT.LEGEND_SELECTED=_legendClickLink;
    }

    /***
     * svg画一系列图形
     * @param svg
     * @param data
     */
    function draw(svg, data) {
        var g = svg.selectAll(".groupG").data(data).enter().append("g").attr("class",function(d,i){
            return "groupG"+i;
        });
        g.each(function (d, i) {

            if(d.data!==undefined && d.data!==null && d.data.length>0)
            {
                drawPoint(d3.select(this), d, i);

                drawMaxPoint(svg, d,i);
            }
        });
    }

    /***
     *
     * @param svg
     * @param data
     */
    function drawPoint(svg, data, index) {

        var info = data.data;
        var _c = data.color;
        if (info != null && info.length != 0) {

            svg.selectAll(".circle" + index)
                .data(info)
                .enter()
                .append('circle')
                .attr("class", "circle" + index)
                .attr("sex", data.name)
                .attr("maxmin","normal")
                .attr("stroke", function (d, i) {
                    return _c;
                })
                .attr("fill", function (d, i) {
                    return _c;
                })
                .attr("cx", function (d) {
                    var x=_xScale(d[0])+parseInt(_config.canvas.margins.left);
                    var cx = x;
                    return cx;

                })
                .attr("cy", function (d) {

                    var y=_yScale(d[1])+parseInt(_config.canvas.margins.top);
                    var cy = y;
                    return cy;
                })
                .attr("r", function (d) {

                    return _rScale(d[1]);
                })
                .on("mouseover", function (d, i) {

                    var dcolor=d3.rgb(data.color).brighter(0.9)
                    d3.select(this)
                        .attr("fill", dcolor)
                        .attr("style", "cursor: hand");
                   //d3.select(this)
                   //     .on("mouseover",  _tip.show);

                    _tip.show.call(this,d);


                }).on("mouseout", function (d, i) {
                    d3.select(this).attr("fill", data.color);

                    d3.select(this)
                        .on("mouseout", function(){
                            _tip.hide.call(this,d)
                        })
                })
            ;
        }

    };

    /**
     * 画最大值及最小值的特效图
     * @param svg
     * @param data
     */
    function drawMaxPoint(svg, data,index) {

        var dataArray=data.data;
        if(dataArray!==null)
        {
            var maxWeightHeight; //体重对应的身高
            var minWeightHeight;
            var maxWeight = d3.max(dataArray, function (d) {
                return d[1]
            });
            var minWeight = d3.min(dataArray, function (d) {
                return d[1];
            });
            //根据体重的最大值或者最小值 找到对应的身高

            for(var i=0;i<dataArray.length;i++)
            {
                var da=dataArray[i];
                if(maxWeight===da[1])
                {
                    maxWeightHeight=da[0];
                    break;
                }
            }

            for(var i=0;i<dataArray.length;i++)
            {
                var da=dataArray[i];
                if(minWeight===da[1])
                {
                    minWeightHeight=da[0];
                    break;
                }
            }
            //console.log("maxWeight==="+maxWeight +"maxWeightHeight=="+maxWeightHeight +" minWeight==="+minWeight +"minWeightHeight== "+minWeightHeight )
            var maxWidth=_xScale(maxWeightHeight)+parseInt(_config.canvas.margins.left);
            var maxHeight=_yScale(maxWeight)+parseInt(_config.canvas.margins.top);
            var minWidth=_xScale(minWeightHeight)+parseInt(_config.canvas.margins.left);
            var minHeight=_yScale(minWeight)+parseInt(_config.canvas.margins.top);
            var maxR=_rScale(maxWeightHeight);
            var minR=_rScale(minWeightHeight);
            var maxTooltip = tooltip(svg, maxWeight, maxWidth, (maxHeight-maxR));
            maxTooltip.tooltipG.attr("class","groupG"+index);
            maxTooltip.text.attr("fill", "#ffffff");
            maxTooltip.sweat.attr("fill",  data.color);
            maxTooltip.sweat.on("mouseover",function(){
                d3.select(this)
                    .attr("maxmin","max")
                    .attr("sex",data.name)
                    .attr("style", "cursor: hand");
                _tip.show.call(this,[maxWeightHeight,maxWeight]);
            });

            maxTooltip.sweat.on("mouseout",function(){
                _tip.hide.call(this,[maxWeightHeight,maxWeight])
            });
           // maxTooltip.sweat.attr("opacity", "0.5");

            //maxTooltip.on("mouseover",function(){
            //    d3.select(this)
            //        .attr("style", "cursor: hand");
            //});

            maxTooltip.sweatTooltip();
            var minTooltip = tooltip(svg, minWeight, minWidth, (minHeight-minR));
            minTooltip.tooltipG.attr("class","groupG"+index);
            minTooltip.text.attr("fill", "#ffffff");
            minTooltip.sweat.attr("fill",  data.color);
            minTooltip.sweat.on("mouseover",function(){
                d3.select(this)
                    .attr("maxmin","min")
                    .attr("sex",data.name)
                    .attr("style", "cursor: hand");
                _tip.show.call(this,[minWeightHeight,minWeight]);
            });
            minTooltip.sweat.on("mouseout",function(){
                _tip.hide.call(this,[maxWeightHeight,maxWeight])
            });
           // minTooltip.sweat.attr("opacity", "0.5");
            minTooltip.sweatTooltip();

        }
    }

    /**
     * 鼠标点击图例联动事件
     */
    var _legendClickLink=function(name)
    {
        var index=null;
        for(var i=0;i<_filterData.length;i++)
        {
            var obj=_filterData[i];
            if(obj!==null && obj.name!==undefined)
            {
                if(obj.name===name)
                {
                    index=i;
                    break;
                }
            }
        }
        if(index!==null)
        {
            var g=d3.selectAll(".groupG"+index);
            g.each(function(d,i){

                var visible= g.attr("visibility");
                if(visible===null || visible==="visible")
                {
                    g.attr("visibility", "hidden");
                }else
                {
                    g.attr("visibility", "visible");
                }
            })

        }

    }
    /***
     * 鼠标移动上图例
     * @param name
     */
    var _mouseOverLink=function(name)
    {

    }

    /**
     * 鼠标移出图例关联事件
     * @param name
     * @private
     */
    var _mouseOutLink=function(name){

    }
    //数据校验
    function checkout(series) {
        var newData = [];
        if (series !== null && series.length > 0) {
            for (var i = 0; i < series.length; i++) {
                var obj = series[i];

                var dataArray = [];

                if (obj !== undefined && obj !== null) {
                    var nodeData = obj.data; //散点图点的数组集合
                    for (var j = 0; j < nodeData.length; j++) {
                        var node = nodeData[j]; //每一个具体的点
                        var nodeArray = [];
                        if (node !== null && node.length === 1)//不合法值
                        {
                            continue;
                        }

                        if (node !== null && node.length === 2)  //[a ,b,c] c缺省时使用默认
                        {

                            var a = node[0];
                            var b = node[1];
                            if (a === undefined || a === null || a === "") {
                                nodeArray.push("-");
                            } else {
                                if (typeof (a) === "number") {
                                    nodeArray.push(a);
                                } else {
                                    nodeArray.push("-");
                                }
                            }
                            if (b === undefined || b === null || b === "") {
                                nodeArray.push("-")
                            } else {
                                if (typeof (b) === "number") {
                                    nodeArray.push(b);
                                } else {
                                    nodeArray.push("-")
                                }
                            }


                        }

                        if (node !== null && node.length === 3) //[a ,b,c] c缺省时使用默认
                        {

                            var a = node[0];
                            var b = node[1];
                            var c = node[2];
                            if (a === undefined || a === null || a === "") {
                                nodeArray.push("-");
                            } else {
                                if (typeof (a) === "number") {
                                    nodeArray.push(a);
                                } else {
                                    nodeArray.push("-");
                                }
                            }
                            if (b === undefined || b === null || b === "") {
                                nodeArray.push("-")
                            } else {
                                if (typeof (b) === "number") {
                                    nodeArray.push(b);
                                } else {
                                    nodeArray.push("-")
                                }
                            }
                            if (c === undefined || c === null || c === "") {
                                nodeArray.push("-")
                            } else {
                                if (typeof (c) === "number") {
                                    nodeArray.push(c)
                                } else {
                                    nodeArray.push("-");
                                }
                            }
                        }


                        dataArray.push(nodeArray);
                    }


                }
                obj.data = dataArray;
                newData.push(obj);
            }
        }
        return newData;
    }

    /**
     * 初始化坐标轴
     * @private
     */
    function initAxis() {
        _axisData.xAxis = _xAxis;
        _axisData.yAxis = _yAxis;
        _axis = axis(_axisData, _svg, _config);//创建轴
        _axis.render();//呈现坐标轴

        _xScale = _axis.xAxis[0].getScale;
        _yScale = _axis.yAxis[0].getScale;


        //rScale = d3.scale.linear()
        //    .domain([0, d3.max(data, function (d) {
        //        return d[1];
        //    })])
        //    .range([2, 6]);
        _rScale = d3.scale.linear()
            .domain([0, 200])
            .range([3, 8]);
    }

    /**
     * 合并用户设定配置和默认配置
     * @param option
     * @param config
     */
    function mergeData(config, option) {
        //保存xy轴数据
        var x = option.xAxis;
        var y = option.yAxis;
        _xAxis = option.xAxis;
        _yAxis = option.yAxis;
        //删除option中的xy轴和series数据
        delete option.xAxis;
        delete option.yAxis;
        delete option.series;
        //合并option数据
        _config = _utils.merge(config, option, true);
        var index = 0;
        //合并series数据
        _series.forEach(function (d) {
            d = _utils.merge(d, _config.scatter, false);
            //判断用户属否设置颜色，如果未设置取柱体颜色
            if (d.itemStyle.normal.color === null) {
                d.itemStyle.normal.color = _config.color[index];
            }
            if (d.itemStyle.emphasis.color === null) {
                d.itemStyle.emphasis.color = _config.emphasisColor[index];
            }
            var legend = {};//图例样式
            //数据名称
            legend.name = d.name;
            //颜色
            legend.color = d.color;
            //图形标识
            legend.type = _config.CHART_TYPE_SCATTER;
            _legendData.push(legend);
            index++;
        });
    }

    return _scatter;

}
;"use strict";
/**
 * 图形初始化方法
 * @returns {{}}
 * @author chen_hao
 * @time 2014-12-17
 * @param parentId 父元素的id名称。如：svg创建在一个div中。<div id="foo"></div>,parentId就需要设置为"foo"
 * @param option  传入的自定义参数
 *
 * @example
 * //画饼图
 * var opt = {
 *      canvas:{
 *          width:700,
 *          height:500
 *      },
 *      series:[{
            data:[{data:5,weight:0.5,name:"联盟广告"},
                {data:10,weight:0.5,name:"直接访问"},
                {data:20,weight:1,name:"邮件营销"},
                {data:30,weight:2,name:"视频广告"},
                {data:40,weight:1,name:"搜索引擎"}]
 * };
 * var chart = htCharts("foo");
 * chart.setOption(opt);
 * chart.render();
 */
function htCharts(parentId,option) {
    var _chart = {};

    var _config ;
    var _utils = utils();

    var _option ;
    var _optionOld ;
    var _chartType ;
    var _theme;
    var _isSettedTheme = false;

    var _svg;
    var _bar,_line,_scatter,_pie,_radar;



    /**
     * 设置主题样式，将主题的样式合并的公共配置对象中
     * @param themeName  客户自定义主题
     */
    _chart.setTheme = function(themeName) {
        switch (themeName) {
            case "blue" :
                _theme = blue();
                break;
            case "gray" :
                _theme = gray();
                break;
            case "green":
                _theme = green();
                break;
            case "red"  :
                _theme = red();
                break;
            case "dark" :
                _theme = dark();
                break;
            case "shine":
                _theme = shine();
                break;
            case "split":
                _theme = split();
                break;
            default     :
                _theme = {};  //设置默认主题
                break;
        }
        _isSettedTheme = true;
    };

    /**
     * 设置图表的配置，用于更新配置及数据
     * @param option  配置参数对象
     */
    _chart.setOption = function(option){
        _chartType = option.series[0].type;
        _option = option;
        _optionOld = _utils.cloneObject(option);
    };

    /**
     * 图表绘制
     */
    _chart.render = function () {
        _config = config();

        //如果svg存在，认为是重绘，删除svg后再创建一个新的
        if(_svg){
            _svg.remove();
            createSvg(parentId);
        }else{
            createSvg(parentId);
        }

        //更改样式，及将原用户的配置还原为初始值（因为在图形render的过程中会对_option进行更改,所以需要还原）
        _utils.merge(_config, _theme,true);
        _utils.merge(_option, _optionOld,true);

        //更新svg大小及背景
        updateSvg(_svg);
        //调整边距
        setMargins();

        switch (_chartType) {
            case _config.CHART_TYPE_BAR  :  //画柱状图
                _bar = bar(_svg,_option,_config);
                _bar.render();
                break;
            case _config.CHART_TYPE_LINE : //画折线图
                break;
            case _config.CHART_TYPE_PIE  :
                _pie = pieT(_option,_svg,_config);
                _pie.render();//画饼图
                break;
            case _config.CHART_TYPE_RADAR: //画雷达图
                _radar = radarChart().option(_option).config(_config);
                _svg.call(_radar);
                break;
            case _config.CHART_TYPE_SCATTER: //画散点图
                //bubble(_option,_svg).render();
                _scatter = scatter(_option,_svg,_config);
                _scatter.render();
                break;
            case _config.CHART_TYPE_MAP: //画地图
                break;
            case _config.CHART_TYPE_FORCE: //画力学图
                break;
            case _config.CHART_TYPE_CHORD: //画弦图
            default     : //默认图形
                break;
        }
    };

    /**
     * 动态加载数据，刷新图表
     * @param data  传入的动态数据
     */
    _chart.loadData = function (data) {
        switch (_chartType) {
            case _config.CHART_TYPE_BAR  :  //画柱状图
                _bar.loadData(data);
                break;
            case _config.CHART_TYPE_LINE : //画折线图
                break;
            case _config.CHART_TYPE_PIE  :

            case _config.CHART_TYPE_RADAR: //画雷达图

                break;
            case _config.CHART_TYPE_SCATTER: //画散点图

                break;
            case _config.CHART_TYPE_MAP: //画地图
                break;
            case _config.CHART_TYPE_FORCE: //画力学图
                break;
            case _config.CHART_TYPE_CHORD: //画弦图
            default     : //默认图形
                break;
        }
    };

    /**
     * 创建svg对象
     * @param parentId  svg的父对象的id，即svg创建哪里。如：<div id="foo"></div>
     */
    function createSvg(parentId){
        if(d3.select("#"+parentId).node()){
            _svg = d3.select("#"+parentId).append("svg");
        }else{
            _svg = d3.select("body").append("svg");
        }
    }

    /**
     * 更新svg的尺寸及背景
     * @param svg  被修改的svg
     */
    function updateSvg(svg){
        _utils.merge(_config.canvas,_option.canvas,true);
        svg.attr("height", _config.canvas.height)
            .attr("width", _config.canvas.width)
            .style("background-color",function(){
                return _config.backgroundColor?_config.backgroundColor:"#FFFFFF";
            });
    }

    /**
     * 根据标题及图例的放置位置进行调整margins的数值
     * 因为需要调整的情况烦多，所以目前只支持根据y的情况调整
     * 只是y为top,bottom的，只调整上下边距
     * 当y为center时，只调整左右边距
     */
    function setMargins(){
        _utils.merge(_config.title,_option.title,true);
        _utils.merge(_config.legend,_option.legend,true);


        if((_config.legend.y==="center" && _config.legend.show===true && _config.legend.x==="left")){
            _config.canvas.margins.left = _config.canvas.margins.left + 80;
        }
        if((_config.legend.y==="center" && _config.legend.show===true && _config.legend.x==="right")){
            _config.canvas.margins.right = _config.canvas.margins.right + 80;
        }

        if((_config.title.y==="top" && _config.title.text!=="" && _config.timeline.subtext!=="") ||
            (_config.legend.y==="top" && _config.legend.show===true)){
            _config.canvas.margins.top = _config.canvas.margins.top + 50;
        }
        if((_config.title.y==="bottom" && _config.title.text!=="" && _config.timeline.subtext!=="") ||
            (_config.legend.y==="bottom" && _config.legend.show===true)){
            _config.canvas.margins.bottom = _config.canvas.margins.bottom + 50;
        }
    }

    //初始化参数
    _chart.setOption(option);

    return _chart;
};
"use strict";
function gauge(svg,opt,config) {
    
    var _gauge = {},         //图标对象
        _svg = svg,          //svg
        _opt = opt,          //仪表盘用户配置
        _config = config;    //仪表盘默认配置参数
        
        
    var _series = [],       //仪表盘用户数据
        _axis = [];     //仪表盘坐标轴线数据
    
    _gauge.render = function(){
        //初始化
        var isSuccess = _init();
        
        if (!isSuccess) { 
            return; 
        }
        
        var gaugeGs = _svg.selectAll("g")
            .data(_series)
            .enter()
            .append("g")
            .attr("id",function(d,i){ return "gauge" + i;})
            .attr("transform", function(d){
                return "translate("+d.center+")";
            });
        
        
        gaugeGs.each(renderAxis);
        
        
        gaugeGs.append("g")
            .attr("id",function(d,i){ return "pointer" + i;})
            .each(renderPointer);
    
    };
    
    
    //==========================绘画仪表盘坐标轴==============================
    function renderAxis(serie){
        
        var gaugeG = d3.select(this);
        
        var scale = d3.scale.linear()
            .domain(serie.axisArc.domain)
            .range(serie.axisArc.range);
        
        var arcAxis = component.arcAxis()
            .scale(scale)
            .radius(serie.radius)
            .arcWidth(serie.axisArc.width)
            .ticks(serie.axisTick.tickNumber)
            .tickSize(serie.axisTick.length)
            .subTicks(serie.subTick.tickNumber)
            .subTickSize(serie.subTick.length);
        
        gaugeG.call(arcAxis);
        
        //设置坐标轴线颜色
        if(serie.axisArc.show){
            gaugeG.selectAll("#arcsG .arc")
                .attr("fill",function(d,i){ return serie.axisArc.color[i]});
        }
        else{
            gaugeG.selectAll("#arcsG .arc")
                .attr("fill","rgba(0,0,0,0)");
        }
        //设置坐标轴大刻度线颜色
        if(serie.axisTick.show){
            gaugeG.selectAll("#ticksG .line")
                .style("stroke",function(d,i){ return serie.axisTick.color[i];});
        }
        else{
            gaugeG.selectAll("#ticksG .line")
                .style("stroke","rgba(0,0,0,0)");   
        }
        //设置坐标轴小刻度线颜色
        if(serie.subTick.show){
            gaugeG.selectAll("#subTicksG .line")
                .style("stroke",function(d,i){ return serie.subTick.color[i]});
        }
        else{
            gaugeG.selectAll("#subTicksG .line")
                .style("stroke","rgba(0,0,0,0)");
        }
        //设置坐标轴文本标签颜色以及字体
        if(serie.axisLabel.show){
             gaugeG.selectAll("#lableG .text")
                .attr("fill",function(d,i){ return serie.axisLabel.color[i];})
                .style("font-Family",_opt.textStyle.fontFamily2)
                .style("font-Size",_opt.textStyle.fontSize);
        }
        else{
             gaugeG.selectAll("#lableG .text")
                .attr("fill","rgba(0,0,0,0)");
        
        }
    };
    
    //绘画指针
    function renderPointer(serie){
        
        var pointerG = d3.select(this);
        //多边形指针
        pointerG.append("polygon")
            .attr("points",serie.pointer.point);
        //指针固定圆
        pointerG.append("circle")
            .attr("r",2)
            .style("fill","rgb(255,255,255)");
        //初始化动画
        pointerG.style("fill",serie.pointer.color)
            .attr("transform","rotate("+serie.startAngle+")")
            .transition()
            .duration(1000)
            .attr("transform","rotate("+serie.pointer.rotate+")");
    }
    
    
    //==================loadData接口==============================
    _gauge.loadData = function(series){
        
        if(!series instanceof Array){
            return;
        }
        
        series.map(function(d,i){
            if(i >= series.length){
               return;
            }
            var serie = _series[i];
            if("number" === typeof d.data && d.data < serie.max && d.data > serie.min){
                //更新数据
                serie.data = d.data;
                //重新计算角度
                _init.pointer(serie);
                
                d3.select("#pointer" + i)
                    .transition()
                    .duration(1000)
                    .style("fill",serie.pointer.color)
                    .attr("transform","rotate("+serie.pointer.rotate+")");
                
            }
        });
    };

    //====================数据初始化============================
    
    var _init = function(){
        if("undefined" === typeof _opt || "undefined" === typeof _config){
            return false;
        }
        var util = utils(); //工具类对象
        
        //初始化仪表盘数据
        _opt.series.map(function(d){
            _series.push(util.merge(d,_config.gauge,false));
        });
        
        util.merge(_opt,_config,false);
        
        _series.map(function(serie,i){
            //初始化仪表盘圆心、仪表盘半径
            _init.general(serie);
            //初始化仪表盘坐标轴信息
            _init.axis(serie);
            //初始化仪表盘指针
            _init.pointer(serie);
            
        });
        return true;
    };
    
    
    _init.general = function(serie){
        //初始化仪表盘中心点X值
        if("number" !== typeof serie.center[0]){
            serie.center[0] = _opt.canvas.width * parseFloat(serie.center[0])/100;
        }

        //初始化仪表盘中心点Y值
        if("number" !== typeof serie.center[1]){
            serie.center[1] = _opt.canvas.height * parseFloat(serie.center[1])/100;
        }

        //初始化仪表盘半径
        if("number" !== typeof serie.radius){
            if(_opt.canvas.width < _config.canvas.height){
                serie.radius = _opt.canvas.width * parseFloat(serie.radius)/100;
            }
            else{
                serie.radius = _opt.canvas.height * parseFloat(serie.radius)/100;
            }
        }
        
        //初始化仪表盘标题X值
        if("number" !== typeof serie.title.offsetCenter[0]){
            serie.title.x = serie.radius * parseFloat(serie.title.offsetCenter[0])/100;
        }
        //初始化仪表盘标题Y值
        if("number" !== typeof serie.title.offsetCenter[1]){
            serie.title.y = serie.radius * parseFloat(serie.title.offsetCenter[1])/100;
        }
    };

    _init.axis = function(serie){
        
        //初始化仪表盘坐标轴线数据
        var preAngle = serie.startAngle,
            preValue = serie.min;
            
        var arcsColor = [],
            domain = [preValue],            //弧形坐标轴比例尺  定义域
            range = [preAngle];             //弧形坐标轴比例尺  值域
        
        serie.color.map(function(d,i){
            //为了解决不精确小数问题，当遍历最后一个数据时，直接将endAngle插入数组
            preAngle = (i === serie.color.length - 1) ?
                serie.endAngle : (serie.endAngle - serie.startAngle) * d.percent + preAngle;
            //为了解决不精确小数问题，当遍历最后一个数据时，直接将max插入数组
            preValue = (i === serie.color.length - 1) ?
                serie.max : (serie.max - serie.min) * d.percent + preValue;
            arcsColor.push(d.color);
            domain.push(preValue);
            range.push(preAngle);
        });
        serie.axisArc.color = arcsColor;
        serie.axisArc.domain = domain;
        serie.axisArc.range = range;
        
        
        //仪表盘坐标轴大刻度颜色
        var tickColor = [];
        //仪表盘文本标签颜色
        var lableColor = [];
        var tickNum = serie.axisTick.tickNumber;
        for(var i = 0; i <= tickNum; i++){
            //坐标轴大刻度颜色
            var tickC = serie.axisTick.color ? 
                serie.axisTick.color : _init.getColor(serie.color,i/tickNum);
            //坐标轴文本标签颜色
            var lableC = serie.axisLabel.color ? serie.axisLabel.color : tickC;
            tickColor.push(tickC);
            lableColor.push(lableC);
        }
        serie.axisTick.color = tickColor;
        serie.axisLabel.color = lableColor;
        

        //仪表盘坐标轴小刻度
        var subTickColor = [];
        var subTickNum = serie.subTick.tickNumber;
        for(var i = 0; i < tickNum; i++){
            for(var j = 1; j < subTickNum; j++){
                //坐标轴小刻度颜色
                var color = serie.subTick.color ? serie.subTick.color :
                    _init.getColor(serie.color,(i * subTickNum + j)/(tickNum * subTickNum));
              
                subTickColor.push(color);
            }
        };
        serie.subTick.color = subTickColor;
        
    };
    
    //初始化仪表盘指针
    _init.pointer = function(serie){
        //指针旋转角度
        serie.pointer.rotate = (serie.data - serie.min)/(serie.max - serie.min) * 
            (serie.endAngle - serie.startAngle) + serie.startAngle;
        //指针颜色
        serie.pointer.color =  _init.getColor(serie.color,(serie.data - serie.min)/(serie.max - serie.min));
        //指针长度
        if("number" !== typeof serie.pointer.length){
            serie.pointer.length = serie.radius * parseFloat(serie.pointer.length)/100;
        }
        //指针宽度
        if("number" !== typeof serie.pointer.width){
            serie.pointer.width = serie.radius * parseFloat(serie.pointer.width)/100;
        }
        
        serie.pointer.point = [0 - serie.pointer.length, 0] +" "+ [ 0, 0 - serie.pointer.width] +" "+ 
            [serie.pointer.length/10, 0] +" "+ [0, serie.pointer.width];
        
        
    };
    //初始化仪表盘颜色
    _init.getColor = function(colorArr,percent){
        var ppc = 0;
        for(var i = 0; i < colorArr.length; i++){
            if(percent <= ppc + colorArr[i].percent){
                return colorArr[i].color;
            }
            else{
                ppc += colorArr[i].percent;
            }
        }
    };
     
    return _gauge;
    

};
"use strict";
var component = {}

component.arcAxis = function(){
    
    var _scale = d3.scale.linear(),        //弧形坐标轴比例尺
        _orient = "in";                    //坐标轴刻度方向，支持 in | out
    
    var _radius = 100,                     //半径
        _arcWidth = 2,                     //弧线宽度
        _ticks = 10,                       //坐标轴大刻度数
        _tickSize = 20,                    //坐标轴大刻度长度
        _subTicks = 10,                    //坐标轴小刻度数
        _subTickSize = 15;                 //坐标轴小刻度长度
    
    var _arcs = [],
        _tick = [],
        _subTick = [],
        _lable = [];
        
    function arcAxis(g){
        
        //数据初始化处理，生成绘图数据
        init();
        
        //绘画坐标轴弧线
        var arc = d3.svg.arc()
            .outerRadius(_radius)
            .innerRadius(_radius - _arcWidth);
        g.append("g")
            .attr("id","arcsG")
            .selectAll("path")
            .data(_arcs)
            .enter()
            .append("path")
            .attr("class","arc")
            .attr("d",function(d){
                return arc(d);
            });
        
        //绘画坐标轴大刻度
        g.append("g")
            .attr("id","ticksG")
            .selectAll("line")
            .data(_tick)
            .enter()
            .append("line")
            .attr("class","line")
            .attr("x2",0 - _tickSize)
            .style("stroke","rgb(0,0,0)")
            .style("stroke-width",3)
            .attr("transform",function(d){
                return "rotate("+d.rotate+")translate("+d.translate+")";
            });
        
        g.append("g")
            .attr("id","subTicksG")
            .selectAll("line")
            .data(_subTick)
            .enter()
            .append("line")
            .attr("class","line")
            .attr("x2",0 - _subTickSize)
            .style("stroke","rgb(0,0,0)")
            .style("stroke-width",1)
            .attr("transform",function(d){
                return "rotate("+d.rotate+")translate("+d.translate+")";
            });
        
        
        g.append("g")
            .attr("id","lableG")
            .selectAll("text")
            .data(_lable)
            .enter()
            .append("text")
            .text(function(d){ return d.text;})
            .attr("class","text")
            .attr('x', function(d){  return d.x; })
            .attr('y', function(d){  return d.y; })
            .attr("text-anchor","middle")    
            .attr("dominant-baseline","middle");  //垂直居中
    }
    
    
    function init(){
        var domain = _scale.domain(),            //定义域
            range = _scale.range();              //值域
        
        var startAngle = range[0],              //起始角度
            endAngle = range[range.length -1];  //结束角度
        
        var min = domain[0],                    //最小值
            max = domain[domain.length -1];     //最大值
        
        //坐标轴弧线数据初始化
        var pre = (range[0] - 90)/180 * Math.PI;
        for(var i = 1;i < range.length; i++){
            var end = (range[i] -90)/180 * Math.PI;
            _arcs.push({startAngle: pre,endAngle: end});
            pre = end;
        }
        
        //坐标轴大刻度数据初始化
        var tickTranslate = _orient === "out" ? _arcWidth - _radius : _tickSize - _radius;
        for(var i = 0; i <= _ticks; i++){
            _tick.push({
                rotate: (endAngle - startAngle)/_ticks * i + startAngle,
                translate: tickTranslate
            });
        }
        
        //坐标轴小刻度数据初始化
        var subTickTranslate = _orient === "out" ? _arcWidth - _radius : _subTickSize - _radius;
        for(var i = 0; i < _ticks; i++){
            for(var j = 1; j < _subTicks; j++){
                _subTick.push({
                    rotate:(endAngle - startAngle)/(_ticks * _subTicks) * (i * _subTicks + j) + startAngle,
                    translate: subTickTranslate,
                });
            }
        };
    
        //坐标轴标签文字
        var lableTranslate = _orient === "out" ? (tickTranslate - _tickSize) * 1.1 : tickTranslate * 0.9;
        _tick.map(function(d,i){
            _lable.push({
                text: (max - min)/_ticks * i + min,
                rotate:d.rotate,
                x:Math.cos(d.rotate/360 * 2 * Math.PI) * lableTranslate,
                y:Math.sin(d.rotate/360 * 2 * Math.PI) * lableTranslate
            });
        });
    }
    
    arcAxis.scale = function(x) {
      if (!arguments.length) return _scale;
      _scale = x;
      return arcAxis;
    };
     
    arcAxis.orient = function(x) {
      if (!arguments.length) return _orient;
      _orient = x;
      return arcAxis;
    };
    
    arcAxis.radius = function(x) {
      if (!arguments.length) return _radius;
      _radius = x;
      return arcAxis;
    };
    
    arcAxis.arcWidth = function(x) {
      if (!arguments.length) return _arcWidth;
      _arcWidth = x;
      return arcAxis;
    };
      
    arcAxis.ticks = function(x) {
      if (!arguments.length) return _ticks;
      _ticks = x;
      return arcAxis;
    };
    
    arcAxis.tickSize = function(x) {
      if (!arguments.length) return _tickSize;
      _tickSize = x;
      return arcAxis;
    };
    
    arcAxis.subTicks = function(x) {
      if (!arguments.length) return _subTicks;
      _subTicks = x;
      return arcAxis;
    };
    
    arcAxis.subTickSize = function(x) {
      if (!arguments.length) return _subTickSize;
      _subTickSize = x;
      return arcAxis;
    };
    
    return arcAxis;

};









