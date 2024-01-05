'use client'
import { FiTrash2 } from "react-icons/fi"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { deleteProfile } from "../../../../services/opr/settings"

export default function DeleteAccount() {
    const { token } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useRouter()

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token!, navigate));
        } catch (error: any) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <div className="my-10 flex lg:flex-row flex-col gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
                <div className="flex items-center justify-center bg-pink-700 rounded-full aspect-square h-14 w-14">
                    <FiTrash2 className="text-3xl text-pink-200" />
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Delete Account
                    </h2>
                    <div className="w-full lg:w-3/5 text-pink-25">
                        <p>Would you like to delete account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the contain associated with it.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="italic text-pink-300 cursor-pointer w-fit"
                        onClick={handleDeleteAccount}
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div>
        </>
    )
}
