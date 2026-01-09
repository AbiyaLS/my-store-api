
export default function formatedDate(date) {
  return date.toLocaleDateString("en-US",{
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}
