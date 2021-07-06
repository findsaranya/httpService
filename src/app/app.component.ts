import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'httpservice';
  error: string|null;
  loadedPosts:Post[] = [];
  isFetching:boolean = false;
  private errorSub:Subscription;
  constructor(private http:HttpClient,private postService : PostService){
    this.getPosts();
  }
  ngOnInit(){
    this.isFetching = true;
   this.errorSub =  this.postService.error.subscribe(err => this.error = err)
   this.postService.onFetchPost().subscribe(result =>{
      console.log(result);
      this.loadedPosts = result;
      this.isFetching = false;
    },error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }
  onCreatePost(postData:Post) {
    // Send Http request
    console.log(postData);
    this.postService.onCreateandSavePost(postData);
   
  }

  onFetchPosts() {
    // Send Http request
    //this.getPosts();
    this.isFetching = true;
    this.postService.onFetchPost().subscribe(result =>{
      console.log(result);
      this.loadedPosts = result;
      this.isFetching = false;
    },error=>{
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.onDelete().subscribe(()=>{
      this.loadedPosts = [];
    })
  }
  private getPosts(){
    this.isFetching = true;
    
  }
  onHandleError(){
    this.error = null;
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
