import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card" 
import { useNavigate } from "react-router-dom"; 
import React from "react";
import Header from "@/components/layout/Header";

const Page: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <Card className="mt-6 border-none rounded-none flex justify-between px-6 py-6 items-center">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Profiles that can view your logs</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">There are 0 profiles that has access to your logs</p>
                    </div>
                </div>
                <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/supervisors')}>
                    View Details
                </Button>
            </Card>
            <Card className="mt-6 border-b-2 border-x-0 border-t-0 border-blue-400 rounded-none flex justify-between px-6 py-6">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Total Log Weeks Filled</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">You have filled a total of 0</p>
                    </div>
                    <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/logs')}>
                        View Logs
                    </Button>
                </div>
                <p className="text-9xl text-gray-200">0</p>
            </Card>
            <Card className="mt-6 border-b-2 border-x-0 border-t-0 border-blue-400 rounded-none flex justify-between px-6 py-6">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-sm font-kayphodo text-gray-500">Total Log Feedbacks Recieved</h1>
                        <p className="text-xs mt-2 ml-1 font-kayphodo text-gray-400">You have recieved feedbacks on 0 logs</p>
                    </div>
                    <Button className="text-xs rounded-none font-kayphodo w-max bg-blue-600 hover:bg-blue-400" size="sm" onClick={() => navigate('/engine/reviews')}>
                        View Log Feedbacks
                    </Button>
                </div>
                <p className="text-9xl text-gray-200">0</p>
            </Card>
        </div>
    )
}

export default Page;