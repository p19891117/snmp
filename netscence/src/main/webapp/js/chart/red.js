function red() {

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
}