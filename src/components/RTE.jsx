import React from "react";
import { Label } from "./ui/label";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "@/config/config";

//!Real Time Editor
export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
  className="",
}) {

  return (
    <div className={className}>
      {label && <Label htmlFor={label}>{label}</Label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            
            apiKey={config.tinymceAPIKEY}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
