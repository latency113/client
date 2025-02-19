import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import concertService from "../../../services/concert.service";

const EditConcertModal = ({ isOpen, onClose, concert }) => {
    const [concertName, setConcertName] = useState("");
    const [venue, setVenue] = useState("");
    const [price, setPrice] = useState("");
    const [seatsAvailable, setSeatsAvailable] = useState("");
    const [picture, setPicture] = useState(null);
    const [schedules, setSchedules] = useState([{ date: "", startTime: "", endTime: "" }]);

    useEffect(() => {
        if (concert) {
            setConcertName(concert.concertName);
            setVenue(concert.venue);
            setPrice(concert.price);
            setSeatsAvailable(concert.seatsAvailable);
            setPicture(concert.picture);

            const initialSchedules = concert?.schedules ?? [{ date: "", startTime: "", endTime: "" }];
            setSchedules(initialSchedules);
        }
    }, [concert]);

    const handleFileChange = (e) => setPicture(e.target.files[0]);

    const handleAddSchedule = () => {
        setSchedules([...schedules, { date: "", startTime: "", endTime: "" }]);
    };

    const handleRemoveSchedule = (index) => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedules = schedules.map((schedule, i) =>
            i === index ? { ...schedule, [field]: value } : schedule
        );
        setSchedules(updatedSchedules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (price <= 0 || seatsAvailable <= 0) {
            toast.error("Price and seats available must be positive numbers.");
            return;
        }

        const formData = new FormData();
        formData.append("concertName", concertName);
        formData.append("venue", venue);
        formData.append("price", price);
        formData.append("seatsAvailable", seatsAvailable);
        if (picture) formData.append("picture", picture);
        formData.append("schedules", JSON.stringify(schedules));


        try {
            await concertService.update(formData, concert.id); // Pass concert.id here!
            toast.success("Concert updated successfully!");
            onClose();
        } catch (error) {
            console.error("Error updating concert:", error);
            toast.error("Failed to update concert. Please check the console for details.");
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-lg p-8 w-1/2 relative z-10 transition-transform duration-300 scale-100">
                <h2 className="text-3xl font-semibold mb-4">แก้ไข Concert</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Concert Name"
                        value={concertName}
                        onChange={(e) => setConcertName(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Seats Available"
                        value={seatsAvailable}
                        onChange={(e) => setSeatsAvailable(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded mb-2"
                    />

                    {/* Schedule Section */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            ตารางเวลา:
                        </label>
                        {Array.isArray(schedules) &&
                            schedules.map((schedule, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="date"
                                        value={schedule.date}
                                        onChange={(e) =>
                                            handleScheduleChange(index, "date", e.target.value)
                                        }
                                        className="w-1/3 px-2 py-1 border border-gray-300 rounded"
                                        required
                                    />
                                    <input
                                        type="time"
                                        value={schedule.startTime}
                                        onChange={(e) =>
                                            handleScheduleChange(index, "startTime", e.target.value)
                                        }
                                        className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                                        required
                                    />
                                    <input
                                        type="time"
                                        value={schedule.endTime}
                                        onChange={(e) =>
                                            handleScheduleChange(index, "endTime", e.target.value)
                                        }
                                        className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSchedule(index)}
                                        className="text-red-600 hover:underline"
                                    >
                                        ลบ
                                    </button>
                                </div>
                            ))}
                        <button
                            type="button"
                            onClick={handleAddSchedule}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                            เพิ่มรอบ
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EditConcertModal;