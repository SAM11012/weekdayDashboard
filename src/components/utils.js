export default function capitalizeWords(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}
