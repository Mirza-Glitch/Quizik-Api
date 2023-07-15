import mongoose, { Document } from "mongoose";

interface IQuizQuestion extends Document {
  question: string;
  options: string[];
  answer: string;
}

interface IQuiz extends Document {
  title: string;
  desc: string;
  timer: boolean;
  willExpire: boolean;
  timing: number;
  days: number;
  quizId: string;
  createdBy: string;
  questions: IQuizQuestion[];
  createdAt: string;
  expiresAt?: string;
}

const quizQuestionSchema = new mongoose.Schema<IQuizQuestion>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema<IQuiz>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    timer: {
      type: Boolean,
      required: true,
    },
    willExpire: {
      type: Boolean,
      required: true,
    },
    timing: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    questions: [quizQuestionSchema],
    createdAt: {
      type: String,
      default: Date.now().toString(),
    },
    expiresAt: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const QuestionSchema = mongoose.model<IQuiz>("Question", quizSchema);

export { QuestionSchema, IQuiz, IQuizQuestion };
