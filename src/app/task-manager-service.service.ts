import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerServiceService {
  TaskManagerApiUrl:string="http://localhost:8080/api/TaskManager";
  tasks:Task[];


  

  constructor(private http:HttpClient) { }
 
  GetAllTask():Observable<Task[]>{
    const params = new HttpParams()
    .set('isParentonly', 'true');
    
    return this.http.get<Task[]>(this.TaskManagerApiUrl,{params});
  }
      
     
      
  GetAllParentTask():Observable<Task[]>{
    const params = new HttpParams()
    .set('isParentonly', 'true');
    
    return this.http.get<Task[]>(this.TaskManagerApiUrl,{params});
  }
  Addtask(value:Task):Observable<any>{
    return this.http.post(this.TaskManagerApiUrl,value);

  }
  EditTask(value:Task):Observable<any>{
    return this.http.put(this.TaskManagerApiUrl,value);

  }

}
