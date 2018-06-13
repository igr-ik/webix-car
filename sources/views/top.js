import {JetView} from "webix-jet";

export default class TopView extends JetView {
	config() {
		return {
			id: "layout",
			cols: [
				{
					minWidth: 400, maxWidth: 600,
					rows: [
						{
							template: "List of bucket",
						},
						{
							template: "Buttons",
							height: 70
						}
					]
				},
				{ view: "resizer" },
				{
					template: "Search result"
				}
			]
		};
	}
}