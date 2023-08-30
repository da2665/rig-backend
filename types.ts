export interface DirectMessage {
  id: number;
  timestamp: number;
  from: string;
  to: string;
  contents: string;
  attachments: string;
}

export interface User {
  id: number;
  firstName: string,
  lastName: string;
  email_address: string;
  username: string;
  password: string;
  profile_photo: string | null;
  organisationId: number;
  organisationName: string;
  isAuthenticated: boolean;
  messageHistory: DirectMessage[]
}

export interface Organisation {
  id: number;
  name: string;
  username: string;
  password: string;
  users: User[],
  org_photo: string | null;
  isAuthenticated: boolean;
}