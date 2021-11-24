const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courseBasics = {}
courseBasics.findbyname = findbyname;
courseBasics.register = register;
courseBasics.setgmLink = setgmLink;
courseBasics.setdsLink = setdsLink;
courseBasics.updateProf = updateProf;
courseBasics.getCourse = getCourse;
module.exports = courseBasics;

const courseSchema = new Schema({
    coursename: { type: String, required: true, unique: true },
    courseid: { type: String, required: true, unique: true },
    profname: { type: String, required: true },
    department: { type: String, required: true },
    GroupmeLink: { type: String },
    DiscordLink: { type: String }
});
const courseModel = mongoose.model('Course', courseSchema);

/**
 * finds course in mongodb by keyword
 *
 * @param {String} keyword
 * @return {list} a course instance of courseModel
 *      when err or user not found, course = null
 */
async function findbyname(keyword) {
    const s = keyword;
    var courselist= [];
    const regex = new RegExp(s, 'i');
    courseModel.find({ title: { $regex: regex } }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
             courselist.push(result);
        }
    })
    return courselist;
}

/**
 *  register user with 3 inputs
 *
 * @param {String} coursename
 * @param {String} profname
 * @param {String} department
 *
 * @return {boolean} whether register is successful or not
 */
async function register(coursename, profname, department) {
    try {
        const newCourse = new courseModel({
            coursename: coursename,
            profname: profname,
            courseid: new mongoose.courseModel.ObjectId(),
            department: deparment
        });
        let saveCourse = await newCourse.save();
        if (saveCourse == null) {
            console.log("unable to register Course:");
            console.log(newCourse);
            return false;
        }
        console.log("successfully register new user.");
        console.log(newCourse);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

/**
*  setgmlink with 2 inputs
*
*  @param {String} courseId
*  @param {String} link
*
*  @return {boolean} whether setgmLink is successful or not
*/
async function setgmLink(courseid, link) {
    try {
        if (link == null || courseId == null) {
            console.log("cannot set empty gmlink; please provide a valid gmlink");
            return;
        }
        const filter = { courseId: courseId };
        const update = { 'GroupmeLink': link };
        const options = { runValidators: true, upsert: true };
        let user = await courseModel.updateOne(filter, { $set: update }, options);
        if (user == null) {
            console.log("unable to find the course; failed to set link");
            return false;
        } else {
            console.log("set link to " + link);
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

/**
*  setdslink with 2 inputs
*
*  @param {String} courseId
*  @param {String} link
*
*  @return {boolean} whether setdsLink is successful or not
*/
async function setdsLink(courseid, link) {
    try {
        if (link == null || courseId == null) {
            console.log("cannot set empty dslink; please provide a valid dslink");
            return;
        }
        const filter = { courseId: courseId };
        const update = { 'DiscordLink': link };
        const options = { runValidators: true, upsert: true };
        let user = await courseModel.updateOne(filter, { $set: update }, options);
        if (user == null) {
            console.log("unable to find the course; failed to set link");
            return false;
        } else {
            console.log("set link to " + link);
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

/**
*  updateProf with 2 inputs
*
*  @param {String} courseId
*  @param {String} profname
*
*  @return {boolean} whether updateProf is successful or not
*/
async function updateProf(courseid, profname) {
    try {
        if (profname == null || courseId == null) {
            console.log("cannot set profname null; please provide a valid profname");
            return;
        }
        const filter = { courseId: courseId };
        const update = { 'profname': profname };
        const options = { runValidators: true, upsert: true };
        let user = await courseModel.updateOne(filter, { $set: update }, options);
        if (user == null) {
            console.log("unable to find the course; failed to set profname");
            return false;
        } else {
            console.log("set profname to " + profname);
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

/**
 *  getCourse with 1 input
 *
 *  @param {String} courseId
 *
 *  @return {object}
 */
async function getCourse(courseId) {
    try {
        let course = await courseModel.findOne({ accountId: accountId });
        if (course == null) {
            console.log("unable to find course by courseId: " + courseId);
            return user;
        }
        console.log("successfully find course by courseId: " + courseId);
        return course;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getUserById", "accountId: " + accountId);
        return null;
    }
}