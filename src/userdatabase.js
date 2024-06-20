const users = [
    {
      username: 'testUser',
      password: 'testPassword'
    }
  ];
  
  export const validateUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
  };
  
  export const saveUser = (username, password) => {
    users.push({ username, password });
  };