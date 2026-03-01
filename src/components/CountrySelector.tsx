import type { CountrySelectorProps } from '../types';

export default function CountrySelector({
    countries,
    selectedCountry,
    countryLoadingError,
    onCountryChange
}: CountrySelectorProps) {
    return (
        <div className="country-selector">
            { countryLoadingError }    
            <label htmlFor="country">Select country</label>
            <select id="country" value={selectedCountry} onChange={onCountryChange}>
                {
                    countries.map(country => {
                        return (
                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}
