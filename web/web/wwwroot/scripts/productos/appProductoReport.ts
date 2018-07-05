import KoBinder = require("./../utils/KoBinder");
import ProductoReportModel = require("./ProductoReportModel");

$(async function () {
    KoBinder.bind($("#productoReportModel"), new ProductoReportModel());
});