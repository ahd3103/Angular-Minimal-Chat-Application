export class User{
  userId:string | undefined
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export class Login{
  email: string | undefined;
  password: string | undefined;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
}

export interface ReqLog {
  EndTime: any;
  StartTime: any;
}





