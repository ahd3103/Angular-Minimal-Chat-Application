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
    ipOfCaller: string | undefined;
    method: string | undefined;
    path: string | undefined;
    queryString: QueryString | undefined; 
    requestBody: string | undefined;
    timeOfCall: number | undefined;
    userName: string | undefined;
  }

  export class QueryString {
    Key: string | undefined;
    Value: string | undefined;
  }

  
  
  
  
  
  


