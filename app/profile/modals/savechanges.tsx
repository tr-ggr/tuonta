interface SaveChangesModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const SaveChangesModal: React.FC<SaveChangesModalProps> = ({ onClose, onConfirm, isOpen }) => {
  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Are you sure you want to save changes?</h2>
        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className="w-full bg-[#4530a7] text-white py-3 font-semibold text-lg rounded-full"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-black py-3 font-semibold text-lg rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveChangesModal;
