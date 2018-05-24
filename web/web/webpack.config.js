var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {        
        cotizacionesApp: [
            './wwwroot/js/site.js',
            './scripts/cotizaciones/app.ts'],
        nuevoClienteApp: [
            './scripts/clientes/appNuevo.ts'
        ],
        clientesApp: [
            './scripts/clientes/appClientes.ts'
        ],
        cotizacionesClienteApp: [
            './scripts/cotizaciones/appCotizacionesCliente.ts'
        ],
        editarClienteApp: [
            './scripts/clientes/appEditar.ts'
        ],
        presupuestosApp: [
            './scripts/cotizaciones/appPresupuestos.ts'
        ],
        proveedoresApp: [
            './scripts/proveedores/appProveedores.ts'
        ],
        nuevoProveedorApp: [
            './scripts/proveedores/appNuevo.ts'
        ],
        cuentasApp: [
            './scripts/proveedores/appCuentas.ts'
        ],
        cuentaApp: [
            './scripts/proveedores/appCuenta.ts'
        ],
        productosApp: [
            './scripts/productos/appProductos.ts'
        ],
        productoApp: [
            './scripts/productos/appProducto.ts'
        ],
        recibosApp: [
            './scripts/recibos/appRecibos.ts'
        ],
        reciboApp: [
            './scripts/recibos/appRecibo.ts'
        ],
        reciboVerApp: [
            './scripts/recibos/appReciboVer.ts'
        ],
        stockListApp: [
            './scripts/stock/appStockList.ts'
        ],
        stockApp: [
            './scripts/stock/appStock.ts'
        ],
        productoReportApp: [
            './scripts/productos/appProductosReport.ts'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist/')
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                mode:'production'
            }
        })
    ]
};
