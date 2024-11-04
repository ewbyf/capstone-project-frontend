import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const FAQ = () => {
  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-3xl">
      <Question title="What makes Codeban better than other kanban boards?" defaultOpen>
            The unique feature of being able to create and edit tasks directly
            from in-code comments means that Codeban offers higher efficiency than competitors. 
            Other kanban board systems require overhead time dedicated to managing tasks, 
            which Codeban effectively lessens or even eliminates.
        </Question>
        <Question title="Which programming languages are supported?">
            Codeban supports a wide variety of languages and comment styles! 
            As of now the following comment styles (and their associated languages) are implemented:
            //comment, #comment, /*comment*/, %comment, --comment, 'comment, ;comment
        </Question>
        <Question title="What if I want to make a manual change?">
            No problem! Codeban supports task editing both in comments and through the board. 
            Simply navigage to the task and make any changes you need, and the updates will also appear in the respective comment. 
        </Question>
        <Question title="How much does Codeban cost?">
            Codeban is free, all you need is a GitHub account to be able to log in and start using the application!
        </Question>
      </div>
    </div>
  );
};

const Question = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: string;
  defaultOpen?: boolean;
}) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(79, 70, 229, 1)",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="text-[#4F46E5] text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgba(79, 70, 229, 1",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <p ref={ref}>{children}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;