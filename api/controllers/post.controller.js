import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {

  const query = req.query

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price:{
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        }
      },
      include:{
        postDetail:true
      }
    });

    res.status(200).json(posts);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Post 🚫" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include:{
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar :true
          }
        }
      }
    });
  // TODO: safe path
    // res.status(200).json(post);

    // TODO: initial approach
    // let userId

    // const token = req.cookies?.token

    // if(!token){
    //   userId = null
    // }
    // else{
    //   jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
    //     if(error){
    //       userId = null
    //     }
    //     else{
    //       userId = payload.id
    //     }
    //   });
    // }

    // const saved = await prisma.savedPost.findUnique({
    //   where:{
    //     userId_postId:{
    //       postId: id,
    //       userId,
    //     }
    //   }
    // })
    // res.status(200).json({ ...post, isSaved : saved ? true : false})

    // TODO: another approach
    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if (!error) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    res.status(200).json({ ...post, isSaved: false });

  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Post 🚫" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {

    const  newPost = await prisma.post.create({
      data:{
        ...body.postData,
        userId: tokenUserId,
        postDetail:{
          create: body.postDetail,
        }
      },
    })
    res.status(200).json(newPost)
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Create Post 🚫" });
  }
};

export const updatePost = async (req, res) => {
  try {
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Post 🚫" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId
  try {

    const post = await prisma.post.findUnique({
      where: { id },
    })

    if(post.userId !== tokenUserId){
      res.status(401).json({ message: "Unauthorized" });
    }

    await prisma.post.delete({
      where: { id },
      include: {
        postDetail:true
      }
    })

    res.status(200).json({message: "Post Deleted"})
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Post 🚫" });
  }
};
