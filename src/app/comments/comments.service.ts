import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from '../comments/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private commentsUrl = 'api/comments'; // URL to web api

  constructor(private http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(this.commentsUrl)
      .pipe(catchError(this.handleError));
  }

  updateComment(comment: Comment): Observable<{}> {
    return this.http.put(this.commentsUrl, comment);
  }

  deleteComment(id: number): Observable<{}> {
    return this.http.delete(this.commentsUrl + '/' + id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
