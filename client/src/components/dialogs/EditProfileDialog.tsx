import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { REACT_APP_API_BASE } from '@/global/global';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '../ui/button';

const formSchema = z.object({
    firstName: z.string().min(3, { message: 'First name must be above 3 characters' }),
    middleName: z.string().optional(),
    lastName: z.string().min(3, { message: 'Last name must be above 3 characters' }),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    matricNo: z.string().optional(),
    institution: z.string().optional(),
    faculty: z.string().optional(),
    department: z.string().optional(),
});

type AddSupervisorFormData = z.infer<typeof formSchema>;

interface EditProfileDialogProps {
    onUpdateProfile: (updatedProfile: any) => void;
    triggerButton?: React.ReactNode;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ onUpdateProfile, triggerButton }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token') || '';
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<AddSupervisorFormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AddSupervisorFormData> = async (data) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${REACT_APP_API_BASE}/user/profile`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedProfile = response.data;
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...user,
                    profile: updatedProfile,
                })
            );

            toast({
                description: 'Profile updated successfully',
            });

            onUpdateProfile(updatedProfile);
            setOpen(false);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                description: `Failed to update. ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton ? (
                    triggerButton
                ) : (
                    <Button variant="outline" className="text-[10px] h-6 rounded-none font-kayphodo w-max">
                        Edit
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-sm">Update Profile</DialogTitle>
                    <DialogDescription className="text-xs">
                        Fill the form below to update your editable profile data.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        action=""
                        className="max-h-96 overflow-y-scroll px-2 space-y-4"
                    >
                        {/* Form Fields */}
                        <FormField
                          control={form.control}
                          name="firstName"
                          defaultValue={user.profile.firstName}
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel className="text-xs">First Name</FormLabel>
                                  <FormControl>
                                      <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="middleName"
                          defaultValue={user.profile.middleName || ''}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>MiddleName</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          defaultValue={user.profile.lastName}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>LastName</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          defaultValue={user.email}
                          disabled
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>Email</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="matricNo"
                          defaultValue={user.profile.matricNo}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>MatricNo</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="institution"
                          defaultValue={user.profile.institution || ''}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>Institution</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="faculty"
                          defaultValue={user.profile.faculty || ''}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>Faculty</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="department"
                          defaultValue={user.profile.department || ''}
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className='text-xs'>Department</FormLabel>
                              <FormControl>
                                  <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                        <Button type="submit" className="h-6 rounded-none text-xs" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDialog;
