import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [creatureList, setCreatureList] = useState([
    // { name: 'Unicorn', origin: 'Britain' },
    // { name: 'Sphinx', origin: 'Egypt' },
    // { name: 'Jackalope', origin: 'America' }
  ]);

  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');


  const fetchCreature = () => {
    //make a get request
    axios({
      method: 'GET',
      url: '/creature'
    }).then(response => {
      console.log(response.data);
      setCreatureList(response.data);
    }).catch(err => {
      console.log(err);
    });
  };


  // kinda like document ready, will get called when document loads
  useEffect(() => {
    fetchCreature();
  }, [])

    const addCreature = (event) => {
      event.preventDefault();

      console.log(newCreatureName, newCreatureOrigin);

      //POST THE DATA TO THE DB:

      axios.post('/creature', {name: newCreatureName, origin: newCreatureOrigin})
      .then( response => {
        //GET
        fetchCreature();
        //clear inputs
        setNewCreatureName('');
        setNewCreatureOrigin('');

      }).catch( err=> {
        console.log(err);
      })

    }
  return (
    <div>
      <form >
        <label htmlFor="name">Name:</label>
        <input 
        id="name" 
        type="text"
        onChange={(event) => setNewCreatureName(event.target.value)} 
        value={newCreatureName}
        />
        <label htmlFor="origin">Origin:</label>
        <input 
        id="origin" 
        type="text"
        onChange={(event) => setNewCreatureOrigin(event.target.value)} 
        value={newCreatureOrigin} 

        />
        <button>ADD CREATURE</button>
      </form >
        
      <ul>
        {creatureList.map(creature =>
        (<li key={creature.id}>{creature.name} is from {creature.origin}</li>)
        )}
      </ul>
    </div>
  );
}
export default App
