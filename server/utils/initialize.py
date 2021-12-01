import requests

API_URL = "http://localhost:3031/course/addCourse"

courses = [
    {
        "coursename": "Life Sciences 7B",
        "profname": "Pires, D.B., Kremer, C.T.",
        "department": "Life Sciences",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 31A",
        "profname": "Mutlu Akaturk, H.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 31B",
        "profname": "Greene, M.P.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 32A",
        "profname": "Cladek, L.T.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 32B",
        "profname": "Enakoutsa, K.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 33A",
        "profname": "Sanchez Ocal, P.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Mathematics 33B",
        "profname": "Aceves Sanchez, P.",
        "department": "Mathematics",
        "division": "lower",
    },
    {
        "coursename": "Computer Science 31",
        "profname": "Huang, B.K.",
        "department": "Computer Science",
        "division": "lower",
    },
    {
        "coursename": "Computer Science 32",
        "profname": "Nachenberg, C.S.",
        "department": "Computer Science",
        "division": "lower",
    },
    {
        "coursename": "Computer Science 131",
        "profname": "Eggert, P.R.",
        "department": "Computer Science",
        "division": "upper",
    },
    {
        "coursename": "Physics 1A",
        "profname": "Corbin, B.",
        "department": "Physics",
        "division": "lower",
    },
    {
        "coursename": "Physics 1A",
        "profname": "Zocchi, G.",
        "department": "Physics",
        "division": "lower",
    },
    {
        "coursename": "Physics 1B",
        "profname": "Wang, S.",
        "department": "Physics",
        "division": "lower",
    },
    {
        "coursename": "Physics 131",
        "profname": "Solon, M.P.",
        "department": "Physics",
        "division": "upper",
    },
]

for i in courses:
    print(f"Adding course {i['coursename']} to database: ", end="")
    req = requests.post(API_URL, data=i)
    print(req.text)
