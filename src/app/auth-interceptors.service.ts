import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>,next: HttpHandler){//executed b4 the response or request
     console.log("the request continue");
    //  if you want to modify the req 
    // can use
    const modifiedReq = req.clone({
     headers : req.headers.append("Auth","key")
    })
     //return next.handle(req);
    //  send the modified one not former
     return next.handle(modifiedReq);
  }
}