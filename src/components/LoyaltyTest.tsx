import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { HeartIcon, AlertCircle, ChevronRight, SkipForward } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: { [key: string]: Question[] } = {
  male: [
    {
      id: 1,
      text: "How does he behave when receiving messages while with you?",
      options: [
        { text: "Always shows me the messages openly", score: 10 },
        { text: "Sometimes hides the phone screen", score: 5 },
        { text: "Frequently hides messages and acts secretive", score: 0 }
      ]
    },
    {
      id: 2,
      text: "How does he talk about his past relationships?",
      options: [
        { text: "Honest and respectful, but focuses on our relationship", score: 10 },
        { text: "Avoids the topic completely", score: 5 },
        { text: "Still seems emotionally attached to ex(es)", score: 0 }
      ]
    },
    {
      id: 3,
      text: "How does he handle social media interactions?",
      options: [
        { text: "Open about his activities and includes me", score: 10 },
        { text: "Maintains privacy but isn't secretive", score: 7 },
        { text: "Very secretive about his online activities", score: 0 }
      ]
    },
    {
      id: 4,
      text: "How does he act around other women when you're present?",
      options: [
        { text: "Respectful and maintains appropriate boundaries", score: 10 },
        { text: "Sometimes flirts but nothing serious", score: 5 },
        { text: "Openly flirts or acts inappropriately", score: 0 }
      ]
    },
    {
      id: 5,
      text: "How does he handle plans and commitments with you?",
      options: [
        { text: "Always keeps his word and communicates changes", score: 10 },
        { text: "Usually reliable but sometimes forgets", score: 5 },
        { text: "Often cancels or changes plans last minute", score: 0 }
      ]
    },
    {
      id: 6,
      text: "How transparent is he about his finances and spending?",
      options: [
        { text: "Completely open and shares financial details", score: 10 },
        { text: "Shares some information but not everything", score: 5 },
        { text: "Secretive about finances and spending", score: 0 }
      ]
    },
    {
      id: 7,
      text: "How does he respond to conflicts or disagreements?",
      options: [
        { text: "Listens, communicates openly, and seeks resolution", score: 10 },
        { text: "Sometimes gets defensive or avoids discussion", score: 5 },
        { text: "Becomes aggressive or shuts down communication", score: 0 }
      ]
    },
    {
      id: 8,
      text: "How does he handle unexpected stress or difficult situations?",
      options: [
        { text: "Remains calm and communicates openly", score: 10 },
        { text: "Gets stressed but manages to cope", score: 5 },
        { text: "Becomes emotionally distant or aggressive", score: 0 }
      ]
    },
    {
      id: 9,
      text: "How does he behave when you're not feeling well?",
      options: [
        { text: "Shows genuine care and support", score: 10 },
        { text: "Offers basic support when asked", score: 5 },
        { text: "Shows little to no concern", score: 0 }
      ]
    },
    {
      id: 10,
      text: "How does he handle your success and achievements?",
      options: [
        { text: "Celebrates and supports your success genuinely", score: 10 },
        { text: "Shows moderate interest", score: 5 },
        { text: "Seems jealous or dismissive", score: 0 }
      ]
    },
    {
      id: 11,
      text: "How does he interact with your family and friends?",
      options: [
        { text: "Makes genuine efforts to build relationships", score: 10 },
        { text: "Is polite but maintains distance", score: 5 },
        { text: "Avoids or shows disinterest", score: 0 }
      ]
    },
    {
      id: 12,
      text: "How does he handle shared responsibilities?",
      options: [
        { text: "Takes initiative and shares equally", score: 10 },
        { text: "Contributes when asked", score: 5 },
        { text: "Rarely helps or takes responsibility", score: 0 }
      ]
    },
    {
      id: 13,
      text: "How does he handle your emotional needs?",
      options: [
        { text: "Is attentive and supportive", score: 10 },
        { text: "Tries but sometimes struggles", score: 5 },
        { text: "Dismisses or ignores them", score: 0 }
      ]
    },
    {
      id: 14,
      text: "How does he handle joint decision-making?",
      options: [
        { text: "Values your input and decides together", score: 10 },
        { text: "Sometimes makes unilateral decisions", score: 5 },
        { text: "Rarely considers your opinion", score: 0 }
      ]
    },
    {
      id: 15,
      text: "How does he handle personal boundaries?",
      options: [
        { text: "Respects and maintains healthy boundaries", score: 10 },
        { text: "Sometimes pushes boundaries", score: 5 },
        { text: "Frequently disregards boundaries", score: 0 }
      ]
    },
    {
      id: 16,
      text: "How does he handle quality time together?",
      options: [
        { text: "Prioritizes and plans quality time", score: 10 },
        { text: "Spends time when convenient", score: 5 },
        { text: "Rarely makes time", score: 0 }
      ]
    },
    {
      id: 17,
      text: "How does he handle your personal growth?",
      options: [
        { text: "Supports and encourages growth", score: 10 },
        { text: "Is neutral about it", score: 5 },
        { text: "Discourages or feels threatened", score: 0 }
      ]
    },
    {
      id: 18,
      text: "How does he handle jealousy?",
      options: [
        { text: "Trusts and communicates calmly", score: 10 },
        { text: "Shows occasional insecurity", score: 5 },
        { text: "Becomes controlling or accusatory", score: 0 }
      ]
    },
    {
      id: 19,
      text: "How does he handle shared future plans?",
      options: [
        { text: "Actively plans and discusses future", score: 10 },
        { text: "Vague about future plans", score: 5 },
        { text: "Avoids future discussions", score: 0 }
      ]
    },
    {
      id: 20,
      text: "How does he handle your independence?",
      options: [
        { text: "Supports your independence", score: 10 },
        { text: "Accepts it with some reluctance", score: 5 },
        { text: "Tries to limit your independence", score: 0 }
      ]
    },
    {
      id: 21,
      text: "How does he handle shared finances?",
      options: [
        { text: "Is transparent and fair", score: 10 },
        { text: "Somewhat unclear about finances", score: 5 },
        { text: "Secretive or unfair with money", score: 0 }
      ]
    },
    {
      id: 22,
      text: "How does he handle your career goals?",
      options: [
        { text: "Actively supports your career", score: 10 },
        { text: "Is neutral about your career", score: 5 },
        { text: "Undermines your career goals", score: 0 }
      ]
    },
    {
      id: 23,
      text: "How does he handle mutual friends?",
      options: [
        { text: "Maintains healthy friendships", score: 10 },
        { text: "Is selective about friendships", score: 5 },
        { text: "Creates drama or isolation", score: 0 }
      ]
    },
    {
      id: 24,
      text: "How does he handle personal space?",
      options: [
        { text: "Respects need for space", score: 10 },
        { text: "Sometimes needs reminding", score: 5 },
        { text: "Doesn't respect personal space", score: 0 }
      ]
    },
    {
      id: 25,
      text: "How does he handle your hobbies?",
      options: [
        { text: "Supports and shows interest", score: 10 },
        { text: "Is neutral about them", score: 5 },
        { text: "Dismissive or negative", score: 0 }
      ]
    },
    {
      id: 26,
      text: "How does he handle trust issues?",
      options: [
        { text: "Works to build trust", score: 10 },
        { text: "Sometimes shows distrust", score: 5 },
        { text: "Often distrustful or suspicious", score: 0 }
      ]
    },
    {
      id: 27,
      text: "How does he handle your opinions?",
      options: [
        { text: "Values and respects them", score: 10 },
        { text: "Sometimes dismisses them", score: 5 },
        { text: "Regularly invalidates them", score: 0 }
      ]
    },
    {
      id: 28,
      text: "How does he handle relationship milestones?",
      options: [
        { text: "Celebrates and acknowledges them", score: 10 },
        { text: "Acknowledges when reminded", score: 5 },
        { text: "Forgets or ignores them", score: 0 }
      ]
    },
    {
      id: 29,
      text: "How does he handle your self-esteem?",
      options: [
        { text: "Builds you up and supports", score: 10 },
        { text: "Neither builds up nor tears down", score: 5 },
        { text: "Makes you feel inadequate", score: 0 }
      ]
    },
    {
      id: 30,
      text: "How does he handle long-term commitment?",
      options: [
        { text: "Shows clear commitment", score: 10 },
        { text: "Is ambivalent about commitment", score: 5 },
        { text: "Avoids commitment discussion", score: 0 }
      ]
    }
  ],
  female: [
    {
      id: 1,
      text: "How does she behave when receiving messages while with you?",
      options: [
        { text: "Always shows me the messages openly", score: 10 },
        { text: "Sometimes hides the phone screen", score: 5 },
        { text: "Frequently hides messages and acts secretive", score: 0 }
      ]
    },
    {
      id: 2,
      text: "How does she talk about her past relationships?",
      options: [
        { text: "Honest and respectful, but focuses on our relationship", score: 10 },
        { text: "Avoids the topic completely", score: 5 },
        { text: "Still seems emotionally attached to ex(es)", score: 0 }
      ]
    },
    {
      id: 3,
      text: "How does she handle social media interactions?",
      options: [
        { text: "Open about her activities and includes me", score: 10 },
        { text: "Maintains privacy but isn't secretive", score: 7 },
        { text: "Very secretive about her online activities", score: 0 }
      ]
    },
    {
      id: 4,
      text: "How does she act around other men when you're present?",
      options: [
        { text: "Respectful and maintains appropriate boundaries", score: 10 },
        { text: "Sometimes flirts but nothing serious", score: 5 },
        { text: "Openly flirts or acts inappropriately", score: 0 }
      ]
    },
    {
      id: 5,
      text: "How does she handle plans and commitments with you?",
      options: [
        { text: "Always keeps her word and communicates changes", score: 10 },
        { text: "Usually reliable but sometimes forgets", score: 5 },
        { text: "Often cancels or changes plans last minute", score: 0 }
      ]
    },
    {
      id: 6,
      text: "How transparent is she about her finances and spending?",
      options: [
        { text: "Completely open and shares financial details", score: 10 },
        { text: "Shares some information but not everything", score: 5 },
        { text: "Secretive about finances and spending", score: 0 }
      ]
    },
    {
      id: 7,
      text: "How does she respond to conflicts or disagreements?",
      options: [
        { text: "Listens, communicates openly, and seeks resolution", score: 10 },
        { text: "Sometimes gets defensive or avoids discussion", score: 5 },
        { text: "Becomes aggressive or shuts down communication", score: 0 }
      ]
    },
    {
      id: 8,
      text: "How does she handle unexpected stress or difficult situations?",
      options: [
        { text: "Remains calm and communicates openly", score: 10 },
        { text: "Gets stressed but manages to cope", score: 5 },
        { text: "Becomes emotionally distant or aggressive", score: 0 }
      ]
    },
    {
      id: 9,
      text: "How does she behave when you're not feeling well?",
      options: [
        { text: "Shows genuine care and support", score: 10 },
        { text: "Offers basic support when asked", score: 5 },
        { text: "Shows little to no concern", score: 0 }
      ]
    },
    {
      id: 10,
      text: "How does she handle your success and achievements?",
      options: [
        { text: "Celebrates and supports your success genuinely", score: 10 },
        { text: "Shows moderate interest", score: 5 },
        { text: "Seems jealous or dismissive", score: 0 }
      ]
    },
    {
      id: 11,
      text: "How does she interact with your family and friends?",
      options: [
        { text: "Makes genuine efforts to build relationships", score: 10 },
        { text: "Is polite but maintains distance", score: 5 },
        { text: "Avoids or shows disinterest", score: 0 }
      ]
    },
    {
      id: 12,
      text: "How does she handle shared responsibilities?",
      options: [
        { text: "Takes initiative and shares equally", score: 10 },
        { text: "Contributes when asked", score: 5 },
        { text: "Rarely helps or takes responsibility", score: 0 }
      ]
    },
    {
      id: 13,
      text: "How does she handle your emotional needs?",
      options: [
        { text: "Is attentive and supportive", score: 10 },
        { text: "Tries but sometimes struggles", score: 5 },
        { text: "Dismisses or ignores them", score: 0 }
      ]
    },
    {
      id: 14,
      text: "How does she handle joint decision-making?",
      options: [
        { text: "Values your input and decides together", score: 10 },
        { text: "Sometimes makes unilateral decisions", score: 5 },
        { text: "Rarely considers your opinion", score: 0 }
      ]
    },
    {
      id: 15,
      text: "How does she handle personal boundaries?",
      options: [
        { text: "Respects and maintains healthy boundaries", score: 10 },
        { text: "Sometimes pushes boundaries", score: 5 },
        { text: "Frequently disregards boundaries", score: 0 }
      ]
    },
    {
      id: 16,
      text: "How does she handle quality time together?",
      options: [
        { text: "Prioritizes and plans quality time", score: 10 },
        { text: "Spends time when convenient", score: 5 },
        { text: "Rarely makes time", score: 0 }
      ]
    },
    {
      id: 17,
      text: "How does she handle your personal growth?",
      options: [
        { text: "Supports and encourages growth", score: 10 },
        { text: "Is neutral about it", score: 5 },
        { text: "Discourages or feels threatened", score: 0 }
      ]
    },
    {
      id: 18,
      text: "How does she handle jealousy?",
      options: [
        { text: "Trusts and communicates calmly", score: 10 },
        { text: "Shows occasional insecurity", score: 5 },
        { text: "Becomes controlling or accusatory", score: 0 }
      ]
    },
    {
      id: 19,
      text: "How does she handle shared future plans?",
      options: [
        { text: "Actively plans and discusses future", score: 10 },
        { text: "Vague about future plans", score: 5 },
        { text: "Avoids future discussions", score: 0 }
      ]
    },
    {
      id: 20,
      text: "How does she handle your independence?",
      options: [
        { text: "Supports your independence", score: 10 },
        { text: "Accepts it with some reluctance", score: 5 },
        { text: "Tries to limit your independence", score: 0 }
      ]
    },
    {
      id: 21,
      text: "How does she handle shared finances?",
      options: [
        { text: "Is transparent and fair", score: 10 },
        { text: "Somewhat unclear about finances", score: 5 },
        { text: "Secretive or unfair with money", score: 0 }
      ]
    },
    {
      id: 22,
      text: "How does she handle your career goals?",
      options: [
        { text: "Actively supports your career", score: 10 },
        { text: "Is neutral about your career", score: 5 },
        { text: "Undermines your career goals", score: 0 }
      ]
    },
    {
      id: 23,
      text: "How does she handle mutual friends?",
      options: [
        { text: "Maintains healthy friendships", score: 10 },
        { text: "Is selective about friendships", score: 5 },
        { text: "Creates drama or isolation", score: 0 }
      ]
    },
    {
      id: 24,
      text: "How does she handle personal space?",
      options: [
        { text: "Respects need for space", score: 10 },
        { text: "Sometimes needs reminding", score: 5 },
        { text: "Doesn't respect personal space", score: 0 }
      ]
    },
    {
      id: 25,
      text: "How does she handle your hobbies?",
      options: [
        { text: "Supports and shows interest", score: 10 },
        { text: "Is neutral about them", score: 5 },
        { text: "Dismissive or negative", score: 0 }
      ]
    },
    {
      id: 26,
      text: "How does she handle trust issues?",
      options: [
        { text: "Works to build trust", score: 10 },
        { text: "Sometimes shows distrust", score: 5 },
        { text: "Often distrustful or suspicious", score: 0 }
      ]
    },
    {
      id: 27,
      text: "How does she handle your opinions?",
      options: [
        { text: "Values and respects them", score: 10 },
        { text: "Sometimes dismisses them", score: 5 },
        { text: "Regularly invalidates them", score: 0 }
      ]
    },
    {
      id: 28,
      text: "How does she handle relationship milestones?",
      options: [
        { text: "Celebrates and acknowledges them", score: 10 },
        { text: "Acknowledges when reminded", score: 5 },
        { text: "Forgets or ignores them", score: 0 }
      ]
    },
    {
      id: 29,
      text: "How does she handle your self-esteem?",
      options: [
        { text: "Builds you up and supports", score: 10 },
        { text: "Neither builds up nor tears down", score: 5 },
        { text: "Makes you feel inadequate", score: 0 }
      ]
    },
    {
      id: 30,
      text: "How does she handle long-term commitment?",
      options: [
        { text: "Shows clear commitment", score: 10 },
        { text: "Is ambivalent about commitment", score: 5 },
        { text: "Avoids commitment discussion", score: 0 }
      ]
    }
  ]
};

const getAdvice = (score: number, skippedQuestions: number) => {
  const answeredQuestions = 30 - skippedQuestions;
  const maxPossibleScore = answeredQuestions * 10;
  const percentageScore = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;

  if (percentageScore >= 80) {
    return {
      message: "Your partner shows exceptional signs of loyalty! 💖",
      details: "The responses indicate a very healthy and trustworthy relationship. Continue nurturing open communication and mutual respect!"
    };
  } else if (percentageScore >= 60) {
    return {
      message: "Your partner shows strong signs of loyalty! 💕",
      details: "The responses indicate a generally healthy relationship. Keep working on communication and understanding each other."
    };
  } else if (percentageScore >= 40) {
    return {
      message: "There are some concerns that need attention 🤔",
      details: "Consider having an open conversation about trust and boundaries. Focus on improving communication and establishing mutual understanding."
    };
  } else {
    return {
      message: "There are significant loyalty concerns ⚠️",
      details: `Based on ${answeredQuestions} answered questions, there appear to be trust issues that need addressing. Consider relationship counseling or having a serious discussion about trust and commitment.`
    };
  }
};

const LoyaltyTest = () => {
  const [gender, setGender] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState(0);

  const handleStart = (selectedGender: string) => {
    setGender(selectedGender);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSkippedQuestions(0);
  };

  const handleAnswer = (score: number) => {
    setScore((prev) => prev + score);
    if (currentQuestion === 29) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setSkippedQuestions((prev) => prev + 1);
    toast({
      title: "Question Skipped",
      description: "This question won't affect your final score",
      duration: 2000,
    });
    if (currentQuestion === 29) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const restart = () => {
    setGender(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSkippedQuestions(0);
  };

  if (!gender) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <HeartIcon className="w-16 h-16 text-pink-500 mx-auto animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 font-playfair">Loyalty Tester</h1>
            <p className="text-gray-600">Select your partner's gender to begin the test</p>
          </div>
          <div className="space-y-4">
            <Button 
              onClick={() => handleStart('male')} 
              className="w-full bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all"
            >
              Test Male Partner
            </Button>
            <Button 
              onClick={() => handleStart('female')} 
              className="w-full bg-pink-500 hover:bg-pink-600 transform hover:scale-105 transition-all"
            >
              Test Female Partner
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const advice = getAdvice(score, skippedQuestions);
    const answeredQuestions = 30 - skippedQuestions;
    const maxPossibleScore = answeredQuestions * 10;
    const percentageScore = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair">Results</h2>
            <Progress value={percentageScore} className="w-full h-3" />
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">
                Score: {score}/{maxPossibleScore} ({Math.round(percentageScore)}%)
              </p>
              <p className="text-sm text-gray-600">
                Questions answered: {answeredQuestions}/30
              </p>
              {skippedQuestions > 0 && (
                <p className="text-sm text-gray-500">
                  (Skipped {skippedQuestions} questions)
                </p>
              )}
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg space-y-3 transform hover:scale-105 transition-all">
              <p className="text-xl font-medium">{advice.message}</p>
              <p className="text-gray-600">{advice.details}</p>
            </div>
          </div>
          <Button 
            onClick={restart} 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all"
          >
            Take Another Test
          </Button>
        </Card>
      </div>
    );
  }

  const currentQ = questions[gender][currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Question {currentQuestion + 1}/30</p>
            <Progress value={(currentQuestion / 30) * 100} className="w-1/2 h-2" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{currentQ.text}</h2>
          <RadioGroup className="space-y-3">
            {currentQ.options.map((option, index) => (
              <div key={index} 
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleAnswer(option.score)}
              >
                <RadioGroupItem
                  id={`option-${index}`}
                  value={option.text}
                />
                <Label htmlFor={`option-${index}`} className="text-gray-700 flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSkip}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 transform hover:scale-105 transition-all"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Question
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoyaltyTest;
