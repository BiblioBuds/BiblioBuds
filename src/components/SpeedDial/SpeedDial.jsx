import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import {
    PlusIcon,
} from "@heroicons/react/24/outline";
import {
    FaBookMedical,
    FaBook,
    FaUsers,
    FaBookOpen,
    FaChartLine
} from "react-icons/fa";
import Link from "next/link";

function SpeedDialAdmin() {
    
return (
    <div className="relative h-fit w-fit">
    <div className="fixed top-16 right-4">
        <SpeedDial>
        <SpeedDialHandler className="h-10 w-10">
            <IconButton className="rounded-full bg-transparent shadow-gray-600">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45 text-black" />
            </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
            <Link href="/dashboard">
            <SpeedDialAction className="h-16 w-16">
                <FaChartLine className="h-5 w-5" />
                <Typography color="blue-gray" className="text-xs font-normal">
                    Dashboard
                </Typography>
            </SpeedDialAction>
            </Link>
            <Link href="/dashboard/orders">
                <SpeedDialAction className="h-16 w-16">
                    <FaBookOpen className="h-5 w-5" />
                    <Typography color="blue-gray" className="text-xs font-normal">
                        Orders
                    </Typography>
                </SpeedDialAction>
            </Link>
            <Link href="/dashboard/users">
                <SpeedDialAction className="h-16 w-16">
                    <FaUsers className="h-5 w-5" />
                    <Typography color="blue-gray" className="text-xs font-normal">
                        Users
                    </Typography>
                </SpeedDialAction>
            </Link>
            <Link href="/dashboard/books">
                <SpeedDialAction className="h-16 w-16">
                    <FaBook className="h-5 w-5" />
                    <Typography color="blue-gray" className="text-xs font-normal">
                        Books
                    </Typography>
                </SpeedDialAction>
            </Link>
            <Link href="/form">
                <SpeedDialAction className="h-16 w-16">
                    <FaBookMedical className="h-5 w-5" />
                    <Typography color="blue-gray" className="text-xs font-normal">
                        Form
                    </Typography>
                </SpeedDialAction>
            </Link>
        </SpeedDialContent>
        </SpeedDial>
    </div>
    </div>
);
}

export default SpeedDialAdmin;