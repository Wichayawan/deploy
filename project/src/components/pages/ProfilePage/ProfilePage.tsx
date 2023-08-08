import { useContext } from "react";
import { DataUser } from "../../../App";
import { Avatar } from "@material-tailwind/react";

type Props = {};

export default function ProfilePage({}: Props): JSX.Element {
  const { data, check } = useContext(DataUser);

  return (
    <div>
      {check ? (
        <>
          <div className="max-w-full rounded-lg border-solid border-2 my-2">
            <div className="bg-red-200 max-w-full max-h-full">
              <img
                src="../../../../public/pexels-aysenurhamra-17523114.jpg"
                alt=""
                className="w-full max-h-72 object-cover"
              />
            </div>
            <div className="flex justify-center relative">
              <div className="absolute top-[-55px]">
                <Avatar
                  src="https://scontent.fkkc4-1.fna.fbcdn.net/v/t39.30808-6/365312358_1649751825506910_3707627614724698697_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEvZ_FshXKezZ1Wu6Rjc4-wRqAIKUaCjrJGoAgpRoKOsnNCAY7thdIhfu3UTB4iLq2QqIWCpxhuu091UhMQYTXc&_nc_ohc=jaV7MtNXa3cAX88JaUY&_nc_ht=scontent.fkkc4-1.fna&oh=00_AfBJIXsr8GRkwjfCCrPVrt4OqxY8MD-1H8RrNx6GpQ_vVw&oe=64D4931B"
                  alt="avatar"
                  size="xxl"
                  className="rounded-lg border-solid border-[3px]"
                />
                <div className="flex justify-center">
                  <span>
                    {data.first_name} {data.last_name}
                  </span>
                </div>
              </div>
              <div className="mt-20 mb-3">
                <span>Senior Software Engineer</span>
              </div>
            </div>
          </div>
          <div className="max-w-full rounded-lg border-solid border-2 my-2 p-5">
            <div className="flex flex-col gap-y-2">
            <label className="font-bold">Personal Info</label>
            <hr />
              <div>
                <span className="font-semibold">Full name: </span>
                <span>
                  {data.first_name} {data.last_name}
                </span>
              </div>
              <hr />
              <div>
                <span className="font-semibold">Birthday: </span>
                <span>24 Jul, 1991</span>
              </div>
              <hr />
              <div>
                <span className="font-semibold">Email: </span>
                <span>{data.email}</span>
              </div>
              <hr />
            </div>
          </div>
        </>
      ) : (
        <h1>Login !!!</h1>
      )}
    </div>
  );
}
