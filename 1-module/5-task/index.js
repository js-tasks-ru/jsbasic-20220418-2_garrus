function truncate(str, maxlength) {
  let newStr = str;
  if (str.length > maxlength) {
    newStr = str.slice(0,maxlength-1) + "…";
  }
  return newStr;
}
