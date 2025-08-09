import { useEffect, useState } from "react";

function RecentContestPerformance({ userHandle }) {
    const [contestData, setContestData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContestData = async () => {
            try {
                // Fetch user contest data
                const contestResponse = await fetch(
                    `https://codeforces.com/api/user.rating?handle=${userHandle}`
                );
                if (!contestResponse.ok) throw new Error("Failed to fetch contest data");
                const contestData = (await contestResponse.json()).result;

                // Only get the most recent 5 contests and reverse them for chronological order
                const recentContests = contestData.reverse().slice(0, 6).map(contest => ({
                    contestName: contest.contestName,
                    ratingChange: contest.newRating - contest.oldRating,
                    rating: contest.newRating, // Customize as needed
                    rank: contest.rank
                }));

                setContestData(recentContests);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContestData();
    }, [userHandle]);

    if (isLoading) {
        return <div>Loading contest data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-8 bg-white p-8">
            <h2 className="text-4xl font-semibold mb-4">Recent Contest Performances</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {contestData.length>0 ? (contestData.map((contest, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-lg shadow-lg bg-white grid gap-4"
                    >
                        <h3 className="text-xl font-bold">{contest.contestName}</h3>
                        <hr />
                        <div className="flex justify-between">
                            <span className="font-semibold text-lg">Rating Change:</span>
                            <span className={`font-semibold text-lg ${contest.ratingChange < 0 ? "text-red-600":"text-green-600"}`} >{contest.ratingChange > 0 ? `+${contest.ratingChange}` : contest.ratingChange}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-lg">New Rating:</span>
                            <span className="font-semibold text-lg">{contest.rating}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-lg">Rank:</span>
                            <span className="font-semibold text-lg">{contest.rank}</span>
                        </div>
                    </div>)
                )):(
                    <div className="text-3xl">Never Participated</div>
                )}
            </div>
        </div>
    );
}

export default RecentContestPerformance;
