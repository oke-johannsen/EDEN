import Row from "antd/lib/row";
import List from "antd/lib/list";
import React, { useEffect, useState } from "react";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import DraftEditor from "./DraftEditor";
import Button from "antd/lib/button";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Meteor } from "meteor/meteor";
import message from "antd/lib/message";
import { useTracker } from "meteor/react-meteor-data";
import { NotesApi } from "../../api/NotesApi";
import { TagsApi } from "../../api/TagsApi";

const Notes = ({}) => {
  const { notes } = useTracker(() => {
    const handle = Meteor.subscribe("notes");
    const userId = Meteor.user()?._id;
    const notes = handle.ready()
      ? NotesApi.find({ createdBy: userId }).fetch()
      : [];
    return {
      notes,
    };
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [selectedId, setSetSelectedId] = useState(null);
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);

  const { getTag } = useTracker(() => {
    Meteor.subscribe("tags");
    const getTag = (tagId) => TagsApi.findOne(tagId);
    return { getTag };
  }, []);

  useEffect(() => {
    const note = NotesApi.findOne(selectedId);
    if (note) {
      const editorContext = convertFromRaw({
        blocks: note.blocks,
        entityMap: note.entityMap,
      });
      const newEditorState = EditorState.createWithContent(editorContext);
      setEditorState(newEditorState);
    }
  }, [selectedId]);

  const saveNote = () => {
    setSaving(true);
    const payload = convertToRaw(editorState.getCurrentContent());
    payload.tags = tags;
    const method = selectedId ? "update" : "insert";
    if (method === "update") {
      payload._id = selectedId;
    }
    Meteor.call(`notes.${method}`, payload, (err, _res) => {
      if (!err) {
        message.success("Note saved successfully");
      } else {
        message.error("Saving message failed");
      }
      if (method === "insert") {
        resetEditorStateAndId();
      }
      setSaving(false);
    });
  };

  const deleteNote = (id) => {
    Meteor.call("notes.delete", id, (err, _res) => {
      if (id === selectedId && !err) {
        resetEditorStateAndId();
      }
    });
  };

  const resetEditorStateAndId = () => {
    setEditorState(EditorState.createEmpty());
    setSetSelectedId(null);
    setTags([]);
  };

  return (
    <div
      style={{
        borderRadius: "2rem 0 0 2rem",
        height: "100%",
        width: "100%",
        paddingLeft: "2rem",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <List
            style={{ width: "100%" }}
            size="large"
            header={<h2 style={{ margin: 0 }}>Notes</h2>}
            footer={
              <Row justify="center" align="middle">
                <Button type="dashed" onClick={resetEditorStateAndId}>
                  <PlusCircleOutlined /> Create new note
                </Button>
              </Row>
            }
            bordered
            dataSource={notes}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <EditOutlined
                    onClick={() => {
                      setSetSelectedId(item._id);
                      setTags(item.tags || []);
                    }}
                  />,
                  <DeleteOutlined
                    onClick={() => deleteNote(item._id)}
                    style={{ color: "#ff4d4f" }}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={item.blocks[0]?.text}
                  description={item.tags
                    ?.map((tag) => {
                      return getTag(tag)?.name;
                    })
                    .join(", ")}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} lg={16}>
          <Card
            title={
              <h2
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text
                  ? convertToRaw(editorState.getCurrentContent())?.blocks[0]
                      ?.text
                  : "New Note"}
              </h2>
            }
            headStyle={{ padding: "14px 24px" }}
            bodyStyle={{ minHeight: "71vh" }}
            extra={
              <Button onClick={saveNote} loading={saving} disabled={saving}>
                Save <SaveOutlined />
              </Button>
            }
          >
            <DraftEditor
              editorState={editorState}
              setEditorState={setEditorState}
              tags={tags}
              setTags={setTags}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Notes;
