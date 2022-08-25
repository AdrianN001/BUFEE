"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(userdata) {
        this.userdata = userdata;
    }
    User.prototype.get_name = function () {
        return this.userdata['name'];
    };
    return User;
}());
exports["default"] = User;
