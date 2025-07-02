import React, { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./GenericModal.css";
import GeneralButton from "../GeneralButton";
import { BackIcon, CloseIcon } from "../../../utils/SvgIcons";

function GenericModal({
  children,
  handleClose,
  show,
  title,
  className,
  showBackButton,
  onBackClick,
  prefixImage,
  isAuthModal,
  disableOutsideClick = false,
}) {
  const outSideRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !disableOutsideClick &&
        outSideRef.current &&
        !outSideRef.current.contains(event.target)
      ) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={show}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000cf] transition-opacity" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="justify-center alert items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-[999px]">
            <div
              ref={outSideRef}
              className={`w-full shadow md:mt-0 ${className} relative generic-modal-container   xl:p-0 rounded-[20px] `}
            >
              <div
                className={`${
                  isAuthModal ? "p-0" : "p-8"
                }  space-y-2 md:space-y-4 `}
              >
                {!isAuthModal && (
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-[20px] modal-title flex gap-3 items-center ">
                      {showBackButton && (
                        <GeneralButton variant={"icon"} onClick={onBackClick}>
                          <BackIcon />
                        </GeneralButton>
                      )}
                      {prefixImage && (
                        <img
                          src={prefixImage}
                          className="w-[70px] h-[70px] object-contain"
                        />
                      )}
                      {title}
                    </h1>
                    <GeneralButton
                      variant={"icon"}
                      onClick={handleClose}
                      className={"z-10"}
                    >
                      <CloseIcon size={24} />
                    </GeneralButton>
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default GenericModal;
