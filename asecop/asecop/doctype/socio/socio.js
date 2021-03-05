// Copyright (c) 2021, orlando and contributors
// For license information, please see license.txt

frappe.ui.form.on('Socio', {
	// refresh: function(frm) {

	// }
	onload_post_render: function(frm) {

		 
			controlSoloNumeroEntero(frm.fields_dict.cedula);
            controlSoloNumeroEntero(frm.fields_dict.cedulaconyuge);
     
    
	  },
	  validate: function (frm) {
		if (validarCedula(frm.doc.cedula) == 0) {
	
		  frappe.throw("Cedula incorrecto del socio");
		}
		if (validarCedula(frm.doc.cedulaconyuge) == 0) {
	
			frappe.throw("Cedula incorrecto del conyuge");
		  }
	  }
});
