function shine() {

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
}