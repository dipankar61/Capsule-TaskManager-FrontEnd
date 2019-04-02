export class Task {
    TaskId:Number;
    TaskName:String;
    StartDate:Date;
    EndDate:Date |null;
    Priority:Number;
    ParentTaskId:Number |null;
    ParentTaskName:String|null;
    constructor(TaskId:Number,
        TaskName:String,
        StartDate:Date,
        EndDate:Date|null,
        Priority:Number,
        ParentTaskId:Number|null,
        ParentTaskName:String|null
        ) {
        this.TaskId = TaskId;
        this.TaskName = TaskName;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Priority = Priority;
        this.ParentTaskId = ParentTaskId;
        this.ParentTaskName = ParentTaskName;
      }
    
}
