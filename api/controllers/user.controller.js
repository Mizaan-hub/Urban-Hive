import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users 😔" });;
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user 😟" });

  }
};

export const updateUser = async (req, res) => {

  const id = req.params.id;
  const tokenUserId = req.userId
  const body = req.body;

  if(id !== tokenUserId){
    return res.status(401).json({message:"Not Authorized!!"})
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {id},
      data: body
    })

    return res.status(200).json(updatedUser)
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed To Get User 😔',
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed To Get User 😔',
    })
  }
}
