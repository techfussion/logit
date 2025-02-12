import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout'
import { SearchX, Search} from 'lucide-react';
import { LogCardWithReview } from '@/components/logs/LogCard';
import Header from '@/components/layout/Header';
import { useDataOperations } from '@/hooks/useDataOperations';

// Define the review interface based on your API response
interface Review {
    id: string;
    content: string;
    submittedById: string;
    logEntryId: string;
    industrySupervisorId: string | null;
    schoolSupervisorId: string | null;
    createdAt: string;
    submittedBy: {
        id: string;
        email: string;
        role: string;
        createdAt: string;
    };
    logEntry: {
        id: string;
        description: string;
        studentId: string;
        clockInTime: string;
        logWeek: number;
        logDay: string;
        createdAt: string;
    };
}

interface GroupedReviews {
    [key: string]: Review[];
}

const Reviews: React.FC = () => {
    const { state, fetchReviews } = useDataOperations();
    const { id } = useParams();

    const { items, isLoading, error } = state.reviews;

    useEffect(() => {
        fetchReviews(id);
    }, []);

    // Type assertion to ensure items is treated as Review[]
    const reviews = items as unknown as Review[];

    // Group reviews by logEntryId
    const groupedReviews = reviews.reduce((acc: GroupedReviews, review) => {
        if (!acc[review.logEntryId]) {
            acc[review.logEntryId] = [];
        }
        acc[review.logEntryId].push(review);
        return acc;
    }, {});

    if (isLoading) return (
        <DashboardLayout>
            <div className="pb-2 px-24 w-full flex flex-col">
                <Header />
                <div className="flex justify-center items-center h-full">
                    <div className='flex flex-col items-center'>
                        <Search size={300} className="text-gray-300" />
                        <p className="text-lg text-gray-400 mb-6 font-keyphodo">Loading...</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )

    if (error) return (
        <DashboardLayout>
            <div className="pb-2 px-24 w-full flex flex-col">
                <Header />
                <div className="flex justify-center items-center h-full">
                    <div className='flex flex-col items-center'>
                        <SearchX size={300} className="text-gray-300" />
                        <p className="text-lg text-gray-400 mb-6 font-keyphodo">Error: {error}. Try refreshing.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )

    return (
        <DashboardLayout>
            <div className="pb-2 px-24 w-full flex flex-col">
                <Header />
                {
                reviews.length === 0 ? (
                    <div className="mt-6 flex justify-center items-center h-full">
                        <div className='flex flex-col items-center'>
                            <SearchX size={300} className="text-gray-300" />
                            <p className="text-lg text-gray-400 mb-6 font-keyphodo">No Log Reviews Found</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-6 space-y-6">
                        {Object.entries(groupedReviews).map(([logEntryId, reviewsArray]) => (
                            <LogCardWithReview 
                                key={logEntryId} 
                                logEntryId={logEntryId} 
                                reviews={reviewsArray}
                                actor="SCHOOL_SUPERVISOR"
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Reviews;