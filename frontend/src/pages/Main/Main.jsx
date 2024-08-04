import ChatList from "../../components/ChatList/ChatList"
import Chat from "../../components/Chat/Chat"

import style from "./Main.module.css"

const Main = () => {

  return (
    <div className={style.container} style={{padding: 0, margin: 0, display: "flex", flexDirection: "row"}}>
      <ChatList />
      <Chat />
    </div>
  )
}

export default Main
