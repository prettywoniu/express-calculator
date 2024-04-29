const express = require('express');
const {convertAndValidateNumsArray, getMean, getMedian, getMode, writeToFile} = require('./helpers')
const ExpressError = require("./expressError")

const app = express();

app.get('/all', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error) {
        throw new ExpressError(nums.message, 400)
    }

    let result = {
        operation: "all",
        mean: getMean(nums),
        median: getMedian(nums),
        mode: getMode(nums)
    }

    return res.send(result);
})

app.get('/mean', (req, res, next) => {
    let save = true;
    if (!req.query.save) {
        save = false;
    } else {
        save = (req.query.save === 'true')? true : false; 
    }

    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error) {
        throw new ExpressError(nums.message, 400)
    }
    
    let result = {
        operation: "mean",
        value: getMean(nums)
    }

    if (save) {
        writeToFile(result);
    }

    return res.send(result);
})

app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error) {
        throw new ExpressError(nums.message, 400)
    }

    let result = {
        operation: "median",
        value: getMedian(nums)
    }
    return res.send(result);
})

app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error) {
        throw new ExpressError(nums.message, 400)
    }

    let result = {
        operation: "mode",
        value: getMode(nums)}
    return res.send(result);
})

/** 404 handler */
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
});
  
/** general error handler */
app.use(function (err, req, res, next) { 
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})