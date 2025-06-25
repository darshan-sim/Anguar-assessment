enum Role {
  USER = 'user',
  LIBRARIAN = 'librarian',
}

export interface UserLogin {
  id: number;
  username: string;
  role: Role;
  token: string;
}

export interface LibrarianLogin {
  id: number;
  username: string;
  role: Role;
  token: string;
}
