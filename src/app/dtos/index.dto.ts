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

export interface BookDTO {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

export interface BookUpdateDTO {
  title: string;
  author: string;
  available: boolean;
}
