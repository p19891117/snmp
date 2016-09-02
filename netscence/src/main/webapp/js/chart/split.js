function split() {

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
