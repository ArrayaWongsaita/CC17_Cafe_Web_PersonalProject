import useAuth from "../../../hooks/useAuth";
import RegisterForm from "../../authentication/commponents/RegisterForm";


export default function MainUser() {
  const {authUser,editUserProfile} = useAuth()
  return (
    <div className="flex flex-col items-center">
      <div className="w-[350px] text-xl  mt-5 text-customPink "><h1 >User profile info and edit Profile</h1></div>

      <RegisterForm data={authUser} editUserProfile={editUserProfile}/>
    </div>
  )
}
