import styles from "./userProfile.module.css";

export default function UserProfile(props){
  const {
    firstName = "demo name", 
    lastName = "demo last-name", 
    age = -1
  } = props;

  return (
    <>
      <section>
        <ul className={`${styles.userDetails} ${styles.border}`}>
          <li>name: {firstName}</li>
          <li>lastname: {lastName}</li>
          <li>age: {age}</li>
        </ul>
      </section>
    </>
  );
}