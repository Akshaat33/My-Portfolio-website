import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
aboutKey: {
type: String,
default: 'main',
unique: true,
required: true
},

aboutText: {
    headline: {
        type: String,
        default: ''
    },
    paragraph1: {
        type: String,
        default: ''
    },
    paragraph2: {
        type: String,
        default: ''
    }
},
education: {
    degree: {
        type: String,
        default: ''
    },
    institute: {
        type: String,
        default: ''
    }
},
learningNow: {
    type: [String],
    default: []
},
links: {
    linkedin: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    phoneno: {
        type: String,
        default: ''
    },
    gmail: {
        type: String,
        default: ''
    },
    leetcode: {
        type: String,
        default: ''
    }
},
cv: {
    url: {
        type: String,
        default: ''
    },
    publicId: {
        type: String,
        default: ''
    }
}

}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);

export default About