# Quizik Quizzes API

Quizik API. Created to manage Quizzes at Quizik website.

## Table of Contents

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Conclusion](#conclusion)

## Introduction

This API is created for getting, creating, updating and deleting quizzes on Quizik website. You can create your own admin dashboard and use this API to manage quizzes. NOTE that this API provides you full access to quizzes on the Quizik website so use it wisey. Do not misuse it.

## API Endpoints

API provides 4 methods to work woth data. Here are Examples:

Example:

### `GET /api/:id`

Description: Get a quiz data by providing quizId as parameter .

Parameters:

- `:id` (should be replaced by quizId)

Response:

- data: JSON Object of quiz data

Here is how to use it with js fetch:

```javascript
fetch("http://localhost:3000/api/uflrna17vbc")
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log("error: ", err));
```

### `POST /api/`

Description: Create a new quiz.

Parameters:

- `title`: The title of the quiz (string)
- `desc`: The small description of the quiz (string)
- `timer`: set true if you want to add timing in your questions, false if you don't want (boolean)
- `timing`: set timing to a number of seconds. 0 if timer is set to false (integer)
- `willExpire`: set true if you want your quiz to be expired after certain days on Quizik website (boolean)
- `days`: Number if days you want to keep the quiz alive on Quizik website (integer)
- `createdBy`: Name of the person who created this quiz (string)
- `questions`: Array of questions for the quiz (array of objects)

Response:

- Status Code: 200 (Created)
- Success: true if succeed
- error: if error occurs
- Response Body: JSON object representing the created quiz

Here is how to use it with js fetch:

```javascript
const data = {
  title: "my quiz title",
  desc: "I am creating this quiz for only test purpose ",
  timer: true,
  timing: 30,
  willExpire: true,
  days: 7,
  createdBy: "test guy",
  questions: [{
    question: "What is ♾ + ♾",
    options: ["1",
      "0",
      "♾",
      "None of these"],
    answer: "♾",
  },
    {
      question: "What is 3 + 3",
      options: ["1",
        "6",
        "♾",
        "33"],
      answer: "6",
    },
    {
      question: "What is 4 + 6",
      options: ["1",
        "0",
        "10",
        "8"],
      answer: "10",
    },
    // more questions if you want to add.
  ],
};

// creating a quiz with post request
fetch("http://localhost:3000/api/", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(data),
})
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log("error: ", err));
// your quiz will be created at route data.data.quizId on Quizik website if success
```

### `PUT /api/`

Description: update an existing quiz.

Parameters:
This takes all the parameters of the post request including following parameter:

- `quizId`: The title of the quiz (string)

Response:

- Status Code: 200 (Created)
- Success: true if succeed
- error: if error occurs
- Response Body: JSON object representing the updated quiz

Here is how to use it with js fetch:

```javascript
// updating a quiz by changing it's title and adding an extra question like this:
// first get the quiz data and edit it
const data = {
  title: "a new quiz title",
  desc: "I am creating this quiz for only test purpose ",
  timer: true,
  timing: 30,
  willExpire: true,
  days: 7,
  createdBy: "test guy",
  quizId: "uflrna17vbc",
  questions: [{
    question: "What is 0 + 0",
    options: ["1",
      "0"],
    answer: "0",
  },
    {
      question: "What is 3 + 3",
      options: ["1",
        "6",
        "♾",
        "33"],
      answer: "6",
    },
    {
      question: "What is 4 + 6",
      options: ["1",
        "10",
        "8"],
      answer: "10",
    },
    {
      question: "What is 2 + 24",
      options: ["14",
        "30",
        "120",
        "26"],
      answer: "26",
    },
  ],
};

// updating a quiz with put request
fetch("http://localhost:3000/api/", {
  method: "PUT",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(data),
})
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log("error: ", err));
```

### `DELETE /api/:id`

Description: delete an existing quiz.

Parameters:- it takes a quizId as a parameter
`:id`: quizId of the quiz you want to delete

Response:

- Status Code: 200 (deleted)
- Success: true if succeed
- error: if error occurr
- data: JSON objecy containing deleted quiz data

Here is how to use it with js fetch:

```javascript
fetch("http://localhost:3000/api/uflrna17vbc", {
  method: "DELETE",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.log("error: ", err));
```

## Error Handling

If any error occurs in API requests then it give status 400 with following JSON schema:

```javascript
{
  success: false,
  message: "error message reason" (optional),
  error: "actual error message",
}
```
Remember that error will always give success as false so you may handle it easily on frontend by checking `if(!success){ //handle it }` in if else conditions. Error may occur if there is no data available to delete or update in the database, or if you've provided more than 15 questions or less than 3 questions, or if you've provided less than 2 options or more than 4 options in the questions while doing post or update request, or you'll see any other error reason in `message` if the reason is available.

## Conclusion

You can easily use this API to control Quizzes of Quizik website, you can the full admin access to database. Unlike the Quizik website where users are allowed to create only one quiz per day, using this API you can overcome that limitations. You can actually created unlimited quizzes/update/delete quizzes. But however remember that deleting a quiz won't delete it's results, example of you had a quiz at `/quiz/myquizid` and you deleted it then it won't delete results available on `/results/myquizid`. Note that This API doesn't provide access to results of the quiz. You cannot play with quiz results. If you have other issues regarding this API then feel free to make a pull request. 

Keep Playing, Keep Enjoying. 😊
