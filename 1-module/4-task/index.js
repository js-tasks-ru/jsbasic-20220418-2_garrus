function checkSpam(str) {
  let newStr = str.toLowerCase()
  if (newStr.includes("xxx") || newStr.includes("1xbet")) return true;
  return false
}