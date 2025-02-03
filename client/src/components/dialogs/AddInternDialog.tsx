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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
})

type AddInternFormData = z.infer<typeof formSchema>;

interface AddInternDialogProps {
  className?: string;
  onAdd?: () => void;
}

const AddInternDialog: React.FC<AddInternDialogProps> = ({ className, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
  
    const form = useForm<AddInternFormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
    });
  
    const onSubmit: SubmitHandler<AddInternFormData> = async (data) => {
      try {
        setLoading(true);

        await apiClient.patch(`/user/intern`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

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
            <Button variant="link" className={`font-kayphodo pl-0 rounded-none underline text-xs text-gray-500 hover:text-gray-600 ${className}`}>Add Intern</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-sm">Add Intern</DialogTitle>
                <DialogDescription className="text-xs">
                    Provide the email address of the intern you would like to add
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

export default AddInternDialog;