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
 
  GetAllTask1():Observable<any>{
    let params = new HttpParams();
    params = params.append('isParentonly', 'false');
    return this.http.get<any>(this.TaskManagerApiUrl,{params: params}).pipe(
      map((res:Response)=>{
       
        if(res.status===200)
         return res.json();
      })
      ,catchError((err:any)=>{
        
        return Observable.throw(new Error(err.status));
        
      })
    );
  }
      
     
      
  GetAllParentTask():Observable<any>{
    let params = new HttpParams();
    params = params.append('isParentonly', 'true');
    return this.http.get<any>(this.TaskManagerApiUrl,{params: params}).pipe(
      map((res:Response)=>{
       
        if(res.status===200)
         return res.json();
      })
      ,catchError((err:any)=>{
        
        return Observable.throw(new Error(err.status));
        
      })
    );
  }
  Addtask(value:Task):Observable<any>{
    return this.http.post(this.TaskManagerApiUrl,value).pipe(
      map((res:Response)=>{
       
        if(res.status===200)
         return res.json();
      })
      ,catchError((err:any)=>{
        
        return Observable.throw(new Error(err.status));
        
      })
    );

  }
  EditTask(value:Task):Observable<any>{
    return this.http.put(this.TaskManagerApiUrl,value).pipe(
      map((res:Response)=>{
       
        if(res.status===200)
         return res.json();
      })
      ,catchError((err:any)=>{
        
        return Observable.throw(new Error(err.status));
        
      })
    );

  }

}
