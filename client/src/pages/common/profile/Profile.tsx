import React, { useState, Fragment } from 'react';
import EditProfileDialog from '@/components/dialogs/EditProfileDialog';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';

const Profile: React.FC = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    const { email, role, profile } = user;
    const { firstName, middleName, lastName, matricNo, institution, faculty, department, createdAt, companyName, position } = profile;

    const handleProfileUpdate = (updatedProfile: any) => {
        setUser((prevUser: any) => ({
            ...prevUser,
            profile: updatedProfile,
        }));
    };

    return (
        <DashboardLayout>
            <div className="pb-8 px-6 lg:px-24 w-full flex flex-col">
                <Header />
                
                <Card className="mt-6 p-6 rounded-none">
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-semibold text-gray-800">Personal Information</h1>
                        <EditProfileDialog onUpdateProfile={handleProfileUpdate} />
                    </div>
                    <div className="flex flex-col space-y-5 mt-4 text-gray-500">
                        <div className="space-y-2">
                            <p className="text-xs"><strong>First Name:</strong> {firstName} </p>
                            <p className="text-xs"><strong>Middle Name:</strong> {middleName || 'null'}</p>
                            <p className="text-xs"><strong>Last Name:</strong> {lastName}</p>
                        </div>
                        <p className="text-xs"><strong>Email:</strong> {email}</p>
                        <p className="text-xs"><strong>Role:</strong> {role}</p>
                        {role === "STUDENT" && (
                            <Fragment>
                                <p className="text-xs"><strong>Matric Number:</strong> {matricNo}</p>
                                <p className="text-xs"><strong>Institution:</strong> {institution || 'null'}</p>
                                <p className="text-xs"><strong>Faculty:</strong> {faculty || 'null'}</p>
                                <p className="text-xs"><strong>Department:</strong> {department || 'null'}</p>
                            </Fragment>
                        )}
                        {role === "INDUSTRY_SUPERVISOR" && (
                            <Fragment>
                                <p className="text-xs"><strong>Company:</strong> {companyName || 'null'}</p>
                                <p className="text-xs"><strong>Position:</strong> {position || 'null'}</p>
                            </Fragment>
                        )}
                        {role === "SCHOOL_SUPERVISOR" && (
                            <Fragment>
                                <p className="text-xs"><strong>Faculty:</strong>{faculty || 'null'}</p>
                                <p className="text-xs"><strong>Position:</strong>{position || 'null'}</p>
                            </Fragment>
                        )}
                        <p className="text-xs"><strong>Profile Created:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
