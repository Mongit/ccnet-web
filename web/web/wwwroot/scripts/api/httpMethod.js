"use strict";
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["get"] = 0] = "get";
    HttpMethod[HttpMethod["post"] = 1] = "post";
    HttpMethod[HttpMethod["put"] = 2] = "put";
    HttpMethod[HttpMethod["delete"] = 3] = "delete";
})(HttpMethod || (HttpMethod = {}));
module.exports = HttpMethod;
//# sourceMappingURL=httpMethod.js.map