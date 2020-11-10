interface UserInterface {
  email: string;
  nickname: string;
  password: string;
}

interface Movie {
  id: number;
  title: string;
  userEmail: string;
}

interface Repo {
  id: number;
  name: string;
  url: string;
  userEmail: string;
}

type User = {
  email: string;
  nickname: string;
  password: string;
  createdAt: Date;
  movies: [Movie];
  repos: [Repo];
};

export { UserInterface, Movie, Repo, User };
