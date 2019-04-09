import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import {TaskManagerServiceService} from '../task-manager-service.service';
import{Task} from '../task'
import { error } from '@angular/compiler/src/util';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
   startEndDate:Date=new Date();
   ParentTasks:Task[];
   model:Task=new Task();
   isError:boolean=false;
   isValidationStDateError:boolean=false;
   isValidationEndDateError:boolean=false;
   errorMsg:string;
   isSuccess:boolean=false;
   successMsg:string;
   pTaskStartDate:Date;
   pTaskEnddate:Date;
   constructor(private taskManagerService: TaskManagerServiceService) {
    this.startEndDate.setDate( this.startEndDate.getDate() + 1);
    
   }

  ngOnInit() {
    this.GetAllParentTask();
    
  }
  onSubmit(){
     this.isError=false;
     this.isValidationStDateError=false;
     this.isValidationEndDateError=false;
     this.isSuccess=false;

      let allowSubmit=true;
      
      this.model.ParentTaskId=Number(this.model.ParentTaskId);
      if (this.model.ParentTaskId >0)
      {
         var pTask=this.ParentTasks.filter(item=>item.TaskId===this.model.ParentTaskId);
         var compareResult=this.ComapareAgainstParenttask(pTask[0]);
         allowSubmit=compareResult;
      }
      if(allowSubmit)
      {
        this.AddTask();
        
      }
  

  }
  ComapareAgainstParenttask(task:Task):boolean{
    let rtValue=true;
    if (task.StartDate>this.model.StartDate)
    {
      rtValue=false;
      this.isValidationStDateError=true;
      this.pTaskStartDate=task.StartDate;

    }
    if (task.EndDate!=null && task.EndDate<this.model.EndDate)
    {
      rtValue=false;
      this.isValidationEndDateError=true;
      this.pTaskEnddate=task.EndDate;

    }
    return rtValue;
  }
  GetAllParentTask(){
    this.taskManagerService.GetAllParentTask().subscribe(data=>
      {
        this.ParentTasks=data;
        var pTask=this.ParentTasks.filter(item=>item.TaskId==0);
        if(pTask ==null || pTask.length==0)
        {
           var ts=new Task();
           ts.TaskId =0;
           ts.TaskName ="Choose Parent Task";
           this.ParentTasks.push(ts);
        }
        
        
      },
      (error:any)=>{this.HandleError(error,"GetAllParentTask")}
      );
       
  }
  AddTask()
  {
    this.taskManagerService.Addtask(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Task has been added successfully";
      this.GetAllParentTask();
    },
      (error:Error)=>this.HandleError(error,"AddTask"));
  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) && orgOfError==='GetAllParentTask')
    {
      this.isError=true;
      this.errorMsg="Pernt task loading failed";

    }
    if((err.status===500|| err.status===0) && orgOfError==='AddTask')
    {
      this.isError=true;
      this.errorMsg="Task addition failed, please try again later";

    }
    if(err.status===400 && orgOfError==='AddTask')
    {
      this.isError=true;
      this.errorMsg="Active task with same "+ this.model.TaskName +" name is already present in the system";

    }
   

  }

}
