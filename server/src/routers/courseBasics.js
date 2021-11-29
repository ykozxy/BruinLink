const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courseBasics = {};
courseBasics.findbyname = findbyname;
courseBasics.setgmLink = setgmLink;
courseBasics.setdsLink = setdsLink;
courseBasics.updateProf = updateProf;
courseBasics.getCourseInfo = getCourseInfo;
courseBasics.getDepartmentsResponse = getDepartmentsResponse;
courseBasics.getCourseResponse = getCourseResponse;
module.exports = courseBasics;

const courseSchema = new Schema({
    coursename: { type: String, required: true, unique: true },
    courseid: { type: String, required: true, unique: true },
    profname: { type: String, required: true },
    department: { type: String, required: true },
    division: { type: String, required: true },
    groupmeLink: { type: String },
    discordLink: { type: String },
    wechatQRCode: { type: Buffer }
});
const courseModel = mongoose.model('Course', courseSchema);

/**
 * finds course in mongodb by keyword
 *
 * @param {String} keyword
 * @return {list} a course instance of courseModel
 *      when err or user not found, course = null
 */
async function findbyname(course, department, division) {
    var courselist = [];
    let course_key = new RegExp(course, 'i');
    let department_key = new RegExp(department, 'i');
    let division_key = new RegExp(division, 'i');
    var i;
    await courseModel.find({
        coursename: {$regex: course_key, $options: 'i'},
        department: {$regex: department_key, $options: 'i'},
        divison: {$regex: division_key, $options: 'i'}
    });
    for (i = 0; i < courses.length; i++) {
        get_course = courses[i];
        if (get_course != null) {
            let wechat = false;
            let groupme = false;
            let discord = false;
            if (get_course.wechatQRCode != null) {
                wechat = true;
            }
            if (get_course.groupmeLink != null) {
                groupme = true;
            }
            if (get_course.discord != null) {
                discord = true;
            }
            courselist.push({
                courseid: get_course.courseid,
                coursename: get_course.coursename,
                profname: get_course.profname,
                department: get_course.department,
                divison: get_course.divison,
                wechat: wechat,
                groupme: groupme,
                discord: discord
            });
        }
        return courselist;
    }
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
            department: department
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
        const filter = { courseid: courseid };
        const update = { groupmeLink: link };
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
        const filter = { courseid: courseid };
        const update = { discordLink: link };
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
        const filter = { courseid: courseid };
        const update = { profname: profname };
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

async function getCourseInfo(courseid) {
    try {
        let course = await courseModel.findOne({ courseid: courseid });
        if (course == null) {
            console.log("unable to find course by courseid: " + courseid);
            return user;
        }
        console.log("successfully find course by courseid: " + courseid);
        return course;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getUserById", "courseid: " + courseid);
        return null;
    }
}

async function getDepartmentsResponse() {
    try {
        departmentsList = [];
        departmentsList = courseModel.distinct("department");
        return departmentsList;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getCourseResponse(course_arg) {
    try {
        coursename = course_arg.coursename;
        department = course_arg.department;
        division = course_arg.division;
        return findbyname(coursename, department, division);
    } catch (err) {
        console.log(err);
        return null;
    }
}
