import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/Header"
import { useEffect, useState } from "react"
import AddSupervisorDialog from "@/components/dialogs/AddSupervisorDialog"
import apiClient from "@/interceptor/axios.interceptor"
import DeleteSupervisorDialog from "@/components/dialogs/DeleteSupervisorDialog"

interface Supervisor {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    companyName?: string;
    faculty?: string;
    position: string;
    userId: string;
    createdAt: string;
}

const Supervisors: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const token = localStorage.getItem('token');

  const getSupervisors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/user/supervisor`, {
        headers: {
            Authorization: `Bearer ${token}`
            }
        });
        setSupervisors(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    getSupervisors();
  }, [])

  if (loading) return (
    <DashboardLayout>
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <div className="flex justify-center items-center h-full mt-6">
                <div className='flex flex-col items-center'>
                    <p className="text-sm text-gray-400 mb-6 font-keyphodo">Loading...</p>
                </div>
            </div>
        </div>
    </DashboardLayout>
  )
  if (supervisors.length === 0) return (
    <DashboardLayout>
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <div className="mt-6 space-y-6">
                <AddSupervisorDialog onAdd={getSupervisors}/>
                <div className="flex justify-center items-center h-full">
                    <div className='flex flex-col items-center'>
                        <p className="text-sm text-gray-400 mb-6 font-keyphodo">You haven't added any supervisor</p>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout>
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <div className="mt-6 space-y-6">
                <AddSupervisorDialog onAdd={getSupervisors} />
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Institution | Faculty</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {supervisors.map((supervisor) => (
                        <TableRow key={supervisor.id} className="text-xs">
                        <TableCell>{supervisor.firstName} {supervisor.lastName}</TableCell>
                        <TableCell>{supervisor.companyName || supervisor.faculty}</TableCell>
                        <TableCell>{supervisor.position}</TableCell>
                        <TableCell>
                            <DeleteSupervisorDialog onDelete={getSupervisors} id={supervisor.userId}/>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    </DashboardLayout>
  )
}

export default Supervisors;