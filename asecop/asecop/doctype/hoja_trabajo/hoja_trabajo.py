# -*- coding: utf-8 -*-
# Copyright (c) 2021, orlando and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
# import frappe
from frappe.model.document import Document

class hoja_trabajo(Document):
	def before_save(self):
		self.total_activosfijneg = self.total_mueblesenseres + self.total_maquinaria  + self.total_terrenos  + self.total_vehiculo  + self.total_otrosactivos 

