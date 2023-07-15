import { Request, Response } from "express";
import { QuestionSchema, IQuiz } from "../models/quizSchema";

export async function getQ(req: Request, res: Response) {
  let quizId: string = req.params.id;
  let quiz: IQuiz | null = await QuestionSchema.findOne({
    quizId,
  });
  res.json({ data: quiz });
}

export async function postQ(req: Request, res: Response) {
  try {
    const getExpiryDay = (): string => {
      let day: Date = new Date();
      day.setDate(day.getDate() + req.body.days);
      return day.toString();
    };
    const getId = (): string => {
      return Math.random().toString(36).slice(2);
    };
    const quizQuestion: IQuiz = new QuestionSchema({
      ...req.body,
      quizId: getId(),
      createdAt: Date.now(),
      expiresAt: getExpiryDay(),
    });
    let savedData = await quizQuestion.save();
    return res.status(200).json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export async function updateQ(req: Request, res: Response) {
  let quizData: IQuiz = req.body;
  let { quizId, createdAt, expiresAt } = quizData;
  try {
    let quiz: IQuiz | null = await QuestionSchema.findOne({
      quizId,
    });
    if (!quiz) {
      return res.status(404).json({
        error: "Quiz not found",
      });
    }
    
    let objKeys: Array<string[]> = Object.entries(quizData);

    for (let i: any = 0; i < objKeys.length; i++) {
      let key: string = objKeys[i][0]
      let value: string | any = objKeys[i][1]
      if (
        key == "_id" ||
        key == "quizId" ||
        key == "createdAt" ||
        key == "expiresAt" ||
        key == "createdBy"
      ) {
        continue;
      }else{
        quiz.$set(key, value);
      }
    }
    
    let updatedDocument = await quiz.save()

    res.status(200).json({
      success: true,
      message: "successfully updated document ",
      data: updatedDocument,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "an error occurred when updating the doc",
      error: err,
    });
  }
}

export async function deleteQ(req: Request, res: Response) {
  try {
    let id: string = req.params.id;
    let data = await QuestionSchema.findOneAndDelete({
      quizId: id,
    });
    res.status(200).json({
      success: true,
      message: "successfully deleted doc with id: " + id,
      data,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "error deleting doc",
      error: e,
    });
  }
}
