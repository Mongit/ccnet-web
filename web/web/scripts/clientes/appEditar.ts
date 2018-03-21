import KoBinder = require("./../utils/KoBinder");
import EditarClienteModel = require("./EditarClienteModel");

$(async function () {
    KoBinder.bind($("#editarCliente"), new EditarClienteModel());
})