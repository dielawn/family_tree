const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    first: { type: String, },
    middle: { type: String, },
    last: { type: String },
    maiden: { type: String},
    common: { type: String },
});

const mediaSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String },
    upload_date: { type: Date }
});

const eventSchema = new Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true }
});

const childSchema = new Schema({
    name: { type: String, required: true },
    dob: { type: Date },
    dod: { type: Date },
    father: { type: Schema.Types.ObjectId, ref: 'Person' },
    mother: { type: Schema.Types.ObjectId, ref: 'Person' },
});

const personSchema = new Schema({
    name:  nameSchema ,
    bio: { type: String },
    dob: { type: Date, },
    events: [eventSchema],
    dod: { type: Date, },
    father: { type: Schema.Types.ObjectId, ref: 'Person' }, 
    mother: { type: Schema.Types.ObjectId, ref: 'Person' },
    adoptive_father_name: { type: String },
    adoptive_mother_name: { type: String },
    children: [childSchema],
    references: [mediaSchema],
    photos: [mediaSchema],
    audio: [mediaSchema],
    video: [mediaSchema]
});

const Person = mongoose.model('Person', personSchema);
const Name = mongoose.model('Name', nameSchema);

module.exports = Person;
module.exports = Name;