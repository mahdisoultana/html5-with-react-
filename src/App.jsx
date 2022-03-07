import { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const isAllowedType = (file) =>
  ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
const isAllowedFileSize = (file) => file.size < 50000;

function handelUpload(files) {
  // console.log(Array.from(files).filter(isAllowedType));
  console.log([...files].filter(isAllowedType).filter(isAllowedFileSize));
}

function App() {
  const DragContainer = useRef(null);

  useEffect(() => {
    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());
  }, []);

  return (
    <div className="p-4 h-screen bg-gray-200 ">
      <div className="flex justify-evenly flex-col h-full p-3 shadow-lg bg-white rounded-lg text-center">
        {
          //
          // <div
          //   className="bg-indigo-600 rounded-lg shadow-lg h-[80px] w-[80px]"
          //   draggable="true"
          //   id="item-1"
          //   onDragStart={(e) => {
          //     e.dataTransfer.setData("text/plain", e.target.id);
          //   }}
          // ></div>
        }
        <p className="text-lg font-bold">Upload you files✨ </p>
        <div
          ref={DragContainer}
          className="h-[100px] w-full border-2 rounded-lg border-dashed border-gray-600  flex items-center justify-around"
          onDragEnter={(e) => {
            DragContainer.current.classList.add("btn-primary");
          }}
          onDragLeave={(e) => {
            DragContainer.current.classList.remove("btn-primary");
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            DragContainer.current.classList.remove("btn-primary");
            // let id = e.dataTransfer.getData("text/plain", e.target.id);
            // if (id.includes("item")) {
            //   DragContainer.current.append(document.getElementById(id));
            // }

            //Files drag and Drop

            const { files } = e.dataTransfer;
            handelUpload(files);
          }}
        >
          <p className="text-lg text-gray-600">Drag Me 🧲</p>
        </div>
      </div>
    </div>
  );
}

export default App;
