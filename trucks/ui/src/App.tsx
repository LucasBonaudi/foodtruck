import "./App.css"
import { Counter } from "./features/counter/Counter"
import { TruckMap } from "./features/truckmap/truckmap"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <TruckMap />
    </div>
  )
}

export default App
