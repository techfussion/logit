import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/Header"
import { useEffect, useState } from "react"
import apiClient from "@/interceptor/axios.interceptor"
import DeleteInternDialog from "@/components/dialogs/DeleteInternDialog"

interface Interns {
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

const Interns: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [interns, setInterns] = useState<Interns[]>([]);
  const token = localStorage.getItem('token');

  const getInterns = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/user/supervisor/industry`, {
        headers: {
            Authorization: `Bearer ${token}`
            }
        });
        setInterns(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    getInterns();
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
  if (interns.length === 0) return (
    <DashboardLayout>
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <div className="mt-6 space-y-6">
                <div className="flex justify-center items-center h-full">
                    <div className='flex flex-col items-center'>
                        <p className="text-sm text-gray-400 mb-6 font-keyphodo">There are no intern that has added you as their industry supervisor</p>
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
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Department</TableHead> 
                        <TableHead>RegNo</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {interns.map((intern) => (
                        <TableRow key={intern.id} className="text-xs">
                        <TableCell>{intern.firstName} {intern.lastName}</TableCell>
                        <TableCell>{intern.institution}</TableCell>
                        <TableCell>{intern.faculty}</TableCell>
                        <TableCell>{intern.department}</TableCell>
                        <TableCell>{intern.matricNo}</TableCell>
                        <TableCell>
                            <DeleteInternDialog onDelete={getInterns} id={intern.userId}/>
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

export default Interns;