export default function checkEmailIsInvalid(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !email || !regex.test(email);
}
