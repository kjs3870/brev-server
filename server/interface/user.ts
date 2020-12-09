interface UserUpdate {
  nickname?: string;
  password?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

interface UserSignUp {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export { UserUpdate, UserSignUp };
