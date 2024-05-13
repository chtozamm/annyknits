type Counter = {
  id: string;
  value: number;
  name: string;
  theme: string;
  user_id: string; // Foreign key
};

type User = {
  id: string;
  // name: string;
  email: string;
};

type UserSignIn = {
  email: string;
  password: string;
};

type UserSignUp = {
  // name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
