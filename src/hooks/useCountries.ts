import { useEffect, useState } from "react";
import type { Country, CountryResponse } from "../types";

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isCountriesLoading, setIsCountriesLoading] = useState(true);
    const [countryLoadingError, setCountryLoadingError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchCountries() {
            try {
                setCountryLoadingError('');
                setIsCountriesLoading(true);
                
                const response = await fetch('https://openholidaysapi.org/Countries?languageIsoCode=EN', { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                setCountries(data.map((country: CountryResponse) => ({
                    name: country.name[0].text,
                    isoCode: country.isoCode
                })));
            } catch (ex) {
                if (ex instanceof Error && ex.name === 'AbortError') {
                    return; // Silently exit, this was an intentional cancellation
                }
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

    return { countries, isCountriesLoading, countryLoadingError };
}
