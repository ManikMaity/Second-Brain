import React from "react";
import Button from "../Buttons/Button";
import { IoMdClose } from "react-icons/io";

function ModelContainer({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="h-screen w-screen z-50 bg-black bg-opacity-70 fixed top-0 left-0 flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button
          text=""
          onClick={() => onClose()}
          startIcon={<IoMdClose />}
          variant="ghost"
          customStyle={{ fontSize: "2rem", color: "white", padding: "2px" }}
          textHidden={true}
        />
      </div>
      {children}
    </div>
  );
}

export default ModelContainer;
