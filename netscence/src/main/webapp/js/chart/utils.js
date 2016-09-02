function utils (){
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
}