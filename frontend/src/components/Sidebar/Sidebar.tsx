import { LuBrain, LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import Button from "../Buttons/Button";
import {
  FaBookOpen,
  FaFileVideo,
  FaHashtag,
  FaLink,
  FaTwitter,
} from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import useUserStore from "../../store/useStore";
import { toast } from "react-toastify";

function Sidebar({
  closeSidebar,
  setCloseSidebar,
  setFilterType,
  isViewer = false,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const { setUser } = useUserStore();

  function handleLogout() {
    const sure = confirm("Are you sure you want to logout?");
    if (!sure) return;
    localStorage.removeItem("secondBrainToken");
    setUser({
      token: "",
      username: "",
      email: "",
      _id: "",
    });
    toast.success("Logged out successfully");
  }

  return (
    <div className="h-screen md:w-[20%] bg-transparent absolute z-10 top-0 left-0">
      {closeSidebar ? (
        <Button
          text=""
          textHidden={true}
          onClick={() => setCloseSidebar(false)}
          variant="secondary"
          customStyle={{ fontSize: "1.5rem", padding: "2px" }}
          startIcon={<LuPanelRightClose />}
        />
      ) : (
        <div
          className={`h-screen w-full bg-gray-50 p-3 flex flex-col animate-slideOpen`}
        >
          <div className="flex gap-2 justify-between flex-nowrap ">
            <div className="flex gap-2 text-xl font-semibold text-black items-center justify-center">
              <LuBrain className="text-violet-500 text-3xl" />
              <p>Second Brain</p>
            </div>
            <Button
              text=""
              variant="secondary"
              textHidden={true}
              onClick={() => setCloseSidebar(true)}
              customStyle={{ fontSize: "1.5rem", padding: "2px" }}
              startIcon={<LuPanelLeftClose />}
            />
          </div>

          <ul className="mt-6 flex flex-col gap-4">
            <li>
              <Button
                text="All"
                onClick={() => setFilterType("all")}
                variant="ghost"
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<FaBookOpen />}
              />
            </li>
            <li>
              <Button
                text="Tweet"
                onClick={() => setFilterType("tweet")}
                variant="ghost"
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<FaTwitter />}
              />
            </li>
            <li>
              <Button
                text="Videos"
                variant="ghost"
                onClick={() => setFilterType("video")}
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<FaFileVideo />}
              />
            </li>
            <li>
              <Button
                text="Documents"
                variant="ghost"
                onClick={() => setFilterType("doc")}
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<IoDocumentText />}
              />
            </li>
            <li>
              <Button
                text="Links"
                variant="ghost"
                onClick={() => setFilterType("link")}
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<FaLink />}
              />
            </li>
            <li>
              <Button
                text="Tags"
                variant="ghost"
                customStyle={{ width: "100%" }}
                contentPosition="start"
                startIcon={<FaHashtag />}
              />
            </li>
          </ul>

          {!isViewer && (
            <div className="mt-auto">
              <Button
                text="Logout"
                onClick={handleLogout}
                variant="secondary"
                customStyle={{ width: "100%" }}
                contentPosition="center"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
