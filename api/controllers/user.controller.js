import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const tokenUserId = req.userId;

    console.log(tokenUserId, id);
    if (tokenUserId !== id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this user" });
    }

    const { email, username, password, avatar } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    const updatedUser = await prisma.user.update({
      where: { id },

      data: {
        email,
        username,
        password: hashedPassword,
        avatar,
      },
    });

    console.log(updatedUser);

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;

    console.log(tokenUserId, id);

    if (tokenUserId !== id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this user" });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
