import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import AddLogDialog from "./dialogs/AddLogDialog";

const FAB: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8">
      {/* Floating Action Button */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
      >
        {
          popoverOpen 
          ? <X size={24} />
          : <Plus size={24} />
        }
      </button>

      {/* Popover */}
      {popoverOpen && (
        <div className="absolute bottom-16 right-0">
          <AddLogDialog />
        </div>
      )}
    </div>
  );
};

export default FAB;
