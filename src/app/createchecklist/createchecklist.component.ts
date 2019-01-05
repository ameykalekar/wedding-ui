import { Component, OnInit } from '@angular/core';
import { ChecklistserviceService } from '../services/checklistservice.service';
import { GlobalserviceService } from '../globalservice.service';
import { Route, Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { CheckList } from '../objects/checklist';
import { TaskserviceService } from '../services/taskservice.service';
import { Task } from '../objects/task';

@Component({
  selector: 'app-createchecklist',
  templateUrl: './createchecklist.component.html',
  styleUrls: ['./createchecklist.component.css']
})
export class CreatechecklistComponent implements OnInit {
  form: FormGroup;
  numberoftasks: string[];
  tasks: string;
  constructor(private checklistservice: ChecklistserviceService, private taskservice: TaskserviceService,
    private globalservice: GlobalserviceService, private router: Router) { }

  ngOnInit() {
    this.numberoftasks = [];
    this.form = new FormGroup({
      checklistname: new FormControl('', Validators.required),
      task: new FormControl('')
    });
  }

  reset() {
    this.form.reset();

    this.numberoftasks = [];

  }
  onSubmit() {
    const checklist = new CheckList(this.form.value.checklistname, this.form.value.comments, 'Y', this.globalservice.user.companyId);
    console.log(checklist);
    this.checklistservice.saveCheckList(checklist).subscribe(res => {
      console.log('Response' + res);

      if (res !== null) {
        const tempchecklist = <string>res['checkListId'];
        const temptasks: Task[] = [];
        for (let index = 0; index < this.numberoftasks.length; index++) {
          const element = this.numberoftasks[index];
          let task: Task = new Task();
          task.checklistId = tempchecklist;
          task.desc = element;
          temptasks.push(task);
        }

        this.savetaks(temptasks);
        window.scrollTo(0, 0);
        this.reset();

      } else {


      }

    },
      err => {

        console.log('Error Occured' + err);
      }
    );


  }

  savetaks(tasks: Task[]) {
    console.log('Saving tasks');
    this.taskservice.saveTask(tasks).subscribe(res => {
      console.log('Response' + res);

this.reset();
    }, err => {

      console.log('Error Occured in Task Service' + err);
    });
  }
  addtask() {
    console.log('Adding Task: ' + this.form.value.task);
    this.numberoftasks.push(this.form.value.task);
    this.form.controls['task'].reset();
    console.log(this.numberoftasks);
  }
  deletetask(index) {
    console.log('Deleting' + index);
    this.numberoftasks.splice(index);
    this.form.controls['task'].reset();

  }
}
