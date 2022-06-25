import { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "postcss";
import FilesPreview from "./filesPreview/FilesPreview";

const isAllowedType = (file) =>
  ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
const isAllowedFileSize = (file) => file.size < 500000;
function handelUpload(files) {
  const filesList = [...files].filter(isAllowedType);
  handelUploadToServer(filesList);
  return filesList;
}

async function handelUploadToServer(files) {
  const form = new FormData();

  files.forEach((file) => {
    form.append(file.name, file);
  });
}

function App() {
  const DragContainer = useRef(null);
  const [previewImg, setPreviewImg] = useState([]);

  useEffect(() => {
    document.addEventListener("dragover", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());
  }, []);
  const removeFile = (file) => {
    setPreviewImg((prevS) => prevS.filter((img) => img != file));
  };
  return (
    <div className="p-4 h-screen bg-gray-200 ">
      <div className="flex justify-evenly flex-col min-h-[300px] max-w-2xl w-full m-auto p-3 shadow-lg bg-white rounded-lg text-center">
        <p className="text-lg font-bold">Upload Your Files✨ </p>
        <div
          ref={DragContainer}
          className="min-h-[100px]  w-full border-2 rounded-lg border-dashed border-gray-600 "
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
            let filesArr = handelUpload(files);
            setPreviewImg(filesArr);
          }}
        >
          <p className="text-lg text-gray-600 my-4">Drag Me 🧲</p>
          <div className=" flex flex-wrap p-4 items-center justify-around">
            <FilesPreview files={previewImg} removeFile={removeFile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
