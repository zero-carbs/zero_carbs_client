import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { questions } from "@/config/faq";

export default function FrequentQuestions() {
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        {questions.map(
          (q: { question: string; answer: string | React.ReactNode }) => (
            <AccordionItem value={q.question} key={q.question}>
              <AccordionTrigger chevron className="font-bold">
                {q.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-4">{q.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  );
}
