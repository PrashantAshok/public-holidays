import type { HolidaysProps } from "../types";

export default function PublicHolidays({ holidays, holidayLoadingError }: HolidaysProps) {
    if (holidayLoadingError) {
        return <p className="error">{holidayLoadingError}</p>;
    }

    if (holidays.length === 0) {
        return <p>No holidays found.</p>;
    }

    return (
        <ol className='public-holidays'>
            {
                holidays.map(holiday => {
                    const formattedDate = new Date(holiday.startDate).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                    });
                    return (
                        <li key={holiday.id}>{formattedDate} - {holiday.name[0].text}</li>
                    );
                })
            }
        </ol>
    )
}
