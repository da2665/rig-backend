import * as mongo from "mongodb";

export interface DirectMessage {
  id: mongo.ObjectId;
  timestamp: number;
  from: string;
  to: string;
  contents: string;
  attachments: string;
}

export interface User {
  id: mongo.ObjectId;
  firstName: string,
  lastName: string;
  email_address: string;
  username: string;
  password: string;
  profile_photo: string | null;
  isAuthenticated: boolean;
  messageHistory: DirectMessage[]
}

export interface Organisation {
  id: mongo.ObjectId;
  name: string;
  username: string;
  password: string;
  users: User[],
  org_photo: string | null;
  isAuthenticated: boolean;
}