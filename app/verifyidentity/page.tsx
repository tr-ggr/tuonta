"use client"; // Add this directive at the top of your file
import useSWR from "swr";
import { useState } from "react";
import SubmitModal from "./modals/submit"; // Import the modal
import { CurrentUser } from "../home/page";
import { currentUser } from "../login/page";
const fetcher = (url: string) => fetch(url).then(res => res.json());

function getProfile(id: any){
  const { data, error } = useSWR(`https://localhost:7113/api/profiles/${id}`, fetcher);
  // console.log(data)
  return {
    data: data ? data : '',
    loading: !data && !error,
    error
  };
};


export default function VerifyIdentityPage() {
  const {data, loading, error} = getProfile(CurrentUser.id)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  if(data.isVerified == true)
    window.location.href = "/home"
  console.log(data)
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

  // Handle form submission
  const  handleSubmit = async () => {
    const payload = {
        userID: CurrentUser.id,
    };
    
    try {
        const response = await fetch("https://localhost:7113/api/verifyidentity/submit", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          console.log("Okay!")
        } else {
          console.log("Resubmission failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error during resubmission:", error);
      }

    if (frontImage && backImage) {
      setIsVerified(true); // Set verification to true once both images are uploaded
      setShowModal(true); // Show the modal upon successful submission
    } else {
      alert("Please upload both front and back images.");
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center p-6">
      {/* Document Selection Section */}
      <div className="bg-[#F2DFFD] p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-11 text-left">Verify Your Identity</h1> {/* Title inside the box */}
        
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
        {selectedDocument && frontImage && backImage && (
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
      {isVerified && !showModal && (
        <div className="mt-6 text-center text-white font-medium">
          <p className="rounded-full p-4 bg-green-500">
            Your identity is being verified.<br/>
            Please wait 1-2 days for the verification process.
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
