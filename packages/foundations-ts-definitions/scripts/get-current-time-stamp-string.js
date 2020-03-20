// Get current utc time stamp string
module.exports = () => {
  const today = new Date()
  const todayTimeStamp = `${today.getUTCFullYear()}-${today
    .getUTCMonth()
    .toString()
    .padStart(2, '0')}-${today
    .getUTCDate()
    .toString()
    .padStart(2, 0)}`

  return todayTimeStamp
}
