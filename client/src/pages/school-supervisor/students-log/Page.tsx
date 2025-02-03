import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout'
import { SearchX, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import apiClient from '@/interceptor/axios.interceptor';

interface Students {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    institution?: string;
    faculty?: string;
    department?: string;
    matricNo?: string;
    userId: string;
    createdAt: string;
}

const StudentLog: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [students, setStudents] = useState<Students[]>([]);
    const navigate = useNavigate();

    const getStudents = async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/user/supervisor/school`, {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
      }

    useEffect(() => {
        getStudents();
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

    return (
        <DashboardLayout>
            <div className="pb-2 px-24 w-full flex flex-col">
                <Header />
                {
                students.length === 0 ?
                (
                    <div className="mt-6 flex justify-center items-center h-full">
                        <div className='flex flex-col items-center'>
                            <SearchX size={300} className="text-gray-300" />
                            <p className="text-lg text-gray-400 mb-6 font-keyphodo">You currently don't have any Student</p>
                        </div>
                    </div>
                )
                :
                (
                    <div className='mt-6'>
                        {
                            students.map((student, index) => 
                                (
                                    <div key={index} className='mb-6'>
                                        <h1 className='text-xs mb-4 text-gray-500 font-kayphodo'>Select a student</h1>
                                        <div className='w-full'>
                                            <Card className="border-none rounded-none flex justify-between w-full px-6 py-2 cursor-pointer hover:scale-105 duration-150"
                                                onClick={() => navigate(`/engine/students-logs/${student.id}`)}
                                            >
                                                <div className="flex w-full justify-between">
                                                    <h2 className="text-sm font-kayphodo text-gray-500">{student?.firstName + ' ' + student?.lastName}</h2>
                                                </div>
                                                <p className='text-[10px] whitespace-nowrap text-gray-400'>Click to view logs</p>
                                            </Card>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
                }
            </div>
        </DashboardLayout>
    )
}

export default StudentLog;