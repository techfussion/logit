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
import axios from "axios";
import { REACT_APP_API_BASE } from "@/global/global"
import { useToast } from "@/hooks/use-toast";
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

interface DeleteLogDialogProps {
    id: string;
}

const DeleteLogDialog: React.FC<DeleteLogDialogProps> = ({ id }) => {
    const [deleting, setDeleting] = useState(false);
    const { toast } = useToast();
  
    const onSubmit = async () => {
      try {
        setDeleting(true);

        await axios.delete(`${REACT_APP_API_BASE}/log/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        toast({
          description: "Log removed successfully",
        }) 
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
            <Trash size={16} className='cursor-pointer text-red-400 hover:text-red-600' />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-sm">Are you sure?</DialogTitle>
                <DialogDescription className="text-xs">
                    Do you want to delete this log entry?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="outline"
                    className="text-[10px] h-6 rounded-none font-kayphodo w-max bg-red-500 text-white"
                    onClick={onSubmit}
                >
                    {
                        deleting ? 'Deleting...' : 'Delete'
                    }
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}

export default DeleteLogDialog;