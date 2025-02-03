import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card" 
import { useNavigate } from "react-router-dom"; 
import React from "react";
import Header from "@/components/layout/Header";

interface Props {
    overview: {
        totalLogs: number;
        totalFeedbacks: number;
        students: number;
    };
}

const Page: React.FC<Props> = ({ overview }) => {
    const navigate = useNavigate();

    return (
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <Card className="mt-6 border-none rounded-none flex justify-between px-6 py-6 items-center">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Your Students</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">You have a total of {overview?.students || 0} {overview?.students > 1 ? 'students' : 'student'}</p>
                    </div>
                </div>
                <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/students')}>
                    View Students
                </Button>
            </Card>
            <Card className="mt-6 border-b-2 border-x-0 border-t-0 border-blue-400 rounded-none flex justify-between px-6 py-6">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Total Logs Filled by Your Students</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">The cumulative total of the logs is {overview?.totalLogs || 0}</p>
                    </div>
                    <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/logs')}>
                        View Students Logs
                    </Button>
                </div>
                <p className="text-9xl text-gray-200">{overview?.totalLogs || 0}</p>
            </Card>
            <Card className="mt-6 border-b-2 border-x-0 border-t-0 border-blue-400 rounded-none flex justify-between px-6 py-6">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Total Log Reviews Recieved By Your Students</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">The cumulative total of the log reviews is {overview?.totalFeedbacks || 0}</p>
                    </div>
                    <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/reviews')}>
                        View Students Log Reviews
                    </Button>
                </div>
                <p className="text-9xl text-gray-200">{overview?.totalFeedbacks || 0}</p>
            </Card>
        </div>
    )
}

export default Page;