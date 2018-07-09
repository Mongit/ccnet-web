import KoBinder = require("./../utils/KoBinder");
import ProductosQRModel = require("./ProductosQRModel");

$(async function () {
    KoBinder.bind($("#productosQRModel"), new ProductosQRModel());
});