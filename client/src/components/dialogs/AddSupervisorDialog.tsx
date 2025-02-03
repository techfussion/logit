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
import apiClient from '@/interceptor/axios.interceptor';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    role: z.enum(["INDUSTRY_SUPERVISOR", "SCHOOL_SUPERVISOR"], {
      message: "Role is required",
    }),
})

type AddSupervisorFormData = z.infer<typeof formSchema>;

interface AddSupervisorDialogProps {
  className?: string;
  onAdd?: () => void;
}

const AddSupervisorDialog: React.FC<AddSupervisorDialogProps> = ({ className, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
  
    const form = useForm<AddSupervisorFormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
    });
  
    const onSubmit: SubmitHandler<AddSupervisorFormData> = async (data) => {
      try {
        setLoading(true);

        data.role === "SCHOOL_SUPERVISOR"
          ? await apiClient.patch(`/user/supervisor/school`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          : await apiClient.patch(`/user/supervisor/industry`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast({
          description: "Supervisor added successfully",
        })

        // call the after action callback
        onAdd?.()
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
            <Button variant="link" className={`font-kayphodo pl-0 rounded-none underline text-xs text-gray-500 hover:text-gray-600 ${className}`}>Add Supervisor</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-sm">Add Supervisor</DialogTitle>
                <DialogDescription className="text-xs">
                    Provide the email address of the supervisor you choose to add
                </DialogDescription>
            </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} action="" className="space-y-6">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='text-xs'>Role</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                  <FormItem className="flex items-center space-x-2">
                                      <RadioGroupItem value="INDUSTRY_SUPERVISOR" />
                                      <FormLabel className="font-normal text-xs" style={{ margin: '0px', marginLeft: '4px'}}>Industry Supervisor</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2">
                                      <RadioGroupItem value="SCHOOL_SUPERVISOR" />
                                      <FormLabel className="font-normal text-xs" style={{ margin: '0px', marginLeft: '4px'}}>School Supervisor</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="h-6 rounded-none text-xs" disabled={loading}>
                            {
                                loading
                                ? 'Adding...'
                                : 'Add'
                            }
                        </Button>
                    </form>
                </Form>
        </DialogContent>
    </Dialog>
    )
}

export default AddSupervisorDialog;