import express, { Request, Response, NextFunction } from "express";
import { getQ, postQ, updateQ, deleteQ } from "../controllers/quizController";
import { IQuiz, IQuizQuestion } from "../models/quizSchema";

export const quizRouter = express.Router();

const checkQuestionsLength = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data: IQuiz = req.body;
  const checkOptionsLength = (questions: IQuizQuestion[]): boolean => {
    let status: boolean = true;
    for (let i: number = 0; i < questions.length; i++) {
      let len = questions[i]["options"].length;
      if (len >= 1 || len <= 5) {
        status = false;
      }
    }
    return status;
  };
  const checkTiming = (data: IQuiz): boolean => {
    if (data.timer) {
      return [15, 30, 45, 60].includes(data.timing);
    }
    return true;
  };
  const checkExpiryDay = (data: IQuiz): boolean => {
    if (data.willExpire) {
      return [3, 5, 7].includes(data.days);
    }
    return true;
  };
  if (data.questions.length <= 2) {
    return res.json({
      success: false,
      message: "You should have atleast 3 questions",
      data: req.body,
    });
  }
  if (data.questions.length >= 16) {
    return res.json({
      success: false,
      message: "You cannot create more than 15 questions",
      data: req.body,
    });
  }
  if (!checkOptionsLength(req.body.questions)) {
    return res.json({
      success: false,
      message:
        "You need to have minimum of two options and maximum of four options in your questions. Please check your questions again.",
      data: req.body,
    });
  }
  if (!checkTiming(req.body)) {
    return res.json({
      success: false,
      message:
        "when timer is set to true, then timing should be integer 15 or 30 or 45 or 60.",
      data: req.body,
    });
  }
  if (!checkExpiryDay(req.body)) {
    return res.json({
      success: false,
      message:
        "when willExpire is set to true, then days should be integer 3 or 5 or 7.",
      data: req.body,
    });
  }
  next();
};

quizRouter.route("/:id").get(getQ).delete(deleteQ);
quizRouter
  .route("/")
  .post(checkQuestionsLength, postQ)
  .put(checkQuestionsLength, updateQ);
