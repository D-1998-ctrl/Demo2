import React from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const TextEditor = ({onDescriptionChange , selectedText}) => {
  console.log(selectedText)
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", ],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link",],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      [{ "background": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
      ["emoji"],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "background",
    "list", "color", "bullet", 
    "link",  "size","emoji",
  ];

  const handleProcedureContentChange = (content) => {
    onDescriptionChange(content);
    console.log("content---->", content);
  };

  return (
   
        <div style={{ display: "grid", }} >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Description"
          onChange={handleProcedureContentChange}
          style={{ height: "100px" }}
          className="col-12"
          value = {selectedText}
        >
        </ReactQuill>
      </div>
   
  );

}

export default TextEditor;