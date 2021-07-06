import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { map, catchError,tap} from 'rxjs/operators';
import { Observable, Subject,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
//"now < 1627929000000",  // 2021-8-3
error = new Subject<string>();
  constructor(private http : HttpClient) { }
  onCreateandSavePost(postData:Post){
    this.http.post<{name:string}>("https://angularhttp-3feef-default-rtdb.firebaseio.com/posts.json",
    postData).subscribe(response => console.log(response),
    error =>{
      this.error.next(error.message);
    }
    );
  }
  onFetchPost(){
    // for multiple params & this is immutable
    let searchParams = new HttpParams();
   searchParams =  searchParams.append("print","pretty");
    searchParams = searchParams.append("custom","key");
    searchParams.append
    return this.http.get<{[key:string]:Post}>("https://angularhttp-3feef-default-rtdb.firebaseio.com/posts.json",
    {
      headers : new HttpHeaders({
        'Custom-header':'First custom header'
      }),
      params:searchParams,
      observe : 'body',

    }
    )
    .pipe(map(res => {
      console.log(res);
      const postData:Post[] = [];
      for (let key in res){
        if(res.hasOwnProperty(key)){
           postData.push({...res[key],id:key})
        }
      }
      return postData;
    }),
    catchError(errResult => {
      return throwError(errResult)
    })
    )
    
  }
  onDelete(){
    return this.http.delete("https://angularhttp-3feef-default-rtdb.firebaseio.com/posts.json",
   {
     observe:'events',
     responseType:'text'
   } 
    ).pipe(tap(event =>
      { //console.log(event)
        if(event.type === HttpEventType.Sent){
          console.log(event.type);
        }
        if(event.type === HttpEventType.Response){
          console.log(event.body)
        }
      }
    ));
  }
}
