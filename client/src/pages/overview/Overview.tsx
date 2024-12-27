import DashboardLayout from '@/components/layout/DashboardLayout'
import PageStudent from "./student/Page";
import PageIndSupervisor from "./industry_supervisor/Page";
import PageSchoolSup from "./school_supervisor/Page";

const Dashboard: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <DashboardLayout>
            {
                user?.role === 'STUDENT' ? (
                    <PageStudent />
                ) : user?.role === 'INDUSTRY_SUPERVISOR' ? (
                    <PageIndSupervisor />
                ) : user?.role === 'SCHOOL_SUPERVISOR' ? (
                    <PageSchoolSup />
                ) : null
            }
        </DashboardLayout>
    )
}

export default Dashboard;