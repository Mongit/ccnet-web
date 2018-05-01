import KoBinder = require("./../utils/KoBinder");
import ProveedoresModel = require("./ProveedoresModel");

$(async function () {
    KoBinder.bind($("#proveedoresForm"), new ProveedoresModel());
});