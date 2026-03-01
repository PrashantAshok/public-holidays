import { useEffect, useState } from "react";
import type { Holiday } from "../types";

export function useHolidays(selectedCountry: string, currentYear: number) {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [isHolidaysLoading, setIsHolidaysLoading] = useState(true);
    const [holidayLoadingError, setHolidayLoadingError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchHolidays() {
            try {
                setHolidayLoadingError('');
                setIsHolidaysLoading(true);
                
                const response = await fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-31&languageIsoCode=EN`, { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const holidaysResponse = await response.json();
                
                setHolidays(holidaysResponse);
            } catch (ex) {
                if (ex instanceof Error && ex.name === 'AbortError') {
                    return; // Silently exit, this was an intentional cancellation
                }
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
    }, [selectedCountry, currentYear]);

    return { holidays, isHolidaysLoading, holidayLoadingError };
}
