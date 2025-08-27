sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/library",
	"sap.ui.core.util.Export",
	"sap.ui.core.util.ExportTypeCSV"

], function(Controller, JSONModel, MessageToast, MessageBox, coreLibrary, Export, ExportTypeCSV) {
	"use strict";

	const MessageType = coreLibrary.MessageType;

	return Controller.extend("converted.salesorderoverviewview.controller.SalesOrderOverviewView", {
		onInit: function() {
			// Load mock data
			this._loadData();
		},

		_loadData: function() {
			const oOrderModel = new JSONModel();
			oOrderModel.loadData("model/mockData/orders.json");
			this.getView().setModel(oOrderModel, "orders");

			const oMessageModel = new JSONModel({
				messages: [{
					type: MessageType.Success,
					title: "System Information",
					description: "Application initialized successfully.",
					subtitle: "Ready",
					counter: 1
				}]
			});
			this.getView().setModel(oMessageModel, "messages");
		},

		// Placeholder handlers (implement actual logic as needed)

		onActionDelete: function() {
			MessageBox.confirm("Are you sure you want to delete?", {
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.OK) {
						// Implement deletion logic
						MessageToast.show("Delete action triggered (Not Implemented)");
					}
				}.bind(this)
			});
		},
		onActionGlobalSettings: function() {
			MessageToast.show("Global Settings (Not Implemented)");
		},
		onActionGlobalUser: function() {
			MessageToast.show("Global User (Not Implemented)");
		},
		onActionGlobalHelp: function() {
			MessageToast.show("Global Help (Not Implemented)");
		},
		onActionGlobalFullScreen: function() {
			MessageToast.show("Global Full Screen (Not Implemented)");
		},

		onActionEditHeader: function() {
			MessageToast.show("Edit Header (Not Implemented)");
		},
		onActionCancelHeader: function() {
			MessageToast.show("Cancel Header (Not Implemented)");
		},
		onActionConfirm: function() {
			MessageToast.show("Confirm (Not Implemented)");
		},
		onActionGoodsIssueCreated: function() {
			MessageToast.show("Goods Issue Created (Not Implemented)");
		},
		onActionInvoiceCreated: function() {
			MessageToast.show("Invoice Created (Not Implemented)");
		},

		onActionCreateItem: function() {
			MessageToast.show("Create Item (Not Implemented)");
		},
		onActionEditItem: function() {
			MessageToast.show("Edit Item (Not Implemented)");
		},
		onActionSearchTable: function() {
			MessageToast.show("Search Table (Not Implemented)");
		},
		onActionTableSettings: function() {
			MessageToast.show("Table Settings (Not Implemented)");
		},
		onActionDownloadTable: function() {
			this.onExportToCSV();
		},
		onActionFullScreenTable: function() {
			MessageToast.show("Full Screen Table (Not Implemented)");
		},
		onActionDetailsItem: function(oEvent) {
			MessageToast.show("Details Item (Not Implemented)");
		},
		onActionDeleteItem: function(oEvent) {
			MessageBox.confirm("Are you sure you want to delete this item?", {
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.OK) {
						// Implement delete item logic
						MessageToast.show("Delete Item (Not Implemented)");
					}
				}.bind(this)
			});
		},

		onActionSave: function() {
			MessageToast.show("Save (Not Implemented)");
		},
		onActionCancelFooter: function() {
			MessageToast.show("Cancel (Not Implemented)");
		},

		onExportToCSV: function() {
			const oTable = this.getView().byId("salesOrderItemsTable");
			const aData = oTable.getModel("orders").getData().salesOrderItems;
			const sCsvContent = this._convertToCSV(aData);
			const oBlob = new Blob([sCsvContent], {
				type: "text/csv"
			});
			const sUrl = URL.createObjectURL(oBlob);
			const oLink = document.createElement("a");
			oLink.href = sUrl;
			oLink.download = "sales_order_items.csv";
			oLink.click();
			URL.revokeObjectURL(sUrl);
			MessageToast.show("CSV export initiated");
		},


		_convertToCSV: function(aData) {
			if (!aData || aData.length === 0) return "";
			const aHeaders = Object.keys(aData[0]);
			let sCsv = aHeaders.join(",") + "\n";
			aData.forEach(function(row) {
				const aValues = aHeaders.map(function(header) {
					return `"${(row[header] || "").toString().replace(/"/g, '""')}"`;
				});
				sCsv += aValues.join(",") + "\n";
			});
			return sCsv;
		},


		onExportToExcel: function() {
			const oTable = this.getView().byId("salesOrderItemsTable");
			const oExport = new Export({
				exportType: new ExportTypeCSV({
					fileExtension: "xlsx",
					mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				}),
				models: oTable.getModel("orders"),
				rows: {
					path: "/salesOrderItems"
				},
				columns: [{
						name: "itemPosition",
						template: {
							content: "{itemPosition}"
						}
					},
					{
						name: "totalGrossAmount",
						template: {
							content: "{totalGrossAmount}"
						}
					},
					// Add other columns as needed...
				]
			});
			oExport.saveFile("sales_order_items").then(function() {
				MessageToast.show("Excel export completed successfully");
			}, function(error) {
				MessageToast.show("Error exporting to Excel: " + error);
			});
		}
	});
});
