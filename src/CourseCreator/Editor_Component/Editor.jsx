import React, { useEffect } from "react";
import ReactQuill, { Quill } from "react-quill"; // Import Quill from react-quill
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import quill from "quill";

window.Quill = quill;
console.log("window.Quill = quill executed");
Quill.register("modules/imageResize", ImageResize);
console.log("outside editor Quill.register executed");

const Editor = ({ finalCourseData, setFinalCourseData, slideId, placeholder, content , contentId }) => {
  console.log("Editor component called");

  useEffect(() => {
    console.log("Editor component render finished and useEffect is called");
  })

  const handleChange = (html) => {
    console.log("Editors onChange funcion called");
    setFinalCourseData((finalCourseData)=>{
      const newFinalCourseData = {...finalCourseData , slides:[...finalCourseData.slides.map((slide)=>{
        if(slide.id === slideId ){
          console.log("slide.slideId: " , slide.slideId);
          return {

            id:slide.id,
            content:[...slide.content.map((contentObject)=>{
              console.log("contentObject.id: ", contentObject.id);
              console.log("contentId" , contentId)
              if(contentObject.id === contentId ){
                console.log("html: " , html);
                return{
                  id:contentObject.id,
                  type:contentObject.type,
                  data:html
                }
              }
              return{
                ...contentObject
              }
            })]
          }
        }else{
          return {...slide}
        }
      })]}
      return newFinalCourseData;
    })
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],

      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"]
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align"
  ];

  return (
    <ReactQuill
      onChange={handleChange}
      value={content}
      modules={modules}
      formats={formats}
      bounds="#root"
      placeholder={placeholder}
    />
  );
};

export default Editor;
