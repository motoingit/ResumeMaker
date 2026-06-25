const getIndianTimeShort = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
    // hour12: false // Forces 24-hour format
  });
};

export default getIndianTimeShort;
