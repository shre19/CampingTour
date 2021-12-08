const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground  = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61741aca0027e24c48fb639e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ducimus maiores.
            Laborum in consequuntur itaque quibusdam alias, eos iure unde numquamillo nostrum, dolores, tempora id beatae! Cumque, iure eius.`,
            price,
            geometry: { type: 'Point', coordinates: [ 72.83333, 18.96667 ] },
            images: [
                {
                  url: 'https://res.cloudinary.com/detwxflig/image/upload/v1638853476/YelpCamp/jn47vg4wmdjwsfzlcsqq.jpg',
                  filename: 'YelpCamp/jn47vg4wmdjwsfzlcsqq'
                },
                {
                  url: 'https://res.cloudinary.com/detwxflig/image/upload/v1638853479/YelpCamp/qsa9favgospcklpwf1eb.jpg',
                  filename: 'YelpCamp/qsa9favgospcklpwf1eb'
                },
                {
                  url: 'https://res.cloudinary.com/detwxflig/image/upload/v1638853489/YelpCamp/wxsnlv2azpzlpklhko6h.jpg',
                  filename: 'YelpCamp/wxsnlv2azpzlpklhko6h'
                }
              ]

        });
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
})