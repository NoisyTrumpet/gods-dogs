function getAgeString(timestamp: number): string {
  const now = new Date();
  const then = new Date(timestamp * 1000);
  const diffYears = now.getFullYear() - then.getFullYear();
  const diffMonths = now.getMonth() - then.getMonth();
  const totalMonths = diffYears * 12 + diffMonths;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0 && months === 0) {
    return "Less than a month old";
  } else if (years === 0) {
    return `${months} ${months === 1 ? "Month" : "Months"} old`;
  } else if (months === 0) {
    return `${years} ${years === 1 ? "Year" : "Years"} old`;
  } else {
    return `${years} ${years === 1 ? "Year" : "Years"} and ${months} ${
      months === 1 ? "Month" : "Months"
    } old`;
  }
}

export default getAgeString;
