import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-invoicecancelleddetails',
  templateUrl: './invoicecancelleddetails.component.html',
  styleUrls: ['./invoicecancelleddetails.component.scss']
})
export class InvoicecancelleddetailsComponent implements OnInit {
  @Input() invoiceNumber: string;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype','scope','department'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const request = {
      // your request body goes here
      "id":0,
      "invoiceNo": this.data.invoiceNo
    };

    this.http.post<any>('https://localhost:7208/api/Invoice/GetInvoiceTranforSalesCancel', request).subscribe(data => {
      const invoicedata = data.invoicesc
    this.dataSource = new MatTableDataSource(invoicedata);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}