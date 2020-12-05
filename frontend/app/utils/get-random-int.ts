export default function getRandomInt(min: number, max: number): number {
  const minimum = Math.ceil(min);
  const maximum = Math.ceil(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
