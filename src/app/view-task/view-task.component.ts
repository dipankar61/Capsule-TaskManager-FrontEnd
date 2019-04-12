import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import {TaskManagerServiceService} from '../task-manager-service.service';
import{Task} from '../task'
import { error } from '@angular/compiler/src/util';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  searchForm: FormGroup;
  dataSource:Task[];
  isError:boolean=false;
  errorMsg:string;

  constructor(private formBuilder: FormBuilder,private taskManagerService: TaskManagerServiceService) { }

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
        this.dataSource=data;
        this.dataSource.forEach((t:Task)=>{
          t.StartDate=new Date(t.StartDate);
          if(t.EndDate !=null && t.EndDate!=undefined)
          {
              t.EndDate=new Date(t.EndDate);
          }

        })
        
       
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
