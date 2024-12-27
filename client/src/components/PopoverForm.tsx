import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"   
import { Textarea } from "./ui/textarea";
import Calendar from "./Calendar";
  

interface PopoverFormProps {
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
}

const PopoverForm: React.FC<PopoverFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md py-4 px-2 max-h-[500px] overflow-y-scroll rounded-md w-80">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <Select>
            <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select Week Day" className="text-xs"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Monday</SelectItem>
                <SelectItem value="dark">Tuesday</SelectItem>
                <SelectItem value="system">Wednesday</SelectItem>
                <SelectItem value="system">Thursday</SelectItem>
                <SelectItem value="system">Friday</SelectItem>
            </SelectContent>
        </Select>
        
        <Textarea placeholder="Fill your log here" className="text-xs text-black"/>
        <Calendar />
        {/* Actions */}
        <div className="flex flex-col justify-end space-y-2">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="text-gray-600 text-xs rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PopoverForm;
