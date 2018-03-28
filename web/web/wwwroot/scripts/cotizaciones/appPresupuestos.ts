import KoBinder = require("./../utils/KoBinder");
import PresupuestosModel = require("./../cotizaciones/PresupuestosModel");

$(async function () {
    KoBinder.bind($("#presupuestosForm"), new PresupuestosModel());
})