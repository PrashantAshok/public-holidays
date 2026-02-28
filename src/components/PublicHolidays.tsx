export default function PublicHolidays({ holidays }) {
    return (
        <ol className='public-holidays'>
            {
                holidays.map(holiday => {
                    const formattedDate = new Date(holiday.startDate).toLocaleDateString('en-NL', {
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
