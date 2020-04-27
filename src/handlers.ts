import { Request, Response } from "express";
import path from "path";

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = (name) => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
  return res.render(path.join(__dirname + "/views/index.ejs"));
};

export const helloHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { name = "World" } = params;
  const response = helloBuilder(name);

  return res.json(response);
};
