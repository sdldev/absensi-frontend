import React, { useState } from 'react';

const StudentImage = () => {
    const [nisn, setNisn] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [formVisible, setFormVisible] = useState(true);

    const url = import.meta.env.PUBLIC_API_URL + "/api/students";

    const handleInputChange = (e) => {
        setNisn(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setData(null);
        setUploadError("");
        setUploadSuccess(false);
        setFormVisible(false);

        try {
            const response = await fetch(`${url}?nisn=${nisn}`);
            
            const result = await response.json();
            if (result.success) {
                setData(result.data);
                if (selectedImage) {
                    await handleImageUpload(result.data.id); // Panggil untuk upload gambar di sini  
                }
            } else {
                setError("Maaf, kode tidak dikenali");
                setFormVisible(true);
            }
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data.");
            setFormVisible(true);
        }
    };

    const handleImageUpload = async (studentId) => {
        if (!selectedImage) {
            setUploadError("Silakan pilih gambar sebelum mengunggah.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);

        setLoading(true);
        setUploadError("");
        setUploadSuccess(false);

        try {
            const response = await fetch(`${url}/${studentId}`, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                setUploadSuccess(true);
                alert("Gambar berhasil diunggah!");
            } else {
                setUploadError("Gagal mengunggah gambar.");
            }
        } catch (error) {
            setUploadError("Terjadi kesalahan saat mengunggah gambar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {formVisible && (
                <form onSubmit={handleSubmit} className="mb-4">
                    <h1 className="py-6 mx-auto items-center text-center text-2xl font-bold mb-4">Update Photo Siswa</h1>
                    <input
                        type="text"
                        value={nisn}
                        onChange={handleInputChange}
                        placeholder="Masukkan kode unik"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-8 bg-blue-500 text-white rounded w-full p-2"
                    >
                        Cek NISN
                    </button>
                </form>
            )}

            {error && <div className="text-red-500">{error}</div>}
            {data && (
                <div className="mx-auto items-center pb-6">
                    <div className="mx-auto sm:max-w-2xl text-center lg:items-center">
                        <div className="rounded-xl">
                            <img
                                src={data.image || '/images/user.webp'}
                                alt="Foto Siswa"
                                loading="lazy"
                                decoding="async"
                                className="mx-auto mt-3 rounded-xl"
                                width="200"
                            />
                        </div>
                        <div className="text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl lg:mt-3 xl:text-3xl">{data.nisn}</div>
                        <div className="text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl lg:mt-3 xl:text-3xl">{data.name}</div>
                        <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden mx-auto mt-3">
                            <table className="w-full text-sm leading-5">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-1 text-left font-medium text-gray-600"></th>
                                        <th className="py-3 px-1 text-left font-medium text-gray-600"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-3 px-3 border text-left text-xs">Tingkat</td>
                                        <td className="py-3 px-3 border text-left text-xs">{data.level_id}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 border text-left text-xs">Kelas</td>
                                        <td className="py-3 px-3 border text-left text-xs">{data.room.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="my-4">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="border border-gray-300 rounded-lg p-2"
                                accept="image/*"
                            />
                        </div>

                        {selectedImage && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    className="mx-auto rounded-lg"
                                    width="200"
                                />
                            </div>
                        )}

                        <button onClick={() => handleImageUpload(data.id)} className="mt-4 bg-green-500 text-white rounded w-full p-2">
                            Unggah Gambar
                        </button>

                        {uploadError && <div className="text-red-500">{uploadError}</div>}
                        {uploadSuccess && <div className="text-green-500">Gambar berhasil diunggah!</div>}
                        {loading && <div className="text-blue-500">Mengunggah gambar, harap tunggu...</div>}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default StudentImage;