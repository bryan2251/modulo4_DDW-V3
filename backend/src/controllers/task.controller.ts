import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: "El título es obligatorio",
    });
  }

  try {
    const newTask = await prisma.task.create({
      data: { title },
    });

    res.status(201).json(newTask);
  } catch {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch {
    res.status(404).json({ error: "Tarea no encontrada o error al eliminar" });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        completed: !task.completed,
      },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};