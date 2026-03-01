import { useCallback, useState } from 'react'
import './App.css'
import CountrySelector from './components/CountrySelector';
import PublicHolidays from './components/PublicHolidays';
import Spinner from './components/Spinner';
import { useCountries } from './hooks/useCountries';
import { useHolidays } from './hooks/useHolidays';
const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const { countries, isCountriesLoading, countryLoadingError } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState('NL');
  const { holidays, isHolidaysLoading, holidayLoadingError } = useHolidays(selectedCountry, CURRENT_YEAR);

  // keep the prop's memory address identical, need to use with React.memo
  const handleCountryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
  }, []);

  return (
    <>
      {isCountriesLoading && <Spinner />}
      <CountrySelector
        countries={countries}
        selectedCountry={selectedCountry}
        countryLoadingError={countryLoadingError}
        onCountryChange={handleCountryChange}
      />
      {isHolidaysLoading && <Spinner />}
      <PublicHolidays
        holidays={holidays}
        holidayLoadingError={holidayLoadingError}
      />
    </>
  )
}

export default App
