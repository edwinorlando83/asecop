// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('hoja_trabajo', {
	refresh: function (frm) {
		cur_frm.fields_dict["frecuencia_compras"].grid.wrapper.find('.grid-add-row').hide();

		cur_frm.fields_dict["auxiliar_ventas"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["flujo_ingreso_gastos"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["auxiliar_ventas_sec"].grid.wrapper.find('.grid-add-row').hide();
		//cur_frm.fields_dict["frecuencia_compras"].grid.add_custom_button('Add Time Slots');

		cur_frm.fields_dict["flujo_ingresos_integral"].grid.wrapper.find('.grid-add-row').hide();
		cur_frm.fields_dict["gastos_familiares"].grid.wrapper.find('.grid-add-row').hide();
		initEvents();
	},
	onload(frm) {

		frm.set_query("asesor", function () {
			return {
				filters: {
					agencias: frm.doc.agencias
				}
			};
		});


		//frm.get_field("frecuencia_compras").grid.only_sortable();
		if (frm.is_new()) {
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS DIARIAS', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS SEMANALES', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas_sec', { frecuencia: 'VENTAS A CREDITO SEMANAL', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS DIARIAS', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS SEMANALES', valor: 0, tiempo: 0, total: 0 });
			frm.add_child('auxiliar_ventas', { frecuencia: 'VENTAS A CREDITO SEMANAL', valor: 0, tiempo: 0, total: 0 });

			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRAS DIARIAS', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRAS SEMANALES', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras', { frecuencia: 'COMPRA A CREDITO SEMANAL', valor: 0, dias: 0, total: 0 });

			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRAS DIARIAS', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRAS SEMANALES', valor: 0, dias: 0, total: 0 });
			frm.add_child('frecuencia_compras_sec', { frecuencia: 'COMPRA A CREDITO SEMANAL', valor: 0, dias: 0, total: 0 });

			frm.add_child('flujo_ingresos_integral', { detalle: 'Ingreso Negocio', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Sueldo Mensual', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Sueldo Conyugue', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Ingresos Complementarios', valor: 0 });
			frm.add_child('flujo_ingresos_integral', { detalle: 'Otros ingresos', valor: 0 });

			frm.add_child('gastos_familiares', { detalle: 'Alimentación', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Educación', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Arriendo', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Transporte', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Servicios Básicos', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Salud', valor: 0 });
			frm.add_child('gastos_familiares', { detalle: 'Otros', valor: 0 });


			//flujo_ingreso

			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Arriendo', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Servicios Básicos', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Transporte', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Mano de Obra', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Viaticos', actividad1: 0, actividad2: 0, total: 0 });
			frm.add_child('flujo_ingreso_gastos', { descripcion: 'Otros', actividad1: 0, actividad2: 0, total: 0 });

		}
	


	},
	efectivo: function (frm) {
		calcular_total_disponible(frm);
	},
	bancos: function (frm) {
		calcular_total_disponible(frm);
	},
	inversiones: function (frm) {
		calcular_total_disponible(frm);
	},
	otros: function (frm) {
		calcular_total_disponible(frm);
	}

	, enero() { sumarmeses(); }
	, febrero() { sumarmeses(); }
	, marzo() { sumarmeses(); }
	, abril() { sumarmeses(); }
	, mayo() { sumarmeses(); }
	, junio() { sumarmeses(); }
	, julio() { sumarmeses(); }
	, agosto() { sumarmeses(); }
	, septiembre() { sumarmeses(); }
	, noviembre() { sumarmeses(); }
	, diciembre() { sumarmeses(); }

	, enero_s() { sumarmeses2(); }
	, febrero_s() { sumarmeses2(); }
	, marzo_s() { sumarmeses2(); }
	, abril_s() { sumarmeses2(); }
	, mayo_s() { sumarmeses2(); }
	, junio_s() { sumarmeses2(); }
	, julio_s() { sumarmeses2(); }
	, agosto_s() { sumarmeses2(); }
	, septiembre_s() { sumarmeses2(); }
	, noviembre_s() { sumarmeses2(); }
	, diciembre_s() { sumarmeses2(); }

	, ingventas_act1(frm) {
		calcular_1act(frm);
		calcular_ingresos_del_negocio(frm);
	},
	ingventas_act2(frm) {
		calcular_1act2(frm);

	}
	, compras_act1(frm) {
		calcular_ingresos_del_negocio(frm);
	}

	, ingventas_act2(frm) {
		calcular_ingresos_del_negocio2(frm);
	}
	, compras_act2(frm) {
		calcular_ingresos_del_negocio2(frm);
	},

	gastos_act1(frm) {
		calcular_gastos_total(frm);
	},
	gastos_act2(frm) {
		calcular_gastos_total(frm);
	}
});

function initEvents(){
	$(document).find("[name='bt1']").on("click", function () {	 
		ocultartodos();
	
	});
}

function ocultar() {
 

}
function mostrar_inventario() {
  cur_frm.set_df_property("otros", "hidden", 0);  
}
//promedio_costo_s
function calcular_gastos_total(frm) {
	frm.doc.gastos_act3 = frm.doc.gastos_act1 + frm.doc.gastos_act2;
	frm.refresh_fields();
}

function calcular_1act(frm) {
	frm.doc.costo_act1 = frm.doc.promedio_costo * frm.doc.ingventas_act1 / 100;
	console.log(' romedio_costo ' + frm.doc.promedio_costo);
	console.log(' ingventas_act1 ' + frm.doc.ingventas_act1);
	frm.refresh_fields();
}
function calcular_1act2(frm) {
	frm.doc.costo_act1 = frm.doc.promedio_costo_s * frm.doc.ingventas_act2 / 100;
	frm.refresh_fields();
}
function calcular_ingresos_del_negocio(frm) {
	frm.doc.ingre_act1 = frm.doc.ingventas_act1 - frm.doc.compras_act1;
	frm.doc.ingre_act3 = frm.doc.ingre_act1 + frm.doc.ingre_act2;
	frm.doc.ingventas_act3 = frm.doc.ingventas_act1 + frm.doc.ingventas_act2;
	frm.doc.compras_act3 = frm.doc.compras_act2 + frm.doc.compras_act1;
	frm.refresh_fields();
}
function calcular_ingresos_del_negocio2(frm) {
	frm.doc.ingre_act2 = frm.doc.ingventas_act2 - frm.doc.compras_act2;
	frm.doc.ingre_act3 = frm.doc.ingre_act1 + frm.doc.ingre_act2;
	frm.doc.ingventas_act3 = frm.doc.ingventas_act1 + frm.doc.ingventas_act2;
	frm.doc.compras_act3 = frm.doc.compras_act2 + frm.doc.compras_act1;
	frm.refresh_fields();
}

frappe.ui.form.on("flujo_ingresos_integral", {
	valor: function (frm, cdt, cdn) {
		var t_total = 0;
		$.each(cur_frm.doc.flujo_ingresos_integral, function (i, row) {
			t_total += row.valor;
		});
		cur_frm.doc.total_flujo_ingresos_integral = t_total;
		cur_frm.refresh_fields();
	}
});

frappe.ui.form.on("gastos_familiares", {
	valor: function (frm, cdt, cdn) {
		var t_total = 0;
		$.each(cur_frm.doc.gastos_familiares, function (i, row) {
			t_total += row.valor;
		});
		cur_frm.doc.total_gastos_familiares = t_total;
		cur_frm.refresh_fields();
	}
});



frappe.ui.form.on("cuenta_por_cobrar", {
	monto_inical: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_CUENTASPORCOBRAR(frm);
	},
	saldo: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_CUENTASPORCOBRAR(frm);
	}
});

frappe.ui.form.on("mercaderia", {
	costo: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MERCADERIA(frm);
	},
	cantidad: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MERCADERIA(frm);
	}
});

frappe.ui.form.on("muebles_enseres", {
	numero: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MUEBLES_ENSERES(frm);
	},
	vunitario: function (frm, cdt, cdn) {
		const doc = frappe.get_doc(cdt, cdn);
		calcular_MUEBLES_ENSERES(frm);
	}
});

frappe.ui.form.on("maquinaria_equipo", {
	numero: function (frm, cdt, cdn) {
		calcular_MAQUINARIA(frm);
	},
	vunitario: function (frm, cdt, cdn) {
		calcular_MAQUINARIA(frm);
	}
});

frappe.ui.form.on("terrenos_casas", {
	avaluo: function (frm, cdt, cdn) {
		calcular_TERRENOS(frm);
	}
});

frappe.ui.form.on("vehiculo", {
	avaluo: function (frm, cdt, cdn) {
		calcular_vehiculo(frm);
	}
});

frappe.ui.form.on("otro_activos", {
	cantidad(frm, cdt, cdn) {
		calcular_otro_activos();
	},
	costo(frm, cdt, cdn) {
		calcular_otro_activos();
	}
});

frappe.ui.form.on("activos_familiares", {
	cantidad(frm, cdt, cdn) {
		calcular_activos_familiares();
	},
	avaluo(frm, cdt, cdn) {
		calcular_activos_familiares();
	}
});
frappe.ui.form.on("auxiliar_ventas", {
	valor(frm, cdt, cdn) {
		calcular_auxiliar_ventas();
	},
	tiempo(frm, cdt, cdn) {
		calcular_auxiliar_ventas();
	}
});


frappe.ui.form.on("cuentasporcobrar", {
	monto(frm, cdt, cdn) {
		calcular_cuentasporcobrar();
	}
});

frappe.ui.form.on("prestamos", {
	saldo(frm, cdt, cdn) {
		calcular_prestamos();
	}
});

frappe.ui.form.on("prestamos_largoplazo", {
	saldo(frm, cdt, cdn) {
		calcular_prestamos_largoplazo();
	}
});

frappe.ui.form.on("otros_pasivos", {
	saldo(frm, cdt, cdn) {
		calcular_otros_pasivos();
	}
});


frappe.ui.form.on("margen_ganancias", {
	preciocompra(frm, cdt, cdn) {
		calcular_costo_venta();
	},
	precioventa(frm, cdt, cdn) {
		calcular_costo_venta();
	}
});

frappe.ui.form.on("margen_ganancias_sec", {
	preciocompra(frm, cdt, cdn) {
		calcular_costo_venta_s();
	},
	precioventa(frm, cdt, cdn) {
		calcular_costo_venta_s();
	}
});

frappe.ui.form.on("frecuencia_compras", {
	valor(frm, cdt, cdn) {
		calcular_frecuencia_compras();
	},
	dias(frm, cdt, cdn) {
		calcular_frecuencia_compras();
	}
});

frappe.ui.form.on("frecuencia_compras_sec", {
	valor(frm, cdt, cdn) {
		calcular_frecuencia_compras_sec();
	},
	dias(frm, cdt, cdn) {
		calcular_frecuencia_compras_sec();
	}
});


frappe.ui.form.on("productos_aux_compras", {
	valor(frm, cdt, cdn) {
		calcular_productos_aux_compras();
	},
	cantidad(frm, cdt, cdn) {
		calcular_productos_aux_compras();
	}
});
frappe.ui.form.on("productos_aux_compras_sec", {
	valor(frm, cdt, cdn) {
		calcular_productos_aux_compras_sec();
	},
	cantidad(frm, cdt, cdn) {
		calcular_productos_aux_compras_sec();
	}
});

frappe.ui.form.on("auxiliar_ventas_sec", {
	valor(frm, cdt, cdn) {
		calcular_auxiliar_ventas_sec();
	},
	tiempo(frm, cdt, cdn) {
		calcular_auxiliar_ventas_sec();
	}
});

frappe.ui.form.on("flujo_ingreso_gastos", {
	actividad1(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	},
	actividad2(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	},
	total(frm, cdt, cdn) {
		calcular_flujo_ingreso_gastos();
	}
});



function calcular_flujo_ingreso_gastos() {
	var t_total1 = 0;
	var t_total2 = 0;
	var t_total3 = 0;
	$.each(cur_frm.doc.flujo_ingreso_gastos, function (i, row) {
		//var s_total = row.valor * row.tiempo;
		//row.total = s_total;
		t_total1 += row.actividad1;
		t_total2 += row.actividad2;
		row.total = row.actividad1 + row.actividad2;
		t_total3 += row.total;
	});
	cur_frm.doc.gastos_act1 = t_total1;
	cur_frm.doc.gastos_act2 = t_total2;
	cur_frm.doc.gastos_act3 = t_total3;
	cur_frm.refresh_fields();
}


function calcular_auxiliar_ventas_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.auxiliar_ventas_sec, function (i, row) {
		var s_total = row.valor * row.tiempo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.auxiliar_ventas_sec_total = t_total;
	cur_frm.refresh_fields();
}


function calcular_productos_aux_compras() {
	var t_total = 0;
	$.each(cur_frm.doc.productos_aux_compras, function (i, row) {
		row.total = row.valor * row.cantidad;
		t_total += row.total;

	});
	cur_frm.doc.total_productos_aux_compras = t_total;
	cur_frm.refresh_fields();
}


function calcular_productos_aux_compras_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.productos_aux_compras_sec, function (i, row) {
		row.total = row.valor * row.cantidad;
		t_total += row.total;

	});
	cur_frm.doc.total_aux_com_sec = t_total;
	cur_frm.refresh_fields();
}


function calcular_frecuencia_compras() {
	var t_total = 0;
	$.each(cur_frm.doc.frecuencia_compras, function (i, row) {
		row.total = row.valor * row.dias;

		t_total += row.total;

	});
	//  cur_frm.doc.total_otros_pasivos =  t_total; 
	cur_frm.refresh_fields();
}

function calcular_frecuencia_compras_sec() {
	var t_total = 0;
	$.each(cur_frm.doc.frecuencia_compras_sec, function (i, row) {
		row.total = row.valor * row.dias;
		t_total += row.total;
	});

	cur_frm.doc.total_fc_s = t_total;
	console.log(cur_frm.doc.total_fc_s);

	cur_frm.refresh_fields();
}


function calcular_costo_venta() {
	var t_total = 0;
	var t_total2 = 0;
	var _count = 0;
	$.each(cur_frm.doc.margen_ganancias, function (i, row) {
		var s_total = (row.preciocompra / row.precioventa) * 100;
		row.costo = roundNumber(s_total, 2);
		row.utilidad = 100 - row.costo;
		t_total += row.utilidad;
		t_total2 += row.costo;
		_count++;
	});

	cur_frm.doc.promedio_utilidad = roundNumber(t_total / _count, 2);
	cur_frm.doc.promedio_costo = roundNumber(t_total2 / _count, 2);

	cur_frm.refresh_fields();
}

function calcular_costo_venta_s() {
	var t_total = 0;
	var t_total2 = 0;
	var _count = 0;
	$.each(cur_frm.doc.margen_ganancias_sec, function (i, row) {
		var s_total = (row.preciocompra / row.precioventa) * 100;
		row.costo = roundNumber(s_total, 2);
		row.utilidad = 100 - row.costo;
		t_total += row.utilidad;
		t_total2 += row.costo;
		_count++;
	});

	cur_frm.doc.promedio_utilidad_s = roundNumber(t_total / _count, 2);
	cur_frm.doc.promedio_costo_s = roundNumber(t_total2 / _count, 2);

	cur_frm.refresh_fields();
}

function calcular_otros_pasivos() {
	var t_total = 0;
	$.each(cur_frm.doc.otros_pasivos, function (i, row) {

		t_total += row.monto;
	});
	cur_frm.doc.total_otros_pasivos = t_total;
	cur_frm.refresh_fields();
}
function calcular_prestamos_largoplazo() {
	var t_total = 0;
	var t_total_cuotas = 0;
	$.each(cur_frm.doc.prestamos_largoplazo, function (i, row) {

		t_total += row.saldo;

	});
	cur_frm.doc.total_prestamolargo = t_total;
	cur_frm.refresh_fields();
}
function calcular_prestamos() {
	var t_total = 0;
	$.each(cur_frm.doc.prestamos, function (i, row) {

		t_total += row.saldo;
	});
	cur_frm.doc.total_prestamos = t_total;
	cur_frm.refresh_fields();
}

function calcular_cuentasporcobrar() {
	var t_total = 0;
	$.each(cur_frm.doc.cuentasporcobrar, function (i, row) {
		t_total += row.monto;
	});
	cur_frm.doc.total_cuentasporcobrar = t_total;
	cur_frm.refresh_fields();
}


function sumarmeses() {
	var total = cur_frm.doc.enero + cur_frm.doc.febrero + cur_frm.doc.marzo + cur_frm.doc.abril + cur_frm.doc.mayo
		+ cur_frm.doc.junio + cur_frm.doc.julio + cur_frm.doc.agosto + cur_frm.doc.septiembre + cur_frm.doc.octubre + cur_frm.doc.noviembre + cur_frm.doc.diciembre;

	cur_frm.doc.meses_total = total;
	cur_frm.doc.meses_promedio = total / 12;
	cur_frm.refresh_field('meses_total');
	cur_frm.refresh_field('meses_promedio');
}

function sumarmeses2() {
	var total = cur_frm.doc.enero_s + cur_frm.doc.febrero_s + cur_frm.doc.marzo_s + cur_frm.doc.abril_s + cur_frm.doc.mayo_s
		+ cur_frm.doc.junio_s + cur_frm.doc.julio_s + cur_frm.doc.agosto_s + cur_frm.doc.septiembre_s + cur_frm.doc.octubre_s + cur_frm.doc.noviembre_s + cur_frm.doc.diciembre_s;

	console.log("sumarmeses2==" + total);
	cur_frm.doc.total_s = total;
	cur_frm.doc.promedio_s = total / 12;
	cur_frm.refresh_field('total_s');
	cur_frm.refresh_field('promedio_s');
}

function calcular_total_disponible(frm) {
	frm.doc.total_disponible = frm.doc.efectivo + frm.doc.bancos + frm.doc.inversiones + frm.doc.otros;
	frm.refresh_field('total_disponible');
}


function calcular_auxiliar_ventas() {
	var t_total = 0;
	$.each(cur_frm.doc.auxiliar_ventas, function (i, row) {
		var s_total = row.valor * row.tiempo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_auxiliar_ventas = t_total;
	cur_frm.refresh_fields();
}

function calcular_activos_familiares() {
	var t_total = 0;
	$.each(cur_frm.doc.activos_familiares, function (i, row) {
		var s_total = row.cantidad * row.avaluo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_activos_familiares = t_total;
	cur_frm.refresh_fields();
}

function calcular_otro_activos() {
	var t_total = 0;

	$.each(cur_frm.doc.otro_activos, function (i, row) {
		var s_total = row.cantidad * row.costo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_otrosactivos = t_total;
	cur_frm.refresh_fields();
}

function calcular_vehiculo(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.vehiculo, function (i, row) {
		t_total += row.avaluo;
	});
	cur_frm.doc.total_vehiculo = t_total;
	cur_frm.refresh_fields();
}

function calcular_TERRENOS(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.terrenos_casas, function (i, row) {
		t_total += row.avaluo;
	});
	cur_frm.doc.total_terrenos = t_total;
	cur_frm.refresh_fields();
}

function calcular_MAQUINARIA(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.maquinaria_equipo, function (i, row) {
		var s_total = row.numero * row.vunitario;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_maquinaria = t_total;
	cur_frm.refresh_fields();
}
function calcular_MUEBLES_ENSERES(frm) {
	var t_total = 0;

	$.each(cur_frm.doc.muebles_enseres, function (i, row) {
		var s_total = row.numero * row.vunitario;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_mueblesenseres = t_total;
	cur_frm.refresh_fields();
}
function calcular_MERCADERIA(frm) {
	var t_total = 0;
	$.each(cur_frm.doc.mercaderia, function (i, row) {
		var s_total = row.cantidad * row.costo;
		row.total = s_total;
		t_total += s_total;
	});
	cur_frm.doc.total_inventario = t_total;
	cur_frm.refresh_fields();
}

function calcular_CUENTASPORCOBRAR(frm) {
	var t_monto_inical = 0;
	var t_saldo = 0;
	$.each(cur_frm.doc.cuenta_por_cobrar, function (i, row) {
		t_monto_inical += row.monto_inical;
		t_saldo += row.saldo;
	});

	cur_frm.doc.total_inicial = t_monto_inical;
	cur_frm.doc.total_saldo = t_saldo;
	console.log(t_monto_inical);
	cur_frm.refresh_fields();
}

function ocultartodos(){

	for( let i=0;i<arrayCols.length;i++){
		cur_frm.set_df_property(arrayCols[i], "hidden", 1);  
	}
}

let arrayCols=[   

"cuentas_por_cobrar_section",
"cuenta_por_cobrar",
"totales_html",
"sec_inventario",
"html_27",
"mercaderia",
"total_inventario_html",
"sec_acfij",
"html_32",
"total_activosfijneg",
"muebles_enseres",
"total_mueblesensereshtml",
"maquinaria_equipo",
"total_maquinaria_html",
"terrenos_casas",
"total_terrenos_html",
"vehiculo",
"total_vehiculo_html",
"otro_activos",
"total_otrosactivos_html",
"sec_aux",
"html_50",
"cuentasporcobrar",
"total_cuentasporcobrar_html",
"prestamos",
"total_prestamos_html",
"prestamos_largoplazo",
"total_prestamolargo_html",
"otros_pasivos",
"total_otros_pasivos_html",
"sec_actfam",
"activos_familiares",
"total_activos_familiares_html",
"sec_auxfamil",
"html_68",
"html_69",
"actividad_principal",
"html_71",
"auxiliar_ventas",
"total_auxiliar_ventas_html",
"sec_flujo",
"enero",
"febrero",
"marzo",
"column_break_41",
"abril",
"mayo",
"junio",
"column_break_43",
"julio",
"agosto",
"septiembre",
"column_break_49",
"octubre",
"noviembre",
"diciembre",
"column_break_45",
"meses_promedio",
"meses_total",
"sec_",
"margen_ganancias",
"html_promedio_uticos",
"sec_auxcompras",
"html_101",
"frecuencia_compras",
"productos_aux_compras",
"html_productos_aux_compras",
"sec_flujos",
"section_break_108",
"html_109",
"actividad_secundaria",
"html_111",
"auxiliar_ventas_sec",
"auxiliar_ventas_sec_html",
"section_break_115",
"enero_s",
"febrero_s",
"marzo_s",
"column_break_118",
"abril_s",
"mayo_s",
"junio_s",
"column_break_121",
"julio_s",
"agosto_s",
"septiembre_s",
"section_break_124",
"octubre_s",
"noviembre_s",
"diciembre_s",
"column_break_127",
"promedio_s",
"total_s",
"section_break_101",
"margen_ganancias_sec",
"html_margengan_s",
"hmlt111",
"frecuencia_compras_sec",
"htmltotal_fc_s",
"productos_aux_compras_sec",
"htmltotal_aux_com_sec",
"section_break_137",
"htmltitulo11",
"section_break_147",
"actividad_1",
"ingventas_act1",
"compras_act1",
"costo_act1",
"ingre_act1",
"gastos_act1",
"column_break_152",
"actividad_2",
"ingventas_act2",
"compras_act2",
"costo_act2",
"ingre_act2",
"gastos_act2",
"column_break_157",
"total_ingresos",
"ingventas_act3",
"compras_act3",
"costo_act3",
"ingre_act3",
"gastos_act3",
"section_break_157",
"flujo_ingreso_gastos",
"sec00005",
"htmlsec11",
"flujo_ingresos_integral",
"html_flujo_ingresos_integral",
"gastos_familiares",
"html_gastos_familiares",
"section_break_178",
"tt_ingresonetouf",
"tt_pagocuotas",
"tt_flujointegral",
"section_break_182",
"html_indicadores"];