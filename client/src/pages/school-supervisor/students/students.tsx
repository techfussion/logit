import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/Header"
import { useEffect, useState } from "react"
import apiClient from "@/interceptor/axios.interceptor"
import DeleteStudentDialog from "@/components/dialogs/DeleteStudentDialog"

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

const Students: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Students[]>([]);
  const token = localStorage.getItem('token');

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
  if (students.length === 0) return (
    <DashboardLayout>
        <div className="pb-2 px-24 w-full flex flex-col">
            <Header />
            <div className="mt-6 space-y-6">
                <div className="flex justify-center items-center h-full">
                    <div className='flex flex-col items-center'>
                        <p className="text-sm text-gray-400 mb-6 font-keyphodo">There are no students that has added you as their school supervisor</p>
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
                    {students.map((student) => (
                        <TableRow key={student.id} className="text-xs">
                        <TableCell>{student.firstName} {student.lastName}</TableCell>
                        <TableCell>{student.institution}</TableCell>
                        <TableCell>{student.faculty}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.matricNo}</TableCell>
                        <TableCell>
                            <DeleteStudentDialog onDelete={getStudents} id={student.userId}/>
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

export default Students;