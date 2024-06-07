import prisma from "../lib/prisma.js";

export const getChats =  async (req, res) => {

  const tokenUserId = req.userId;

  try {

    const chats = await prisma.chat.findMany({
      where:{
        userIDs:{
          hasSome: [tokenUserId]
        }
      }
    })
    res.status(200).json(chats);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to get Chats 😔"})
  }
}

export const getChat =  async (req, res) => {
  try {
    res.status(200).json(users);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to get Chats 😔"})
  }
}

export const addChat =  async (req, res) => {
  try {
    res.status(200).json(users);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to Add Chat 😔"})
  }
}

export const readChat =  async (req, res) => {
  try {
    res.status(200).json(users);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to Read Chat 😔"})
  }
}



