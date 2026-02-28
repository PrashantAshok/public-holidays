export default function CountrySelector({ countries, selectedCountry, handleCountryChange }) {
    return (
        <section className="country-selector">
            <select value={selectedCountry} onChange={handleCountryChange}>
                {
                    countries.map(country => {
                        return (
                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                        )
                    })
                }
            </select>
        </section>
    )
}
