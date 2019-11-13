import { TagFilterPipe } from './filters/tag-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, CommentsComponent, TagFilterPipe],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    FontAwesomeModule
  ],
  providers: [InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
