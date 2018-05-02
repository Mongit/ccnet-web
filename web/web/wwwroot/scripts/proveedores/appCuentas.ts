import KoBinder = require("./../utils/KoBinder");
import CuentasModel = require("./CuentasModel");

$(async function () {
    KoBinder.bind($("#cuentasForm"), new CuentasModel());
})