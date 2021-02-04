// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('hoja_trabajo', {
	// refresh: function(frm) {

	// }

	efectivo: function(frm) {
		calcular_total_disponible(frm);
	  },
	bancos: function(frm) {
		calcular_total_disponible(frm);
	},
	inversiones: function(frm) {
		calcular_total_disponible(frm);
	},
	otros: function(frm) {
		calcular_total_disponible(frm);
	}
	,enero(){sumarmeses();}
	,febrero(){sumarmeses();}
	,marzo(){sumarmeses();}
	,abril(){sumarmeses();}
	,mayo(){sumarmeses();}
	,junio(){sumarmeses();}
	,julio(){sumarmeses();}
	,agosto(){sumarmeses();}
	,septiembre(){sumarmeses();}
	,noviembre(){sumarmeses();}
	,diciembre(){sumarmeses();}

});

frappe.ui.form.on("cuenta_por_cobrar", {
	monto_inical: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_CUENTASPORCOBRAR(frm);
	},
	saldo: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_CUENTASPORCOBRAR(frm);
	} 
  });

  frappe.ui.form.on("mercaderia", {
	costo: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_MERCADERIA(frm);
	},
	cantidad: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_MERCADERIA(frm);
	} 
  });

  frappe.ui.form.on("muebles_enseres", {
	numero: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_MUEBLES_ENSERES(frm);
	},
	vunitario: function(frm, cdt, cdn) {
	  const doc = frappe.get_doc(cdt, cdn);
	  calcular_MUEBLES_ENSERES(frm);
	} 
  });
  
  frappe.ui.form.on("maquinaria_equipo", {
	numero: function(frm, cdt, cdn) {	   
	  calcular_MAQUINARIA(frm);
	},
	vunitario: function(frm, cdt, cdn) {	  
		calcular_MAQUINARIA(frm);
	} 
  });

  frappe.ui.form.on("terrenos_casas", {
	avaluo: function(frm, cdt, cdn) {	   
		calcular_TERRENOS(frm);
	}  
  });
  
  frappe.ui.form.on("vehiculo", {
	avaluo: function(frm, cdt, cdn) {	   
		calcular_vehiculo(frm);
	}  
  }); 

  frappe.ui.form.on("otro_activos", {	
	cantidad (frm, cdt, cdn) { 		 
	 calcular_otro_activos();
	} ,
	costo (frm, cdt, cdn) { 		 
 	calcular_otro_activos();
	  }
  });

  frappe.ui.form.on("activos_familiares", {	
	cantidad (frm, cdt, cdn) { 		 
		calcular_activos_familiares();
	} ,
	avaluo (frm, cdt, cdn) { 		 
		calcular_activos_familiares();
	  }
  });
  frappe.ui.form.on("auxiliar_ventas", {	
	valor (frm, cdt, cdn) { 		 
		calcular_auxiliar_ventas();
	} ,
	tiempo (frm, cdt, cdn) { 		 
		calcular_auxiliar_ventas();
	  }
  });
  


  function sumarmeses(){
var total = cur_frm.doc.enero   +  cur_frm.doc.febrero  +  cur_frm.doc.marzo  +  cur_frm.doc.abril  +  cur_frm.doc.mayo  
+  cur_frm.doc.junio  +  cur_frm.doc.julio  +  cur_frm.doc.agosto  +  cur_frm.doc.septiembre  +  cur_frm.doc.octubre+  cur_frm.doc.noviembre+  cur_frm.doc.diciembre;    
   
cur_frm.doc.meses_total = total;
cur_frm.doc.meses_promedio = total / 12;
cur_frm.refresh_field('meses_total');
cur_frm.refresh_field('meses_promedio');
}
function calcular_total_disponible(frm){
	frm.doc.total_disponible = 	frm.doc.efectivo + frm.doc.bancos + frm.doc.inversiones+ frm.doc.otros   ; 
	frm.refresh_field('total_disponible');
}


function calcular_auxiliar_ventas (){
	var t_total=0;	 
	$.each(cur_frm.doc.auxiliar_ventas, function(i, row) {  
		  var s_total  = row.valor * row.tiempo;	
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_auxiliar_ventas =  t_total; 
	  cur_frm.refresh_fields();
}

function calcular_activos_familiares (){
	var t_total=0;	 
	$.each(cur_frm.doc.activos_familiares, function(i, row) {  
		  var s_total  = row.cantidad * row.avaluo;	
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_activos_familiares =  t_total; 
	  cur_frm.refresh_fields();
}

function  calcular_otro_activos (){
	var t_total=0; 
	 
	$.each(cur_frm.doc.otro_activos, function(i, row) {  
		  var s_total  = row.cantidad * row.costo;	
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_otrosactivos =  t_total; 
	  cur_frm.refresh_fields();
}

function  calcular_vehiculo (frm){
	var t_total=0; 
	$.each(cur_frm.doc.vehiculo, function(i, row) { 		 
		  t_total+=row.avaluo;
	  });	
	  cur_frm.doc.total_vehiculo =  t_total;	 
	  cur_frm.refresh_fields();
}

function  calcular_TERRENOS (frm){
	var t_total=0; 
	$.each(cur_frm.doc.terrenos_casas, function(i, row) { 		 
		  t_total+=row.avaluo;
	  });	
	  cur_frm.doc.total_terrenos =  t_total;	 
	  cur_frm.refresh_fields();
}

function  calcular_MAQUINARIA (frm){
	var t_total=0; 
	$.each(cur_frm.doc.maquinaria_equipo, function(i, row) {    
		var s_total  = row.numero  * row.vunitario;
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_maquinaria =  t_total;	 
	  cur_frm.refresh_fields();
}
function  calcular_MUEBLES_ENSERES (frm){
	var t_total=0;
 
	$.each(cur_frm.doc.muebles_enseres, function(i, row) {    
		var s_total  = row.numero  * row.vunitario;
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_mueblesenseres =  t_total;	 
	  cur_frm.refresh_fields();
}
function  calcular_MERCADERIA (frm){
	var t_total=0; 
	$.each(cur_frm.doc.mercaderia, function(i, row) {    
		var s_total  = row.cantidad  * row.costo;
		  row.total = s_total;
		  t_total+=s_total;
	  });	
	  cur_frm.doc.total_inventario =  t_total;	 
	  cur_frm.refresh_fields();
}

function calcular_CUENTASPORCOBRAR(frm){
	var t_monto_inical=0;
	var t_saldo=0;
	$.each(cur_frm.doc.cuenta_por_cobrar, function(i, row) {    
		t_monto_inical += row.monto_inical;
		t_saldo += row.saldo;
	  });
	
	  cur_frm.doc.total_inicial =  t_monto_inical;
	  cur_frm.doc.total_saldo =  t_saldo;
	  console.log(t_monto_inical);
	  cur_frm.refresh_fields();
}
