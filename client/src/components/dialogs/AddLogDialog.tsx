import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { REACT_APP_API_BASE } from "@/global/global"
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';
import { Edit, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';
import { useDataOperations } from '@/hooks/useDataOperations';


const formSchema = z.object({
    description: z.string().min(10, { message: "Log content must be more than 10 characters" }),
    // clockInTime: z.date({ message: "Invalid date format" }),
    logWeek: z.string().min(1, { message: "Log week must be greater than 0" }).max(2, { message: "Log week exceeds allowed limit" }),
    logDay: z.string(),
})

type AddSupervisorFormData = z.infer<typeof formSchema>;

interface AddLogDialogProps {
    mode?: 'add' | 'edit';
    log?: {
        id: string;
        description: string;
        studentId: string;
        clockInTime: string;
        logWeek: number;
        logDay: string;
        createdAt: string;
        review?: [
          {
            id: string;
            content: string;
            submittedById: string;
            submittedBy: {
              id: string;
              firstName: string;
              lastName: string;
              email: string;
              role: string;
              createdAt: string;
            };
            createdAt: string;
          }
        ];
      };
}

const AddLogDialog: React.FC<AddLogDialogProps> = ({ mode, log }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { state, fetchLogs } = useDataOperations();

  
    const form = useForm<AddSupervisorFormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
    });

    const handleRefetch = () => {
        fetchLogs();
    }
  
    const onSubmit: SubmitHandler<AddSupervisorFormData> = async (data) => {
      try {
        setLoading(true);

        mode !== 'edit' 
            ?
                await axios.post(`${REACT_APP_API_BASE}/log`, {...data, logWeek: parseInt(data.logWeek), clockInTime: new Date()}, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            :
                await axios.patch(`${REACT_APP_API_BASE}/log/${log?.id}`, {...data, logWeek: parseInt(data.logWeek)}, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

        toast({
          description: "Log added successfully",
        }) 
        handleRefetch()
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: `Failed to add. ${error.message}`,
        })
      } finally {
        setLoading(false);
      }
    };

    return (
        <Dialog>
            <DialogTrigger>
                {
                    mode === 'edit'
                    ?  
                    <Edit size={16} className='cursor-pointer text-blue-400 hover:text-blue-600' />
                    :               
                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition mr-3">
                        <Plus size={24} />
                    </div>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-sm">
                        {
                            mode === 'edit'
                            ? 'Edit Log'
                            : 'Add Log'
                        }
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        {
                            mode === 'edit'
                            ? 'Modify the log details and Save'
                            : 'Fill the log details to be added'
                        }
                    </DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} action="" className="space-y-4">
                            <FormField
                            control={form.control}
                            name="logWeek"
                            defaultValue={log?.logWeek?.toString()}
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormControl>
                                        <Input type='number' placeholder="Log week e.g 1, 2 e.t.c" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="logDay"
                            defaultValue={log?.logDay}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='text-xs'>
                                            <SelectValue placeholder="Select log day" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem className='text-xs' value="Monday">Monday</SelectItem>
                                        <SelectItem className='text-xs' value="Tuesday">Tuesday</SelectItem>
                                        <SelectItem className='text-xs' value="Wednesday">Wednesday</SelectItem>
                                        <SelectItem className='text-xs' value="Thursday">Thursday</SelectItem>
                                        <SelectItem className='text-xs' value="Friday">Friday</SelectItem>
                                        <SelectItem className='text-xs' value="Saturday">Saturday</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="description"
                            defaultValue={log?.description}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Your log content"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='text-[10px]'>
                                        This is normally a comprehensive activity or learning you've done for the day
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                            <Button type="submit" className="h-6 rounded-none text-xs" disabled={loading}>
                                { mode !== 'edit'
                                ?
                                    loading
                                    ? 'Adding...'
                                    : 'Add'
                                :
                                    loading
                                        ? 'Saving...'
                                        : 'Save'
                                    }
                            </Button>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddLogDialog;