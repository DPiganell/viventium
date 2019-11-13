import { Tag } from './../tags/tag';
import { CommentsService } from './comments.service';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../comments/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  comments: Comment[] = [];
  tags: string[] = [];
  filters: string[] = [];
  copy: Comment;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    // Retrieve all comments
    this.getAllComments();
  }

  addOrRemove(tag: string) {
    var index = this.filters.indexOf(tag);

    if (index === -1) {
      this.filters.push(tag);
    } else {
      this.filters.splice(index, 1);
    }
  }

  getAllTags() {
    // Reset tags
    this.tags = [];
    this.filters = [];

    for (let i = 0; i < this.comments.length; i++) {
      for (let j = 0; j < this.comments[i].tags.length; j++) {
        if (this.tags.indexOf(this.comments[i].tags[j].name) === -1) {
          this.tags.push(this.comments[i].tags[j].name);
        }
      }
    }
  }

  getAllComments() {
    this.commentsService.getAllComments().subscribe(comments => {
      this.comments = comments;
      this.getAllTags();
    });
  }

  edit(comment: Comment) {
    comment.edit = true;
    comment.copy = JSON.parse(JSON.stringify(comment));
    for (let i = 0; i < comment.copy.tags.length; i++) {
      comment.copy.tags[i].active = true;
    }
  }

  updateComment(comment: Comment) {
    let tmp = {};
    tmp = Object.assign(tmp, comment.copy);
    comment.copy = Object.assign(comment.copy, {});
    comment = Object.assign(comment, tmp);

    comment.edit = false;

    // Find active tags
    for (let i = 0; i < comment.tags.length; i++) {
      if (comment.tags[i].active !== true) {
        comment.tags.splice(i, 1);
      }
    }

    this.commentsService.updateComment(comment).subscribe(() => {
      this.getAllComments();
      comment.edit = false;
    });
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe(() => {
      // Speed up UI to immediately remove
      this.comments = this.comments.filter(function(el) {
        return el.id != id;
      });

      this.getAllComments();
    });
  }

  addTagToComment(comment: Comment) {
    let tag = new Tag();
    tag.active = true;
    tag.name = comment.copy.newtag;
    comment.copy.newtag = '';

    let found = false;
    for (let i = 0; i < comment.copy.tags.length; i++) {
      if (comment.copy.tags[i].name === tag.name) {
        found = true;
      }
    }

    if (!found) {
      comment.copy.tags.push(tag);
    }
  }
}
