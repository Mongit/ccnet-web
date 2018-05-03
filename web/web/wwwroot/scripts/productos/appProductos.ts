import KoBinder = require("./../utils/KoBinder");
import ProductosModel = require("./ProductosModel");

$(async function () {
    KoBinder.bind($("#productosModel"), new ProductosModel());
});