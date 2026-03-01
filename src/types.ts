export interface CountryResponse {
    name: { text: string }[];
    isoCode: string;
}

export interface Country {
    name: string;
    isoCode: string;
}

export interface CountrySelectorProps {
    countries: Country[];
    selectedCountry: string;
    countryLoadingError: string;
    onCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface HolidaysProps {
    holidays: Holiday[];
    holidayLoadingError: string;
}

export interface Holiday {
    id: string;
    startDate: string;
    name: {text: string}[];
}
