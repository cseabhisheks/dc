import { useEffect, useState } from 'react';

export default function ManageGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modifyBox, setModifyBox] = useState(false);
  const [modifyData, setModifyData] = useState({ id: '', category: '' });
  const [uploading, setUploading] = useState(false);

  // Fetch gallery data
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/manage-gallery/fetch`,
          { credentials: 'include' } // Use this if your backend uses cookies/session
        );
        if (res.ok) {
          const data = await res.json();
          setGalleryData(data.img);
        }
      } catch (err) {
        alert('Failed to fetch images: ' + err.message);
      }
    };
    fetchGalleryData();
  }, [refresh]);

  // Start editing a gallery item
  const modifyfn = (item) => {
    setModifyBox(true);
    setModifyData({ id: item.id, category: item.category });
  };

  // Handle change for category input in edit modal
  const modifychange = (e) => {
    const { name, value } = e.target;
    setModifyData((prev) => ({ ...prev, [name]: value }));
  };

  // Delete image handler
  const deleteImage = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/manage-gallery/delete/${id}`,
        { method: 'DELETE', credentials: 'include' }
      );
      if (res.ok) {
        setRefresh((prev) => !prev);
        alert('Image deleted successfully');
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Error deleting image: ' + err.message);
    }
  };

  // Modify (edit) image category handler
  const modifygallery = async (e) => {
    e.preventDefault();
    const { id, category } = modifyData;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/manage-gallery/patch/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ category }),
        }
      );
      if (res.ok) {
        setRefresh((prev) => !prev);
        setModifyBox(false);
        alert('Gallery modified successfully');
      } else {
        alert('Modify failed');
      }
    } catch (err) {
      alert('Error modifying gallery: ' + err.message);
    }
  };

  // Handle file upload via fetch (so you can handle errors and update state/UI)
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const formData = new FormData(form);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/manage-gallery`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      );
      const data = await res.json();
      if (res.ok && (!data.err)) {
        setRefresh((prev) => !prev);
        alert('Upload successful');
        form.reset();
      } else {
        alert('Upload failed: ' + (data.err || data));
      }
    } catch (err) {
      alert('Error uploading: ' + err.message);
    }
    setUploading(false);
  };

  return (
    <>
      {/* Upload form */}
      <form
        className="h-[70%] w-[100%] bg-white shadow-[1px_1px_10px_2px_black] rounded-xl border-2 text-2xl border-primary flex flex-col justify-between items-center p-5 md:p-10"
        encType="multipart/form-data"
        onSubmit={handleUpload}
      >
        <h1 className="font-semibold">Upload Images</h1>
        <input className="text-xs border-2 border-black" type="file" name="fcDesign" multiple required />
        <input className="text-xs border-2 border-black p-2 rounded-xl" type="text" name="category" placeholder="category" required />
        <input
          className="border-2 border-black rounded-3xl px-6 py-2 bg-primary text-white text-xl cursor-pointer"
          type="submit"
          value={uploading ? 'Uploading...' : 'Upload'}
          disabled={uploading}
        />
      </form>

      {/* Gallery Data Table */}
      <div className="bg-green-200 p-5 mt-5 rounded-xl overflow-scroll">
        <h1 className="text-xl text-center font-extrabold">History</h1>
        <table className="mt-5 border-2 border-red-400 w-full bg-primary text-gray-300">
          <thead>
            <tr className="border-2 h-[30px]">
              <th className="border-2 border-text-primary w-40">Date</th>
              <th className="border-2 border-text-primary">Category</th>
              <th className="border-2 border-text-primary w-40">Image</th>
              <th className="border-2 border-text-primary w-40">Edit</th>
              <th className="border-2 border-text-primary w-40">Delete</th>
            </tr>
          </thead>
          <tbody>
            {galleryData.length > 0 ? (
              galleryData.map((item, index) => (
                <tr key={item.id || index} className="bg-slate-900 text-center">
                  <td className="border-2 border-text-primary w-40">{item.date || '-'}</td>
                  <td className="border-2 border-text-primary w-40">{item.category}</td>
                  <td className="border-2 border-text-primary w-40">
                    <img src={item.imageUrl} className="max-h-32 mx-auto" alt="Gallery" />
                  </td>
                  <td
                    onClick={() => modifyfn(item)}
                    className="border-2 border-text-primary w-20 text-blue-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => deleteImage(item.id)}
                    className="border-2 border-text-primary w-20 text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-gray-100 text-center">
                  No images found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modifyBox && (
        <form onSubmit={modifygallery} className="flex bg-green-300 flex-col justify-evenly items-center absolute p-5 top-20 w-[70%] border-2 border-black rounded-xl h-[300px]">
          <h1 className="text-center text-xl font-semibold">Modify Gallery</h1>
          <label htmlFor="category" className="p-2">
            <span>Category</span>
            <input
              type="text"
              name="category"
              placeholder="New Category"
              id="category"
              className="pl-2 ml-2 border-2 border-black"
              onChange={modifychange}
              value={modifyData.category}
              required
            />
          </label>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setModifyBox(false)}
              className="border-2 p-2 rounded-xl bg-gray-300 border-gray-500 w-[50%]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 p-2 rounded-xl bg-primary text-text-primary border-gray-500 w-[50%]"
            >
              Change Category
            </button>
          </div>
        </form>
      )}
    </>
  );
}
