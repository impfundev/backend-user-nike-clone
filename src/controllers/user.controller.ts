import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import user from "../models/user.model";

export async function register(req: Request, res: Response) {
  const { firstname, lastname, username, email, password } = req.body;

  if (!username || !username || !email || !password) {
    return res.status(400).send({
      message: "Register failed, field must not empty",
    });
  }

  const hashPassword = bcrypt.hashSync(password, 8);

  const regis = await user
    .create({
      firstname,
      lastname,
      username,
      email,
      password: hashPassword,
    })
    .catch((error) => console.error(error));

  if (!regis) {
    return res.status(500).send({
      message: "Error: Something wrong with the server",
    });
  }

  return res.status(201).send({
    message: "Create user success",
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const getUser = await user.findOne({
    where: {
      email,
    },
  });

  if (!getUser) {
    return res.status(400).send({
      message: "Error, user not found",
    });
  }

  const comparedPassword = bcrypt.compareSync(
    password,
    getUser.dataValues.password
  );

  if (!comparedPassword) {
    return res.status(400).send({
      message: "Error, incorrect password",
    });
  }

  const token = jwt.sign(
    { id: getUser.dataValues.id, username: getUser.dataValues.username },
    process.env.JWT_SECRET!,
    { expiresIn: "2 days" }
  );

  return res
    .cookie("token", token)
    .status(200)
    .send({
      message: "Login Success",
      data: {
        token: token,
      },
    });
}

export async function session(req: Request, res: Response) {
  const token = req.headers.authorization;
  console.log(req.cookies);

  const getSession = jwt.verify(token!, process.env.JWT_SECRET!);

  return res.status(200).send({
    message: "Session user retrieved",
    data: getSession,
  });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  return res.status(200).send({
    message: "Success: You have been logged out",
  });
}

export async function allUsers(req: Request, res: Response) {
  try {
    const all = await user.findAll();

    return res.status(200).send({
      message: "All user data retrieved",
      data: all,
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}

export async function singleUser(req: Request, res: Response) {
  const id = req.params.id;
  const getUser = await user.findOne({
    where: {
      id,
    },
  });

  if (!getUser) {
    return res.status(400).send({
      message: "Error, user not found",
    });
  }

  return res.status(200).send({
    message: "User data retrieved",
    data: getUser.dataValues,
  });
}

export async function updateUser(req: Request, res: Response) {
  const data = req.body;
  const id = req.params.id;

  const updateUser = await user.update(
    {
      ...data,
    },
    {
      where: {
        id,
      },
    }
  );

  if (!updateUser) {
    return res.status(400).send({
      message: "Error, user not found",
    });
  }

  return res.status(200).send({
    message: `Update user data success`,
    data: updateUser,
  });
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;

  const deleteUser = await user.destroy({
    where: {
      id,
    },
  });

  if (!deleteUser) {
    return res.status(400).send({
      message: "Error, user not found",
    });
  }

  return res.status(200).send({
    message: `Delete user success`,
  });
}
