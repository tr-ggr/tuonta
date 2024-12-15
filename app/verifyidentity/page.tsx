"use client"; // Add this directive at the top of your file

import { useState } from "react";
import SubmitModal from "./modals/submit"; // Import the modal

export default function VerifyIdentityPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // New state for modal confirmation
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission progress

  // Handle document selection
  const handleDocumentSelection = (document: string) => {
    setSelectedDocument(document);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    const file = e.target.files?.[0];
    if (file) {
      side === "front" ? setFrontImage(file) : setBackImage(file);
    }
  };

  // Prepare the data for backend submission
  const prepareFormData = () => {
    const formData = new FormData();
    if (frontImage) formData.append("front_image", frontImage);
    if (backImage) formData.append("back_image", backImage);
    if (selectedDocument) formData.append("document_type", selectedDocument);
    return formData;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (frontImage && backImage) {
      setIsConfirmationVisible(true); // Show confirmation modal
    } else {
      alert("Please upload both front and back images.");
    }
  };

  // Handle confirmation from the modal
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true); // Set submission state to true
    setIsVerified(true); // Set verification status to true
    setShowModal(true); // Show the success modal
    setIsConfirmationVisible(false); // Hide the confirmation modal

    try {
      const formData = prepareFormData();
      const response = await fetch("/api/verify-identity", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Your identity verification request has been submitted successfully.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center p-6">
      {/* Document Selection Section */}
      <div className="bg-[#F2DFFD] p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-11 text-left">Verify Your Identity</h1>

        <h2 className="text-sm font-medium mb-4 text-left">Verify my identity using</h2>

        <div className="flex justify-around mb-6 gap-4">
          {["Passport ID", "Driver's License", "Identity Card"].map((doc) => (
            <button
              key={doc}
              onClick={() => handleDocumentSelection(doc)}
              className={`py-2 px-6 rounded-full text-sm font-semibold border-2 transition-colors ${
                selectedDocument === doc ? "bg-[#4530a7] text-white" : "bg-transparent text-[#4530a7] border-[#4530a7]"
              }`}
            >
              {doc}
            </button>
          ))}
        </div>

        {/* Image Upload Section */}
        {selectedDocument && (
          <div className="mt-6 space-y-6">
            {/* Front Image Upload */}
            <div>
              <h3 className="text-sm font-medium text-left">Front Side Image</h3>
              <div className="w-full mt-2 p-4 border-2 border-gray-300 rounded-md bg-gray-100 text-center cursor-pointer border-dashed">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "front")}
                  className="hidden"
                  id="front-image-upload"
                />
                <label htmlFor="front-image-upload" className="w-full h-full flex items-center justify-center flex-col">
                  {frontImage ? (
                    <p className="text-sm text-gray-600">File uploaded: {frontImage.name}</p>
                  ) : (
                    <p className="text-sm text-blue-400">Click here to upload Front Side Image.</p>
                  )}
                </label>
              </div>
            </div>

            {/* Back Image Upload */}
            <div>
              <h3 className="text-sm font-medium text-left">Back Side Image</h3>
              <div className="w-full mt-2 p-4 border-2 border-gray-300 rounded-md bg-gray-100 text-center cursor-pointer border-dashed">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "back")}
                  className="hidden"
                  id="back-image-upload"
                />
                <label htmlFor="back-image-upload" className="w-full h-full flex items-center justify-center flex-col">
                  {backImage ? (
                    <p className="text-sm text-gray-600">File uploaded: {backImage.name}</p>
                  ) : (
                    <p className="text-sm text-blue-400">Click here to upload Back Side Image.</p>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedDocument && frontImage && backImage && !isConfirmationVisible && !isSubmitting && (
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#4530a7] text-white py-3 font-semibold text-lg rounded-full"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Verification Status */}
      {isVerified && !showModal && isSubmitting && (
        <div className="mt-6 text-center text-white font-medium">
          <p className="rounded-full p-4 bg-green-500">
            Your identity is being verified.<br />
            Please wait 1-2 days for the verification process.
          </p>
        </div>
      )}

      {/* Modal for confirmation */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Submission</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to submit your identity verification? It will take 1-2 business days to approve.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmSubmit}
                className="w-full bg-[#4530a7] text-white py-3 font-semibold rounded-full"
              >
                Yes, Submit
              </button>
              <button
                onClick={() => setIsConfirmationVisible(false)}
                className="w-full bg-gray-300 text-gray-700 py-3 font-semibold rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for successful submission */}
      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
