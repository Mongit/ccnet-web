import KoBinder = require("./../utils/KoBinder");
import CuentaModel = require("./CuentaModel");

$(async function () {
    KoBinder.bind($("#cuentaForm"), new CuentaModel());
})