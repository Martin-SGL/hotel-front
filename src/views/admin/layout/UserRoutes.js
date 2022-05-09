import DashboardIcon from '@material-ui/icons/Dashboard';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import People from '@material-ui/icons/People';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CategoryIcon from '@material-ui/icons/Category';

export const receptionist = {
    operations:
        [
            {
                id: 1,
                nameRoute:"Dashboard",
                route:"/admin/dashboard",
                icon: <DashboardIcon/>
            },
            {
                id: 2,
                nameRoute:"Reservation",
                route:"/admin/reservation",
                icon: <EventSeatIcon/>
            },
            {
                id: 3,
                nameRoute:"Invoicing",
                route:"/admin/invoicing",
                icon: <AttachMoneyIcon/>
            },
            {
                id:4,
                nameRoute:"Anomalies",
                route: "/admin/anomalies",
                icon: <ThumbDownAltIcon/>
            }
        ],
    catalogues:[]
}

export const manager = {
    operations:
        [
            {
                id: 1,
                nameRoute:"Dashboard",
                route:"/admin/dashboard",
                icon: <DashboardIcon/>
            },
            {
                id: 2,
                nameRoute:"Reservation",
                route:"/admin/reservation",
                icon: <EventSeatIcon/>
            },
            {
                id: 3,
                nameRoute:"Invoicing",
                route:"/admin/invoicing",
                icon: <AttachMoneyIcon/>
            },
            {
                id:4,
                nameRoute:"Anomalies",
                route: "/admin/anomalies",
                icon: <ThumbDownAltIcon/>
            }
        ],
    catalogues: 
    [
        {
            id: 20,
            nameRoute:"Employees",
            route:"/admin/employees-c",
            icon: <People/>
        },
        {
            id: 21,
            nameRoute:"Services",
            route:"/admin/services-c",
            icon: <RoomServiceIcon/>
        },
        {
            id: 22,
            nameRoute:"Restaurant",
            route:"/admin/restaurant-c",
            icon: <MenuBookIcon/>
        },
        {
            id: 23,
            nameRoute:"Rooms",
            route:"/admin/rooms-c",
            icon: <SingleBedIcon/>
        },
        {
            id: 24,
            nameRoute:"Categories",
            route:"/admin/categories-c",
            icon: <CategoryIcon/>
        },
    ],
}
