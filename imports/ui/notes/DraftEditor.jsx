import React from "react";
import { Editor, RichUtils } from "draft-js";
import Button from "antd/lib/button";
import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import TagSelect from "../tags/TagSelect";

const DraftEditor = ({ editorState, setEditorState, tags, setTags }) => {
  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <Row align="top" style={{ gap: "0.3rem" }}>
      <Button
        type="text"
        onClick={() => handleBlockType("header-two")}
        style={{ fontWeight: "bold", color: "#1d1c1a" }}
      >
        H1
      </Button>
      <Button
        type="text"
        onClick={() => handleBlockType("header-three")}
        style={{ fontWeight: "bold", color: "#1d1c1a" }}
      >
        H2
      </Button>
      <Button
        type="text"
        onClick={() => handleBlockType("header-four")}
        style={{ fontWeight: "bold", color: "#1d1c1a" }}
      >
        H3
      </Button>
      <Button type="text" onClick={() => handleInlineStyle("BOLD")}>
        <BoldOutlined />
      </Button>
      <Button type="text" onClick={() => handleInlineStyle("ITALIC")}>
        <ItalicOutlined />
      </Button>
      <Button type="text" onClick={() => handleInlineStyle("UNDERLINE")}>
        <UnderlineOutlined />
      </Button>
      <Button
        type="text"
        onClick={() => handleBlockType("unordered-list-item")}
      >
        <UnorderedListOutlined />
      </Button>
      <Button type="text" onClick={() => handleBlockType("ordered-list-item")}>
        <OrderedListOutlined />
      </Button>
      <Col flex="auto">
        <TagSelect value={tags} onChange={setTags} style={{ width: "100%" }} />
      </Col>
      <Col span={24} style={{ padding: "4px 15px" }}>
        <Editor editorState={editorState} onChange={handleChange} />
      </Col>
    </Row>
  );
};

export default DraftEditor;
