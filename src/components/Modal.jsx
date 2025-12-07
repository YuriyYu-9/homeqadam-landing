import { useContext } from "react";
import { LangContext } from "../i18n/context";

export default function Modal({ open, onClose, type }) {
  const { dict } = useContext(LangContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div
        className="
          bg-white 
          max-w-3xl 
          w-full 
          max-h-[80vh] 
          overflow-y-auto 
          rounded-2xl 
          shadow-xl 
          p-8 
          animate-fadeIn
        "
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">
          {type === "privacy"
            ? dict.footer.privacy
            : dict.footer.terms}
        </h2>

        <div className="space-y-4 text-gray-700 text-[16px] leading-[1.75]">
          {type === "privacy" ? (
            <p className="whitespace-pre-line">{dict.modal.privacy}</p>
          ) : (
            <p className="whitespace-pre-line">{dict.modal.terms}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="block w-full py-3 mt-8 font-semibold text-white transition bg-blue-600 rounded-lg  hover:bg-blue-700"
        >
          {dict.modal.close}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
