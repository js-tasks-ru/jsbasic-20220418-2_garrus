function getMinMax(str) {
  let nums = str.split(" ")
             .filter(item => !isNaN(parseInt(item)));

  return {
    min: Math.min(...nums),
    max: Math.max(...nums),
  };
}

