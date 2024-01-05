import ChangeProfilePicture from "@/components/core/Dashboard/Settings/ChangeProfilePicture"
import DeleteAccount from "@/components/core/Dashboard/Settings/DeleteAccount"
import EditProfile from "@/components/core/Dashboard/Settings/EditProfile"
import UpdatePassword from "@/components/core/Dashboard/Settings/UpdatePassword"

export default function Settings() {
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>
            <ChangeProfilePicture />
            <EditProfile />
            <UpdatePassword />
            <DeleteAccount />
        </>
    )
}