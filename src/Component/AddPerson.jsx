import React, { useState } from 'react';

function AddPerson() {
  const [people, setPeople] = useState([]);
  
  const addRow = () => {
    const newPerson = {
      name: '',
      dob: '',
      aadhar: '',
      mobile: '',
      age: '',
      isSaved: false
    };
    setPeople([...people, newPerson]);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleInputChange = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    if (field === 'dob') {
      newPeople[index].age = calculateAge(value);
    }
    setPeople(newPeople);
  };

  const savePerson = (index) => {
    const newPeople = [...people];
    const person = newPeople[index];

    if (!person.name || !person.dob || !person.aadhar || !person.mobile) {
      alert('All fields are required!');
      return;
    }
    if (person.aadhar.length !== 12) {
      alert('Aadhar Number must be 12 digits');
      return;
    }
    if (person.mobile.length !== 10) {
      alert('Mobile Number must be 10 digits');
      return;
    }

    person.isSaved = true;
    setPeople(newPeople);

    const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
    storedPeople.push(person);
    localStorage.setItem('people', JSON.stringify(storedPeople));
  };

  const deletePerson = (index) => {
    const newPeople = [...people];
    if (newPeople[index].isSaved) {
      const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
      const updatedPeople = storedPeople.filter(
        (person) => person.aadhar !== newPeople[index].aadhar
      );
      localStorage.setItem('people', JSON.stringify(updatedPeople));
    }
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>
                <input
                placeholder='Name'
                  type="text"
                  value={person.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={person.dob}
                  onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                />
              </td>
              <td>
                <input
                placeholder='Aadhar Number'
                  type="text"
                  value={person.aadhar}
                  onChange={(e) => handleInputChange(index, 'aadhar', e.target.value)}
                />
              </td>
              <td>
                <input
                placeholder='Mobile Number'
                  type="text"
                  value={person.mobile}
                  onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
                />
              </td>
              <td>{person.age}</td>
              <td>
                <button onClick={() => savePerson(index)}>Save</button>
                <button onClick={() => deletePerson(index)} className="del">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
}

export default AddPerson;
