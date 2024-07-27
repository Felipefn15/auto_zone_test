import './App.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';

function App() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [makesOptions, setMakesOptions] = useState([]);
  const [modelsOptions, setModelsOptions] = useState([]);

  useEffect(() => {
    if (selectedYear !== '') {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json&modelyear=${selectedYear}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMakesOptions(data?.Results.map((make) => ({ value: make.Make_ID, label: make.Make_Name})));
      });
    }
  }, [selectedYear]);

  useEffect(() => { 
    if (selectedYear !== '' && selectedMake !== '') {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${selectedMake}/modelyear/${selectedYear}?format=json`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setModelsOptions(data?.Results.map((model) => ({ value: model.Model_ID, label: model.Model_Name})));
        });
      }
    }, [selectedYear, selectedMake]);

   const years = [
    { value: '1995', label: '1995' },
    { value: '1996', label: '1996' },
    { value: '1997', label: '1997' },
    { value: '1998', label: '1998' },
    { value: '1999', label: '1999' },
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2004', label: '2004' },
    { value: '2005', label: '2005' },
    { value: '2006', label: '2006' }, 
    { value: '2007', label: '2007' },
    { value: '2008', label: '2008' },
    { value: '2009', label: '2009' },
    { value: '2010', label: '2010' },
    { value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]

  const handleYearChange = (data) => {
    setSelectedYear(data.value);
  }

  const handleMakeChange = (data) => {
    console.log(data);
    setSelectedMake(data.value);
  }

  const handleModelChange = (data) => {
    setSelectedModel(data.value);
  }

  const defaultStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: 'none',
      color: 'black',
      padding: '8px 0px 8px 0px',
      ":hover": {
        cursor: 'pointer',
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      boxShadow: 'none',
      color: 'black',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#5b5d5b',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderBottom: '1px solid #ccc',
      color: 'black',
      ":hover": {
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid #ccc',
        color: 'black',
        cursor: 'pointer',
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  }

  return (
    <div className="App">
      <div className='divider'/>
      <header className="header">
        <div className="header-content">
          <h2 className='header-title'>
            SET YOUR VEHICLE
          </h2>
          <p className='header-description'>
            Get an exact fit for your vehicle.
          </p>
        </div>
      <Select
        className="optionsSelect"
        name="year"
        isSearchable
        defaultValue={selectedYear}
        options={years}
        onChange={handleYearChange}
        placeholder="1 | Year"
        styles={defaultStyles}
      />
      <Select
        className="optionsSelect"
        name="year"
        isSearchable
        defaultValue={selectedMake}
        options={makesOptions}
        onChange={handleMakeChange}
        placeholder="2 | Make"
        isDisabled={selectedYear === ''}
        styles={defaultStyles}
      />
      <Select
        className="optionsSelect"
        name="year"
        isSearchable
        defaultValue={selectedModel}
        options={modelsOptions}
        onChange={handleModelChange}
        placeholder="3 | Model"
        isDisabled={selectedMake === ''}
        styles={defaultStyles}
      />
      </header>
    </div>
  );
}

export default App;
