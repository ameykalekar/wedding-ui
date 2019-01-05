import { Component, OnInit } from '@angular/core';
import { ChecklistserviceService } from '../services/checklistservice.service';
import { GlobalserviceService } from '../globalservice.service';
import { Route, Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { CheckList } from '../objects/checklist';
import { TaskserviceService } from '../services/taskservice.service';
import { Task } from '../objects/task';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editchecklist',
  templateUrl: './editchecklist.component.html',
  styleUrls: ['./editchecklist.component.css']
})
export class EditchecklistComponent implements OnInit {
  selectChecklist: CheckList[];
  form: FormGroup;
  numberoftasks: string[];
  tasks: string;
  selectCheckList = [];
  selectCheckList1 = [];
  taskList = [];
  constructor(private checklistservice: ChecklistserviceService, private taskservice: TaskserviceService,
    private globalservice: GlobalserviceService, private router: Router) { }

  ngOnInit() {
    this.getAllChecklist();
    this.numberoftasks = [];
    this.form = new FormGroup({
      checklistid: new FormControl('', Validators.required),
      task: new FormControl('')
    });
  }
  onSubmit() {
    //  const checklist = new CheckList(this.form.value.checklistname, this.form.value.comments, 'Y', this.globalservice.user.companyId);
    // console.log(checklist);
    // this.checklistservice.saveCheckList(checklist).subscribe(res => {



    const tempchecklist = this.form.value.checklistid;
    const temptasks: Task[] = [];
    for (let index = 0; index < this.numberoftasks.length; index++) {
      const element = this.numberoftasks[index];
      let task:Task = new Task();
      task.checklistId = tempchecklist;
      task.desc = element;
      temptasks.push(task);
    }

    this.savetaks(temptasks);








  }

  getAllChecklist() {

    this.selectCheckList = [];

    this.checklistservice.allCheckList().subscribe((res) => {
      console.log('Printing Response' + res);

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log('sadfasdfasfd');
        console.log(element.tasks);
        this.selectCheckList1.push(element);
        this.selectCheckList.push({ value: element.checkListId, name: element.checkListName });

      }


    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );


  }


  getTasks(id: string) {
    console.log(this.form.value.checklistid);
    this.taskList = [];
    for (let index = 0; index < this.selectCheckList1.length; index++) {
      const element = this.selectCheckList1[index];
      console.log('test' + element.checkListId);
      console.log('test' + element['checkListId']);
      if (element.checkListId == id) {
        console.log('Element Found');

      }
      console.log(element);
    }
    const temptask = this.selectCheckList1.find(x => x.checkListId == id)['tasks'];
    for (let index = 0; index < temptask.length; index++) {
      const element = temptask[index];

      this.taskList.push({ value: element['id'], name: element['desc'] });

    }



  }
  savetaks(tasks: Task[]) {
    console.log('Saving tasks');
    this.taskservice.saveTask(tasks).subscribe(res => {
      console.log('Response' + res);
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

  reset() {
    this.form.reset();

    this.numberoftasks = [];
    this.getAllChecklist();

  }
  deletetask(index) {
    console.log('Deleting' + index);
    this.numberoftasks.splice(index);
    this.form.controls['task'].reset();
  }
}
