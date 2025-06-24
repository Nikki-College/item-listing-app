import React, { useEffect, useState } from "react";
import ItemModal from "./ItemModal";
import ShirtImage from "../assets/images/shirt.png";
import PantImage from "../assets/images/pant.png";
import supabase from "../../utils/supabase";
supabase;

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const defaultItems = [
        {
          id: "default1",
          name: "Shirt",
          type: "Shirt",
          description: "A stylish shirt.",
          cover: ShirtImage,
          images: [ShirtImage],
        },
        {
          id: "default2",
          name: "Pants",
          type: "Pant",
          description: "Comfortable pants.",
          cover: PantImage,
          images: [PantImage],
        },
      ];
      try {
        const { data, error } = await supabase.from("items").select("*");
        if (error) {
          console.error("Supabase fetch error:", error.message);
          setItems(defaultItems);
          return;
        }

        const formattedData = data.map((item) => ({
          ...item,
          id: item.id || crypto.randomUUID(),
          images: item.images || [],
        }));

        setItems([...defaultItems, ...formattedData]);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
        setItems(defaultItems);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow hover:shadow-md cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.cover}
              alt={item.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ViewItems;
