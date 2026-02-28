import { useEffect, useState } from 'react'
import './App.css'
import CountrySelector from './components/CountrySelector';
import PublicHolidays from './components/PublicHolidays';
import Spinner from './components/Spinner';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('NL');
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      setIsLoading(true);
      try {
        const response = await fetch('https://openholidaysapi.org/Countries?languageIsoCode=EN');
        const data = await response.json();
        setCountries(data.map((country: { name: { text: string; }[]; isoCode: string; }) => ({
          name: country.name[0].text,
          isoCode: country.isoCode
        })));
        await fetchHolidays(selectedCountry, new Date().getFullYear());
      } catch (ex) {
        console.error('error loading countries', ex);
      } finally {
        setIsLoading(false);
      }

    }
    fetchCountries();
  }, []);

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    const currentYear = new Date().getFullYear();
    await fetchHolidays(selectedCountry, currentYear);
  }

  const fetchHolidays = async (selectedCountry: string, currentYear: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-31&languageIsoCode=EN`);
      const holidaysResponse = await response.json();
      setHolidays(holidaysResponse);
    } catch (ex) {
      console.error('error loading holidays', ex);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <CountrySelector
        countries={countries}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
      />
      <PublicHolidays
        holidays={holidays}
      />
    </>
  )
}

export default App
