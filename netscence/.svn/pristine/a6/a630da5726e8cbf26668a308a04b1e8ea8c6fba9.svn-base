/**
 * Created by Lenovo on 2014/7/15.
 */

var Hello = function () {
    var param1 = "param1";
    this.method1 = function () {
        alert(param1);
    }
}

var User = function () {
    var id = 1;
    var name = "ruby";
    var password = "123321";
    var nickname = "罗";
    var email = "222@qq.com";
    var tel = "010-33338888";

    this.sayHello = function () {
        alert(name + ":" + "hello!")
    }
}

var Mib = function (ip, port, oid) {
    //特权属性
    this.ip = ip;
    this.port = port;
    this.oid = oid;
    //私有属性
    var telnet = this.ip + ":" + this.port;
    //私有方法
    var getIpPort = function () {
        //访问不了特权属性
        //return this.ip + ":" + this.port;
        return telnet;
    }
    //特权方法
    this.attachOid = function (oid) {
        if (this.oid != "") {
            this.oid += ",";
        }
        this.oid += oid;
    }

    this.retAll = function () {
        alert(getIpPort() + "  oid:" + this.oid);
    }
}

Mib.prototype.showOids = function () {
    alert(this.oid);
}
