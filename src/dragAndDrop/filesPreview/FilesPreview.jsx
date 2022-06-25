import React from "react";
import FileThumb from "../fileThumb/FileThumb";

function FilesPreview({ files, removeFile }) {
  return files.map((file) => (
    <FileThumb
      key={file.name + file.size}
      file={file}
      removeFile={removeFile}
    />
  ));
}

export default FilesPreview;
