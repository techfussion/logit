import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import apiClient from '@/interceptor/axios.interceptor';
import { useToast } from "@/hooks/use-toast";
import { Button } from '../ui/button';

interface DeleteStudentDialogProps {
    id: string;
    onDelete?: () => void;
}

const DeleteStudentDialog: React.FC<DeleteStudentDialogProps> = ({ id, onDelete }) => {
    const [deleting, setDeleting] = useState(false);
    const { toast } = useToast();
  
    const onSubmit = async () => {
      try {
        setDeleting(true);

        await apiClient.delete(`/user/student/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        toast({
          description: "Student removed successfully",
        })

        // call the after action callback
        onDelete?.()
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: `Failed to remove. ${error.message}`,
        })
      } finally {
        setDeleting(false);
      }
    };

    return (
        <Dialog>
        <DialogTrigger>
            <Button variant="link" className="font-kayphodo pl-0 rounded-none underline text-xs text-red-500 hover:text-red-600">Remove Student</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-sm">Are you sure?</DialogTitle>
                <DialogDescription className="text-xs">
                    Do you want to remove this Student?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="outline"
                    className="text-[10px] h-6 rounded-none font-kayphodo w-max bg-red-500 text-white"
                    onClick={onSubmit}
                >
                    {
                        deleting ? 'Removing...' : 'Remove'
                    }
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}

export default DeleteStudentDialog;