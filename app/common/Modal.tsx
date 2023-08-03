"use client";

import { MIN_HEIGHT, MIN_WIDTH } from "@/constant";
import clsx from "clsx";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface IModalProps {
  open: boolean;
  center?: boolean;
  zIndex?: number;
  title?: string;
  width?: number;
  mask?: boolean;
  maskClosable?: boolean;
  showCloseBtn?: boolean;
  showConfirm?: boolean;
  bgClassName?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function Modal({
  open,
  center = false,
  zIndex = 1000,
  title,
  width,
  mask = true,
  maskClosable = true,
  showCloseBtn = true,
  showConfirm = false,
  onCancel,
  onConfirm,
  children,
}: PropsWithChildren<IModalProps>) {
  const [modalVisible, setModalVisible] = useState(open);
  const [transformOrigin, setTransformOrigin] = useState("center");
  const [animatedVisible, setAnimatedVisible] = useState(open);

  const modalRef = useRef<HTMLDivElement>(null);

  // body 需要设置为 overflow: hidden 避免模态框展示时页面可以滚动
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (open) {
      setModalVisible(true);
      setTimeout(() => {
        setAnimatedVisible(true);
      }, 40);
    }
  }, [open]);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      setTimeout(() => {
        if (modalVisible) {
          return;
        }
        const rect = modalRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        setTransformOrigin(`${x}px ${y}px`);
      }, 30);
    };
    // 这里会常驻一个事件在全局
    document.documentElement.addEventListener("click", onClick);
    return () => {
      document.documentElement.removeEventListener("click", onClick);
    };
  }, [modalVisible]);

  const onClose = () => {
    setAnimatedVisible(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 300);
    onCancel && onCancel();
  };

  const getCloseBtn = () => {
    return (
      <button className='btn btn-square btn-sm' onClick={onClose}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    );
  };
  /**
   * header 组件
   * 包括标题和关闭按钮
   */
  const getHeader = () => {
    return (
      <header
        className={clsx(
          "relative flex items-center justify-between rounded-t-xl ",
          showCloseBtn ? "h-14" : "",
        )}
      >
        <div className=' flex w-full items-center justify-center font-bold  text-stone-700'>
          <p className='text-center'>{title}</p>
        </div>
        {showCloseBtn && getCloseBtn()}
      </header>
    );
  };

  const getFooter = () => {
    return (
      <footer className='relative my-4 flex h-14 items-center'>
        <div className='absolute right-6  flex w-56 justify-between'>
          <button className='btn w-24 text-base'>取 消</button>
          <button className='btn btn-accent w-24' onClick={onConfirm}>
            确 定
          </button>
        </div>
      </footer>
    );
  };

  return (
    <div
      style={{
        zIndex,
        transition: "background .3s, blur .3s",
        background: mask && animatedVisible ? "rgb(51 65 85 / 0.6)" : "",
        backdropFilter: mask && animatedVisible ? "blur(10px)" : "",
      }}
      className={clsx(
        "fixed left-0 top-0 flex h-full w-full justify-center",
        modalVisible ? "block" : "hidden",
        center ? "items-center " : "",
      )}
      onClick={() => {
        maskClosable && onClose();
      }}
    >
      <div
        ref={modalRef}
        className={clsx(
          "absolute flex justify-center",
          !center ? "top-[20%]" : "",
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width,
            minWidth: MIN_WIDTH,
            minHeight: MIN_HEIGHT,
            transform: animatedVisible ? "scale(1)" : "scale(0.2)",
            opacity: animatedVisible ? 1 : 0,
            transition: "transform .3s, opacity .3s",
            transformOrigin,
          }}
          className={`rounded-xl bg-base-100 px-4`}
        >
          {getHeader()}
          <div>{children}</div>
          {showConfirm && getFooter()}
        </div>
      </div>
    </div>
  );
}
