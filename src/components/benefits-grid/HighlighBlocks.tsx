import React from "react";
import { Block } from "./Block";
import {
  FiArrowUpRight,
  FiClipboard,
  FiCoffee,
  FiDollarSign,
  FiGithub,
  FiBookmark,
  FiMove,
  FiRepeat,
  FiSmile,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";

export const HighlighBlocks = () => {
  return (
    <>
      <HighlightBlock
        Icon={FiDollarSign}
        iconClassName="text-green-500"
        title="Save on planning"
        subtitle="Reduce overhead time dedicated to setting up and specifying tasks during meetings."
      />
      <HighlightBlock
        Icon={FiArrowUpRight}
        iconClassName="text-pink-500"
        title="Speed up testing"
        subtitle="Highlight features or bugs with comments and directly convert them to testable tasks."
      />
      <HighlightBlock
        Icon={FiSmile}
        iconClassName="text-blue-500"
        title="Increase productivity"
        subtitle="Let developers spend more time on writing code instead of specifying tasks."
      />
      <HighlightBlock
        Icon={FiCoffee}
        iconClassName="text-orange-500"
        title="No more late nights"
        subtitle="Cut time spent on creating tasks to save up to 10 hours per week."
      />
      <HighlightBlock
        Icon={FiGithub}
        iconClassName="text-zinc-500"
        title="Use anywhere"
        subtitle="GitHub integration means all tasks are available for any environment."
      />
      <HighlightBlock
        Icon={FiBookmark}
        iconClassName="text-purple-500"
        title="Monitor what's important"
        subtitle="Stay up-to-date on task changes and progress to be in sync with the team."
      />
      <HighlightBlock
        Icon={FiMove}
        iconClassName="text-fuchsia-500"
        title="Remain flexible"
        subtitle="Make changes to existing tasks within the code itself and keep the team updated."
      />
      <HighlightBlock
        Icon={FiClipboard}
        iconClassName="text-red-500"
        title="Stay on track"
        subtitle="Keep the team organized with easy-to-update tasks shared with all group members."
      />
      <HighlightBlock
        Icon={FiRepeat}
        iconClassName="text-yellow-500"
        title="Repeat what works"
        subtitle="Easily replicate tasks to streamline workflow with recognizable language."
      />
    </>
  );
};

type Props = {
  Icon: IconType;
  iconClassName: string;
  title: string;
  subtitle: string;
};

const HighlightBlock = ({ iconClassName, Icon, title, subtitle }: Props) => (
  <Block className="col-span-3 space-y-1.5 md:col-span-1">
    <Icon className={twMerge("text-3xl text-indigo-600", iconClassName)} />
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
  </Block>
);
