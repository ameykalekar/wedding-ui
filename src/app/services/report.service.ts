import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportSerachCriteria } from '../reports/reports.component';

@Injectable()
export class ReportService {

    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    getReportData(reportcriteria : ReportSerachCriteria) {
        return this.http.post<any>('/api/reportservice', JSON.stringify(reportcriteria), this.httpOptions)
    }
}