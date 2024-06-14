const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    first: { type: String, },
    middle: { type: String, },
    last: { type: String, },
    maiden: { type: String},
    common: { type: String },
});

const mediaSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String },
    date: { type: Date }
});

const eventSchema = new Schema({
    discription: { type: String, required: true},
    date: { type: Date, required: true}
});

const personSchema = new Schema({
    name:  nameSchema ,
    bio: { type: String },
    dob: { type: Date, },
    events: [eventSchema],
    dod: { type: Date, },
    bio_father: { type: Schema.Types.ObjectId, ref: 'Person' }, 
    bio_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    adoptive_father: { type: Schema.Types.ObjectId, ref: 'Person' },
    adoptive_mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    refrences: [mediaSchema],
    photos: [mediaSchema],
    audio: [mediaSchema],
    video: [mediaSchema]
});

const Person = mongoose.model('Person', personSchema)
const Name = mongoose.model('Name', nameSchema)

module.exports = Person;
module.exports = Name;