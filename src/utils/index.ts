export const daysLeft = (deadline: Date) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: bigint, raisedAmount: bigint) => {
  const percentage = Math.round((Number(raisedAmount) * 100) / Number(goal));

  return percentage;
};

export const checkIfImage = (url: string, callback: CheckIfImage) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
