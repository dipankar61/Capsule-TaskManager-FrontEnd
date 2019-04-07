import { Component, OnInit } from '@angular/core';

import{Task} from '../task'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  startEndDate:Date=new Date();
  Tasks:Task[];
   dateString = '1018-11-16T00:00:00' 
   newDate = new Date(this.dateString);
   model:Task=new Task();
  constructor() {
    this.startEndDate.setDate( this.startEndDate.getDate() + 1);
    
   }

  ngOnInit() {
    
  }
  onSubmit(){
  

  }

}
