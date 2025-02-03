import DashboardLayout from '@/components/layout/DashboardLayout'
import PageStudent from "../../student/overview/Page";
import PageIndSupervisor from "../../industry-supervisor/overview/Page";
import PageSchoolSup from "../../school-supervisor/overview/Page";
import apiClient from '@/interceptor/axios.interceptor';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [overview, setOverview] = useState<any>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token') || '';

    const getOverview = async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/user/overview`, {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });

            setOverview(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOverview();
    }, [])

    if (loading) return (
        <DashboardLayout>
            <div className="pb-2 px-24 w-full flex flex-col">
                <Header />
                <div className="h-full mt-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-6 font-keyphodo">Loading...</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
    return (
        <DashboardLayout>
            {
                user?.role === 'STUDENT' ? (
                    <PageStudent overview={overview} />
                ) : user?.role === 'INDUSTRY_SUPERVISOR' ? (
                    <PageIndSupervisor overview={overview} />
                ) : user?.role === 'SCHOOL_SUPERVISOR' ? (
                    <PageSchoolSup overview={overview} />
                ) : null
            }
        </DashboardLayout>
    )
}

export default Dashboard;