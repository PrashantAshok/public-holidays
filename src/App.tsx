import { useEffect, useState } from 'react'
import './App.css'
import CountrySelector from './components/CountrySelector';
import PublicHolidays from './components/PublicHolidays';
import Spinner from './components/Spinner';
import type { Holiday, Country, CountryResponse } from './types';
const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('NL');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isCountriesLoading, setIsCountriesLoading] = useState(true);
  const [isHolidaysLoading, setIsHolidaysLoading] = useState(true);
  const [countryLoadingError, setCountryLoadingError] = useState('');
  const [holidayLoadingError, setHolidayLoadingError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCountries() {
      try {
        setCountryLoadingError('');
        setIsCountriesLoading(true);
        const response = await fetch('https://openholidaysapi.org/Countries?languageIsoCode=EN', { signal });
        const data = await response.json();
        setCountries(data.map((country: CountryResponse) => ({
          name: country.name[0].text,
          isoCode: country.isoCode
        })));
      } catch (ex) {
        console.error('error loading countries', ex);
        setCountryLoadingError('Error loading countries');
      } finally {
        setIsCountriesLoading(false);
      }

    }
    fetchCountries();

    return () => {
      controller.abort();
    }
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchHolidays() {
      try {
        setHolidayLoadingError('');
        setIsHolidaysLoading(true);
        const response = await fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=${CURRENT_YEAR}-01-01&validTo=${CURRENT_YEAR}-12-31&languageIsoCode=EN`, { signal });
        const holidaysResponse = await response.json();
        setHolidays(holidaysResponse);
      } catch (ex) {
        console.error('error loading holidays', ex);
        setHolidayLoadingError('Error loading holidays');
      } finally {
        setIsHolidaysLoading(false);
      }
    }

    fetchHolidays();

    return () => {
      controller.abort();
    }
  }, [selectedCountry]);

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
