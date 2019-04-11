import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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

}
