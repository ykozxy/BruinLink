const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const courseModel = require('./courseModel');

var courseBasics = {};
courseBasics.findbyname = findbyname;
courseBasics.getDetailResponse = getDetailResponse;
courseBasics.getDepartmentsResponse = getDepartmentsResponse;
courseBasics.getCourseResponse = getCourseResponse;
courseBasics.register = register;

module.exports = courseBasics;

/**
 * finds course in mongodb by keyword
 *
 * @param {String} course
 * @param {String} department
 * @param {String} division
 * @return {list} a list of courses found
 */
async function findbyname(course, department, division) {
    var courselist = [];
    let course_key = new RegExp(course, 'i');
    let department_key = new RegExp(department, 'i');
    let division_key = new RegExp(division, 'i');
    var i;
    let courses = await courseModel.find({
        coursename: {$regex: course_key},
        department: {$regex: department_key},
        division: {$regex: division_key}
    });
    for (i = 0; i < courses.length; i++) {
        get_course = courses[i];
        if (get_course != null) {
            let wechat = false;
            let groupme = false;
            let discord = false;
            if (get_course.wechatQRCode.image != null) {
                wechat = true;
            }
            if (get_course.groupmeLink != null && get_course.groupmeLink != "") {
                groupme = true;
            }
            if (get_course.discordLink != null&& get_course.discordLink != "") {
                discord = true;
            }
            courselist.push({
                courseid: get_course.courseid,
                coursename: get_course.coursename,
                profname: get_course.profname,
                department: get_course.department,
                division: get_course.division,
                wechat: wechat,
                groupme: groupme,
                discord: discord
            });
        }
    }
    courselist.sort((course_A, course_B) => {
        return course_A.coursename != course_B.coursename ? (course_A.coursename < course_B.coursename ? -1 : 1) : 0;
    })
    return courselist;
}

async function register(course_arg) {
    try {
        const newCourse = new courseModel({
            coursename: course_arg.coursename,
            profname: course_arg.profname,
            courseid: uuidv4(),
            department: course_arg.department,
            division: course_arg.division
        });
        let saveCourse = await newCourse.save();
        if (saveCourse == null) {
            console.log("unable to register Course:");
            console.log(newCourse);
            return false;
        }
        console.log("successfully register new course.");
        console.log(newCourse);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 *  getCourse with 1 input
 *
 *  @param {String} courseid
 *
 *  @return {object}
 */

async function getCourseDetail(courseid) {
    try {
        let course = await courseModel.findOne({courseid: courseid});
        if (course == null) {
            console.log("unable to find course by courseid: " + courseid);
            return null;
        }
        console.log("successfully find course by courseid: " + courseid);
        let wechatQRCode = null;
        let content_type = null;
        if (course.wechatQRCode.image != null){
            // wechatQRCode = btoa(String.fromCharCode(...new Uint8Array(course.wechatQRCode.image)));
            wechatQRCode = course.wechatQRCode.image.toString('base64');
            content_type = course.wechatQRCode.content_type;
        }
        return {
            coursename: course.coursename,
            profname: course.profname,
            department: course.department,
            discordLink: course.discordLink,
            groupmeLink: course.groupmeLink,
            wechatQRCode: wechatQRCode,
            content_type: content_type
        };
    } catch (err) {
        console.error(err);
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

async function getDetailResponse(course_arg) {
    try {
        let courseid = course_arg.courseid;
        return getCourseDetail(courseid);
    } catch (err) {
        console.log(err);
        return null;
    }
}
