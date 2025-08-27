sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
	"use strict";

	return Controller.extend("converted.salesorderoverviewview.controller.App", {
		onInit: function() {
			// Get the router instance
			const oRouter = UIComponent.getRouterFor(this);

			if (oRouter) {
				// Add error handling for routing
				oRouter.attachBypassed(function(oEvent) {
					const sHash = oEvent.getParameter("hash");
					console.warn(`Route bypassed: ${sHash}`);
					// Handle bypassed routes appropriately (e.g., show a 404 page)
				});

				// Navigate to main view if no hash is set
				if (!window.location.hash || window.location.hash === "#") {
					setTimeout(function() {
						oRouter.navTo("RouteMain");
					}, 100); // Small delay to allow UI to initialize
				}
			} else {
				console.error("Router not found in App controller");
			}
		}
	});
});
