import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LoginService } from 'src/app/Services/Login/login.service';
import { GetJobHistoryPopupComponent } from './completedjobpopupjobhistory/get-job-history-popup/get-job-history-popup.component';

@Component({
  selector: 'app-completedjobs',
  templateUrl: './completedjobs.component.html',
  styleUrls: ['./completedjobs.component.scss']
})
export class CompletedjobsComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobnumber',
    'estjob',
    'department',
    'client',
    'customerclasiification',
    'clientstatus',
    'jobstatus',
    'parentjobid',
    'filename',
    'fileInwardMode',
    'fileReceivedEstDate',
    'jobcloseddate',
    'commentstoclient'
  ];
  
  dataSource: MatTableDataSource<any>;

data:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private loginservice:LoginService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getCompletedJobData();

  }

  getCompletedJobData(): void {
    this.http.get<any>(`https://localhost:7208/api/Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.clientDetails.resultCompletedJobsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remarkValue:string='';
  //to save the checkbox value
  selectedQuery:any[]=[];

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedQuery)
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedQuery)
  }
postdatabulk:any;
  bulkUpload(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(data => {
    console.log("bulkdataemployee", data);
      
    this.postdatabulk = data.clientDetails.resultCompletedJobsList;
    });
    let bulkuploaddata={
      "id": 0,
      "processId": 1,
      "statusId": 12,
      "selectedScopeId": 0,
      "autoUploadJobs": false,
      "employeeId": this.loginservice.getUsername(),
      "remarks": this.remarkValue,
      "isBench": true,
      "jobId": "string",
      "value": 0,
      "amount": 0,
      "stitchCount": 0,
      "estimationTime": 0,
      "dateofDelivery": "2023-05-18T11:26:56.846Z",
      "comments": "string",
      "validity": 0,
      "copyFiles": true,
      "updatedBy": 0,
      "jId": 0,
      "estimatedTime": 0,
      "tranMasterId": 0,
      "selectedRows": [{
        "id": 0,
        "processId": 1,
        "statusId": 12,
        "selectedScopeId": 0,
        "autoUploadJobs": false,
        "employeeId": this.loginservice.getUsername(), //
        "remarks": this.remarkValue,
        "isBench": true,
        "jobId": "string",
        "value": 0,
        "amount": 0,
        "stitchCount": 0,
        "estimationTime": 0,
        "dateofDelivery": "2023-05-18T11:26:56.846Z",
        "comments": "string",
        "validity": 0,
        "copyFiles": false,
        "updatedBy": 0,
        "jId": 0,
        "estimatedTime": 0,
        "tranMasterId": 0,
        "selectedRows": [],
        "selectedEmployees": [],
        "departmentId": 0,
        "updatedUTC": "2023-05-18T11:26:56.846Z",
        "categoryDesc": "string",
        "allocatedEstimatedTime": 0,
        "tranId": 0,
        "fileInwardType": "string",
        "timeStamp": "AAAAAAAxLeM=",
        "scopeId": 0,
        "quotationRaisedby": 0,
        "quotationraisedOn": "2023-05-18T11:26:56.846Z",
        "clientId": 0,
        "customerId": 0,
        "fileReceivedDate": "2023-05-18T11:26:56.846Z",
        "commentsToClient": "string",
        "isJobFilesNotTransfer": true
      }],
      "selectedEmployees": [],
      "departmentId": 0,
      "updatedUTC": "2023-05-18T11:26:56.846Z",
      "categoryDesc": "string",
      "allocatedEstimatedTime": 0,
      "tranId": 0,
      "fileInwardType": "string",
      "timeStamp": "AAAAAAAxLeM=",
      "scopeId": 0,
      "quotationRaisedby": 0,
      "quotationraisedOn": "2023-05-18T11:26:56.846Z",
      "clientId": 0,
      "customerId": 0,
      "fileReceivedDate": "2023-05-18T11:26:56.846Z",
      "commentsToClient": "string",
      "isJobFilesNotTransfer": true
    }
    // let bulkuploaddataa={
    //   "id": 0,
    //   "processId": 1,
    //   "statusId": 12,
    //   "autoUploadJobs": false,
    //   "employeeId": 152,
    //   "remarks": this.remarkValue,
    //   "copyFiles": false,
    //   "selectedRows":[{
    //     "id": 0,
    //     "processId": 1,
    //     "statusId": 12,
    //     "autoUploadJobs": false,
    //     "employeeId": 152,
    //     "remarks": this.remarkValue,
    //     "copyFiles": false,
    //     "selectedRows":[],
    //     "isJobFilesNotTransfer": true
    //   }],
    //   "isJobFilesNotTransfer": true
    // }
    this.http.post<any>(`https://localhost:7208/api/Allocation/processMovement`,bulkuploaddata).subscribe(data => {
      console.log(data,"dataprocess");
  });
  }


  getRemarkValue(event:Event){
     this.remarkValue = (event.target as HTMLInputElement).value;
  }
  onChange(tab) {
     tab= this.getCompletedJobData();
     console.log(tab,"changetab");
     
  }

  getjobhistory(data){
    const dialogRef = this.dialog.open(GetJobHistoryPopupComponent, {
      width: '100vw',
      data
    });

    // Subscribe to the afterClosed event to handle dialog close actions
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed, if needed
    });
  }
}