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
  const tokenUserId = req.userId
  try {
    const chat = await prisma.chat.findUnique({
      where:{
        id: req.params.id,
        userIDs:{
          hasSome: [tokenUserId]
        }
      },
      include:{
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    await prisma.chat.update({
      where:{
        id:req.params.id
      },
      data:{
        seenBy: {
          push: [tokenUserId]
        }
      }
    })
    res.status(200).json(chat);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to get Chats 😔"})
  }
}

export const addChat =  async (req, res) => {
  const tokenUserId = req.userId
  try {
    const newChat = await prisma.chat.create({
      data:{
        userIDs: [tokenUserId, req.body.receiverId]
      }
    })
    res.status(200).json(newChat);
  } 
  catch (error) {
    console.log(error);
    res.status.json(500)({message: "Failed to Add Chat 😔"})
  }
}

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Read Chat 🥲" });
  }
};



