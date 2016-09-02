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
}