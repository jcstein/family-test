import './App.css'
import { ConnectKitButton } from 'connectkit'

function App() {
  return (
    <div className="App">
      <h1>modular dapp</h1>
      <h2>RollKit, Celestia, and Ethermint</h2>
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh',
      }}
    >
      <ConnectKitButton />
    </div>
    </div>
  )
}

export default App
