import { prisma } from "../prisma/client";

export const getTasks = async (req: any, res: any) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

export const createTask = async (req: any, res: any) => {
  const { title } = req.body;

  const newTask = await prisma.task.create({
    data: { title },
  });

  res.json(newTask);
};

export const deleteTask = async (req: any, res: any) => {
  const id = parseInt(req.params.id);

  await prisma.task.delete({
    where: { id },
  });

  res.json({ message: "Task deleted" });
};

export const toggleTask = async (req: any, res: any) => {
  const id = parseInt(req.params.id);

  const task = await prisma.task.findUnique({
    where: { id },
  });

  const updated = await prisma.task.update({
    where: { id },
    data: {
      completed: !task?.completed,
    },
  });

  res.json(updated);
};