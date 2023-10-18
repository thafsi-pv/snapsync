import React from "react";
import playstoreImg from "../assets/img/playstore.png";
import appstoreImg from "../assets/img/appstore.png";

function AuthLayout({ children }) {
  return (
    <div className="overflow-hidden bg-white flex flex-col justify-end w-full items-center">
      <div className="flex flex-col gap-3 items-center">
        {children}
        <div className="text-center text-sm font-['Microsoft_Sans_Serif'] tracking-[-0.77] leading-[26.1px] text-[#6e6e6e]">
          Get the app.
        </div>
        <div className="flex gap-2">
          <img className="h-[40px] w-[136px]" src={appstoreImg} alt="" />
          <img className="h-[40px] w-[136px]" src={playstoreImg} alt="" />
        </div>
      </div>
      <footer className="pt-12" role="contentinfo">
        <div className="">
          <div className="">
            <div className="flex gap-4 text-xs flex-wrap justify-center text-gray-600">
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">Meta</span>
                </a>
              </div>
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">About</span>
                </a>
              </div>
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">Blog</span>
                </a>
              </div>
              <div className="">
                <a className="" href="/about/jobs/" role="link" tabindex="0">
                  <span dir="auto">Jobs</span>
                </a>
              </div>
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">Help</span>
                </a>
              </div>
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">API</span>
                </a>
              </div>
              <div className="">
                <a
                  className=""
                  href="/legal/privacy/"
                  role="link"
                  tabindex="0">
                  <span dir="auto">Privacy</span>
                </a>
              </div>
              <div className="">
                <a
                  className=""
                  href="/legal/terms/"
                  role="link"
                  tabindex="0">
                  <span dir="auto">Terms</span>
                </a>
              </div>
              <div className="">
                <a
                  className=""
                  href="/explore/locations/"
                  role="link"
                  tabindex="0">
                  <span dir="auto">Locations</span>
                </a>
              </div>
              <div className="">
                <a
                  className=""
                  href="/web/lite/"
                  role="link"
                  tabindex="0">
                  <span dir="auto">Instagram Lite</span>
                </a>
              </div>
              <div className="">
                <a href="#" target="_blank">
                  <span dir="auto">Threads</span>
                </a>
              </div>
              <div className="">
                <a
                  className=""
                  href=""
                  rel="nofollow noreferrer"
                  role="link"
                  tabindex="0"
                  target="_blank">
                  <span dir="auto">Contact uploading and non-users</span>
                </a>
              </div>
              <div className="">
                <a
                  href="#"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <span dir="auto">Meta Verified</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 text-xs mt-5">
            <span className="">
              <select
                aria-label="Switch display language"
                className="t text-gray-600">
                <option value="en-gb">English (UK)</option>
                <option value="af">Afrikaans</option>
                <option value="cs">Čeština</option>
                <option value="da">Dansk</option>
                <option value="de">Deutsch</option>
                <option value="el">Ελληνικά</option>
                <option value="en">English</option>
                <option value="es">Español (España)</option>
                <option value="es-la">Español</option>
                <option value="fi">Suomi</option>
                <option value="fr">Français</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="it">Italiano</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="ms">Bahasa Melayu</option>
                <option value="nb">Norsk</option>
                <option value="nl">Nederlands</option>
                <option value="pl">Polski</option>
                <option value="pt-br">Português (Brasil)</option>
                <option value="pt">Português (Portugal)</option>
                <option value="ru">Русский</option>
                <option value="sv">Svenska</option>
                <option value="th">ภาษาไทย</option>
                <option value="tl">Filipino</option>
                <option value="tr">Türkçe</option>
                <option value="zh-cn">中文(简体)</option>
                <option value="zh-tw">中文(台灣)</option>
                <option value="bn">বাংলা</option>
                <option value="gu">ગુજરાતી</option>
                <option value="hi">हिन्दी</option>
                <option value="hr">Hrvatski</option>
                <option value="hu">Magyar</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
                <option value="mr">मराठी</option>
                <option value="ne">नेपाली</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
                <option value="si">සිංහල</option>
                <option value="sk">Slovenčina</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="vi">Tiếng Việt</option>
                <option value="zh-hk">中文(香港)</option>
                <option value="bg">Български</option>
                <option value="fr-ca">Français (Canada)</option>
                <option value="ro">Română</option>
                <option value="sr">Српски</option>
                <option value="uk">Українська</option>
              </select>
            </span>
            <div className="text-">
              <span dir="auto">© {new Date().getFullYear()} snapsync</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
