import { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout'
import { SearchX, Search} from 'lucide-react';
import { LogCardWithReview } from '@/components/logs/LogCard';
import Header from '@/components/layout/Header';
import { useDataOperations } from '@/hooks/useDataOperations';

const Reviews: React.FC = () => {
    const { state, fetchReviews } = useDataOperations();

    const { items, isLoading, error } = state.reviews;
    
    const reviews = items;

    useEffect(() => {
        fetchReviews();
    }, []);

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
                items.length === 0 ?
                (
                    <div className="mt-6 flex justify-center items-center h-full">
                        <div className='flex flex-col items-center'>
                            <SearchX size={300} className="text-gray-300" />
                            <p className="text-lg text-gray-400 mb-6 font-keyphodo">No Log Reviews Found</p>
                        </div>
                    </div>
                )
                :
                (
                    <div className="mt-6 space-y-6">
                        {Object.entries(reviews).map(([logEntryId, reviewsArray]) => (
                        <LogCardWithReview 
                            key={logEntryId} 
                            logEntryId={logEntryId} 
                            reviews={Array.isArray(reviewsArray) ? reviewsArray : []}
                            actor='STUDENT'
                        />
                        ))}
                    </div>
                )
                }
            </div>
        </DashboardLayout>
    )
}

export default Reviews;