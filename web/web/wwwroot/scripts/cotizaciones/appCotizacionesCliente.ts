import KoBinder = require("./../utils/KoBinder");
import CotizacionesClienteModel = require("./../cotizaciones/CotizacionesClienteModel");

$(async function () {
    KoBinder.bind($("#cotizacionesCliente"), new CotizacionesClienteModel());
})