"use client";

import { IDropdownItem } from "@/types";
import clsx from "clsx";

interface IDropdownProps {
  title: string;
  items: IDropdownItem[];
  mode?: "hover" | "click";
  position?: "top" | "bottom" | "left" | "right";
  aligns?: "start" | "end";
  btnClassName?: string;
  adjustWidth?: boolean;
}
export default function Dropdown({
  title,
  items,
  mode = "hover",
  position = "bottom",
  aligns = "start",
  btnClassName,
  adjustWidth = false,
}: IDropdownProps) {
  const getContent = () => {
    return (
      <ul
        tabIndex={0}
        className={clsx(
          "menu dropdown-content z-[1] rounded-box bg-base-100 shadow",
          {
            "w-52": !adjustWidth,
          },
        )}
      >
        {items.map((item, key) => {
          return (
            <li
              key={key}
              onClick={() => item.onClick(item.value)}
              className='h-8 cursor-pointer rounded-md px-2 font-mono text-base
                font-medium leading-8 text-base-content hover:bg-primary-content'
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div
      className={clsx(`dropdown dropdown-${position} dropdown-${aligns}`, {
        "dropdown-hover": mode === "hover",
      })}
    >
      <label tabIndex={0} className={`btn ${btnClassName}`}>
        {title}
      </label>
      {getContent()}
    </div>
  );
}
