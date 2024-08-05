import ChatList from "../../components/ChatList/ChatList"
import Chat from "../../components/Chat/Chat"

import styles from "./Main.module.css"

const Main = () => {

  return (
    <div className={styles.container} style={{padding: 0, margin: 0, display: "flex", flexDirection: "row"}}>
      <ChatList />
      <Chat />
    </div>
  )
}

export default Main
