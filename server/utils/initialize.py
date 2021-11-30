import requests

courses = [
    {
        "coursename": "Computer Science M51A",
        "profname": "Omid Abari",
        "department": "Computer Science",
        "division": "lower",
    },
]

for i in courses:
    print(requests.post(
        "http://localhost:3031/course/addCourse",
        data=i
    ))
