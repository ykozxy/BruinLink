[![Contributors](https://img.shields.io/badge/Contributors-5-brightgreen.svg?style=flat-square)
](https://github.com/ykozxy/BruinLink/graphs/contributors)

# BruinLink

BruinLink is a website which designs for students in UCLA. Our project website is a platform gathering the social media links or QR codes of UCLA class group chats on different platforms. When you want to find classmates and discuss over your classes, it’s inconvenient to search many possible keywords on Google to look for or even ask others over and over whether there is a GroupMe link or so for a certain course.



## Motivation

We are committed to offer all the Bruins a platform to find your group  for whatever classes. You don't need to worry where your groups are, just search here. And if there is no yet the links you need, you can always subscribe it and get notified when others uploaded it.

## Table of contents

- [Motivation](#motivation)
- [Table of contents](#table-of-contents)
- [Get Started](#Get-Started)
  - [Setup the Environment](#Setup-the-Environment)
  - [Run the Webapp](#Run-the-Webapp)
  - [Optional Step](#Optional-Step)
- [Group Members](#Group-Members)
- [References](#References)
- [Footer](#footer)

## Get Started

[(Back to top)](#table-of-contents)

### Setup the Environment

Under your desired drectory, please clone BruinLink to your device and enter the project folder.

```sh
git clone https://github.com/ykozxy/BruinLink.git
cd BruinLink
```

Then, enter the backend directory and install dependencies.

```sh
cd server
npm install
```

This will set you up with all tools including `mongoose`, `express`, `multer` and other backend dependencies we used in
this project.

To install proper front-end dependencies, use the following commands:

```sh
cd ..
cd client
npm install
```

The first step above is supposed to go back to the root directory of the project. Then, go to the client directory and
install dependencies relating to frontend.

If you want to use the [initilize.py](server/utils/initialize.py) to add courses into the database, use the following
command to install python package `requests` before using our python script (make sure you have set up python
environment on your device).

```sh
pip3 install requests
```

### Run the Webapp

Under the BruinLink’s root directory, use the following command to launch the backend application.

```sh
cd server
npm start
```

Then, using a seperate terminal, direct yourself to BruinLink’s root directory and use the following command to launch
the frontend application.

```sh
cd client
npm start
```

After the frontend finishes compile, the page [localhost:3000](localhost:3000) will be opened in your default browser
automatically. If not, please click the link above to open it manually.

### Optional Step

If you wish to add more courses to the database, you can modify the initialize.py file under
directory [BruinLink/server/utils](server/utils). After saving it, use the following command to add course to database
under a seperate terminal (make sure backend applications are running).

```sh
cd server/utils
python3 initialize.py
```

The result of adding courses will be shown in the console after running the script.

## Group Members

[(Back to top)](#table-of-contents)

- [Xuyang Zhou](https://github.com/ykozxy) (nickzhouxy@g.ucla.edu)
- [Sam Xu](https://github.com/samxu01) (xcjsam@g.ucla.edu)
- [Laiyin Dai](https://github.com/ng666) (dailaiyin@g.ucla.edu)
- [Mike Shi](https://github.com/Spiderpc) (mikespc@g.ucla.edu)
- [Shiyan Fu](https://github.com/Fshiyan) (fushiyan@g.ucla.edu)



## References

[(Back to top)](#table-of-contents)

Grateful thanks to the following projects that inspired us during development:
- [create-react-app](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [material-ui](https://mui.com/)
- [Material Design Icons](https://materialdesignicons.com/)
- [SendGrid](https://sendgrid.com/)
- [mongoose](https://mongoosejs.com/)

Credit to the images and icons we used:
- [client/src/images/groupme.svg](client/src/images/groupme.svg): [Icon Finder](https://www.iconfinder.com/icons/670440/groupme_chat_group_social_icon)



## Footer

[(Back to top)](#table-of-contents)

If you consider this project to be useful, please leave a star in GitHub~

