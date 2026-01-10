import UserProfile from "./components/userProfile/userProfile.jsx";
import LikeButton from "./components/likeButton/likeButton.jsx";

const user = {
  firstName: "john",
  lastName: "doe",
  age: 23,
}

const user1 = {
  firstName: "johni",
  lastName: "doda",
  age: 20,
}

function App() {
  return (
    <>
      <UserProfile 
        firstName={user.firstName} 
        lastName={user.lastName} 
      />

      <UserProfile 
        firstName={user1.firstName} 
        lastName={user1.lastName} 
        age={user1.age}
      />
      
    </>
  );
}

export default App
