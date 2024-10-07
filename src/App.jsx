import {useState} from "react";
import AddPerson from "./Component/AddPerson";
import RetrievePerson from "./Component/RetrivPerson";
import Header from "./Component/Header";

import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('add');
  return (
    <>
    <Header />
    <div className="App">
      <div>
        <button onClick={() => setActiveTab('add')}>Add New Person</button>
        <button onClick={() => setActiveTab('retrieve')}>Retrieve Information</button>
      </div>

      {activeTab === 'add' && <AddPerson />}
      {activeTab === 'retrieve' && <RetrievePerson />}
    </div>
    </>
  )
}
export default App;
