export function getAgeFrom(birthDate) {
  if (!birthDate) {
    return '?';
  }
  const [birthYear, birtMonth, birthDay] = birthDate.split('-');

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const age = todayYear - parseInt(birthYear, 10);

  if (parseInt(birtMonth, 10) > todayMonth) {
    return age - 1;
  }

  if (
    parseInt(birtMonth, 10) === todayMonth &&
    parseInt(birthDay, 10) > todayDay
  ) {
    return age - 1;
  }

  console.log(age);
  return age;
}
