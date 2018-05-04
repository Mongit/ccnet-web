import KoBinder = require("./../utils/KoBinder");
import ProductoModel = require("./ProductoModel");

$(async function () {
    KoBinder.bind($("#productoModel"), new ProductoModel());
});