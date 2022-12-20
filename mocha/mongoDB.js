const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');

    const careerSchema = new mongoose.Schema({
        Location: String,
        Skills: String,
        PositionName: String
    });

    const careerData = mongoose.model('testData', careerSchema);


}

async function getData() {
    await mongoose.connect('mongodb://localhost:27017/test');

    const careerData = mongoose.model('testData', careerSchema);

    return careerData.find({});
}

module.exports = {getData};