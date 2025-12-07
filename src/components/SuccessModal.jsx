import { useContext } from "react";
import { LangContext } from "../i18n/context";

export default function SuccessModal({ open, onClose }) {
  const { dict } = useContext(LangContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm p-8 bg-white shadow-xl rounded-2xl animate-popup">

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-6xl text-green-600">✓</div>

          <h2 className="mb-3 text-2xl font-bold">
            {dict.success.title}
          </h2>

          <p className="mb-6 text-gray-600">
            {dict.success.message}
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {dict.success.ok}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popup {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-popup {
          animation: popup .25s ease-out;
        }
      `}</style>
    </div>
  );
}
