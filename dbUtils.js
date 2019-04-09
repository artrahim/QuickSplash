
let mongoose = require('mongoose');

// set up default conn with the password
let db = 'mongodb+srv://A:ABCd1234!@quicksplash-db-dmuwu.mongodb.net/test?retryWrites=true';
mongoose.connect(db, {useNewUrlParser: true});
let qpDB = mongoose.connection;

let Questions = require('./questionModel');

Questions.countDocuments({}, function(err, count){
    console.log( "Number of docs: ", count );
    let randIndex = Math.floor(Math.random() * count);
    let rE= Questions.findOne({}).limit(1);
    console.log(rE);



});

// let n = Questions.count();
// console.log('Count\t '+n);
// let r = Math.floor(Math.random() * n);
// let randomElement = Questions.skip(r);

// console.log(randomElement);
