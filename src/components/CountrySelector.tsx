import React from 'react';
import type { CountrySelectorProps } from '../types';

// React.memo - Only render if the props actually change
export default React.memo(function CountrySelector({
    countries,
    selectedCountry,
    countryLoadingError,
    onCountryChange
}: CountrySelectorProps) {
    return (
        <div className="country-selector">
            {countryLoadingError && (
                <p className="error" role="alert">{countryLoadingError}</p>
            )}
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
})
