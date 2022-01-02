# -*- coding: utf-8 -*-
"""
Created on Thu Dec 30 00:01:36 2021

@author: nvgui
"""
import requests
import csv

def lowerORupper(catalogNum):
    if(catalogNum[0]=='0' and catalogNum[1]=='0'):
        return 'lower'
    else:
        return 'upper'
                
def getCourseName(): #get subject name, not course name
    with open('22w couse name.txt') as f:
        lines = f.readlines()
        temp_L=lines[0].replace("&quot;text&quot;:&quot;","")
        newL=temp_L.replace("&quot;,&quot;value&quot;:&quot;",";")
        nn=newL.replace("&quot;", "")
        nnll=nn.replace("&amp;","&")
        courseList=nnll.split('},{')
        courseList[0]=courseList[0].replace("{", "")
        courseList[len(courseList)-1]=courseList[len(courseList)-1].replace("}", "")
        
        subjectAreaName=[]
        subj=[]
        for course in courseList:
            courseArr=course.split(";")
            subject=courseArr[0].split(' (')
            subjectAreaName.append(subject[0])
            #subj_no_space=courseArr[1].rstrip()
            subj.append(courseArr[1])
        
        subjectAreaName.remove("Anesthesiology") #remove subject with "No results" by hand
        subj.remove("ANES   ")                   #can be updated to use "if" to check and remove  
        subjectAreaName.remove("Dentistry")
        subj.remove("DENT   ")
        subjectAreaName.remove("Medicine")
        subj.remove("MED    ")
        subjectAreaName.remove("Neurology")
        subj.remove("NEURLGY")
        subjectAreaName.remove("Neurosurgery")
        subj.remove("NEURSGY")
        subjectAreaName.remove("Obstetrics and Gynecology")
        subj.remove("OBGYN  ")
        subjectAreaName.remove("Ophthalmology")
        subj.remove("OPTH   ")
        subjectAreaName.remove("Orthopaedic Surgery")
        subj.remove("ORTHPDC")
        subjectAreaName.remove("Pediatrics")
        subj.remove("PEDS   ")
        subjectAreaName.remove("Surgery")
        subj.remove("SURGERY")
        subjectAreaName.remove("Urology")
        subj.remove("UROLOGY")
        return subjectAreaName,subj
        
def getHTMLInfo():
    subjectAreaName,subj = getCourseName()   
    header={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'}
    
    
    for i in range(len(subj)):#from each subject to get each course
        courseNum=[]
        courseCatalogNum=[]
        input_param='{"search_by":"subject","term_cd":"22w","subj_area_cd":"'+subj[i]+   '","ses_grp_cd":"%"}'
        param1={
        'input': {input_param},
        'level': '2'
        }
        url_course_title="https://sa.ucla.edu/ro/ClassSearch/Public/Search/GetLevelSeparatedSearchData?"
        res1 = requests.get(url_course_title,params=param1,headers=header)
        d1=res1.text.replace('"label":"','').replace('","value":{"crs_catlg_no":"', '@#').replace('","class_no":"%"}','').replace('","class_no":" 001  "}','').replace('","class_no":" 002  "}','').replace('","class_no":" 003  "}','')
        d2=d1[1:len(d1)-1].replace("},{", ";")
        d3=d2[1:len(d2)-1]
        split1=d3.split(";")
        for s in split1:
            split2=s.split("@#")
            courseCatalogNum.append(split2[1])
            split3=split2[0].split(" - ")
            courseNum.append(split3[0])
            

        for c in range(len(courseNum)): #from each course to get each section of different professors
            instructors=[]
            ins_temp=[]
            path=subj[i]+courseCatalogNum[c]
            path=path.replace(" ", "")
            #print(path)
            if path=='MUSC0175EC' or path=='MUSC0485EC' or path == 'SPAN0007A': #add these by hand (encoding issue for professor names)
                continue
            
            input_param2='{"Term":"22W","SubjectAreaCode":"'+subj[i]+'","CatalogNumber":"'+courseCatalogNum[c]+'","IsRoot":true,"SessionGroup":"%","ClassNumber":"%","SequenceNumber":null,"Path":"'+path+'","MultiListedClassFlag":"n","Token":"null"}'
            param2={
                'model': {input_param2},
                'FilterFlags': '{"enrollment_status":null,"advanced":"y","meet_days":null,"start_time":"8:00 am","end_time":"8:00 pm","meet_locations":null,"meet_units":null,"instructor":null,"class_career":null,"impacted":null,"enrollment_restrictions":null,"enforced_requisites":null,"individual_studies":null,"summer_session":null}',
                 
            }            
            url_course_details="https://sa.ucla.edu/ro/public/soc/Results/GetCourseSummary?"
            res2 = requests.get(url_course_details, params=param2,headers=header)
            f2 = open('detail2.txt','w') #need to create this text file under the same directory before running
            f2.write(res2.text)
            f2.close()
            with open('detail2.txt') as f22:
                for line in f22:
                    if '<div class="instructorColumn hide-small" id=' in line:
                        ins_temp.append(line)
            for ins in ins_temp:
                ins1=ins.split("<p>")[1]
                ins2=ins1.split("</p>")[0]
                ins3=ins2.replace("<br />", " & ")
                instructors.append(ins3)
            #print(instructors)
            
            for instructor in range(len(instructors)):#add each course to the csv file
                courseList=[]
                courseInfo={}
                courseInfo["coursename"]=subjectAreaName[i]+' '+courseNum[c]
                courseInfo["profname"]=instructors[instructor]
                courseInfo["department"]=subjectAreaName[i]
                courseInfo["division"]=lowerORupper(courseCatalogNum[c])
                print(courseInfo)
                courseList.append(courseInfo)
                with open('courseList3.csv', 'a+', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerow(courseList)
        
            
        
if __name__=='__main__':
    #getCourseName()
    getHTMLInfo()
    #lowerORupper('0131CE')