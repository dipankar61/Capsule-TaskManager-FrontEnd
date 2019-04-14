import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {Observable, observable,of as observableOf, BehaviorSubject} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import {TaskManagerServiceService} from '../task-manager-service.service';
import{Task} from '../task'
import { error } from '@angular/compiler/src/util';
//import {DataSource} from '@angular/cdk/collections';
import { merge } from 'rxjs/operators';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  isError:boolean=false;
  searchForm: FormGroup;
  Tasks:Task[];
  //dataSource = new MatTableDataSource<Task>(this.Tasks);
  dataSource : MatTableDataSource<Task>;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  
 displayedColumns: string[] = ['TaskName', 'ParentTaskName', 'Priority', 'StartDate','EndDate','customColumn1','customColumn2'];

 errorMsg:string;
 //dataSource:TaskdataSource;


  constructor(private ref: ChangeDetectorRef,private formBuilder: FormBuilder,private taskManagerService: TaskManagerServiceService) {
     
      //var displayedColumns: string[] = ['TaskId'];
      //this.Tasks=[];
      this.GetAllTask();
      //this.ref.markForCheck();
   }

  ngOnInit() {
    
    
    this.searchForm=this.formBuilder.group({
      taskName:'',
      taskParentName:'',
      PriorityFrom:'',
      PriorityTo:'',
      startdate:'',
      enddate:''
    }

    );
    
  }
  GetAllTask(){
    this.taskManagerService.GetAllTask().subscribe(data=>
      {
        this.Tasks=data;
        
        if(this.Tasks)
        {
        //this.dataSource.data=this.Tasks;
         this.dataSource = new MatTableDataSource(this.Tasks);
        //this.dataSource.data=this.Tasks;
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.ref.markForCheck();
        }
        //console.log(this.dataSource.data[0].TaskId);
       
      },
      (error:any)=>{this.HandleError(error,"GetAllTask")}
      );
       
  }
  EndTask(t:Task)
  {
    this.taskManagerService.EditTask(t).subscribe(data=>{
      
    },
      (error:Error)=>this.HandleError(error,"EndTask"));
  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) && orgOfError==='GetAllTask')
    {
      this.isError=true;
      this.errorMsg="Tasks view loading failed. Please try again later.";

    }
    if(err.status===404 && orgOfError==='GetAllTask')
    {
      this.isError=true;
      this.errorMsg="No data avialable for viewing";

    }
    if((err.status===500|| err.status===0) && orgOfError==='EndTask')
    {
      this.isError=true;
      this.errorMsg="Task End update failed, please try again later";

    }
    if(err.status===400 && orgOfError==='EndTask')
    {
      this.isError=true;
      this.errorMsg="Task has child task/tasks which need to be end prior to parent task ";

    }
   

  }

}

