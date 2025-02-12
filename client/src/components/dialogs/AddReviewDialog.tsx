import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import apiClient from '@/interceptor/axios.interceptor';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
    content: z.string().min(3, { message: "Character length too short for a comment" }).max(200, { message: "Character length must not exceed 200" }),
})

interface AddReviewDialogProps {
    logEntryId: string;
}

type AddReviewFormData = z.infer<typeof formSchema>;

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ logEntryId }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

  
    const form = useForm<AddReviewFormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
    });
  
    const onSubmit: SubmitHandler<AddReviewFormData> = async (data) => {
      try {
        setLoading(true);

        await apiClient.post(`/feedback`, {...data, submittedById: user.id, logEntryId}, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        toast({
          description: "Feedback added. You can view them on feedback page",
        }) 
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
                <Edit size={16} className='cursor-pointer text-blue-400 hover:text-blue-600' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-sm">
                        Add Review
                    </DialogTitle>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} action="" className="space-y-4">
                            <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Your review content"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='text-[10px]'>
                                        The comment would provide insight to the intern on how to improve
                                    </FormDescription>
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

export default AddReviewDialog;