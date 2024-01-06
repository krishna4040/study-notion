# Study-Notion

Welcome to our **Edtech Platform** Study-Notion! This application is designed to offer online courses with a beautiduil user interface and experience.


## Tech Stack

**Client:** 
![HTML](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
![tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white)
![react-form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)

**Server:** 
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![node](https://img.shields.io/badge/tsnode-3178C6.svg?style=for-the-badge&logo=ts-node&logoColor=white)
![express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![mongo](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)
![mong](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)
![.env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
![cloud](https://img.shields.io/badge/Cloudinary-3448C5.svg?style=for-the-badge&logo=Cloudinary&logoColor=white)
![razorpay](https://img.shields.io/badge/Razorpay-0C2451.svg?style=for-the-badge&logo=Razorpay&logoColor=white)
![swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black)

## Features

- User Authentication && Authorisation using jwt and bcrypt
- User, Instructor and Admin Panel
- Seamless payment gateway integration using razorpay api
- Course streaming and uploading using cloudinary api
- completely responsive ui built using React and TailwindCSS
- Made Production ready with Next.js and maintained type saftey using Typescript
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## API Reference

Visit http://localhost:4000/api-docs/ to Read the RESTFUL api swagger documentation for the app After setting up app locally
## Run Locally

Clone the project

```bash
  git clone https://github.com/krishna4040/study-notion.git
```

Go to the project directory

```bash
  cd study-notion
```

Install dependencies

```bash
  npm install
```

Make sure to make .env file with following env variables in root directory

```
  VITE_BASE_URL = http://localhost:4000/api/v1
  RESET_PASSWORD_URL = http://localhost:4000/reset-password
  PORT = 4000
  RAZORPAY_API_KEY =
  WEBHOOK =  
  DB = mongodb://127.0.0.1:27017/together
  Cloudinary_CLOUD_NAME = <Your credentials>
  Cloudinary_API_KEY = <Your credentials>
  Cloudinary_API_SECRET = <Your credentials>
  Cloudinary_FOLDER = <Your credentials>
  MAIL_HOST = <Your credentials>
  MAIL_USER = <Your credentials>
  Mail_pass = <Your credentials>
  JWT_SECRET = <Your credentials>
```

Start the server

```bash
  npm run start
```


## Feedback

Thanks for Reading!! If you have any feedback, please reach out to us at krishnajain5050@gmail.com