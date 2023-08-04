export class UserResponse{
    userId: string | undefined;
    name: string | undefined;
    email: string | undefined;
    message: string | undefined;
    
  }

  export class UserModel{
    token:string | undefined;
    profile:UserResponse | undefined;
  }

  export class LogResponse{
    IPOfCaller: string | undefined;
    Method: string | undefined;
    Path: string | undefined;
    QueryString: QueryString | undefined; 
    RequestBody: string | undefined;
    TimeOfCall: number | undefined;
    UserName: string | undefined;
  }

  export class QueryString {
    Key: string | undefined;
    Value: string | undefined;
  }

  
  
  
  
  
  


