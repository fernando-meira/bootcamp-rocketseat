import { Response, Request } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: "Fernando", 
    email: 'fernando.santos121@fatec.itapetininga.edu.br', 
    password: "12345",
    techs: [
      "NodeJS",
      "ReactJS",
      "TypeScript",
      {title: "Javascript", experience: 100},
      {title: "NodeJS", experience: 65}
    ]
  });
  
  return response.json({ message: "Hello World", user: user})
};