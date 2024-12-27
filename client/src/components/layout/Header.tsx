import { useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { greet } from "@/utils/greet";
import EditProfileDialog from "../dialogs/EditProfileDialog";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const date = new Date().toDateString();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const { profile } = user;
    const greetingMessage = greet();

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-xl leading-loose font-kayphodo">{greetingMessage}, {profile.lastName}! 👋</h1>
                <p className="text-sm text-textGray3 font-kayphodo">Today, {date}</p>
            </div>
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                        <p className="text-lg text-gray-500">{profile.lastName[0].toUpperCase()}{profile.lastName[profile.lastName.length - 1].toUpperCase()}</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-max bg-white mt-2 py-2 border-1 flex flex-col px-2">
                    {
                        location.pathname !== '/engine/profile' && (
                            <Button variant="ghost" className="rounded-none w-max text-xs text-gray-500" onClick={() => navigate('/engine/profile')}>View Profile</Button>
                        )
                    }
                    <EditProfileDialog triggerButton={<Button variant="ghost" className="rounded-none w-max text-xs text-gray-500">Edit Profile</Button>} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Header;