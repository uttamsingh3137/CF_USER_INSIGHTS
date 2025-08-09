import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const ProblemDetails = () => {
    const { userHandle } = useParams();
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `https://codeforces.com/api/user.status?handle=${userHandle}`
                );
                const data = await response.json();

                if (data.status === "OK") {
                    const solvedProblems = data.result
                        .filter((submission) => submission.verdict === "OK")
                        .map((submission) => ({
                            contestId: submission.problem.contestId, // Separate contest ID
                            index: submission.problem.index, // Separate index
                            name: submission.problem.name,
                            difficulty: submission.problem.rating || "Unrated",
                            tags: submission.problem.tags,
                            date: unixToDay(submission.creationTimeSeconds),
                        }));

                    const uniqueProblems = Array.from(
                        new Map(solvedProblems.map((p) => [`${p.contestId}-${p.index}`, p])).values()
                    );

                    setQuestions(uniqueProblems);
                    setFilteredQuestions(uniqueProblems);
                } else {
                    console.error("Failed to fetch problems:", data.comment);
                }
            } catch (error) {
                console.error("Error fetching data from Codeforces API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [userHandle]);

    function unixToDay(time) {
        const date = new Date(time * 1000); // Convert to milliseconds
        const options = {
            weekday: "long", // Full weekday name
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return date.toLocaleDateString("en-US", options);
    }

    const handleFilter = () => {
        let filtered = questions;

        if (difficulty) {
            if (difficulty < 800) {
                filtered = filtered.filter(
                    (question) => question.difficulty === "Unrated"
                );
            } else {
                filtered = filtered.filter(
                    (question) => question.difficulty === parseInt(difficulty, 10)
                );
            }
        }

        if (tag) {
            filtered = filtered.filter((question) =>
                question.tags.some((quesTag) =>
                    quesTag.toLowerCase().includes(tag.toLowerCase())
                )
            );
        }

        setFilteredQuestions(filtered);
    };

    const getColor = (rating) => {
        if (rating >= 3600) return "#890000"; // Ultra-Legendary Grandmaster
        if (rating >= 3200) return "#A20000"; // Legendary Grandmaster
        if (rating >= 3000) return "#B40000"; // International Grandmaster
        if (rating >= 2800) return "#E00000"; // Grandmaster
        if (rating >= 2600) return "#FF0000"; // High Master
        if (rating >= 2400) return "#FF0C00"; // Master
        if (rating >= 2200) return "#FF5900"; // Low Master
        if (rating >= 2000) return "#7F0092"; // Intermediate Master
        if (rating >= 1900) return "#7F00CD"; // Candidate Master
        if (rating >= 1800) return "#3D00FF"; // High Expert
        if (rating >= 1600) return "#0041FF"; // Expert
        if (rating >= 1500) return "#00B2FF"; // Specialist Expert
        if (rating >= 1400) return "#00D9FF"; // Specialist
        if (rating >= 1300) return "#00FF00"; // Pupil
        if (rating >= 1200) return "#00FF79"; // High Pupil
        if (rating >= 1000) return "#525252"; // Pupil
        return "#808080"; // Beginner/Newbie
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (

        <div className="bg-white min-h-screen">
            <h1 className="text-[2.5rem] font-bold text-center mb-2 p-6">
                Questions Solved by{" "}
                <span className="text-[#2d3e55]">{userHandle}</span>
            </h1>

            <div className="flex flex-col gap-6 flex-wrap justify-center items-center mb-6">
                <div className="flex gap-10 flex-wrap justify-center items-center">
                    <div className="flex flex-col">
                        <label className="text-xl font-semibold text-gray-700 ml-2">
                            Filter by Difficulty:
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Difficulty (Ex - 1200)"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl font-semibold text-gray-700 ml-2">
                            Filter by Tag:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Tag (Ex - dp)"
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={handleFilter}
                >
                    Apply Filters
                </button>
            </div>

            <div className="bg-white shadow-md rounded-md px-6">
                {filteredQuestions.length > 0 ? (
                    <>
                        <h1 className="text-2xl mb-8 p-2">Problems : <span className="font-bold">{filteredQuestions.length}</span></h1>
                        <ul className="space-y-4 pb-8">
                            {filteredQuestions.map((question) => (
                                <li
                                    key={`${question.contestId}-${question.index}`}
                                    className="border p-4 rounded-md hover:shadow-lg transition"
                                >
                                    <a
                                        href={`https://codeforces.com/contest/${question.contestId}/problem/${question.index}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h3
                                            className="text-lg font-bold text-gray-800"
                                            onMouseEnter={(e) => (e.target.style.color = getColor(question.difficulty))}
                                            onMouseLeave={(e) => (e.target.style.color = "black")}>
                                            {question.name}
                                        </h3>
                                    </a>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            Difficulty:{" "}
                                            <span className="font-medium text-blue-500">
                                                {question.difficulty}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Tags:{" "}
                                            <span className="font-medium text-green-500">
                                                {question.tags.join(", ")}
                                            </span>
                                        </p>
                                        <p className="text-sm">
                                            Submitted On:{" "}
                                            <span className="text-purple-600">
                                                {question.date}
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-gray-600 text-center py-4">
                        No question match the filters.
                    </p>

                )}
            </div>
            
        </div>

    );
};

export default ProblemDetails;
