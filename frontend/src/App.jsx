import "./App.css"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function App() {
  return (
    <>
      <h1>
        <Show when="signed-out">
          <SignInButton mode="modal"/>
          <SignUpButton mode="modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </h1>
    </>
  )
}

export default App