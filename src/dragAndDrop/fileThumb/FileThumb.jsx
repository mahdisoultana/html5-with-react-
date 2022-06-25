import React, { useEffect, useState, useMemo, useCallback } from "react";

function FileThumb({ file: fileObj, removeFile }) {
  const [img, setImg] = useState("");
  useEffect(() => {
    function showFilePreview(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        setImg(e.target.result);
      });
    }
    showFilePreview(fileObj);
    return () => {
      setImg("");
    };
  }, []);

  return (
    <div>
      <div className="relative c">
        <img
          src={img}
          className=" m-auto inline-block my-2  bg-indigo-600 p-1 rounded-lg shadow-lg h-[80px] w-[80px]"
        />
        <button
          className="absolute top-2 -right-4  text-white bg-red-700 rounded-full flex items-center justify-center p-1 text-base font-bold w-6 h-6 hover:opacity-30"
          onClick={() => {
            removeFile(fileObj);
          }}
        >
          X
        </button>
      </div>
      <p className="text-sm font-bold text-gray-800 m-auto">
        {fileObj.name}
        <span
          className={`  block rounded-full  w-[70px] m-auto ${
            fileObj.size > 500000 ? "bg-red-500" : "bg-green-600"
          } text-white font-bold text-xs`}
        >
          {Math.round(fileObj.size * 0.001)} kb
        </span>
      </p>
    </div>
  );
}

export default FileThumb;
