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
}