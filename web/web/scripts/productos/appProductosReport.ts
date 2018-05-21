import KoBinder = require("./../utils/KoBinder");
import ProductosReportModel = require("./ProductosReportModel");

$(async function () {
    KoBinder.bind($("#productosReportModel"), new ProductosReportModel());
});