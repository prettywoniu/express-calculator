const fs = require('fs');

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
  
    for (let i = 0; i < numsAsStrings.length; i++) {
      let valToNumber = Number(numsAsStrings[i]);
  
      if (Number.isNaN(valToNumber)) {
        return new Error(
          `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
        );
      }
  
      result.push(valToNumber);
    }
    return result;
  }

function getMean(arr) {
    let sum = 0
    arr.forEach(num => {
        sum += num;
    });
    let mean = sum / arr.length;
    return mean;
}

function getMedian(arr) {
    arr.sort(compareNumbers);
    
    let median = null;
    let mid = Math.floor(arr.length / 2);
    if(arr.length % 2 === 1) {
        median = arr[mid];
    }
    else {
        let mid1 = arr[mid - 1];
        let mid2 = arr[mid];
        median = (mid1 + mid2) / 2;
    }

    return median;
}

function getMode(arr) {
    let modeObj = {};
    arr.forEach( num => {
        if(!modeObj[num]) modeObj[num] = 0;
        modeObj[num]++;
    });

    let maxFreq = 0;
    let modes = [];

    for(let num in modeObj) {
        if(modeObj[num] > maxFreq) {
            modes = [Number(num)];
            maxFreq = modeObj[num];
        }
        else if(modeObj[num] === maxFreq) {
            modes.push(Number(num));
        }
    }

    if(modes.length === Object.keys(modeObj).length) {
        modes = [];
    }

    return modes;
}

function compareNumbers(a, b) {
    return a - b;
}

function writeToFile(obj) {
    let objWTime = {... obj};
    objWTime.timestamp = Date.now();
    fs.writeFile('./result.json', JSON.stringify(objWTime), "utf8", (err) =>{
        if(err) {
            console.error(err);
            Process.exit(1);
        }
    })
    console.log('Successfully wrote to file!');
}

module.exports = {
    convertAndValidateNumsArray: convertAndValidateNumsArray,
    getMean: getMean,
    getMedian: getMedian,
    getMode: getMode,
    writeToFile: writeToFile
};
