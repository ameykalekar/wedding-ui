import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Comments } from '../objects/comment';
import { GlobalserviceService } from '../globalservice.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: Comments[];
  @Input()
  ticketid: string;
  constructor(private commentservice: CommentService, private gobalservice: GlobalserviceService) { }
  formcomment: FormGroup;
  ngOnInit() {
    console.log('Ticket ID' + this.ticketid);
    this.formcomment = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.getAllComments(this.ticketid);
  }

  addcomment() {
    let tempcomment: Comments = new Comments();
    tempcomment.desc = this.formcomment.value.comment;
    tempcomment.ticketid = this.ticketid;
    tempcomment.commentedby = this.gobalservice.user.username;
   let now =Date.now();
   
 
    tempcomment.createdAt = formatDate(now, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530');
    this.comments.push(tempcomment);

    this.commentservice.save(tempcomment).subscribe((res) => {
      console.log('Printing Response' + res);

      this.formcomment.reset();

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
  getAllComments(ticketid: string) {

    this.comments = [];

    this.commentservice.getComments(ticketid).subscribe((res) => {
      console.log('Printing Response' + res);
      this.comments = res;
      for (let index = 0; index < res.length; index++) {
        const element = res[index];

        console.log(element.desc);



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

}
