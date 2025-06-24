import React from "react";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

Modal.setAppElement("#root");

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Item Details"
      className="bg-white p-6 rounded shadow-xl max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      <p className="mb-4 text-gray-700">
        {item.description || "No description available."}
      </p>

      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {[item.cover, ...(item.images || [])].map((img, idx) => (
          <div key={idx} className="w-full h-72 overflow-hidden rounded">
            <img
              src={img}
              alt={`Item ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => alert("Enquiry sent!")}
      >
        Enquire
      </button>
    </Modal>
  );
};

export default ItemModal;
