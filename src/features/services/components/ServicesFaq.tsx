"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What types of projects do you work on?",
    answer:
      "I work on websites, custom web applications, workflow automation, and improvements to existing software. Whether you need a website for your business, an application to manage a process, or help bringing an idea to life, I'm open to exploring projects of different sizes and scopes.",
  },
  {
    question: "What if I have an idea but don't know where to start?",
    answer:
      "That's completely fine. You don't need to have everything figured out before reaching out. We can talk through your idea, what you're hoping to accomplish, and what the solution might look like. I enjoy working through problems and figuring out how to turn an idea into something practical.",
  },
  {
    question: "Can you work on an existing website or application?",
    answer:
      "Absolutely. Not every project needs to start from scratch. I can help troubleshoot issues, add functionality, improve the user experience, update existing features, or work with an existing codebase to make it more maintainable.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "I primarily work with C#, .NET, ASP.NET MVC, React, Next.js, TypeScript, JavaScript, SQL, MySQL, and MongoDB. The technologies I use depend on the project, its requirements, and what makes the most sense for the solution.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the scope of the project, its complexity, and the time and resources involved. I prefer to understand what you're looking for first so I can provide a reasonable estimate rather than give you a number without understanding the work.",
  },
  {
    question: "Do you offer ongoing support after a project is completed?",
    answer:
      "I'm open to continuing to work on projects after they're completed, whether that's making updates, fixing issues, adding features, or helping as your needs change. We can discuss ongoing support based on what makes sense for your project.",
  },
  {
    question: "How do I get started?",
    answer:
      "The easiest place to start is by reaching out and telling me a little about what you have in mind. It doesn't need to be a formal proposal or a detailed list of requirements. From there, we can discuss your goals, ask questions, and determine whether I'm a good fit for your project.",
  },
];

export default function ServicesFaq({
  items = faqItems,
}: {
  items?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-white/8 border-y border-white/8">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="py-5 sm:py-6">
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 text-left transition-colors hover:text-[#6fbd68]"
            >
              <span className="font-(family-name:--font-bricolage) text-base font-medium text-white sm:text-lg">
                {item.question}
              </span>

              <ChevronDown
                size={18}
                className={`mt-1 shrink-0 text-white/45 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#6fbd68]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <p className="mt-3 max-w-3xl pr-6 text-sm leading-7 text-white/60 sm:text-base">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}