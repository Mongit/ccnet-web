import KoBinder = require("./../utils/KoBinder");
import NuevoProveedorModel = require("./NuevoProveedorModel");

$(async function () {
    KoBinder.bind($("#nuevoProveedorForm"), new NuevoProveedorModel());
})