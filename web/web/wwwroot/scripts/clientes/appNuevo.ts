import KoBinder = require("./../utils/KoBinder");
import ClienteModel = require("./ClienteModel");

$(async function () {
    KoBinder.bind($("#nuevoClienteForm"), new ClienteModel());
})