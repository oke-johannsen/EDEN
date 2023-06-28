import Select from "antd/lib/select";
import { useTracker } from "meteor/react-meteor-data";
import { TagsApi } from "../../api/TagsApi";
import React from "react";

const TagSelect = ({ onChange, value, style }) => {
  const { tags, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe("tags");
    const isLoading = !handle.ready();
    const tags = TagsApi.find().fetch();
    return { tags, isLoading };
  }, []);

  return (
    <Select
      style={style}
      placeholder="Select any tag"
      mode="multiple"
      onChange={(value) => onChange(value)}
      value={value}
    >
      {tags.map((tag) => (
        <Select.Option key={tag._id} value={tag._id}>
          {tag.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default TagSelect;
