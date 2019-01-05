import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../services/product-type.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportService } from '../services/report.service';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.css'],
	providers: [ReportService]
})
export class ReportsComponent implements OnInit {
	private allItems: {};
	private localsource: LocalDataSource;
	reportType: string;
	startDate: string;
	endDate: string;
	companyid: string;
	username: string;
	isProduct: boolean = false;
	isUser: boolean = false;
	isEfficiency: boolean = false;
	isDynamicColumn: boolean = false;
	userType: string = '';
	productBrand: string = '';

	openTickets:string;
	rejectedTickets:string;
	inProgressTickets:string;
	totalTickets:string;

	settings = {
		actions: { add: false, edit: false, delete: false },
		pager: {
			dispay: true,
			perPage: 20
		},
		columns: {

		}
	};



	dateParams = [{
		format: 'dd/mm/yyyy',
		onSet: () => { this.change(); }
	}];

	private reportTypes = [{ value: 'users', name: 'USERS' }, { value: 'efficiency', name: 'EFFICIENCY' }, { value: 'products', name: 'PRODUCTS' }];
	private options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalseparator: '.',
		showLabels: true,
		showTitle: true,
		headers: ['ID', 'ACTIVE', 'DESCRIPTION', 'TYPE']
	};
	constructor(private reportservice: ReportService, private productTypeService: ProductTypeService) { }

	ngOnInit() {
		this.localsource = new LocalDataSource();

	}


	download() {
		this.productTypeService.getProductTypes().subscribe(
			res => {
				//for(let entry of res){
				//	entry.id ;entry.active ;entry.description ;entry.type;
				//}
				this.allItems = res;
			}
		);


	}


	search() {

		let reportCriteria = new ReportSerachCriteria();
		reportCriteria.companyid = this.companyid;
		reportCriteria.endDate = this.endDate;
		reportCriteria.startDate = this.startDate;
		reportCriteria.username = this.username;
		reportCriteria.reportType = this.reportType;
		reportCriteria.productBrand = this.productBrand;

		this.reportservice.getReportData(reportCriteria).subscribe((data) => {

		
				console.log(data);
				let keys:any;
				if(data.data.length==0){
					this.localsource= new LocalDataSource();
					console.log(this.localsource);
					return;
				}

				if(this.isDynamicColumn){
					keys = Object.keys(data.data[0]);
				}
				let columnKey = {};
				
				if (this.isDynamicColumn) {
					for (let key of keys) {
						let colTitle = key.toUpperCase();
						let column = { title: colTitle, filter: false };
						columnKey[key] = column;

					}
				} else {
					if (this.reportType == 'efficiency') {
						columnKey = { assignedTo: { title: "FR", filter: false }, count: { title: "No. Of Tickets", filter: false },closedTickets : {title: "No. Of Tickets Closed" , filter:false} };
						this.openTickets = data.data[0].openTickets;
						this.rejectedTickets = data.data[0].totalRejected;
						this.inProgressTickets = data.data[0].totalInProgress;
						
					}

				}

				let newSettings = {
					actions: { add: false, edit: false, delete: false },
					pager: {
						dispay: true,
						perPage: 20
					},
					columns: columnKey
				};
				this.settings = Object.assign({}, newSettings);
				if(this.isEfficiency){
					this.localsource.load(data.data[0].frefficiency);	
				}else{
				this.localsource.load(data.data);
				}
			
		});

	}
	change() {

	}

	convertArrayOfObjectsToCSV(args) {
		var result, ctr, keys, columnDelimiter, lineDelimiter, data;

		data = args.data || null;
		if (data == null || !data.length) {
			return null;
		}

		columnDelimiter = args.columnDelimiter || ',';
		lineDelimiter = args.lineDelimiter || '\n';

		keys = Object.keys(data[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		data.forEach(function (item) {
			ctr = 0;
			keys.forEach(function (key) {
				if (ctr > 0) result += columnDelimiter;

				result += item[key];
				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	}

	downloadCSV(args) {
		let filename, link;

		let data = [];

		this.localsource.getAll().then(value => {
			value.forEach(element => {
				data.push(element);
			});

			var csv = this.convertArrayOfObjectsToCSV({
				data: data
			});
			if (csv == null) return;

			filename = args.filename || 'export.csv';

			if (!csv.match(/^data:text\/csv/i)) {
				csv = 'data:text/csv;charset=utf-8,' + csv;
			}
			let csvData;
			csvData = encodeURI(csv);


			link = document.createElement('a');
			link.setAttribute('href', csvData);
			link.setAttribute('download', filename);
			link.click();

		});


	}

	onReportChange() {
		console.log(this.reportType);
		if (this.reportType == 'users') {
			this.isUser = true;
			this.isProduct = false;
			this.isEfficiency = false;
			this.isDynamicColumn = true;
			console.log(this.isUser);
		} else if (this.reportType == 'products') {
			this.isProduct = true;
			this.isUser = false;
			this.isEfficiency = false;
			this.isDynamicColumn = true;
		} else if (this.reportType == 'efficiency') {
			this.isEfficiency = true;
			this.isUser = false;
			this.isProduct = false;
			this.isDynamicColumn = false;
		}
	}

}

export class ReportSerachCriteria {

	reportType: string;
	username: string;
	startDate: string;
	endDate: string;
	companyid: string;
	productBrand: string;
	userType: string;


}
