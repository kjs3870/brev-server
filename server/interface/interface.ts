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

interface MovieItem {
  title: string;
  link: string;
  image: string;
  subtitle: string;
  pubDate: string;
  director: string;
  actor: string;
  userRating: string;
}

interface MovieResponse {
  data: {
    total: number;
    start: number;
    display: number;
    items: [MovieItem];
  };
}

export { UserInterface, Movie, Repo, User, MovieResponse };
