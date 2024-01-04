import { ACCOUNT_TYPE } from "../utils/constants";
import {VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory} from 'react-icons/vsc'
import {BsBookmarkCheck} from 'react-icons/bs'
import {BiUser} from 'react-icons/bi'
import {PiGraduationCap} from 'react-icons/pi'

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: BiUser,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscDashboard,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscVm,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscAdd,
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: PiGraduationCap,
  },
  {
    id: 8,
    name: "Wishlit",
    path: "/dashboard/wishlit",
    type: ACCOUNT_TYPE.STUDENT,
    icon: BsBookmarkCheck
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscHistory,
  },
];