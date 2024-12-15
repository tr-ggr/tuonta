"use client";

import React, { useState } from "react";

interface SubmitModalProps {
  onClose: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  // Handle resubmission or additional actions
  const handleResubmit = async () => {
    setIsSubmitting(true);
    setSubmissionMessage(null);

    try {
      const response = await fetch("/api/resubmit-identity", {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionMessage("Resubmission successful. Please wait for approval.");
      } else {
        setSubmissionMessage("Resubmission failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during resubmission:", error);
      setSubmissionMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Identity Verification Submitted</h2>
        <p className="text-sm text-gray-600 mb-4">
          The files you uploaded will now be sent for approval. Please note: Identity approval takes between 1-2 business days.
        </p>
        {submissionMessage && (
          <p className="text-sm text-gray-700 mb-4">{submissionMessage}</p>
        )}
        <div className="flex flex-col gap-4">
          <button
            onClick={onClose}
            className="w-full bg-[#4530a7] text-white py-3 font-semibold rounded-full"
          >
            Close
          </button>
          <button
            onClick={handleResubmit}
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold rounded-full ${
              isSubmitting
                ? "bg-gray-400 text-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isSubmitting ? "Resubmitting..." : "Resubmit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
