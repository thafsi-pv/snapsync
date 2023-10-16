import React from "react";
import logo from "../../assets/img/snapsync_logo.png";
import InputField from "../../components/fields/InputField";

function SignUp() {
  return (
    <div
      id="SignUpRoot"
      className="overflow-hidden bg-white flex flex-col justify-end pt-8 gap-16 w-full items-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="self-start flex flex-col gap-3 w-[360px]">
          <div className="border-solid border-[#d7d7d7] flex flex-col gap-4 pt-6 pb-12 px-8 border">
            <div className="self-center flex flex-col   items-center">
              <img
                src={logo}
                id="Logo"
                className="bg-[undefined] bg-cover h-24 bg-blend-normal bg-no-repeat"
              />
              <div className="w-full text-center text-base font-semibold text-gray-500">
                Sign up to see photos and videos from your friends.
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 mx-3">
              <button className="bg-[#0095f6] flex flex-row gap-4 justify-center items-center pt-1 rounded-lg">
                <img
                  src="https://file.rendit.io/n/HBpo3FNIqlYTAz2Oj4ax.svg"
                  className="self-start mt-1 w-5 shrink-0"
                />
                <div className="text-center text-sm font-semibold tracking-[-0.81] leading-[27.6px] text-white mb-1">
                  Log in with Facebook
                </div>
              </button>
              <div className="flex flex-row gap-4 justify-center items-center">
                <div
                  id="Line1"
                  className="border-solid border-[#dfdfdf] w-2/5 h-px border-t border-b-0 border-x-0"
                />
                <span className="font-semibold text-gray-500 text-sm">OR</span>
                <div
                  id="Line"
                  className="border-solid border-[#dfdfdf] w-2/5 h-px border-t border-b-0 border-x-0"
                />
              </div>
            </div>
            <div className="flex flex-col mr-3 gap-1">
              <div className="flex flex-col ml-3 gap-2">
                <div className="flex flex-col gap-2">
                  <InputField placeholder="Email / Phone Number" />
                  <InputField placeholder="Full Name" />
                  <InputField placeholder="Username" />
                  <InputField placeholder="Password" />
                </div>
              </div>
              <div className="flex flex-row gap-2 mb-px  w-full items-center p-2">
                <div className="flex flex-col  items-center">
                  <div className="text-center text-xs  tracking-[-0.63] leading-3 text-[#6e6e6e]">
                    People who use our service may have uploaded your contact
                    information to snapsync.
                    <span className="text-[#005dae]">Learn More</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-3 gap-3 items-start">
                <div className="text-center text-xs tracking-[-0.63] leading-2 text-[#6e6e6e]">
                  By signing up, you agree to out
                  <span className="text-[#005dae]">Terms</span>,
                  <span className="text-[#005dae]">Privacy Policy </span> 
                  and <span className="text-[#005dae]">Cookies</span>
                  <span className="text-[#005dae]">Policy</span>
                </div>
                <div className="bg-[#0095f6] self-stretch flex flex-col items-center  py-1 rounded-lg">
                  <button className="text-center text-sm font-semibold  tracking-[-0.81]  text-white p-1">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-solid border-[#d7d7d7] flex flex-col justify-center h-20 shrink-0 items-center border">
            <div
              id="HaveAnAccountLogIn1"
              className="text-center text-base tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
              Have an account? <span className="text-[#0095f6]">Log in</span>
            </div>
          </div>
        </div>
        <div className="text-center text-base font-['Microsoft_Sans_Serif'] tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
          Get the app.
        </div>
      </div>
      <img src="" id="Image1" className="self-start mb-0" />
    </div>
  );
}

export default SignUp;
