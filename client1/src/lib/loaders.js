import ApiRequest from "./apiRequest"
import {defer} from "react-router-dom"

export const SinglePageLoader = async ({request, params}) => {
  const res = await ApiRequest("/posts/"+params.id)
  return res.data
}

export const ListPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = ApiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const ProfilePageLoader = async () => {
  const postPromise = ApiRequest("/users/profilePosts");
  const chatPromise = ApiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse : chatPromise
  })
}