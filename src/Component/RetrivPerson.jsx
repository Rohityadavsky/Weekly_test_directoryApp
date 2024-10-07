import React, { useState } from 'react';

function RetrievePerson() {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);
  const [noMatch, setNoMatch] = useState(false);

  const retrievePerson = () => {
    const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
    const foundPerson = storedPeople.find(p => p.aadhar === aadhar);

    if (foundPerson) {
      setPerson(foundPerson);
      setNoMatch(false);
    } else {
      setPerson(null);
      setNoMatch(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <button onClick={retrievePerson}>Retrieve</button>

      {person && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
            </tr>
          </tbody>
        </table>
      )}

      {noMatch && <p>No match found</p>}
    </div>
  );
}

export default RetrievePerson;
