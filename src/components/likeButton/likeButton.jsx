import { useState } from "react";

export default function LikeButton(){
  const [likes, setLike] = useState(0);
  return (
    <button onClick={()=>setLike(likes + 1)}>{likes} like</button>
  );
}