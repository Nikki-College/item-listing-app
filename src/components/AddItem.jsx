import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../utils/supabase";

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    cover: "",
    images: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.description || !form.cover) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const imagesArray = form.images
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    try {
      const { error } = await supabase.from("items").insert([
        {
          name: form.name,
          type: form.type,
          description: form.description,
          cover: form.cover,
          images: imagesArray,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Item successfully added to Supabase!");
      setForm({
        name: "",
        type: "",
        description: "",
        cover: "",
        images: "",
      });
    } catch (err) {
      console.error("Supabase insert error:", err);
      toast.error("Failed to add item to Supabase.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold my-4">Add Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Item Type</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Shoes">Shoes</option>
          <option value="Sports Gear">Sports Gear</option>
        </select>
        <textarea
          name="description"
          placeholder="Item Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="cover"
          placeholder="Cover Image URL"
          value={form.cover}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="images"
          placeholder="Additional Image URLs (comma-separated)"
          value={form.images}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
