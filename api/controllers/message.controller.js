import prisma from "../lib/prisma.js"

export const addMessage =  async (req, res) => {
  try {
    res.status(200).json(message)
  } 
  catch (error) {
    console.log(error);
    res.status.json({message : "Failed to Add Message 🤔`"})
  }
}