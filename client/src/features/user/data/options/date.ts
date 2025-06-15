import { OptionSet } from '#types';

const DateOptionSet: OptionSet = 
{
    type:               'scroll',

    scroll: 
    {
        label:          'Date',
        mode:           'dynamic',
        
        initialValue: 
        {
            dynamic:    ['september', 26, 1990],
            static:     [],
            reactive:   {},
        },
      
        externalValue: 
        {
            dynamic:    [],
            static:     [],
            reactive:   {},
        },
      
        options: {
          dynamic: ({ scrollValues }) => {
            const [month, day, year] = scrollValues ?? ['january', 1, new Date().getFullYear()];
            
            return [
              generateMonths(),
              generateDays(month as string, year as number),
              generateYears(),
            ];
          },
        },
    },
};

const monthData = 
[
    ['january',     31],
    ['february',    28],
    ['march',       31],
    ['april',       30],
    ['may',         31],
    ['june',        30],
    ['july',        31],
    ['august',      31],
    ['september',   30],
    ['october',     31],
    ['november',    30],
    ['december',    31],
] as const;

function isLeapYear(year: number): boolean 
{
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function generateMonths() 
{
    return monthData.map(([name]) => (
    {
        label: name[0].toUpperCase() + name.slice(1, 3),
        value: name,
    }));
}

function generateYears(span = 120) 
{
    const start = new Date().getFullYear() - span;
    return Array.from({ length: span + 1 }, (_, i) => 
    {
        const year = start + i;
        return { label: `${year}`, value: year };
    });
}

function generateDays(month: string, year: number) 
{
    const monthEntry = monthData.find(([name]) => name === month);

    if (!monthEntry) return [];

    const [m, baseDays] = monthEntry;
    const daysInMonth   = month === 'february' && isLeapYear(year) ? 29 : baseDays;

    return Array.from({ length: daysInMonth }, (_, index) => (
    {
        label: `${index + 1}`,
        value: index + 1,
    }));
}


export default DateOptionSet;
